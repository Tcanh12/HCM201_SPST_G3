import * as THREE from 'three';
import { MAP_OBSTACLES, MAP_SIZE } from './MapObstacles';

export default function MapEnvironment() {
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
      {MAP_OBSTACLES.filter(o => o.renderType === 'hill').map((h) => (
        <mesh key={h.id} position={[h.x, h.renderHeight * 0.4, h.z]} receiveShadow castShadow>
          <sphereGeometry args={[h.renderRadius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#3a6b1e" roughness={0.85} />
        </mesh>
      ))}

      {/* Rocks */}
      {MAP_OBSTACLES.filter(o => o.renderType === 'rock').map((o) => (
        <mesh key={o.id} position={[o.x, o.radius * 0.5, o.z]} rotation={[0, o.rotation || 0, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[o.radius, 0]} />
          <meshStandardMaterial color="#555555" roughness={0.8} />
        </mesh>
      ))}

      {/* Trees */}
      {MAP_OBSTACLES.filter(o => o.renderType === 'tree').map((o) => (
        <group key={o.id} position={[o.x, 0, o.z]}>
          {/* Trunk */}
          <mesh position={[0, o.renderScale * 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.3 * o.renderScale, 0.5 * o.renderScale, o.renderScale * 2.5, 6]} />
            <meshStandardMaterial color="#5C4033" roughness={0.9} />
          </mesh>
          {/* Canopy */}
          <mesh position={[0, o.renderScale * 2.8, 0]} castShadow>
            <coneGeometry args={[o.renderScale * 1.5, o.renderScale * 2, 6]} />
            <meshStandardMaterial color="#228B22" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Buildings */}
      {MAP_OBSTACLES.filter(o => o.renderType === 'building').map((o) => (
        <group key={o.id} position={[o.x, 0, o.z]} rotation={[0, o.rotation, 0]}>
          <mesh position={[0, o.height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[o.width, o.height, o.depth]} />
            <meshStandardMaterial color="#8B7355" roughness={0.7} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, o.height + 1, 0]} castShadow>
            <coneGeometry args={[o.renderScale * 1.5, 3, 4]} />
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
