using Microsoft.AspNetCore.SignalR;
using AnimalTheoryRoyale.Models.Realtime;
using AnimalTheoryRoyale.Services;

namespace AnimalTheoryRoyale.Hubs;

public class GameHub : Hub
{
    private readonly GameEngine _gameEngine;

    public GameHub(GameEngine gameEngine)
    {
        _gameEngine = gameEngine;
    }

    public async Task JoinRoomAsHost(string roomCode)
    {
        var game = _gameEngine.GetOrCreateGame(roomCode, 1, 600);
        await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
        game.HostConnectionId = Context.ConnectionId;
        await Clients.Caller.SendAsync("LobbyState", game.Players.Values.ToList());
    }

    public async Task JoinRoomAsPlayer(string roomCode, string username, int characterId)
    {
        var game = _gameEngine.GetOrCreateGame(roomCode, 1, 600);
        await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

        int maxHp = characterId switch { 1 => 200, 2 => 80, 3 => 100, 4 => 150, _ => 100 };
        int ammo = characterId switch { 1 => 15, 2 => 6, 3 => 10, 4 => 8, _ => 10 };
        var (spawnX, spawnZ) = _gameEngine.GetRandomSpawnPosition();

        var player = new PlayerState
        {
            ConnectionId = Context.ConnectionId,
            Username = username,
            CharacterId = characterId,
            X = spawnX, Y = 0, Z = spawnZ,
            HP = maxHp, MaxHP = maxHp, Ammo = ammo
        };

        game.Players.TryAdd(Context.ConnectionId, player);
        var playerList = game.Players.Values.ToList();
        await Clients.Group(roomCode).SendAsync("PlayerJoined", player);
        await Clients.Group(roomCode).SendAsync("LobbyState", playerList);
    }

