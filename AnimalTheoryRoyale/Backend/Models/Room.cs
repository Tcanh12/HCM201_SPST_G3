namespace AnimalTheoryRoyale.Models;

public class Room
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty; // e.g. "A7K2Q"
    public int HostId { get; set; }
    public User? Host { get; set; }
    public string Status { get; set; } = "Waiting"; // Waiting, Countdown, Playing, Ended
    public int MaxPlayers { get; set; } = 50;
    public int GameDuration { get; set; } = 600; // in seconds
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }

    // Navigation Properties
    public RoomSetting? Setting { get; set; }
    public ICollection<GameResult> Results { get; set; } = new List<GameResult>();
}
