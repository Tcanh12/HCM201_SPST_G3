import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SafeZone({ radius, x, z }) {
  const ringRef = useRef();
  const cylinderRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      // Smooth scale adjustment
      const currentScale = ringRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, radius, delta * 2);
      ringRef.current.scale.set(newScale, newScale, newScale);
      
      if(cylinderRef.current) {
        cylinderRef.current.scale.set(newScale, 1, newScale);
      }
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* Glowing Line on Ground */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.98, 1, 64]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Semi-transparent Wall */}
      <mesh ref={cylinderRef} position={[0, 20, 0]}>
        <cylinderGeometry args={[1, 1, 40, 64, 1, true]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}
