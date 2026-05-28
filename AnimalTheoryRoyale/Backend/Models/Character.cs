namespace AnimalTheoryRoyale.Models;

public class Character
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty; // Voi, Thỏ, Cáo, Rùa
    public string AnimalType { get; set; } = string.Empty;
    public int MaxHP { get; set; }
    public int MoveSpeed { get; set; }
    public int HitboxSize { get; set; }
    public int InitialAmmo { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public string SkillDescription { get; set; } = string.Empty;
    public int SkillCooldown { get; set; } // in seconds
    public int SkillDuration { get; set; } // in seconds
    public string ModelPath { get; set; } = string.Empty;
    public string IconPath { get; set; } = string.Empty;
}
