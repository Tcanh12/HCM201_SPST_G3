import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

export default function PlayerCharacter({ player, isMe, localOverride, hideModel }) {
  const meshRef = useRef();
  const stunRef = useRef();
  const floatRef = useRef(0);

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
      
      // Gentle idle bob
      floatRef.current += delta * 2;
    }
  });

  if (player.isDead || player.isEliminated) return null;

  const idleBob = Math.sin(floatRef.current) * 0.1;

  const renderAnimalModel = () => {
    switch(player.characterId) {
      case 1: // Voi — Tanker (Red/Gold armor, drum motif)
        return (
          <group>
            {/* Body — large sturdy frame */}
            <mesh position={[0, 1.6 + idleBob, 0]} castShadow>
              <boxGeometry args={[2.8, 2.2, 3.2]} />
              <meshStandardMaterial color="#5B6370" roughness={0.7} />
            </mesh>
            {/* Armor plate chest — red/gold */}
            <mesh position={[0, 1.8 + idleBob, 1.2]} castShadow>
              <boxGeometry args={[2.4, 1.6, 0.3]} />
              <meshStandardMaterial color="#8B1A1A" roughness={0.5} metalness={0.3} />
            </mesh>
            {/* Gold trim on armor */}
            <mesh position={[0, 2.6 + idleBob, 1.25]} castShadow>
              <boxGeometry args={[2.0, 0.15, 0.35]} />
              <meshStandardMaterial color="#D4A843" roughness={0.3} metalness={0.6} emissive="#D4A843" emissiveIntensity={0.2} />
            </mesh>
            {/* Trunk */}
            <mesh position={[0, 1.2 + idleBob, 2.0]} rotation={[Math.PI/4, 0, 0]} castShadow>
              <cylinderGeometry args={[0.35, 0.2, 1.6]} />
              <meshStandardMaterial color="#6B7280" roughness={0.8} />
            </mesh>
            {/* Ears */}
            <mesh position={[1.5, 2.2 + idleBob, 1]} rotation={[0, -Math.PI/6, 0]} castShadow>
              <boxGeometry args={[1.1, 1.6, 0.15]} />
              <meshStandardMaterial color="#9CA3AF" roughness={0.9} />
            </mesh>
            <mesh position={[-1.5, 2.2 + idleBob, 1]} rotation={[0, Math.PI/6, 0]} castShadow>
              <boxGeometry args={[1.1, 1.6, 0.15]} />
              <meshStandardMaterial color="#9CA3AF" roughness={0.9} />
            </mesh>
            {/* Legs — 4 sturdy pillars */}
            {[[-0.9, 0, 0.9], [0.9, 0, 0.9], [-0.9, 0, -0.9], [0.9, 0, -0.9]].map((pos, i) => (
              <mesh key={i} position={[pos[0], 0.4, pos[2]]} castShadow>
                <cylinderGeometry args={[0.35, 0.4, 0.8, 8]} />
                <meshStandardMaterial color="#5B6370" roughness={0.8} />
              </mesh>
            ))}
            {/* Bronze drum necklace — small */}
            <mesh position={[0, 2.5 + idleBob, 1.4]} castShadow>
              <torusGeometry args={[0.3, 0.08, 8, 16]} />
              <meshStandardMaterial color="#D4A843" roughness={0.3} metalness={0.7} emissive="#D4A843" emissiveIntensity={0.15} />
            </mesh>
          </group>
        );
      case 2: // Thỏ — Speedster (Jade scarf, goggles)
        return (
          <group>
            {/* Body — compact spherical */}
            <mesh position={[0, 1.1 + idleBob, 0]} castShadow>
              <sphereGeometry args={[0.85, 16, 16]} />
              <meshStandardMaterial color="#F0F0F0" roughness={0.7} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 2.0 + idleBob, 0.2]} castShadow>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#F5F5F5" roughness={0.6} />
            </mesh>
            {/* Long ears */}
            <mesh position={[0.2, 2.7 + idleBob, 0]} castShadow>
              <capsuleGeometry args={[0.08, 0.8, 4, 8]} />
              <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
            </mesh>
            <mesh position={[-0.2, 2.7 + idleBob, 0]} castShadow>
              <capsuleGeometry args={[0.08, 0.8, 4, 8]} />
              <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
            </mesh>
            {/* Ear inner pink */}
            <mesh position={[0.2, 2.7 + idleBob, 0.05]} castShadow>
              <capsuleGeometry args={[0.04, 0.6, 4, 8]} />
              <meshStandardMaterial color="#F9A8D4" roughness={0.8} />
            </mesh>
            <mesh position={[-0.2, 2.7 + idleBob, 0.05]} castShadow>
              <capsuleGeometry args={[0.04, 0.6, 4, 8]} />
              <meshStandardMaterial color="#F9A8D4" roughness={0.8} />
            </mesh>
            {/* Speed scarf — jade green */}
            <mesh position={[0, 1.6 + idleBob, -0.3]} rotation={[0.3, 0, 0]} castShadow>
              <boxGeometry args={[1.0, 0.15, 0.8]} />
              <meshStandardMaterial color="#1B8C5A" roughness={0.6} />
            </mesh>
            <mesh position={[0, 1.4 + idleBob, -0.8]} rotation={[0.5, 0, 0.1]} castShadow>
              <boxGeometry args={[0.3, 0.1, 0.6]} />
              <meshStandardMaterial color="#34D399" roughness={0.6} />
            </mesh>
            {/* Goggles on forehead */}
            <mesh position={[0, 2.3 + idleBob, 0.45]} castShadow>
              <torusGeometry args={[0.15, 0.04, 8, 16]} />
              <meshStandardMaterial color="#67E8F9" roughness={0.2} metalness={0.5} />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.9 + idleBob, -0.85]} castShadow>
              <sphereGeometry args={[0.2]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            {/* Feet */}
            <mesh position={[0.3, 0.15, 0.3]} castShadow>
              <boxGeometry args={[0.3, 0.3, 0.5]} />
              <meshStandardMaterial color="#E5E7EB" roughness={0.8} />
            </mesh>
            <mesh position={[-0.3, 0.15, 0.3]} castShadow>
              <boxGeometry args={[0.3, 0.3, 0.5]} />
              <meshStandardMaterial color="#E5E7EB" roughness={0.8} />
            </mesh>
          </group>
        );
      case 3: // Cáo — Strategist (Scholar vest, glasses, book)
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 1.3 + idleBob, 0]} castShadow>
              <boxGeometry args={[1.3, 1.3, 2.6]} />
              <meshStandardMaterial color="#EA580C" roughness={0.7} />
            </mesh>
            {/* White belly */}
            <mesh position={[0, 1.0 + idleBob, 0.05]} castShadow>
              <boxGeometry args={[1.0, 0.8, 2.2]} />
              <meshStandardMaterial color="#FED7AA" roughness={0.8} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 2.1 + idleBob, 1.1]} castShadow>
              <boxGeometry args={[1.1, 1.0, 1.1]} />
              <meshStandardMaterial color="#EA580C" roughness={0.7} />
            </mesh>
            {/* Snout */}
            <mesh position={[0, 1.9 + idleBob, 1.7]} castShadow>
              <boxGeometry args={[0.5, 0.4, 0.5]} />
              <meshStandardMaterial color="#EA580C" roughness={0.7} />
            </mesh>
            {/* Nose */}
            <mesh position={[0, 2.0 + idleBob, 1.95]} castShadow>
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial color="#1F2937" roughness={0.9} />
            </mesh>
            {/* Pointy ears */}
            <mesh position={[0.35, 2.8 + idleBob, 1.0]} castShadow>
              <coneGeometry args={[0.2, 0.5, 4]} />
              <meshStandardMaterial color="#EA580C" roughness={0.7} />
            </mesh>
            <mesh position={[-0.35, 2.8 + idleBob, 1.0]} castShadow>
              <coneGeometry args={[0.2, 0.5, 4]} />
              <meshStandardMaterial color="#EA580C" roughness={0.7} />
            </mesh>
            {/* Scholar glasses */}
            <mesh position={[0, 2.2 + idleBob, 1.6]} castShadow>
              <torusGeometry args={[0.18, 0.03, 8, 16]} />
              <meshStandardMaterial color="#D4A843" roughness={0.2} metalness={0.6} />
            </mesh>
            {/* Scholar vest */}
            <mesh position={[0, 1.6 + idleBob, 0.1]} castShadow>
              <boxGeometry args={[1.4, 0.9, 2.0]} />
              <meshStandardMaterial color="#7C2D12" roughness={0.6} transparent opacity={0.7} />
            </mesh>
            {/* Book on belt */}
            <mesh position={[0.7, 1.0 + idleBob, 0]} rotation={[0, 0, 0.2]} castShadow>
              <boxGeometry args={[0.15, 0.5, 0.35]} />
              <meshStandardMaterial color="#92400E" roughness={0.8} />
            </mesh>
            {/* Tail — fluffy */}
            <mesh position={[0, 1.2 + idleBob, -1.9]} rotation={[-Math.PI/6, 0, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.4, 1.5]} />
              <meshStandardMaterial color="#EA580C" roughness={0.8} />
            </mesh>
            <mesh position={[0, 1.0 + idleBob, -2.4]} castShadow>
              <sphereGeometry args={[0.35]} />
              <meshStandardMaterial color="#FEFCE8" roughness={0.8} />
            </mesh>
          </group>
        );
      case 4: // Rùa — Defender (Tech shell, energy rings)
        return (
          <group>
            {/* Shell — dome with tech pattern */}
            <mesh position={[0, 1.0 + idleBob, 0]} castShadow>
              <sphereGeometry args={[1.3, 16, 8, 0, Math.PI * 2, 0, Math.PI/2]} />
              <meshStandardMaterial color="#0F766E" roughness={0.6} />
            </mesh>
            {/* Shell tech lines — emissive rings */}
            <mesh position={[0, 1.1 + idleBob, 0]} rotation={[-Math.PI/2, 0, 0]}>
              <ringGeometry args={[0.6, 0.65, 6]} />
              <meshStandardMaterial color="#67E8F9" emissive="#67E8F9" emissiveIntensity={1} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 1.2 + idleBob, 0]} rotation={[-Math.PI/2, 0, Math.PI/6]}>
              <ringGeometry args={[0.9, 0.94, 6]} />
              <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={0.8} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.6 + idleBob, 1.3]} castShadow>
              <sphereGeometry args={[0.4]} />
              <meshStandardMaterial color="#34D399" roughness={0.7} />
            </mesh>
            {/* Eyes */}
            <mesh position={[0.15, 0.75 + idleBob, 1.6]} castShadow>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial color="#0F172A" roughness={0.9} />
            </mesh>
            <mesh position={[-0.15, 0.75 + idleBob, 1.6]} castShadow>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial color="#0F172A" roughness={0.9} />
            </mesh>
            {/* Legs — 4 stubby */}
            {[[0.8, 0.2, 0.8], [-0.8, 0.2, 0.8], [0.8, 0.2, -0.8], [-0.8, 0.2, -0.8]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow>
                <boxGeometry args={[0.4, 0.4, 0.5]} />
                <meshStandardMaterial color="#34D399" roughness={0.8} />
              </mesh>
            ))}
            {/* Energy bracelet */}
            <mesh position={[0, 0.4 + idleBob, 1.3]}>
              <torusGeometry args={[0.45, 0.04, 8, 16]} />
              <meshStandardMaterial color="#67E8F9" emissive="#67E8F9" emissiveIntensity={0.6} transparent opacity={0.5} />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.3, -1.2]} castShadow>
              <coneGeometry args={[0.12, 0.4, 4]} />
              <meshStandardMaterial color="#34D399" roughness={0.8} />
            </mesh>
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
      {!hideModel && (
        <group rotation={[0, player.rotationY || 0, 0]}>
          {renderAnimalModel()}
        </group>
      )}
      
      {/* Question Shield Aura */}
      {player.hasQuestionShield && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial color="#D4A843" transparent opacity={0.25} emissive="#D4A843" emissiveIntensity={0.5} />
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
          <meshStandardMaterial color="#A7F3D0" emissive="#10B981" emissiveIntensity={0.8} transparent opacity={0.4} wireframe />
        </mesh>
      )}

      {/* Skill: Double Or Nothing Aura */}
      {player.hasDouble && (
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 3, 32]} />
          <meshBasicMaterial color="#D4A843" transparent opacity={0.25} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
      )}

      {/* Skill: Dizzy Spin */}
      {player.isDizzy && (
        <group position={[0, 3, 0]}>
          <Text position={[-1, 0, 0]} fontSize={1} color="#9333EA">🌀</Text>
          <Text position={[1, 0, 0]} fontSize={1} color="#9333EA">🌀</Text>
        </group>
      )}

      {/* Rùa: Shell Shield */}
      {player.hasShield && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshStandardMaterial color="#06B6D4" transparent opacity={0.3} emissive="#67E8F9" emissiveIntensity={0.8} />
        </mesh>
      )}

      {/* Name + HP Billboard */}
      {!hideModel && (
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
      )}
    </group>
  );
}
