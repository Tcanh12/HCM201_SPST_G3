import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Extract a short "Chương X" label from the topic string or metadata.
 * Handles multiple data formats:
 *   - Direct chapter number:  zone.chapter = 4  → "Chương 4"
 *   - ChapterId string:       zone.chapterId = "chuong-4" → "Chương 4"
 *   - Embedded in title:      "Sự ra đời … (Chương 4)" → "Chương 4"
 */
function getChapterLabel(topic, chapter, chapterId) {
  // 1. Direct chapter number
  if (chapter != null) return `Chương ${chapter}`;

  // 2. ChapterId like "chuong-3"
  if (chapterId) {
    const num = chapterId.replace(/[^0-9]/g, '');
    if (num) return `Chương ${num}`;
  }

  // 3. Parse from topic string
  if (topic && typeof topic === 'string') {
    const match = topic.match(/[Cc]h[uưươ]*[oơ]*ng\s*(\d+)/i);
    if (match) return `Chương ${match[1]}`;
  }

  return 'Tri thức';
}

export default function KnowledgeZone({ x, z, topic, type, isTrap, chapter, chapterId }) {
  const pillarRef = useRef();

  useFrame((state, delta) => {
    if (pillarRef.current) {
      pillarRef.current.rotation.y += delta * 0.5;
    }
  });

  const isBoss = type === 'Boss';
  const isLoot = type === 'LootBox';

  let color = '#FCD34D'; // Normal yellow
  let coreGeom = <octahedronGeometry args={[1, 0]} />;
  let prefix = '';

  if (isBoss) {
    color = '#EF4444';
    coreGeom = <icosahedronGeometry args={[1.5, 0]} />;
    prefix = '⚔ ';
  } else if (isLoot) {
    color = '#34D399';
    coreGeom = <boxGeometry args={[1.2, 1.2, 1.2]} />;
    prefix = '🎁 ';
  }

  // Short, clean label
  const label = prefix + getChapterLabel(topic, chapter, chapterId);

  // Position the label well above the pillar top to avoid being occluded
  const pillarHeight = isBoss ? 12 : 10;
  const labelY = pillarHeight + 3; // 3 units above pillar top

  return (
    <group position={[x, 0, z]}>
      {/* Glowing Pillar */}
      <mesh ref={pillarRef} position={[0, isBoss ? 6 : 5, 0]}>
        <cylinderGeometry args={[isBoss ? 3 : 2, isBoss ? 3 : 2, pillarHeight, 32, 1, true]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} emissive={color} emissiveIntensity={1} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner Core */}
      <mesh position={[0, isBoss ? 3 : 2, 0]}>
        {coreGeom}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Ring on the ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[isBoss ? 5.8 : 3.8, isBoss ? 6 : 4, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Short label – Billboard always faces camera, rendered on top */}
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[0, labelY, 0]}
      >
        {/* Dark background plate for readability */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[label.length * 0.55, 1.2]} />
          <meshBasicMaterial color="#0B0F1A" transparent opacity={0.7} depthTest={false} />
        </mesh>
        
        <Text
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000000"
          depthTest={false}
          renderOrder={10}
        >
          {label}
        </Text>
      </Billboard>
    </group>
  );
}
