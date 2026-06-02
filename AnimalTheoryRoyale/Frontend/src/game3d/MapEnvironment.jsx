import * as THREE from 'three';

export default function MapEnvironment() {
  const MAP_SIZE = 1000; // 1000x1000 map

  // Generate obstacle positions
  const obstacles = [];
  const rng = (seed) => {
    let s = seed;
    return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  };
  const rand = rng(42);

  // Rocks (various sizes)
  for (let i = 0; i < 80; i++) {
    obstacles.push({
      type: 'rock',
      x: (rand() - 0.5) * MAP_SIZE * 0.85,
      z: (rand() - 0.5) * MAP_SIZE * 0.85,
      scale: 1 + rand() * 4,
      rotation: rand() * Math.PI * 2,
    });
  }

  // Trees
  for (let i = 0; i < 60; i++) {
    obstacles.push({
      type: 'tree',
      x: (rand() - 0.5) * MAP_SIZE * 0.8,
      z: (rand() - 0.5) * MAP_SIZE * 0.8,
      scale: 2 + rand() * 3,
    });
  }

  // Buildings / ruins
  for (let i = 0; i < 15; i++) {
    obstacles.push({
      type: 'building',
      x: (rand() - 0.5) * MAP_SIZE * 0.7,
      z: (rand() - 0.5) * MAP_SIZE * 0.7,
      scale: 3 + rand() * 5,
      height: 4 + rand() * 8,
      rotation: rand() * Math.PI * 2,
    });
  }

  // Hills (raised terrain)
  const hills = [];
  for (let i = 0; i < 25; i++) {
    hills.push({
      x: (rand() - 0.5) * MAP_SIZE * 0.9,
      z: (rand() - 0.5) * MAP_SIZE * 0.9,
      radius: 20 + rand() * 40,
      height: 4 + rand() * 12,
    });
  }

  return (
    <group>
      {/* Main ground plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[MAP_SIZE, MAP_SIZE, 100, 100]} />
        <meshStandardMaterial color="#2d5016" roughness={0.9} />
      </mesh>

      {/* Grid overlay for spatial awareness */}
      <gridHelper args={[MAP_SIZE, 50, '#1a3a0a', '#1a3a0a']} position={[0, 0.01, 0]} />

      {/* Darker border around playable area */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[MAP_SIZE * 0.5, MAP_SIZE * 0.8, 64]} />
        <meshStandardMaterial color="#1a2e0a" roughness={1} />
      </mesh>

      {/* Hills */}
      {hills.map((h, i) => (
        <mesh key={`hill-${i}`} position={[h.x, h.height * 0.4, h.z]} receiveShadow castShadow>
          <sphereGeometry args={[h.radius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#3a6b1e" roughness={0.85} />
        </mesh>
      ))}

      {/* Rocks */}
      {obstacles.filter(o => o.type === 'rock').map((o, i) => (
        <mesh key={`rock-${i}`} position={[o.x, o.scale * 0.5, o.z]} rotation={[0, o.rotation, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[o.scale, 0]} />
          <meshStandardMaterial color="#555555" roughness={0.8} />
        </mesh>
      ))}

      {/* Trees */}
      {obstacles.filter(o => o.type === 'tree').map((o, i) => (
        <group key={`tree-${i}`} position={[o.x, 0, o.z]}>
          {/* Trunk */}
          <mesh position={[0, o.scale * 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.5, o.scale * 2.5, 6]} />
            <meshStandardMaterial color="#5C4033" roughness={0.9} />
          </mesh>
          {/* Canopy */}
          <mesh position={[0, o.scale * 2.8, 0]} castShadow>
            <coneGeometry args={[o.scale * 1.5, o.scale * 2, 6]} />
            <meshStandardMaterial color="#228B22" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Buildings */}
      {obstacles.filter(o => o.type === 'building').map((o, i) => (
        <group key={`bldg-${i}`} position={[o.x, 0, o.z]} rotation={[0, o.rotation, 0]}>
          <mesh position={[0, o.height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[o.scale * 2, o.height, o.scale * 2]} />
            <meshStandardMaterial color="#8B7355" roughness={0.7} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, o.height + 1, 0]} castShadow>
            <coneGeometry args={[o.scale * 1.5, 3, 4]} />
            <meshStandardMaterial color="#654321" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* === RIVER === */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]} receiveShadow>
        <planeGeometry args={[MAP_SIZE * 1.5, 60, 32, 4]} />
        <meshStandardMaterial color="#0284c7" transparent opacity={0.8} roughness={0.1} metalness={0.4} />
      </mesh>

      {/* === BRIDGE === */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        {/* Bridge floor */}
        <mesh position={[0, 1, 0]} castShadow receiveShadow>
          <boxGeometry args={[16, 1, 80]} />
          <meshStandardMaterial color="#5C4033" roughness={0.9} />
        </mesh>
        {/* Bridge railings */}
        <mesh position={[-7.5, 2, 0]} castShadow>
          <boxGeometry args={[1, 1, 80]} />
          <meshStandardMaterial color="#4a332a" />
        </mesh>
        <mesh position={[7.5, 2, 0]} castShadow>
          <boxGeometry args={[1, 1, 80]} />
          <meshStandardMaterial color="#4a332a" />
        </mesh>
        {/* Pillars */}
        <mesh position={[0, -5, 30]} castShadow>
          <cylinderGeometry args={[2, 2, 12, 16]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
        <mesh position={[0, -5, -30]} castShadow>
          <cylinderGeometry args={[2, 2, 12, 16]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
      </group>

      {/* Ambient lighting */}
      <fog attach="fog" args={['#1a1a2e', 200, 600]} />
    </group>
  );
}
