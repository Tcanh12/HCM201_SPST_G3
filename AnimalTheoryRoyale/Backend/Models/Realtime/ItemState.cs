namespace AnimalTheoryRoyale.Models.Realtime;

public class ItemState
{
    public string Id { get; set; } = string.Empty;
    public string Type { get; set; } = "HP"; // HP, Score, Speed, TrickTrap
    public float X { get; set; }
    public float Z { get; set; }
    public int Value { get; set; } // HP amount or Score amount
    public bool IsActive { get; set; } = true;
    public DateTime? RespawnTime { get; set; }
    public string? OwnerConnectionId { get; set; } // For TrickTrap
}
