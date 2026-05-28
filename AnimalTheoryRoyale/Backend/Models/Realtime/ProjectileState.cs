namespace AnimalTheoryRoyale.Models.Realtime;

public class ProjectileState
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string OwnerConnectionId { get; set; } = string.Empty;
    public float X { get; set; }
    public float Y { get; set; }
    public float Z { get; set; }
    public float DirX { get; set; }
    public float DirZ { get; set; }
    public float Speed { get; set; } = 600f; // units per second
    public float DistanceTraveled { get; set; }
    public float MaxRange { get; set; } = 350f;
    public int Damage { get; set; } = 8;
    public bool IsActive { get; set; } = true;
}
