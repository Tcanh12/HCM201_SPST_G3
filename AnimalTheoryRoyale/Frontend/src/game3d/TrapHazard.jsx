import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * TrapHazard – ground-level hazard marker.
 *
 * Visual-only refactor:
 *   • Removed the large floating <Html> emoji icons that cluttered the 3D view.
 *   • Replaced with a small ground-level gem + subtle warning ring,
 *     consistent with ItemPickup's visual language.
 *   • All collision / gameplay logic is untouched (handled server-side).
 */
export default function TrapHazard({ trap }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 1.5 * delta;
      // Gentle hover just above ground (max 0.8 units high)
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  const getColor = () => {
    switch (trap.type) {
      case 'Stun': return '#A855F7';     // Purple
      case 'Slow': return '#3B82F6';      // Blue
      case 'Damage': return '#EF4444';    // Red
      case 'LoseScore': return '#F59E0B'; // Orange
      default: return '#FFFFFF';
    }
  };

  const color = getColor();

  return (
    <group position={[trap.x, 0, trap.z]}>
      {/* Subtle warning circle on the ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[1.8, 2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Small inner glow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <circleGeometry args={[1.8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* Small rotating gem sitting close to the ground – same style as item pickups */}
      <group ref={meshRef} position={[0, 0.5, 0]}>
        <mesh>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}
