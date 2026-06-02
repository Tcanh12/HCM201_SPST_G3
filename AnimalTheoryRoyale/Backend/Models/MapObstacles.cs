using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public class Obstacle
    {
        public string Id { get; set; } = "";
        public string Type { get; set; } = ""; // "circle" or "box"
        public float X { get; set; }
        public float Z { get; set; }
        public float Radius { get; set; } // for circle
        public float Width { get; set; } // for box
        public float Depth { get; set; } // for box
        public float Rotation { get; set; } // for box
        public bool Blocking { get; set; }
        public bool IsWater { get; set; }
    }

    public static class MapObstacles
    {
        public const float MAP_SIZE = 1000f;
        public static readonly List<Obstacle> Obstacles = new List<Obstacle>();

        static MapObstacles()
        {
            GenerateObstacles();
        }

        private static void GenerateObstacles()
        {
            float Rng(ref long seed)
            {
                seed = (seed * 16807) % 2147483647;
                return (float)seed / 2147483647f;
            }

            long s = 42;
            float Rand() => Rng(ref s);

            // === WATER (Deep river) ===
            Obstacles.Add(new Obstacle { Id = "river_main", Type = "box", X = 0, Z = 0, Width = MAP_SIZE * 1.5f, Depth = 60, Rotation = MathF.PI / 4, Blocking = true, IsWater = true });

            // === BRIDGE ===
            Obstacles.Add(new Obstacle { Id = "bridge_rail_1", Type = "box", X = (float)(-7.5 * Math.Cos(Math.PI / 4)), Z = (float)(-7.5 * Math.Sin(Math.PI / 4)), Width = 1, Depth = 80, Rotation = MathF.PI / 4, Blocking = true });
            Obstacles.Add(new Obstacle { Id = "bridge_rail_2", Type = "box", X = (float)(7.5 * Math.Cos(Math.PI / 4)), Z = (float)(7.5 * Math.Sin(Math.PI / 4)), Width = 1, Depth = 80, Rotation = MathF.PI / 4, Blocking = true });

            // ROCKS
            for (int i = 0; i < 80; i++)
            {
                float ox = (Rand() - 0.5f) * MAP_SIZE * 0.85f;
                float oz = (Rand() - 0.5f) * MAP_SIZE * 0.85f;
                if (IsOnBridge(ox, oz)) continue;
                Obstacles.Add(new Obstacle { Id = $"rock_{i}", Type = "circle", X = ox, Z = oz, Radius = 1 + Rand() * 4, Blocking = true });
            }

            // TREES
            for (int i = 0; i < 60; i++)
            {
                float ox = (Rand() - 0.5f) * MAP_SIZE * 0.8f;
                float oz = (Rand() - 0.5f) * MAP_SIZE * 0.8f;
                if (IsOnBridge(ox, oz)) continue;
                float scale = 2 + Rand() * 3;
                Obstacles.Add(new Obstacle { Id = $"tree_{i}", Type = "circle", X = ox, Z = oz, Radius = 0.3f * scale, Blocking = true });
            }

            // BUILDINGS
            for (int i = 0; i < 15; i++)
            {
                float ox = (Rand() - 0.5f) * MAP_SIZE * 0.7f;
                float oz = (Rand() - 0.5f) * MAP_SIZE * 0.7f;
                if (IsOnBridge(ox, oz)) continue;
                float scale = 3 + Rand() * 5;
                Obstacles.Add(new Obstacle { Id = $"bldg_{i}", Type = "box", X = ox, Z = oz, Width = scale * 2, Depth = scale * 2, Rotation = Rand() * MathF.PI * 2, Blocking = true });
            }

            // HILLS
            for (int i = 0; i < 25; i++)
            {
                float ox = (Rand() - 0.5f) * MAP_SIZE * 0.9f;
                float oz = (Rand() - 0.5f) * MAP_SIZE * 0.9f;
                float radius = 20 + Rand() * 40;
                if (IsOnBridge(ox, oz)) continue;
                Obstacles.Add(new Obstacle { Id = $"hill_{i}", Type = "circle", X = ox, Z = oz, Radius = radius * 0.5f, Blocking = true });
            }
        }

        public static bool IsOnBridge(float px, float pz)
        {
            float cosA = MathF.Cos(-MathF.PI / 4);
            float sinA = MathF.Sin(-MathF.PI / 4);
            float localX = px * cosA - pz * sinA;
            float localZ = px * sinA + pz * cosA;

            return Math.Abs(localX) <= 8 && Math.Abs(localZ) <= 40;
        }

        public static bool IsPositionBlocked(float x, float z, float playerRadius = 2.5f)
        {
            if (Math.Abs(x) > MAP_SIZE / 2 - 2 || Math.Abs(z) > MAP_SIZE / 2 - 2) return true;

            foreach (var obs in Obstacles)
            {
                if (!obs.Blocking) continue;

                if (obs.Type == "circle")
                {
                    float dx = x - obs.X;
                    float dz = z - obs.Z;
                    float dist = MathF.Sqrt(dx * dx + dz * dz);
                    if (dist < obs.Radius + playerRadius) return true;
                }
                else if (obs.Type == "box")
                {
                    float rot = obs.Rotation;
                    float cosA = MathF.Cos(-rot);
                    float sinA = MathF.Sin(-rot);

                    float dx = x - obs.X;
                    float dz = z - obs.Z;

                    float localX = dx * cosA - dz * sinA;
                    float localZ = dx * sinA + dz * cosA;

                    float halfW = obs.Width / 2 + playerRadius;
                    float halfD = obs.Depth / 2 + playerRadius;

                    if (Math.Abs(localX) < halfW && Math.Abs(localZ) < halfD)
                    {
                        if (obs.IsWater && IsOnBridge(x, z)) continue;
                        return true;
                    }
                }
            }

            return false;
        }
    }
}
