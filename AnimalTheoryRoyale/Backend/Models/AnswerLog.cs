namespace AnimalTheoryRoyale.Models;

public class AnswerLog
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
    public int QuestionId { get; set; }
    public Question? Question { get; set; }
    public bool IsCorrect { get; set; }
    public int ScoreEarned { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
