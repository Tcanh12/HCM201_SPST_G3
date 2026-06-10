using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using AnimalTheoryRoyale.Models.Realtime;
using AnimalTheoryRoyale.Services;

namespace AnimalTheoryRoyale.Hubs;


public class GameHub : Hub
{
    private readonly GameEngine _gameEngine;
    private readonly ILogger<GameHub> _logger;

    public GameHub(GameEngine gameEngine, ILogger<GameHub> logger)
    {
        _gameEngine = gameEngine;
        _logger = logger;
    }

    public async Task JoinRoomAsHost(string roomCode)
    {
        roomCode = roomCode?.Trim().ToUpper() ?? "";
        var game = _gameEngine.GetOrCreateGame(roomCode, 1, 600);
        await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
        game.HostConnectionId = Context.ConnectionId;
        await Clients.Caller.SendAsync("LobbyState", game.Players.Values.Select(p => new {
            connectionId = p.ConnectionId, username = p.Username, characterId = p.CharacterId
        }).ToArray());
    }

    public async Task JoinRoomAsPlayer(string roomCode, string username, int characterId)
    {
        roomCode = roomCode?.Trim().ToUpper() ?? "";
        var game = _gameEngine.GetOrCreateGame(roomCode, 1, 600);
        bool isReconnecting = game.Players.Values.Any(p => p.Username == username);
        
        if (game.Status == "Playing" && !isReconnecting)
        {
            await Clients.Caller.SendAsync("JoinRejected", "Trận đấu đã bắt đầu. Vui lòng xin phép chủ phòng để tham gia.");
            return;
        }
        await PerformJoin(game, roomCode, username, characterId, Context.ConnectionId);
    }

