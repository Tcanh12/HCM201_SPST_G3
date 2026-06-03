import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

export default function KnowledgeZone({ x, z, topic, type, isTrap }) {
  const pillarRef = useRef();

  useFrame((state, delta) => {
    if (pillarRef.current) {
      pillarRef.current.rotation.y += delta * 0.5;
    }
  });

  let color = "#FCD34D"; // Normal
  let textScale = 1;
  let coreGeom = <octahedronGeometry args={[1, 0]} />;
  let label = topic;

  if (type === "Boss") {
    color = "#EF4444";
    textScale = 1.5;
    coreGeom = <icosahedronGeometry args={[1.5, 0]} />;
    label = `👹 BOSS: ${topic}`;
  } else if (type === "LootBox") {
    color = "#34D399";
    coreGeom = <boxGeometry args={[1.2, 1.2, 1.2]} />;
    label = `🎁 LOOT: ${topic}`;
  }

  return (
    <group position={[x, 0, z]}>
      {/* Glowing Pillar */}
      <mesh ref={pillarRef} position={[0, type === "Boss" ? 6 : 5, 0]}>
        <cylinderGeometry args={[type === "Boss" ? 3 : 2, type === "Boss" ? 3 : 2, type === "Boss" ? 12 : 10, 32, 1, true]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} emissive={color} emissiveIntensity={1} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner Core */}
      <mesh position={[0, type === "Boss" ? 3 : 2, 0]}>
        {coreGeom}
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Ring on the ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[type === "Boss" ? 5.8 : 3.8, type === "Boss" ? 6 : 4, 32]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Topic Text with Billboard to always face camera and stay readable */}
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[0, type === "Boss" ? 12 : 9, 0]}
      >
        {/* Background plate for contrast */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[label.length * 0.6 * textScale, 1.5 * textScale]} />
          <meshBasicMaterial color="#0B0F1A" transparent opacity={0.6} depthTest={false} />
        </mesh>
        
        <Text
          fontSize={textScale}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
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
