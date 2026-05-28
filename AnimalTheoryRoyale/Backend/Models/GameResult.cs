namespace AnimalTheoryRoyale.Models;

public class GameResult
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int CharacterId { get; set; }
    public Character? Character { get; set; }
    public int FinalScore { get; set; }
    public int CorrectCount { get; set; }
    public int WrongCount { get; set; }
    public int MaxCombo { get; set; }
    public int SurvivalTime { get; set; } // in seconds
    public int Rank { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
