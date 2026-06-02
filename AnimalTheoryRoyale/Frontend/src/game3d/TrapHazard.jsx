import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function TrapHazard({ trap }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 2 * delta;
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });

  const getColor = () => {
    switch (trap.type) {
      case 'Stun': return '#A855F7'; // Purple
      case 'Slow': return '#3B82F6'; // Blue
      case 'Damage': return '#EF4444'; // Red
      case 'LoseScore': return '#F59E0B'; // Orange
      default: return '#FFFFFF';
    }
  };

  const getEmoji = () => {
    switch (trap.type) {
      case 'Stun': return '🌀';
      case 'Slow': return '❄️';
      case 'Damage': return '💥';
      case 'LoseScore': return '💸';
      default: return '⚠️';
    }
  };

  return (
    <group position={[trap.x, 0, trap.z]}>
      {/* Trap Base Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[3, 4, 32]} />
        <meshBasicMaterial color={getColor()} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Indicator */}
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial color={getColor()} emissive={getColor()} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Label */}
      <Html position={[0, 2, 0]} center style={{ pointerEvents: 'none' }}>
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{getEmoji()}</span>
        </div>
      </Html>
    </group>
  );
}