    public async Task HostStartGame(string roomCode, int questionCount = 20)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null) return;

        // Initialize knowledge zones from DB with unique questions
        await _gameEngine.InitializeKnowledgeZonesFromDB(game, questionCount);

        game.Status = "Playing";
        game.StartTime = DateTime.UtcNow;
        game.SafeZone.NextShrinkTime = DateTime.UtcNow.AddSeconds(60);

        await Clients.Caller.SendAsync("GameStartedForHost");
        await Clients.GroupExcept(roomCode, Context.ConnectionId).SendAsync("GameStartedForPlayer");
    }

    public async Task PlayerMove(string roomCode, float x, float y, float z, float rotationY)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null) return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var player)) return;
        if (player.IsDead || player.IsAnsweringQuestion || player.IsStunned) return;
        player.X = x; player.Y = y; player.Z = z; player.RotationY = rotationY;
    }

    public async Task ShootProjectile(string roomCode, float dirX, float dirZ)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var player)) return;
        if (player.IsDead || player.HasQuestionShield || player.IsStunned || player.Ammo <= 0) return;

        player.Ammo--;
        float length = MathF.Sqrt(dirX * dirX + dirZ * dirZ);
        if (length > 0) { dirX /= length; dirZ /= length; }

        var proj = new ProjectileState
        {
            OwnerConnectionId = Context.ConnectionId,
            X = player.X, Y = 2f, Z = player.Z,
            DirX = dirX, DirZ = dirZ
        };
        game.Projectiles.TryAdd(proj.Id, proj);
        await Clients.Group(roomCode).SendAsync("ProjectileSpawned", proj);
    }

    public async Task UseSkillPush(string roomCode, float dirX, float dirZ)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var me)) return;
        if (me.IsDead || me.IsStunned || (me.SilenceEndTime.HasValue && me.SilenceEndTime.Value > DateTime.UtcNow)) return;
        if (me.SkillPushCooldown.HasValue && DateTime.UtcNow < me.SkillPushCooldown.Value) return;

        me.SkillPushCooldown = DateTime.UtcNow.AddSeconds(8);
        
        float len = MathF.Sqrt(dirX * dirX + dirZ * dirZ);
        if (len > 0) { dirX /= len; dirZ /= len; }

        var affected = new List<string>();
        foreach (var o in game.Players.Values)
        {
            if (o.ConnectionId == me.ConnectionId || o.IsDead || o.HasQuestionShield || (o.InvulnerableEndTime.HasValue && o.InvulnerableEndTime.Value > DateTime.UtcNow)) continue;
            float dx = o.X - me.X, dz = o.Z - me.Z;
            float dist = MathF.Sqrt(dx * dx + dz * dz);
            
            // Cone check (angle & distance)
            if (dist < 25f && dist > 0.1f)
            {
                float dot = (dx / dist) * dirX + (dz / dist) * dirZ;
                if (dot > 0.5f) // Roughly 60 degrees cone
                {
                    affected.Add(o.ConnectionId);
                }
            }
        }
        await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "push", by = me.ConnectionId, username = me.Username, targets = affected, dirX = dirX, dirZ = dirZ });
    }

    public async Task UseSkillDouble(string roomCode)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var me)) return;
        if (me.IsDead || me.IsStunned || (me.SilenceEndTime.HasValue && me.SilenceEndTime.Value > DateTime.UtcNow)) return;
        if (me.SkillDoubleCooldown.HasValue && DateTime.UtcNow < me.SkillDoubleCooldown.Value) return;

        me.SkillDoubleCooldown = DateTime.UtcNow.AddSeconds(15);
        me.HasDoubleActive = true;
        await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "double", by = me.ConnectionId, username = me.Username });
    }

    public async Task UseSkillChaos(string roomCode)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var me)) return;
        if (me.IsDead || me.IsStunned || (me.SilenceEndTime.HasValue && me.SilenceEndTime.Value > DateTime.UtcNow)) return;
        if (me.SkillChaosCooldown.HasValue && DateTime.UtcNow < me.SkillChaosCooldown.Value) return;

        me.SkillChaosCooldown = DateTime.UtcNow.AddSeconds(10);
        var affected = new List<string>();
        foreach (var o in game.Players.Values)
        {
            if (o.ConnectionId == me.ConnectionId || o.IsDead || o.HasQuestionShield || (o.InvulnerableEndTime.HasValue && o.InvulnerableEndTime.Value > DateTime.UtcNow)) continue;
            float dx = o.X - me.X, dz = o.Z - me.Z;
            float dist = MathF.Sqrt(dx * dx + dz * dz);
            if (dist < 20f)
            {
                o.ChaosEndTime = DateTime.UtcNow.AddSeconds(3);
                affected.Add(o.ConnectionId);
            }
        }
        await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "chaos", by = me.ConnectionId, username = me.Username, targets = affected });
    }

    public async Task UseSkillSilence(string roomCode, float dirX, float dirZ)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var me)) return;
        if (me.IsDead || me.IsStunned || (me.SilenceEndTime.HasValue && me.SilenceEndTime.Value > DateTime.UtcNow)) return;
        if (me.SkillSilenceCooldown.HasValue && DateTime.UtcNow < me.SkillSilenceCooldown.Value) return;

        me.SkillSilenceCooldown = DateTime.UtcNow.AddSeconds(12);
        float len = MathF.Sqrt(dirX * dirX + dirZ * dirZ);
        if (len > 0) { dirX /= len; dirZ /= len; }

        PlayerState? hitPlayer = null;
        for (float d = 5; d < 80; d += 3)
        {
            float px = me.X + dirX * d, pz = me.Z + dirZ * d;
            foreach (var o in game.Players.Values)
            {
                if (o.ConnectionId == me.ConnectionId || o.IsDead || o.HasQuestionShield || (o.InvulnerableEndTime.HasValue && o.InvulnerableEndTime.Value > DateTime.UtcNow)) continue;
                if ((o.X - px) * (o.X - px) + (o.Z - pz) * (o.Z - pz) < 36f)
                {
                    hitPlayer = o;
                    break;
                }
            }
            if (hitPlayer != null) break;
        }

        if (hitPlayer != null)
        {
            hitPlayer.SilenceEndTime = DateTime.UtcNow.AddSeconds(4);
            await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "silence", by = me.ConnectionId, username = me.Username, target = hitPlayer.ConnectionId, targetName = hitPlayer.Username });
        }
        else
        {
            await Clients.Caller.SendAsync("SkillUsed", new { type = "silence_miss", by = me.ConnectionId, username = me.Username });
        }
    }

    /// <summary>
    /// Player walks into a knowledge zone. Server validates proximity and locks it.
    /// Uses in-memory question pool (no DB call needed).
    /// </summary>
    public async Task ClaimQuestion(string roomCode, int zoneId)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var player)) return;
        if (player.IsDead || player.IsAnsweringQuestion) return;
        if (!game.KnowledgeZones.TryGetValue(zoneId, out var zone)) return;

        // Zone must be active
        if (!zone.IsActive)
        {
            await Clients.Caller.SendAsync("AnswerResult", new {
                success = false, correct = false,
                message = "Câu hỏi đã bị người khác trả lời!"
            });
            return;
        }

        // Proximity check (must be within 10 units)
        float dx = player.X - zone.X;
        float dz = player.Z - zone.Z;
        if (dx * dx + dz * dz > 100f) return;

        // Player is now answering
        player.IsAnsweringQuestion = true;
        player.HasQuestionShield = true;
        player.ShieldEndTime = DateTime.UtcNow.AddSeconds(25);

        // Serve question from in-memory pool (NO DB call)
        if (!game.QuestionPool.TryGetValue(zone.QuestionId, out var questionData))
        {
            player.IsAnsweringQuestion = false;
            player.HasQuestionShield = false;
            return;
        }

        var optionsToSend = questionData.Options.Select(o => new { id = o.OptionId, text = o.Text }).ToList();

        await Clients.Caller.SendAsync("QuestionReceived", new
        {
            zoneId = zone.ZoneId,
            questionId = questionData.QuestionId,
            content = questionData.Content,
            difficulty = questionData.Difficulty,
            timeLimit = questionData.TimeLimit,
            topicName = questionData.TopicName,
            options = optionsToSend
        });
    }

    /// <summary>
    /// Player submits answer. Server validates from in-memory pool.
    /// Zone is consumed and disappears for ALL players.
    /// </summary>
    public async Task SubmitAnswer(string roomCode, int zoneId, int optionId)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null) return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var player)) return;
        if (!game.KnowledgeZones.TryGetValue(zoneId, out var zone)) return;

        bool isAlreadyAnswered = false;
        bool isAlreadyAnsweredByMe = false;
        bool isCorrect = false;
        bool wasDouble = false;
        int scoreGain = 0;
        int hpLost = 0;
        int comboCount = 0;
        int multiplier = 1;
        bool playerDied = false;
        string explanation = "";
        string zoneType = "Normal";
        bool isTrap = false;
        string? lootReward = null;

        lock (zone)
        {
            if (!zone.IsActive)
            {
                isAlreadyAnswered = true;
            }
            else
            {
                string answerKey = $"{Context.ConnectionId}_{zone.QuestionId}";
                if (!game.AnsweredQuestions.TryAdd(answerKey, true))
                {
                    isAlreadyAnsweredByMe = true;
                }
                else
                {
                    if (game.QuestionPool.TryGetValue(zone.QuestionId, out var questionData))
                    {
                        zoneType = zone.Type;
                        isTrap = zone.IsTrap;
                        lootReward = zone.LootReward;

                        explanation = questionData.Explanation;
                        var selectedOption = questionData.Options.FirstOrDefault(o => o.OptionId == optionId);
                        isCorrect = selectedOption?.IsCorrect ?? false;

                        wasDouble = player.HasDoubleActive;
                        player.HasDoubleActive = false; // consume it

                        if (isCorrect)
                        {
                            player.TotalCorrectAnswers++;
                            player.Combo++;
                            comboCount = player.Combo;
                            if (player.Combo > player.LongestCombo) player.LongestCombo = player.Combo;
                            multiplier = comboCount >= 5 ? 4 : (comboCount >= 3 ? 3 : (comboCount >= 2 ? 2 : 1));
                            
                            int baseS = questionData.BaseScore;
                            if (zone.Type == "Boss") baseS *= 5; // Boss zone = 5x score!
                            scoreGain = baseS * multiplier;

                            if (wasDouble) scoreGain *= 2; // DOUBLE REWARD

                            player.Score += scoreGain;
                            player.HP = Math.Min(player.HP + 20, player.MaxHP);
                            player.Ammo = Math.Min(player.Ammo + 2, 15);

                            // Apply Loot Reward
                            if (zone.Type == "LootBox" && !string.IsNullOrEmpty(zone.LootReward))
                            {
                                player.ActiveBuff = zone.LootReward;
                                player.BuffEndTime = DateTime.UtcNow.AddSeconds(15);
                                if (zone.LootReward == "Heal") player.HP = player.MaxHP;
                                else if (zone.LootReward == "Ammo") player.Ammo = 15;
                                else if (zone.LootReward == "Scorex2") scoreGain *= 2; // Extra double
                            }

                            // Consume the zone!
                            zone.IsActive = false;
                            zone.RespawnTime = DateTime.UtcNow.AddSeconds(25);
                            game.ActiveQuestionIds.TryRemove(zone.QuestionId, out _);
                        }
                        else
                        {
                            hpLost = questionData.PenaltyHP;
                            int scorePenalty = 30;

                            if (zone.IsTrap) 
                            {
                                hpLost *= 2; // Trap doubles damage
                                player.IsStunned = true;
                                player.StunEndTime = DateTime.UtcNow.AddSeconds(3); // Stun for 3s
                            }

                            if (wasDouble)
                            {
                                hpLost *= 2; // DOUBLE PENALTY
                                scorePenalty = questionData.BaseScore * 2;
                            }

                            player.TotalWrongAnswers++;
                            player.DamageTaken += hpLost;
                            player.HP -= hpLost;
                            player.Combo = 0;
                            player.Score = Math.Max(0, player.Score - scorePenalty);

                            if (player.HP <= 0)
                            {
                                player.HP = 0;
                                player.IsDead = true;
                                player.RespawnTime = DateTime.UtcNow.AddSeconds(8);
                                playerDied = true;
                            }

                            // Consume the zone ALWAYS! (regardless of correct/wrong)
                            zone.IsActive = false;
                            zone.RespawnTime = DateTime.UtcNow.AddSeconds(25);
                            game.ActiveQuestionIds.TryRemove(zone.QuestionId, out _);
                        }
                    }
                }
            }

            player.IsAnsweringQuestion = false;
            player.HasQuestionShield = false;
            player.ShieldEndTime = null;
        }

        if (isAlreadyAnswered)
        {
            await Clients.Caller.SendAsync("AnswerResult", new {
                success = false, correct = false, message = "Câu hỏi đã bị người khác trả lời nhanh hơn!"
            });
            return;
        }

        if (isAlreadyAnsweredByMe)
        {
            await Clients.Caller.SendAsync("AnswerResult", new {
                success = false, correct = false, message = "Bạn đã trả lời câu này rồi!"
            });
            return;
        }

        if (isCorrect)
        {
            string comboMsg = comboCount > 1 ? $"Chính xác! Combo x{multiplier} 🔥" : "Chính xác! 🎉";
            if (wasDouble) comboMsg = "🌟 " + comboMsg + " [DOUBLE REWARD!]";
            if (zoneType == "Boss") comboMsg += " [BOSS DEFEATED: x5 SCORE!]";
            if (zoneType == "LootBox" && !string.IsNullOrEmpty(lootReward)) comboMsg += $" [LOOT: {lootReward}]";

            await Clients.Caller.SendAsync("AnswerResult", new {
                success = true, correct = true,
                scoreGained = scoreGain,
                explanation = explanation,
                message = comboMsg,
                wasDouble = wasDouble
            });
        }
        else
        {
            string msg = "Sai rồi! 😢";
            if (wasDouble) msg = "💀 LỖ NẶNG! " + msg + " [DOUBLE PENALTY!]";
            if (isTrap) msg += " [TRAP ACTIVATED: STUNNED & x2 DAMAGE!]";

            await Clients.Caller.SendAsync("AnswerResult", new {
                success = true, correct = false,
                hpLost = hpLost,
                explanation = explanation,
                message = msg,
                wasDouble = wasDouble
            });
        }
        player.HasQuestionShield = false;
        player.ShieldEndTime = null;
    }

    private void ReleaseZone(KnowledgeZoneState zone, PlayerState player, GameState game)
    {
        zone.ClaimedByConnectionId = null;
        zone.ClaimExpiry = null;
        player.IsAnsweringQuestion = false;
        player.HasQuestionShield = false;
        player.ShieldEndTime = null;
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        foreach (var gameKvp in _gameEngine.GetAllGames())
        {
            var game = gameKvp.Value;
            if (game.Players.TryRemove(Context.ConnectionId, out _))
            {
                foreach (var kz in game.KnowledgeZones.Values)
                {
                    if (kz.ClaimedByConnectionId == Context.ConnectionId)
                    {
                        kz.ClaimedByConnectionId = null;
                        kz.ClaimExpiry = null;
                    }
                }
                await Clients.Group(game.RoomCode).SendAsync("PlayerLeft", Context.ConnectionId);
                await Clients.Group(game.RoomCode).SendAsync("LobbyState", game.Players.Values.ToList());
                break;
            }
        }
        await base.OnDisconnectedAsync(exception);
    }
}
