using System.Collections.Concurrent;

namespace AnimalTheoryRoyale.Models.Realtime;

public class GameState
{
    public int RoomId { get; set; }
    public string RoomCode { get; set; } = string.Empty;
    public string Status { get; set; } = "Waiting";
    public DateTime? StartTime { get; set; }
    public int Duration { get; set; }
    public string HostConnectionId { get; set; } = string.Empty;

    public ConcurrentDictionary<string, PlayerState> Players { get; set; } = new();
    public ConcurrentDictionary<string, ProjectileState> Projectiles { get; set; } = new();
    public ConcurrentDictionary<int, KnowledgeZoneState> KnowledgeZones { get; set; } = new();
    public SafeZoneState SafeZone { get; set; } = new();

    // Anti-duplicate: "connectionId_questionId" → true
    public ConcurrentDictionary<string, bool> AnsweredQuestions { get; set; } = new();

    // In-memory question pool loaded from DB at game start
    public ConcurrentDictionary<int, QuestionData> QuestionPool { get; set; } = new();

    // Track which question IDs are currently active on the map
    public ConcurrentDictionary<int, bool> ActiveQuestionIds { get; set; } = new();
}

/// <summary>
/// In-memory cache of a question from the database.
/// </summary>
public class QuestionData
{
    public int QuestionId { get; set; }
    public string TopicName { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Explanation { get; set; } = string.Empty;
    public string Difficulty { get; set; } = "Easy";
    public int BaseScore { get; set; } = 100;
    public int PenaltyHP { get; set; } = 10;
    public int TimeLimit { get; set; } = 15;
    public List<QuestionOptionData> Options { get; set; } = new();
}

public class QuestionOptionData
{
    public int OptionId { get; set; }
    public string Text { get; set; } = string.Empty;
    public bool IsCorrect { get; set; }
}
