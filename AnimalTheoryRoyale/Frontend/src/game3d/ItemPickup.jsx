import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { Heart, Gem, Zap } from 'lucide-react';
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
    if (item.type === 'HP') return <Heart className="w-5 h-5" fill="#10B981" color="#10B981" />;
    if (item.type === 'Score') return <Gem className="w-5 h-5" fill="#F59E0B" color="#F59E0B" />;
    return <Zap className="w-5 h-5" fill="#3B82F6" color="#3B82F6" />;
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
        <Html position={[0, 2, 0]} center>
          <div className="flex items-center justify-center pointer-events-none drop-shadow-md">
            {getIcon()}
          </div>
        </Html>
      </group>
    </group>
  );
}
