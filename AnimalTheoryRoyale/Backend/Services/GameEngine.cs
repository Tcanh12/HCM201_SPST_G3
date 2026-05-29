using System.Collections.Concurrent;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using AnimalTheoryRoyale.Models.Realtime;
using AnimalTheoryRoyale.Data;
using AnimalTheoryRoyale.Hubs;

namespace AnimalTheoryRoyale.Services;

public class GameEngine : BackgroundService
{
    private readonly IHubContext<GameHub> _hubContext;
    private readonly ILogger<GameEngine> _logger;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ConcurrentDictionary<string, GameState> _activeGames = new();

    private const float MAP_RADIUS = 500f;
    private const float SPAWN_RADIUS = 350f;
    // REBALANCED: (wait_seconds_before_shrink, target_radius, damage_per_second)
    // Total game ~10 min. Each phase: WAIT (no shrink) → SHRINK (over 20s) → next WAIT
    private static readonly (int delay, float radius, float dps)[] ShrinkPhases = new[]
    {
        (90,  400f,  2f),   // Phase 1: wait 90s, shrink to 400 (gentle)
        (75,  300f,  3f),   // Phase 2: wait 75s, shrink to 300
        (60,  200f,  5f),   // Phase 3: wait 60s, shrink to 200
        (45,  120f,  8f),   // Phase 4: wait 45s, shrink to 120
        (30,   60f, 12f),   // Phase 5: wait 30s, shrink to 60 (intense)
        (20,   25f, 20f),   // Phase 6: final, shrink to 25 (endgame)
    };

    public GameEngine(IHubContext<GameHub> hubContext, ILogger<GameEngine> logger, IServiceScopeFactory scopeFactory)
    {
        _hubContext = hubContext;
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    public GameState GetOrCreateGame(string roomCode, int roomId, int duration)
    {
        return _activeGames.GetOrAdd(roomCode, _ =>
        {
            var game = new GameState
            {
                RoomId = roomId,
                RoomCode = roomCode,
                Duration = duration,
                Status = "Waiting"
            };
            game.SafeZone = new SafeZoneState
            {
                Radius = MAP_RADIUS,
                TargetRadius = MAP_RADIUS,
                NextShrinkTime = DateTime.UtcNow.AddSeconds(ShrinkPhases[0].delay),
                Phase = 0
            };
            return game;
        });
    }

    /// <summary>
    /// Load questions from DB and initialize knowledge zones with UNIQUE questions.
    /// Called when game starts (not when room is created).
    /// </summary>
    public async Task InitializeKnowledgeZonesFromDB(GameState game, int targetZoneCount = 20)
    {
        using var scope = _scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        var allQuestions = await db.Questions
            .Include(q => q.Options)
            .Include(q => q.Topic)
            .AsNoTracking()
            .ToListAsync();

        if (allQuestions.Count == 0)
        {
            _logger.LogWarning("No questions found in DB to spawn.");
            return;
        }

        var rng = new Random();
        var shuffled = allQuestions.OrderBy(x => rng.Next()).ToList();

        // Cache all question data in memory for this game
        game.QuestionPool.Clear();
        foreach (var q in allQuestions)
        {
            game.QuestionPool.TryAdd(q.Id, new QuestionData
            {
                QuestionId = q.Id,
                TopicName = q.Topic?.Name ?? "Chung",
                Content = q.Content,
                Explanation = q.Explanation ?? "",
                Difficulty = q.Difficulty,
                BaseScore = q.BaseScore,
                PenaltyHP = q.PenaltyHP,
                TimeLimit = q.TimeLimit,
                Options = q.Options.Select(o => new QuestionOptionData
                {
                    OptionId = o.Id,
                    Text = o.Text,
                    IsCorrect = o.IsCorrect
                }).ToList()
            });
        }

        // Assign UNIQUE questions to zones (no duplicates)
        var usedQuestionIds = new HashSet<int>();

        for (int i = 0; i < targetZoneCount; i++)
        {
            // Pick next unused question from shuffled list
            int questionId = -1;
            foreach (var q in shuffled)
            {
                if (!usedQuestionIds.Contains(q.Id))
                {
                    questionId = q.Id;
                    usedQuestionIds.Add(q.Id);
                    break;
                }
            }

            if (questionId == -1)
            {
                // All questions used, start over from shuffled
                usedQuestionIds.Clear();
                questionId = shuffled[0].Id;
                usedQuestionIds.Add(questionId);
            }

            // Generate a random position inside a 300x300 area
            float rx = (float)(rng.NextDouble() * 600 - 300);
            float rz = (float)(rng.NextDouble() * 600 - 300);

            var topicName = game.QuestionPool.TryGetValue(questionId, out var qd) ? qd.TopicName : "Chung";

            game.KnowledgeZones.TryAdd(i, new KnowledgeZoneState
            {
                ZoneId = i,
                X = rx,
                Z = rz,
                QuestionId = questionId,
                TopicName = topicName,
                IsActive = true,
                RespawnTime = DateTime.UtcNow.AddSeconds(9999)
            });
        }

        // Track which question IDs are currently on the map
        game.ActiveQuestionIds.Clear();
        foreach (var z in game.KnowledgeZones.Values)
        {
            game.ActiveQuestionIds.TryAdd(z.QuestionId, true);
        }

        _logger.LogInformation("Initialized {Count} zones with unique questions from pool of {Total}",
            targetZoneCount, allQuestions.Count);
    }

    /// <summary>
    /// Pick a random question that is NOT currently active on any zone.
    /// </summary>
    private int PickUnusedQuestion(GameState game)
    {
        var rng = new Random();
        var candidates = game.QuestionPool.Keys
            .Where(id => !game.ActiveQuestionIds.ContainsKey(id))
            .ToList();

        if (candidates.Count == 0)
        {
            // All questions are on the map or used; just pick any random one
            var allIds = game.QuestionPool.Keys.ToList();
            return allIds[rng.Next(allIds.Count)];
        }

        return candidates[rng.Next(candidates.Count)];
    }

    public GameState? GetGame(string roomCode)
    {
        _activeGames.TryGetValue(roomCode, out var game);
        return game;
    }

    public ConcurrentDictionary<string, GameState> GetAllGames() => _activeGames;

    public (float x, float z) GetRandomSpawnPosition()
    {
        var rng = new Random();
        float angle = (float)(rng.NextDouble() * Math.PI * 2);
        float dist = (float)(rng.NextDouble() * SPAWN_RADIUS * 0.6f + SPAWN_RADIUS * 0.2f);
        return (MathF.Cos(angle) * dist, MathF.Sin(angle) * dist);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Game Engine Started. Running at 10 ticks/second.");
        var tickRate = TimeSpan.FromMilliseconds(100);
        using var timer = new PeriodicTimer(tickRate);

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try { await UpdateGamesAsync(); }
            catch (Exception ex) { _logger.LogError(ex, "Error in Game Loop"); }
        }
    }

