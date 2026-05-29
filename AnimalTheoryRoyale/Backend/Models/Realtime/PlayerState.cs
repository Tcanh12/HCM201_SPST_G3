namespace AnimalTheoryRoyale.Models.Realtime;

public class PlayerState
{
    public string ConnectionId { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public int CharacterId { get; set; }
    public float X { get; set; }
    public float Y { get; set; }
    public float Z { get; set; }
    public float RotationY { get; set; }
    public int HP { get; set; }
    public int MaxHP { get; set; }
    public int Score { get; set; }
    public int Combo { get; set; }
    public int Ammo { get; set; }
    public bool IsDead { get; set; }
    public bool IsAnsweringQuestion { get; set; }
    public bool HasQuestionShield { get; set; }
    public DateTime? ShieldEndTime { get; set; }
    public DateTime? RespawnTime { get; set; }
    public int? CurrentQuestionId { get; set; }

    // Skill system
    public bool IsStunned { get; set; }
    public DateTime? StunEndTime { get; set; }
    public DateTime? SkillPushCooldown { get; set; }
    public DateTime? SkillDoubleCooldown { get; set; }
    public DateTime? SkillChaosCooldown { get; set; }
    public DateTime? SkillSilenceCooldown { get; set; }

    public bool HasDoubleActive { get; set; }
    public DateTime? ChaosEndTime { get; set; }
    public DateTime? SilenceEndTime { get; set; }
    public DateTime? InvulnerableEndTime { get; set; }

    // Buff system
    public string? ActiveBuff { get; set; } // SpeedBoost, Scorex2, etc.
    public DateTime? BuffEndTime { get; set; }

    // Match Statistics & Final Result
    public int TotalCorrectAnswers { get; set; }
    public int TotalWrongAnswers { get; set; }
    public int LongestCombo { get; set; }
    public int DamageTaken { get; set; }
    public double SurvivalDuration { get; set; }
    public bool IsMVP { get; set; }
    public int FinalRank { get; set; }
}
