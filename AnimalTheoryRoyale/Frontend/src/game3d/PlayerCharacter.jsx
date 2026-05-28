import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

export default function PlayerCharacter({ player, isMe, localOverride }) {
  const meshRef = useRef();
  const stunRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (localOverride) {
        meshRef.current.position.lerp(localOverride, 10 * delta);
      } else {
        const targetPos = new THREE.Vector3(player.x, player.y, player.z);
        meshRef.current.position.lerp(targetPos, 10 * delta);
      }
      
      // Rotate if stunned
      if (player.isStunned && stunRef.current) {
        stunRef.current.rotation.y += 5 * delta;
      }
    }
  });

  if (player.isDead) return null;

  const renderAnimalModel = () => {
    switch(player.characterId) {
      case 1:
        return (
          <group>
            <mesh position={[0, 1.5, 0]} castShadow><boxGeometry args={[2.5, 2, 3]} /><meshStandardMaterial color="#6B7280" /></mesh>
            <mesh position={[0, 1, 1.8]} rotation={[Math.PI/4, 0, 0]} castShadow><cylinderGeometry args={[0.3, 0.2, 1.5]} /><meshStandardMaterial color="#6B7280" /></mesh>
            <mesh position={[1.4, 2, 1]} rotation={[0, -Math.PI/6, 0]} castShadow><boxGeometry args={[1, 1.5, 0.2]} /><meshStandardMaterial color="#9CA3AF" /></mesh>
            <mesh position={[-1.4, 2, 1]} rotation={[0, Math.PI/6, 0]} castShadow><boxGeometry args={[1, 1.5, 0.2]} /><meshStandardMaterial color="#9CA3AF" /></mesh>
          </group>
        );
      case 2:
        return (
          <group>
            <mesh position={[0, 1, 0]} castShadow><sphereGeometry args={[0.8, 16, 16]} /><meshStandardMaterial color="#F3F4F6" /></mesh>
            <mesh position={[0.3, 2, 0]} castShadow><cylinderGeometry args={[0.1, 0.1, 1.2]} /><meshStandardMaterial color="#F3F4F6" /></mesh>
            <mesh position={[-0.3, 2, 0]} castShadow><cylinderGeometry args={[0.1, 0.1, 1.2]} /><meshStandardMaterial color="#F3F4F6" /></mesh>
            <mesh position={[0, 0.8, -0.8]} castShadow><sphereGeometry args={[0.2]} /><meshStandardMaterial color="#FFFFFF" /></mesh>
          </group>
        );
      case 3:
        return (
          <group>
            <mesh position={[0, 1.2, 0]} castShadow><boxGeometry args={[1.2, 1.2, 2.5]} /><meshStandardMaterial color="#F97316" /></mesh>
            <mesh position={[0, 2, 1]} castShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#F97316" /></mesh>
            <mesh position={[0, 1.8, 1.6]} castShadow><boxGeometry args={[0.6, 0.4, 0.6]} /><meshStandardMaterial color="#F97316" /></mesh>
            <mesh position={[0, 1.2, -1.8]} rotation={[-Math.PI/6, 0, 0]} castShadow><cylinderGeometry args={[0.1, 0.4, 1.5]} /><meshStandardMaterial color="#F97316" /></mesh>
          </group>
        );
      case 4:
        return (
          <group>
            <mesh position={[0, 0.8, 0]} castShadow><sphereGeometry args={[1.2, 16, 8, 0, Math.PI * 2, 0, Math.PI/2]} /><meshStandardMaterial color="#10B981" /></mesh>
            <mesh position={[0, 0.5, 1.2]} castShadow><sphereGeometry args={[0.4]} /><meshStandardMaterial color="#34D399" /></mesh>
            <mesh position={[0.8, 0.2, 0.8]} castShadow><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color="#34D399" /></mesh>
            <mesh position={[-0.8, 0.2, 0.8]} castShadow><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color="#34D399" /></mesh>
            <mesh position={[0.8, 0.2, -0.8]} castShadow><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color="#34D399" /></mesh>
            <mesh position={[-0.8, 0.2, -0.8]} castShadow><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color="#34D399" /></mesh>
          </group>
        );
      default:
        return (
          <mesh castShadow receiveShadow position={[0, 1, 0]}>
            <capsuleGeometry args={[1, 1, 4, 8]} />
            <meshStandardMaterial color={isMe ? "#10B981" : "#EF4444"} />
          </mesh>
        );
    }
  }

  return (
    <group ref={meshRef} position={[player.x, player.y, player.z]}>
      {/* Animal Model */}
      <group rotation={[0, player.rotationY || 0, 0]}>
        {renderAnimalModel()}
      </group>
      
      {/* Question Shield Aura */}
      {player.hasQuestionShield && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial color="gold" transparent opacity={0.3} emissive="gold" emissiveIntensity={0.5} />
        </mesh>
      )}

      {/* Stun Effect */}
      {player.isStunned && (
        <group ref={stunRef} position={[0, 4, 0]}>
          {[0, 1, 2].map(i => (
            <mesh key={i} position={[Math.cos(i * Math.PI * 2 / 3) * 1.5, 0, Math.sin(i * Math.PI * 2 / 3) * 1.5]}>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={2} />
            </mesh>
          ))}
        </group>
      )}

      {/* Invulnerable Shield (Respawn effect) */}
      {player.isInvulnerable && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[2.8, 32, 32]} />
      {/* Skill: Double Or Nothing Aura */}
      {player.hasDouble && (
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 3, 32]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.3} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
      )}

      {/* Skill: Chaos */}
      {player.isChaos && (
        <group position={[0, 3, 0]}>
          <Text position={[-1, 0, 0]} fontSize={1} color="#9333EA">🌀</Text>
          <Text position={[1, 0, 0]} fontSize={1} color="#9333EA">🌀</Text>
        </group>
      )}

      {/* Skill: Silence */}
      {player.isSilenced && (
        <Text position={[0, 3.5, 0]} fontSize={1.5} color="#64748B" outlineWidth={0.1}>🔇</Text>
      )}
      <Billboard position={[0, 5, 0]}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.8}
          color={isMe ? "#34D399" : "white"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="black"
        >
          {player.username || (isMe ? "Bạn" : "Người chơi")}
        </Text>
        
        {/* HP Bar Background */}
        <mesh position={[0, -0.2, -0.01]}>
          <planeGeometry args={[2.1, 0.3]} />
          <meshBasicMaterial color="#1F2937" />
        </mesh>
        
        {/* HP Bar Foreground */}
        <mesh position={[-1 + (player.hp / (player.maxHP || 100)), -0.2, 0]}>
          <planeGeometry args={[2 * (player.hp / (player.maxHP || 100)), 0.2]} />
          <meshBasicMaterial color={player.hp > 50 ? "#10B981" : "#EF4444"} />
        </mesh>
      </Billboard>
    </group>
  );
}
