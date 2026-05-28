namespace AnimalTheoryRoyale.Models.Realtime;

public class SafeZoneState
{
    public float CenterX { get; set; } = 0;
    public float CenterZ { get; set; } = 0;
    public float Radius { get; set; } = 500f;       // Current radius
    public float TargetRadius { get; set; } = 500f;  // Radius we're shrinking to
    public float ShrinkSpeed { get; set; } = 5f;     // Units per second
    public int Phase { get; set; } = 0;              // Current phase (0=initial, 1,2,3... = shrinking phases)
    public DateTime NextShrinkTime { get; set; }     // When the next shrink starts
    public float DamagePerSecond { get; set; } = 5f; // Damage outside zone
    public bool IsShrinking { get; set; } = false;
}
