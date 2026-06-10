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

// Zone type configurations
function getZoneConfig(type, isTrap) {
  if (type === 'Boss') {
    return {
      color: '#EF4444',
      emissiveIntensity: 1.5,
      pillarRadius: 3,
      pillarHeight: 14,
      coreSize: 1.8,
      coreGeom: 'icosahedron',
      ringSize: 6,
      prefix: '⚔ ',
      label: 'BOSS',
      labelColor: '#FECACA',
      particles: true,
    };
  }
  if (type === 'LootBox') {
    return {
      color: '#A855F7',
      emissiveIntensity: 1.2,
      pillarRadius: 2.2,
      pillarHeight: 11,
      coreSize: 1.2,
      coreGeom: 'box',
      ringSize: 4.5,
      prefix: '🎁 ',
      label: 'LOOT',
      labelColor: '#E9D5FF',
      particles: false,
    };
  }
  if (isTrap) {
    return {
      color: '#F97316',
      emissiveIntensity: 0.8,
      pillarRadius: 1.8,
      pillarHeight: 8,
      coreSize: 0.8,
      coreGeom: 'tetrahedron',
      ringSize: 3.5,
      prefix: '⚠️ ',
      label: 'BẪY',
      labelColor: '#FED7AA',
      particles: false,
    };
  }
  // Normal / SpeedRound / CaseStudy
  if (type === 'SpeedRound') {
    return {
      color: '#06B6D4',
      emissiveIntensity: 1.0,
      pillarRadius: 1.5,
      pillarHeight: 7,
      coreSize: 0.7,
      coreGeom: 'octahedron',
      ringSize: 3,
      prefix: '⚡ ',
      label: 'NHANH',
      labelColor: '#A5F3FC',
      particles: false,
    };
  }
  if (type === 'CaseStudy') {
    return {
      color: '#8B5CF6',
      emissiveIntensity: 1.0,
      pillarRadius: 2.5,
      pillarHeight: 12,
      coreSize: 1.4,
      coreGeom: 'box',
      ringSize: 5,
      prefix: '📋 ',
      label: 'TÌNH HUỐNG',
      labelColor: '#DDD6FE',
      particles: false,
    };
  }
  // Default Normal
  return {
    color: '#D4A843',
    emissiveIntensity: 1.0,
    pillarRadius: 2,
    pillarHeight: 10,
    coreSize: 1.0,
    coreGeom: 'octahedron',
    ringSize: 4,
    prefix: '',
    label: '',
    labelColor: '#FEF3C7',
    particles: false,
  };
}

function CoreGeometry({ type, size }) {
  switch (type) {
    case 'icosahedron':
      return <icosahedronGeometry args={[size, 0]} />;
    case 'box':
      return <boxGeometry args={[size, size, size]} />;
    case 'tetrahedron':
      return <tetrahedronGeometry args={[size, 0]} />;
    default:
      return <octahedronGeometry args={[size, 0]} />;
  }
}

export default function KnowledgeZone({ x, z, topic, type, isTrap, chapter, chapterId }) {
  const pillarRef = useRef();
  const coreRef = useRef();
  const ringPulseRef = useRef();

  const config = getZoneConfig(type, isTrap);

  useFrame((state, delta) => {
    if (pillarRef.current) {
      pillarRef.current.rotation.y += delta * 0.5;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 1.2;
      coreRef.current.rotation.x += delta * 0.3;
      // Gentle float
      coreRef.current.position.y = (config.pillarHeight * 0.3) + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
    if (ringPulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      ringPulseRef.current.scale.set(pulse, pulse, 1);
    }
  });

  // Short, clean label
  const chapterLabel = config.prefix + getChapterLabel(topic, chapter, chapterId);
  const typeLabel = config.label;

  // Position the label well above the pillar top
  const labelY = config.pillarHeight + 3;

  return (
    <group position={[x, 0, z]}>
      {/* Glowing Pillar */}
      <mesh ref={pillarRef} position={[0, config.pillarHeight * 0.5, 0]}>
        <cylinderGeometry args={[config.pillarRadius, config.pillarRadius, config.pillarHeight, 32, 1, true]} />
        <meshStandardMaterial 
          color={config.color} 
          transparent 
          opacity={0.2} 
          emissive={config.color} 
          emissiveIntensity={config.emissiveIntensity} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[config.pillarRadius + 1, config.pillarRadius + 1.5, 32]} />
        <meshBasicMaterial color={config.color} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Inner Core — floating geometric shape */}
      <mesh ref={coreRef} position={[0, config.pillarHeight * 0.3, 0]}>
        <CoreGeometry type={config.coreGeom} size={config.coreSize} />
        <meshStandardMaterial color={config.color} emissive={config.color} emissiveIntensity={2.5} />
      </mesh>

      {/* Ground ring — pulsing */}
      <group ref={ringPulseRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <ringGeometry args={[config.ringSize - 0.2, config.ringSize, 32]} />
          <meshBasicMaterial color={config.color} transparent opacity={0.6} />
        </mesh>
        {/* Second inner ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
          <ringGeometry args={[config.ringSize * 0.5, config.ringSize * 0.55, 32]} />
          <meshBasicMaterial color={config.color} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Boss: extra decorative rings */}
      {type === 'Boss' && (
        <>
          <mesh position={[0, config.pillarHeight * 0.7, 0]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[config.pillarRadius * 1.2, 0.1, 8, 32]} />
            <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={1} transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, config.pillarHeight * 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[config.pillarRadius * 1.0, 0.08, 8, 32]} />
            <meshStandardMaterial color="#FCA5A5" emissive="#FCA5A5" emissiveIntensity={0.8} transparent opacity={0.3} />
          </mesh>
        </>
      )}

      {/* Trap: warning triangles */}
      {isTrap && (
        <group position={[0, 2, 0]}>
          {[0, 1, 2].map(i => (
            <mesh key={i} position={[Math.cos(i * Math.PI * 2/3) * 2.5, 0, Math.sin(i * Math.PI * 2/3) * 2.5]} rotation={[0, i * Math.PI * 2/3, 0]}>
              <coneGeometry args={[0.3, 0.6, 3]} />
              <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={1.5} />
            </mesh>
          ))}
        </group>
      )}

      {/* Billboard labels — always face camera, rendered on top */}
      <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
        position={[0, labelY, 0]}
      >
        {/* Dark background plate for readability */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[chapterLabel.length * 0.5 + 1, typeLabel ? 1.8 : 1.2]} />
          <meshBasicMaterial color="#0A0E1A" transparent opacity={0.75} depthTest={false} />
        </mesh>
        
        {/* Chapter label */}
        <Text
          fontSize={0.7}
          color={config.labelColor}
          anchorX="center"
          anchorY="middle"
          position={[0, typeLabel ? 0.25 : 0, 0]}
          outlineWidth={0.04}
          outlineColor="#000000"
          depthTest={false}
          renderOrder={10}
        >
          {chapterLabel}
        </Text>

        {/* Type label (if Boss, Loot, etc.) */}
        {typeLabel && (
          <Text
            fontSize={0.5}
            color={config.color}
            anchorX="center"
            anchorY="middle"
            position={[0, -0.35, 0]}
            outlineWidth={0.03}
            outlineColor="#000000"
            depthTest={false}
            renderOrder={10}
          >
            {typeLabel}
          </Text>
        )}
      </Billboard>
    </group>
  );
}
