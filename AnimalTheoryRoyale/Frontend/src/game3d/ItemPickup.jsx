import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function ItemPickup({ item }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 1;
    }
  });

  const getColor = () => {
    if (item.type === 'HP') return '#10B981'; // Green
    if (item.type === 'Score') return '#F59E0B'; // Gold
    return '#3B82F6'; // Blue Speed
  };

  const getIcon = () => {
    if (item.type === 'HP') return '❤️';
    if (item.type === 'Score') return '💎';
    return '⚡';
  };

  return (
    <group position={[item.x, 1, item.z]}>
      {/* Light aura */}
      <mesh position={[0, -0.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshBasicMaterial color={getColor()} transparent opacity={0.3} />
      </mesh>
      
      {/* Rotating Item */}
      <group ref={groupRef}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={getColor()} emissive={getColor()} emissiveIntensity={0.8} wireframe={item.type === 'Speed'} />
        </mesh>
        <Text position={[0, 2, 0]} fontSize={1.5} outlineWidth={0.1}>
          {getIcon()}
        </Text>
      </group>
    </group>
  );
}
