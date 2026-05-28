namespace AnimalTheoryRoyale.Models;

public class RoomSetting
{
    public int Id { get; set; }
    public int RoomId { get; set; }
    public Room? Room { get; set; }
    public int QuestionTopicId { get; set; } // 0 for All topics
    public string DifficultyMode { get; set; } = "Mixed"; // Easy, Medium, Hard, Mixed
    public bool EnableWeapon { get; set; } = true;
    public bool EnableFruits { get; set; } = true;
    public bool EnableItems { get; set; } = true;
    public string SafeZoneMode { get; set; } = "Normal";
    public string RespawnMode { get; set; } = "Casual"; // Casual, Survival
}
