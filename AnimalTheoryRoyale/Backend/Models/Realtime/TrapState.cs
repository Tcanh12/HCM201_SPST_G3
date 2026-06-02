using System;

namespace AnimalTheoryRoyale.Models.Realtime;

public class TrapState
{
    public int Id { get; set; }
    public float X { get; set; }
    public float Z { get; set; }
    public string Type { get; set; } = "Stun"; // Stun, Slow, Damage, LoseScore
    public bool IsActive { get; set; } = true;
    public DateTime RespawnTime { get; set; }
}