    private async Task UpdateGamesAsync()
    {
        var now = DateTime.UtcNow;

        foreach (var gameKvp in _activeGames)
        {
            var game = gameKvp.Value;
            if (game.Status != "Playing") continue;

            float dt = 0.1f;

            UpdateSafeZone(game, now, dt);
            ApplySafeZoneDamage(game, now, dt);
            UpdateProjectiles(game, now, dt);
            UpdateRespawns(game, now);
            UpdateStuns(game, now);
            UpdateKnowledgeZones(game, now);
            UpdateQuestionClaims(game, now);
            UpdateItems(game, now);

            // Check game end
            if (game.StartTime.HasValue && (now - game.StartTime.Value).TotalSeconds >= game.Duration)
            {
                game.Status = "Ended";
                
                // Finalize stats & ranking
                var sortedPlayers = game.Players.Values.OrderByDescending(p => p.Score).ToList();
                for (int i = 0; i < sortedPlayers.Count; i++) 
                {
                    sortedPlayers[i].FinalRank = i + 1;
                    if (i == 0 && sortedPlayers[i].Score > 0) sortedPlayers[i].IsMVP = true;
                    // Approximate survival time if we haven't tracked respawns perfectly
                    sortedPlayers[i].SurvivalDuration = game.Duration;
                }

                await _hubContext.Clients.Group(game.RoomCode).SendAsync("GameEnded",
                    sortedPlayers.Select(p => new {
                        p.Username, p.CharacterId, p.Score, p.Combo,
                        p.TotalCorrectAnswers, p.TotalWrongAnswers, p.LongestCombo,
                        p.DamageTaken, p.SurvivalDuration, p.FinalRank, p.IsMVP
                    }));
                
                // Allow it to remain in Ended state for a bit before cleanup
                continue;
            }

            // Broadcast snapshot
            var elapsed = game.StartTime.HasValue ? (now - game.StartTime.Value).TotalSeconds : 0;
            var remaining = Math.Max(0, game.Duration - elapsed);

            var snapshot = new
            {
                status = game.Status,
                timeRemaining = (int)remaining,
                hostConnectionId = game.HostConnectionId,
                players = game.Players.Values.Select(p => new {
                    id = p.ConnectionId, p.Username, p.CharacterId,
                    p.X, p.Y, p.Z, p.RotationY,
                    p.HP, p.MaxHP, p.Score, p.Combo, p.Ammo,
                    p.IsDead, p.HasQuestionShield, p.IsStunned,
                    isInvulnerable = p.InvulnerableEndTime.HasValue && p.InvulnerableEndTime.Value > now,
                    activeBuff = p.BuffEndTime.HasValue && p.BuffEndTime.Value > now ? p.ActiveBuff : null,
                    scanCD = 0, // removed
                    pushCD = p.SkillPushCooldown.HasValue ? Math.Max(0, (p.SkillPushCooldown.Value - now).TotalSeconds) : 0,
                    doubleCD = p.SkillDoubleCooldown.HasValue ? Math.Max(0, (p.SkillDoubleCooldown.Value - now).TotalSeconds) : 0,
                    chaosCD = p.SkillChaosCooldown.HasValue ? Math.Max(0, (p.SkillChaosCooldown.Value - now).TotalSeconds) : 0,
                    silenceCD = p.SkillSilenceCooldown.HasValue ? Math.Max(0, (p.SkillSilenceCooldown.Value - now).TotalSeconds) : 0,
                    hasDouble = p.HasDoubleActive,
                    isChaos = p.ChaosEndTime.HasValue && p.ChaosEndTime.Value > now,
                    isSilenced = p.SilenceEndTime.HasValue && p.SilenceEndTime.Value > now
                }),
                projectiles = game.Projectiles.Values.Where(p => p.IsActive).Select(p => new {
                    id = p.Id, p.X, p.Y, p.Z
                }),
                items = game.Items.Values.Where(i => i.IsActive).Select(i => new {
                    id = i.Id, type = i.Type, x = i.X, z = i.Z, value = i.Value
                }),
                safeZone = new {
                    game.SafeZone.CenterX, game.SafeZone.CenterZ,
                    game.SafeZone.Radius, game.SafeZone.TargetRadius,
                    game.SafeZone.Phase, game.SafeZone.IsShrinking,
                    nextShrinkIn = Math.Max(0, (game.SafeZone.NextShrinkTime - now).TotalSeconds)
                },
                knowledgeZones = game.KnowledgeZones.Values.Select(kz => new {
                    kz.ZoneId, kz.X, kz.Z, kz.IsActive, kz.TopicName,
                    kz.Type, kz.IsTrap,
                    isClaimed = kz.ClaimedByConnectionId != null
                })
            };

            await _hubContext.Clients.Group(game.RoomCode).SendAsync("GameStateUpdate", snapshot);
        }
    }

