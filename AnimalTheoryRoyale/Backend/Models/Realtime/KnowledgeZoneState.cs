namespace AnimalTheoryRoyale.Models.Realtime;

public class KnowledgeZoneState
{
    public int ZoneId { get; set; }
    public float X { get; set; }
    public float Z { get; set; }
    public int QuestionId { get; set; }
    public string TopicName { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;          // false = already answered/consumed
    public string? ClaimedByConnectionId { get; set; }   // who is currently answering
    public DateTime? ClaimExpiry { get; set; }            // timeout for claiming
    public DateTime RespawnTime { get; set; }             // when this zone respawns with new question
    public string Type { get; set; } = "Normal";        // Normal, LootBox, Boss
    public bool IsTrap { get; set; } = false;           // Trap question (deals extra damage/stun if wrong)
    public string? LootReward { get; set; }             // Heal, SpeedBoost, Scorex2
}