    public async Task RequestJoinInProgressRoom(string roomCode, string username, int characterId)
    {
        roomCode = roomCode?.Trim().ToUpper() ?? "";
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        
        var request = new PendingJoinRequest 
        {
            ConnectionId = Context.ConnectionId,
            Username = username,
            CharacterId = characterId,
            RequestTime = DateTime.UtcNow
        };
        game.PendingJoins[Context.ConnectionId] = request;
        
        await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);
        await Clients.Client(game.HostConnectionId).SendAsync("LateJoinRequested", request);
    }

    public async Task ApproveLateJoin(string roomCode, string connectionId)
    {
        roomCode = roomCode?.Trim().ToUpper() ?? "";
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || Context.ConnectionId != game.HostConnectionId) return;

        if (game.PendingJoins.TryRemove(connectionId, out var req))
        {
            await PerformJoin(game, roomCode, req.Username, req.CharacterId, connectionId);
            if (game.Players.TryGetValue(connectionId, out var p))
            {
                p.Lives = 3;
                p.Score = 0;
            }
            await Clients.Client(connectionId).SendAsync("LateJoinApproved", game);
            await Clients.Client(game.HostConnectionId).SendAsync("LatePlayerJoined", connectionId);
        }
    }

    public async Task RejectLateJoin(string roomCode, string connectionId)
    {
        roomCode = roomCode?.Trim().ToUpper() ?? "";
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || Context.ConnectionId != game.HostConnectionId) return;

        if (game.PendingJoins.TryRemove(connectionId, out _))
        {
            await Groups.RemoveFromGroupAsync(connectionId, roomCode);
            await Clients.Client(connectionId).SendAsync("LateJoinRejected");
        }
    }

    private async Task PerformJoin(GameState game, string roomCode, string username, int characterId, string connectionId)
    {
        await Groups.AddToGroupAsync(connectionId, roomCode);
        PlayerState player;

        // Resume existing player session if they reconnect
        var existingPlayer = game.Players.Values.FirstOrDefault(p => p.Username == username);
        if (existingPlayer != null)
        {
            // If they are taking over an existing character, just update connection mapping
            string oldConnectionId = existingPlayer.ConnectionId;
            existingPlayer.ConnectionId = connectionId;
            existingPlayer.CharacterId = characterId; // Update character selection just in case they were in lobby
            if (oldConnectionId != connectionId)
            {
                game.Players.TryRemove(oldConnectionId, out _);
                game.Players.TryAdd(connectionId, existingPlayer);
            }
            
            player = existingPlayer;
            await Clients.Caller.SendAsync("JoinSuccess", existingPlayer);
        }
        else
        {
            int maxHp = characterId switch { 1 => 200, 2 => 80, 3 => 100, 4 => 150, _ => 100 };
            int ammo = characterId switch { 1 => 15, 2 => 6, 3 => 10, 4 => 8, _ => 10 };
            var (spawnX, spawnZ) = _gameEngine.GetRandomSpawnPosition();

            player = new PlayerState
            {
                ConnectionId = connectionId,
                Username = username,
                CharacterId = characterId,
                X = spawnX, Y = 0, Z = spawnZ,
                HP = maxHp, MaxHP = maxHp, Ammo = ammo, Lives = 3
            };

            game.Players.TryAdd(connectionId, player);
            await Clients.Caller.SendAsync("JoinSuccess", player);
        }
        await Clients.Group(roomCode).SendAsync("PlayerJoined", new {
            connectionId = player.ConnectionId, username = player.Username, characterId = player.CharacterId
        });
        await Clients.Group(roomCode).SendAsync("LobbyState", game.Players.Values.Select(p => new {
            connectionId = p.ConnectionId, username = p.Username, characterId = p.CharacterId
        }).ToArray());
    }

    public async Task<object> HostStartGame(string roomCode, int questionCount, string cameraMode, string mapId, bool dynamicLighting)
    {

        try
        {
            _logger.LogInformation("HostStartGame called. RoomCode = {RoomCode}", roomCode);
            
            if (string.IsNullOrWhiteSpace(roomCode))
            {
                return new { success = false, message = "Room code is empty.", code = "ROOM_CODE_EMPTY" };
            }

            var normalizedRoomCode = roomCode.Trim().ToUpperInvariant();
            var game = _gameEngine.GetGame(normalizedRoomCode);
            
            if (game == null)
            {
                return new { success = false, message = $"Game not found for room {normalizedRoomCode}.", code = "GAME_NOT_FOUND" };
            }

            if (game.Players.Count == 0)
            {
                return new { success = false, message = "Cannot start game because there are no players in the room.", code = "NO_PLAYERS", playerCount = 0 };
            }

            _logger.LogInformation("Players count: {Count}", game.Players.Count);

            _logger.LogInformation(
                "Initializing knowledge zones. RoomCode={RoomCode}, QuestionCount={QuestionCount}",
                normalizedRoomCode,
                questionCount
            );

            await _gameEngine.InitializeKnowledgeZonesFromDB(game, questionCount);

            _logger.LogInformation(
                "Knowledge zones initialized. RoomCode={RoomCode}, Zones={ZoneCount}, Questions={QuestionPoolCount}",
                normalizedRoomCode,
                game.KnowledgeZones.Count,
                game.QuestionPool.Count
            );

            if (game.QuestionPool.Count == 0 || game.KnowledgeZones.Count == 0)
            {
                return new
                {
                    success = false,
                    message = "Không thể bắt đầu vì ngân hàng câu hỏi hoặc cột tri thức đang trống.",
                    code = "QUESTION_POOL_EMPTY",
                    questionPoolCount = game.QuestionPool.Count,
                    knowledgeZoneCount = game.KnowledgeZones.Count
                };
            }

            _gameEngine.InitializeTraps(game, 15); // Add 15 random traps

            game.Status = "Playing";
            game.StartTime = DateTime.UtcNow;
            game.CameraMode = cameraMode;
            game.MapId = mapId ?? "academy";
            game.DynamicLighting = dynamicLighting;
            game.SafeZone.NextShrinkTime = DateTime.UtcNow.AddSeconds(60);

            await Clients.Group(normalizedRoomCode).SendAsync("GameStarted", new
            {
                roomCode = normalizedRoomCode,
                status = "Playing",
                startedAt = game.StartTime,
                mapId = game.MapId,
                dynamicLighting = game.DynamicLighting,
                cameraMode = game.CameraMode,
                questionCount = questionCount
            });

            _logger.LogInformation("GameStarted sent to group {RoomCode}", normalizedRoomCode);
            
            return new { success = true, roomCode = normalizedRoomCode, status = "Playing" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "HostStartGame failed for room {RoomCode}", roomCode);

            return new
            {
                success = false,
                message = ex.Message,
                detail = ex.InnerException?.Message,
                code = "HOST_START_GAME_FAILED"
            };
        }
    }

    public Task HostEndGame(string roomCode)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game != null && game.Status == "Playing")
        {
            // Force the game engine to end the game immediately on the next tick
            game.Duration = 0;
        }
        return Task.CompletedTask;
    }

    public Task PlayerMove(string roomCode, float x, float y, float z, float rotationY)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null) return Task.CompletedTask;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var player)) return Task.CompletedTask;
        if (player.IsDead || player.IsEliminated || player.IsAnsweringQuestion || player.IsStunned || player.IsDizzy) return Task.CompletedTask;
        
        if (!Backend.Models.MapObstacles.IsPositionBlocked(x, z, 1.0f))
        {
            player.X = x; player.Z = z;
        }
        else if (!Backend.Models.MapObstacles.IsPositionBlocked(x, player.Z, 1.0f))
        {
            player.X = x;
        }
        else if (!Backend.Models.MapObstacles.IsPositionBlocked(player.X, z, 1.0f))
        {
            player.Z = z;
        }
        
        player.Y = y; 
        player.RotationY = rotationY;
        return Task.CompletedTask;
    }

    public async Task ShootProjectile(string roomCode, float dirX, float dirZ)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var player)) return;
        if (player.IsDead || player.IsEliminated || player.HasQuestionShield || player.IsStunned || player.IsDizzy || player.Ammo <= 0) return;

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
        if (me.IsDead || me.IsEliminated || me.IsStunned || me.IsDizzy) return;
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
            if (dist < 30f && dist > 0.1f)
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
        roomCode = roomCode?.Trim().ToUpper() ?? "";
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var me)) return;
        if (me.IsDead || me.IsEliminated || me.IsStunned || me.IsDizzy) return;
        if (me.SkillDoubleCooldown.HasValue && DateTime.UtcNow < me.SkillDoubleCooldown.Value) return;

        me.SkillDoubleCooldown = DateTime.UtcNow.AddSeconds(15);
        me.HasDoubleActive = true;
        await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "double", by = me.ConnectionId, username = me.Username });
    }

    public async Task UseSkillDizzySpin(string roomCode)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var me)) return;
        if (me.IsDead || me.IsEliminated || me.IsStunned || me.IsDizzy) return;
        if (me.SkillDizzyCooldown.HasValue && DateTime.UtcNow < me.SkillDizzyCooldown.Value) return;

        me.SkillDizzyCooldown = DateTime.UtcNow.AddSeconds(15);
        var affected = new List<string>();
        foreach (var o in game.Players.Values)
        {
            if (o.ConnectionId == me.ConnectionId || o.IsDead || o.IsEliminated || o.HasQuestionShield || (o.InvulnerableEndTime.HasValue && o.InvulnerableEndTime.Value > DateTime.UtcNow)) continue;
            float dx = o.X - me.X, dz = o.Z - me.Z;
            float dist = MathF.Sqrt(dx * dx + dz * dz);
            if (dist < 25f)
            {
                o.IsDizzy = true;
                o.DizzyEndTime = DateTime.UtcNow.AddSeconds(5);
                affected.Add(o.ConnectionId);
            }
        }
        await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "dizzyspin", by = me.ConnectionId, username = me.Username, targets = affected });
    }

    public async Task UseSkillUltimate(string roomCode, float dirX, float dirZ)
    {
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var me)) return;
        if (me.IsDead || me.IsEliminated || me.IsStunned || me.IsDizzy) return;
        if (me.UltimateCooldown.HasValue && DateTime.UtcNow < me.UltimateCooldown.Value) return;

        float len = MathF.Sqrt(dirX * dirX + dirZ * dirZ);
        if (len > 0) { dirX /= len; dirZ /= len; }

        int cd = 25;
        if (me.CharacterId == 1) // Voi: Earth Stomp
        {
            cd = 25;
            var affected = new List<string>();
            foreach (var o in game.Players.Values)
            {
                if (o.ConnectionId == me.ConnectionId || o.IsDead || o.IsEliminated || o.HasQuestionShield || (o.InvulnerableEndTime.HasValue && o.InvulnerableEndTime.Value > DateTime.UtcNow)) continue;
                float dx = o.X - me.X, dz = o.Z - me.Z;
                if (dx * dx + dz * dz < 900f) // radius 30
                {
                    o.HP -= 30;
                    o.DamageTaken += 30;
                    o.IsStunned = true;
                    o.StunEndTime = DateTime.UtcNow.AddSeconds(2);
                    affected.Add(o.ConnectionId);
                }
            }
            await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "ult_voi", by = me.ConnectionId, username = me.Username, targets = affected });
        }
        else if (me.CharacterId == 2) // Thỏ: Blink Dash
        {
            cd = 22;
            me.X += dirX * 40;
            me.Z += dirZ * 40;
            me.InvulnerableEndTime = DateTime.UtcNow.AddSeconds(0.5);
            await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "ult_tho", by = me.ConnectionId, username = me.Username, x = me.X, z = me.Z });
        }
        else if (me.CharacterId == 3) // Cáo: Trick Trap
        {
            cd = 24;
            string trapId = Guid.NewGuid().ToString();
            game.Items.TryAdd(trapId, new ItemState { Id = trapId, Type = "TrickTrap", X = me.X, Z = me.Z, Value = 30, IsActive = true, RespawnTime = DateTime.UtcNow.AddSeconds(20), OwnerConnectionId = me.ConnectionId });
            await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "ult_cao", by = me.ConnectionId, username = me.Username, trapId = trapId });
        }
        else if (me.CharacterId == 4) // Rùa: Shell Shield
        {
            cd = 28;
            me.DamageReductionEndTime = DateTime.UtcNow.AddSeconds(5);
            await Clients.Group(roomCode).SendAsync("SkillUsed", new { type = "ult_rua", by = me.ConnectionId, username = me.Username });
        }

        me.UltimateCooldown = DateTime.UtcNow.AddSeconds(cd);
    }

    /// <summary>
    /// Player walks into a knowledge zone. Server validates proximity and locks it.
    /// Uses in-memory question pool (no DB call needed).
    /// </summary>
    public async Task ClaimQuestion(string roomCode, int zoneId)
    {
        roomCode = roomCode?.Trim().ToUpper() ?? "";
        var game = _gameEngine.GetGame(roomCode);
        if (game == null || game.Status != "Playing") return;
        if (!game.Players.TryGetValue(Context.ConnectionId, out var player)) return;
        if (player.IsDead || player.IsEliminated || player.IsAnsweringQuestion || player.IsDizzy || player.IsStunned) return;
        if (player.NextQuestionTime.HasValue && DateTime.UtcNow < player.NextQuestionTime.Value) return;
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

        // Proximity check (must be within 16 units to account for lag)
        float dx = player.X - zone.X;
        float dz = player.Z - zone.Z;
        if (dx * dx + dz * dz > 256f) return;

        // Player is now answering
        player.IsAnsweringQuestion = true;
        player.HasQuestionShield = true;
        player.ShieldEndTime = DateTime.UtcNow.AddSeconds(25);

        // Find a question the player hasn't answered yet
        int chosenQuestionId = zone.QuestionId;
        string claimKey = $"{Context.ConnectionId}_{chosenQuestionId}";

        if (game.AnsweredQuestions.ContainsKey(claimKey))
        {
            var rng = new Random();
            var unansweredIds = game.QuestionPool.Keys
                .Where(id => !game.AnsweredQuestions.ContainsKey($"{Context.ConnectionId}_{id}"))
                .ToList();

            if (unansweredIds.Count > 0)
            {
                chosenQuestionId = unansweredIds[rng.Next(unansweredIds.Count)];
            }
        }
        
        player.CurrentQuestionId = chosenQuestionId;

        // Serve question from in-memory pool (NO DB call)
        if (!game.QuestionPool.TryGetValue(chosenQuestionId, out var questionData))
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
            type = questionData.Type,
            payloadJson = questionData.ChallengePayloadJson,
            options = optionsToSend
        });
    }

    /// <summary>
    /// Player submits answer. Server validates from in-memory pool.
    /// Zone is consumed and disappears for ALL players.
    /// </summary>
    public async Task SubmitAnswer(string roomCode, int zoneId, int optionId)
    {
        roomCode = roomCode?.Trim().ToUpper() ?? "";
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
                int currentQId = player.CurrentQuestionId ?? zone.QuestionId;
                string answerKey = $"{Context.ConnectionId}_{currentQId}";
                if (!game.AnsweredQuestions.TryAdd(answerKey, true))
                {
                    isAlreadyAnsweredByMe = true;
                }
                else
                {
                    if (game.QuestionPool.TryGetValue(currentQId, out var questionData))
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
                                player.Lives--;
                                if (player.Lives > 0)
                                    player.RespawnTime = DateTime.UtcNow.AddSeconds(8);
                                else
                                    player.IsEliminated = true;
                            }

                            // Consume the zone ALWAYS! (regardless of correct/wrong)
                            zone.IsActive = false;
                            zone.RespawnTime = DateTime.UtcNow.AddSeconds(25);
                            game.ActiveQuestionIds.TryRemove(zone.QuestionId, out _);
                        }
                    }
                }
            }

            player.NextQuestionTime = DateTime.UtcNow.AddSeconds(4);
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
            
            if (game.Status == "Waiting")
            {
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
                    await Clients.Group(game.RoomCode).SendAsync("LobbyState", game.Players.Values.Select(p => new {
                        connectionId = p.ConnectionId, username = p.Username, characterId = p.CharacterId
                    }).ToArray());
                    break;
                }
            }
            else
            {
                // Game is playing, DO NOT remove the player from the game state!
                // This allows them to reconnect and resume their character.
                foreach (var kz in game.KnowledgeZones.Values)
                {
                    if (kz.ClaimedByConnectionId == Context.ConnectionId)
                    {
                        kz.ClaimedByConnectionId = null;
                        kz.ClaimExpiry = null;
                    }
                }
            }
        }
        await base.OnDisconnectedAsync(exception);
    }
}