    private void UpdateSafeZone(GameState game, DateTime now, float dt)
    {
        var sz = game.SafeZone;
        if (sz.Phase < ShrinkPhases.Length && now >= sz.NextShrinkTime && !sz.IsShrinking)
        {
            var phase = ShrinkPhases[sz.Phase];
            sz.TargetRadius = phase.radius;
            sz.DamagePerSecond = phase.dps;
            sz.ShrinkSpeed = (sz.Radius - phase.radius) / 15f;
            sz.IsShrinking = true;
            var rng = new Random();
            sz.CenterX += rng.Next(-30, 30);
            sz.CenterZ += rng.Next(-30, 30);
        }
        if (sz.IsShrinking)
        {
            sz.Radius -= sz.ShrinkSpeed * dt;
            if (sz.Radius <= sz.TargetRadius)
            {
                sz.Radius = sz.TargetRadius;
                sz.IsShrinking = false;
                sz.Phase++;
                if (sz.Phase < ShrinkPhases.Length)
                    sz.NextShrinkTime = now.AddSeconds(ShrinkPhases[sz.Phase].delay);
            }
        }
    }

    private void UpdateStuns(GameState game, DateTime now)
    {
        foreach (var p in game.Players.Values)
        {
            if (p.IsStunned && p.StunEndTime.HasValue && now >= p.StunEndTime.Value)
            {
                p.IsStunned = false;
                p.StunEndTime = null;
            }
            if (p.ChaosEndTime.HasValue && now >= p.ChaosEndTime.Value) p.ChaosEndTime = null;
            if (p.SilenceEndTime.HasValue && now >= p.SilenceEndTime.Value) p.SilenceEndTime = null;
        }
    }

