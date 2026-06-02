// Shared map obstacles data for Frontend rendering and collision logic.

export const MAP_SIZE = 1000;

// Pseudo-random generator for consistent obstacle placement
const rng = (seed) => {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
};
const rand = rng(42);

const obstacles = [];

// === WATER (Deep river) ===
// River is a box cutting diagonally
obstacles.push({
  id: 'river_main',
  type: 'box',
  x: 0,
  z: 0,
  width: MAP_SIZE * 1.5,
  depth: 60,
  rotation: Math.PI / 4, // 45 degrees
  blocking: true,
  isWater: true
});

// === BRIDGE ===
// Bridge floor allows walking over the water. 
// We model the bridge railings as blocking, and the floor as walkable (we just don't add the floor as an obstacle)
obstacles.push({
  id: 'bridge_rail_1',
  type: 'box',
  x: -7.5 * Math.cos(Math.PI / 4), // Rotate manually since simple collision won't handle rotated boxes easily without math
  z: -7.5 * Math.sin(Math.PI / 4),
  width: 1,
  depth: 80,
  rotation: Math.PI / 4,
  blocking: true
});
obstacles.push({
  id: 'bridge_rail_2',
  type: 'box',
  x: 7.5 * Math.cos(Math.PI / 4),
  z: 7.5 * Math.sin(Math.PI / 4),
  width: 1,
  depth: 80,
  rotation: Math.PI / 4,
  blocking: true
});

// Helper to check if a point is on the bridge
export function isOnBridge(px, pz) {
  // Bridge is at 0,0 rotated 45 degrees. Length 80, width 16.
  // Un-rotate the point
  const cosA = Math.cos(-Math.PI / 4);
  const sinA = Math.sin(-Math.PI / 4);
  const localX = px * cosA - pz * sinA;
  const localZ = px * sinA + pz * cosA;
  
  if (Math.abs(localX) <= 8 && Math.abs(localZ) <= 40) {
    return true;
  }
  return false;
}

// === ROCKS ===
for (let i = 0; i < 80; i++) {
  let ox = (rand() - 0.5) * MAP_SIZE * 0.85;
  let oz = (rand() - 0.5) * MAP_SIZE * 0.85;
  // Don't place on the bridge or river
  if (isOnBridge(ox, oz)) continue;

  obstacles.push({
    id: `rock_${i}`,
    type: 'circle',
    x: ox,
    z: oz,
    radius: 1 + rand() * 4,
    blocking: true,
    renderType: 'rock'
  });
}

// === TREES ===
for (let i = 0; i < 60; i++) {
  let ox = (rand() - 0.5) * MAP_SIZE * 0.8;
  let oz = (rand() - 0.5) * MAP_SIZE * 0.8;
  if (isOnBridge(ox, oz)) continue;

  let scale = 2 + rand() * 3;
  obstacles.push({
    id: `tree_${i}`,
    type: 'circle',
    x: ox,
    z: oz,
    radius: 0.3 * scale, // Trunk radius
    blocking: true,
    renderType: 'tree',
    renderScale: scale
  });
}

// === BUILDINGS ===
for (let i = 0; i < 15; i++) {
  let ox = (rand() - 0.5) * MAP_SIZE * 0.7;
  let oz = (rand() - 0.5) * MAP_SIZE * 0.7;
  if (isOnBridge(ox, oz)) continue;

  let scale = 3 + rand() * 5;
  obstacles.push({
    id: `bldg_${i}`,
    type: 'box',
    x: ox,
    z: oz,
    width: scale * 2,
    depth: scale * 2,
    rotation: rand() * Math.PI * 2,
    height: 4 + rand() * 8,
    blocking: true,
    renderType: 'building',
    renderScale: scale
  });
}

// === HILLS (Too steep to walk) ===
// We make the inner 50% of the hill blocking
for (let i = 0; i < 25; i++) {
  let ox = (rand() - 0.5) * MAP_SIZE * 0.9;
  let oz = (rand() - 0.5) * MAP_SIZE * 0.9;
  let radius = 20 + rand() * 40;
  let height = 4 + rand() * 12;
  
  if (isOnBridge(ox, oz)) continue;

  obstacles.push({
    id: `hill_${i}`,
    type: 'circle',
    x: ox,
    z: oz,
    radius: radius * 0.5, // Only the center/peak is blocking
    blocking: true,
    renderType: 'hill',
    renderRadius: radius,
    renderHeight: height
  });
}

export const MAP_OBSTACLES = obstacles;

// Basic collision logic for Frontend
export function isPositionBlocked(x, z, playerRadius = 2) {
  // Map bounds
  if (Math.abs(x) > MAP_SIZE / 2 - 2 || Math.abs(z) > MAP_SIZE / 2 - 2) return true;

  // Check each obstacle
  for (const obs of MAP_OBSTACLES) {
    if (!obs.blocking) continue;

    if (obs.type === 'circle') {
      const dx = x - obs.x;
      const dz = z - obs.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < obs.radius + playerRadius) {
        return true;
      }
    } 
    else if (obs.type === 'box') {
      // Un-rotate player point around box center
      const rot = obs.rotation || 0;
      const cosA = Math.cos(-rot);
      const sinA = Math.sin(-rot);
      
      const dx = x - obs.x;
      const dz = z - obs.z;
      
      const localX = dx * cosA - dz * sinA;
      const localZ = dx * sinA + dz * cosA;
      
      const halfW = obs.width / 2 + playerRadius;
      const halfD = obs.depth / 2 + playerRadius;
      
      if (Math.abs(localX) < halfW && Math.abs(localZ) < halfD) {
        // Exception: Water block but we are on the bridge
        if (obs.isWater && isOnBridge(x, z)) {
          continue; // Allow moving over water IF on bridge
        }
        return true;
      }
    }
  }
  
  return false;
}