    private void UpdateItems(GameState game, DateTime now)
    {
        // 1. Spawning items if below limit (max 15 active)
        int activeItems = game.Items.Values.Count(i => i.IsActive);
        if (activeItems < 15)
        {
            var r = new Random();
            string[] types = { "HP", "Score", "Speed" };
            string type = types[r.Next(types.Length)];
            
            // Spawn within current safe zone
            float radius = game.SafeZone.Radius * 0.8f;
            float angle = (float)(r.NextDouble() * Math.PI * 2);
            float dist = (float)(r.NextDouble() * radius);
            float x = game.SafeZone.CenterX + (float)Math.Cos(angle) * dist;
            float z = game.SafeZone.CenterZ + (float)Math.Sin(angle) * dist;

            int val = 0;
            if (type == "HP") val = 30; // Heals 30 HP
            else if (type == "Score") val = 50; // 50 points

            string id = Guid.NewGuid().ToString();
            game.Items.TryAdd(id, new ItemState { Id = id, Type = type, X = x, Z = z, Value = val });
        }

        // 2. Pickup Logic
        foreach (var item in game.Items.Values)
        {
            if (!item.IsActive)
            {
                if (item.RespawnTime.HasValue && now >= item.RespawnTime.Value)
                {
                    game.Items.TryRemove(item.Id, out _); // clean up dead items
                }
                continue;
            }

            foreach (var p in game.Players.Values)
            {
                if (p.IsDead) continue;
                float dx = p.X - item.X;
                float dz = p.Z - item.Z;
                float distSq = dx * dx + dz * dz;

                if (distSq < 9.0f) // 3m pickup radius
                {
                    item.IsActive = false;
                    item.RespawnTime = now.AddSeconds(5); // Wait 5s before removal from dictionary

                    if (item.Type == "HP")
                    {
                        p.HP = Math.Min(p.MaxHP, p.HP + item.Value);
                        _hubContext.Clients.Client(p.ConnectionId).SendAsync("AnswerResult", new { success = true, correct = true, message = $"Nhặt Hồi Máu! +{item.Value} HP" });
                    }
                    else if (item.Type == "Score")
                    {
                        p.Score += item.Value;
                        _hubContext.Clients.Client(p.ConnectionId).SendAsync("AnswerResult", new { success = true, correct = true, message = $"Nhặt Thưởng! +{item.Value} Điểm", scoreGained = item.Value });
                    }
                    else if (item.Type == "Speed")
                    {
                        p.ActiveBuff = "SpeedBoost";
                        p.BuffEndTime = now.AddSeconds(15);
                        _hubContext.Clients.Client(p.ConnectionId).SendAsync("AnswerResult", new { success = true, correct = true, message = "Nhặt Tốc Độ! Chạy nhanh trong 15s" });
                    }
                    break;
                }
            }
        }
    }

    private void ApplySafeZoneDamage(GameState game, DateTime now, float dt)
    {
        var sz = game.SafeZone;
        foreach (var p in game.Players.Values)
        {
            if (p.IsDead || p.HasQuestionShield || (p.InvulnerableEndTime.HasValue && p.InvulnerableEndTime.Value > now)) continue;
            float dx = p.X - sz.CenterX;
            float dz = p.Z - sz.CenterZ;
            if (dx * dx + dz * dz > sz.Radius * sz.Radius)
            {
                int damage = Math.Max(1, (int)(sz.DamagePerSecond * dt));
                p.HP -= damage;
                p.DamageTaken += damage;
                if (p.HP <= 0) KillPlayer(p, game, now, "zone");
            }
        }
    }

    private void UpdateProjectiles(GameState game, DateTime now, float dt)
    {
        foreach (var proj in game.Projectiles.Values.ToList())
        {
            if (!proj.IsActive) continue;
            proj.X += proj.DirX * proj.Speed * dt;
            proj.Z += proj.DirZ * proj.Speed * dt;
            proj.DistanceTraveled += proj.Speed * dt;

            if (proj.DistanceTraveled >= proj.MaxRange)
            {
                proj.IsActive = false;
                game.Projectiles.TryRemove(proj.Id, out _);
                continue;
            }

            foreach (var player in game.Players.Values)
            {
                if (player.ConnectionId == proj.OwnerConnectionId || player.IsDead || player.HasQuestionShield)
                    continue;
                if (player.InvulnerableEndTime.HasValue && player.InvulnerableEndTime.Value > now)
                    continue;
                float dx = player.X - proj.X;
                float dz = player.Z - proj.Z;
                if (dx * dx + dz * dz < 64f)
                {
                    player.HP -= proj.Damage;
                    player.DamageTaken += proj.Damage;
                    if (game.Players.TryGetValue(proj.OwnerConnectionId, out var owner))
                    {
                        owner.Score += 10;
                        owner.Combo++;
                        if (owner.Combo > owner.LongestCombo) owner.LongestCombo = owner.Combo;
                    }
                    if (player.HP <= 0)
                    {
                        KillPlayer(player, game, now, "combat");
                        if (game.Players.TryGetValue(proj.OwnerConnectionId, out var killer))
                            killer.Score += 100;
                    }
                    proj.IsActive = false;
                    game.Projectiles.TryRemove(proj.Id, out _);
                    break;
                }
            }
        }
    }

    private void KillPlayer(PlayerState player, GameState game, DateTime now, string cause)
    {
        player.HP = 0;
        player.IsDead = true;
        player.RespawnTime = now.AddSeconds(8);
        player.Combo = 0;
        if (cause == "combat") player.Score = Math.Max(0, player.Score - 50);
    }

    private void UpdateRespawns(GameState game, DateTime now)
    {
        foreach (var p in game.Players.Values)
        {
            if (p.IsDead && p.RespawnTime.HasValue && p.RespawnTime <= now)
            {
                p.IsDead = false;
                p.HP = (int)(p.MaxHP * 0.5f);
                p.RespawnTime = null;
                p.InvulnerableEndTime = now.AddSeconds(3);
                p.Ammo = Math.Min(p.Ammo + 3, 15);
                var rng = new Random();
                float angle = (float)(rng.NextDouble() * Math.PI * 2);
                float dist = (float)(rng.NextDouble() * game.SafeZone.Radius * 0.5f);
                p.X = game.SafeZone.CenterX + MathF.Cos(angle) * dist;
                p.Z = game.SafeZone.CenterZ + MathF.Sin(angle) * dist;
            }
            if (p.HasQuestionShield && p.ShieldEndTime.HasValue && p.ShieldEndTime <= now)
            {
                p.HasQuestionShield = false;
                p.ShieldEndTime = null;
            }
        }
    }

    private void UpdateKnowledgeZones(GameState game, DateTime now)
    {
        foreach (var kz in game.KnowledgeZones.Values)
        {
            if (!kz.IsActive && kz.ClaimedByConnectionId == null && now >= kz.RespawnTime)
            {
                // Respawn with a NEW unique question
                int newQuestionId = PickUnusedQuestion(game);

                // Remove old question from active tracking
                game.ActiveQuestionIds.TryRemove(kz.QuestionId, out _);

                kz.QuestionId = newQuestionId;
                kz.IsActive = true;
                kz.ClaimedByConnectionId = null;
                kz.ClaimExpiry = null;

                // Track new question as active
                game.ActiveQuestionIds.TryAdd(newQuestionId, true);

                // Update topic name
                if (game.QuestionPool.TryGetValue(newQuestionId, out var qd))
                    kz.TopicName = qd.TopicName;

                // Move zone slightly, keep inside safe zone
                var rng = new Random();
                kz.X += rng.Next(-20, 20);
                kz.Z += rng.Next(-20, 20);

                // Randomize Type and Trap
                double roll = rng.NextDouble();
                kz.IsTrap = (roll < 0.1); // 10% Trap
                if (roll >= 0.1 && roll < 0.25)
                {
                    kz.Type = "LootBox";
                    string[] buffs = { "Heal", "SpeedBoost", "Scorex2", "Shield", "Ammo" };
                    kz.LootReward = buffs[rng.Next(buffs.Length)];
                }
                else if (roll >= 0.25 && roll < 0.3)
                {
                    kz.Type = "Boss";
                    kz.LootReward = "LegendaryBuff";
                }
                else
                {
                    kz.Type = "Normal";
                    kz.LootReward = null;
                }
                float dx = kz.X - game.SafeZone.CenterX;
                float dz = kz.Z - game.SafeZone.CenterZ;
                float dist = MathF.Sqrt(dx * dx + dz * dz);
                if (dist > game.SafeZone.Radius * 0.7f)
                {
                    float scale = game.SafeZone.Radius * 0.5f / dist;
                    kz.X = game.SafeZone.CenterX + dx * scale;
                    kz.Z = game.SafeZone.CenterZ + dz * scale;
                }
            }
        }
    }

    private void UpdateQuestionClaims(GameState game, DateTime now)
    {
        foreach (var kz in game.KnowledgeZones.Values)
        {
            if (kz.ClaimedByConnectionId != null && kz.ClaimExpiry.HasValue && now >= kz.ClaimExpiry.Value)
            {
                if (game.Players.TryGetValue(kz.ClaimedByConnectionId, out var player))
                {
                    player.HasQuestionShield = false;
                    player.ShieldEndTime = null;
                    player.IsAnsweringQuestion = false;
                }
                kz.ClaimedByConnectionId = null;
                kz.ClaimExpiry = null;
                // Zone stays active so someone else can try
            }
        }
    }
}
