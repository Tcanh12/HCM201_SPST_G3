import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MAP_OBSTACLES, MAP_SIZE } from './MapObstacles';
import { getMapConfig } from '../data/mapData';

function DynamicLighting({ mapConfig, enabled = true, startedAt }) {
  const ambientRef = useRef(null);
  const dirRef = useRef(null);

  useFrame(() => {
    if (!enabled) return;

    const cycleDuration = 120000;
    const elapsed = Date.now() - (startedAt ? new Date(startedAt).getTime() : Date.now());
    const t = (elapsed % cycleDuration) / cycleDuration;

    const wave = (Math.sin(t * Math.PI * 2 - Math.PI / 2) + 1) / 2;

    const ambientMin = 0.5;
    const ambientMax = mapConfig.ambientLight ?? 1.25;

    const dirMin = 0.5;
    const dirMax = mapConfig.directionalLight ?? 1.75;

    const ambientIntensity = ambientMin + (ambientMax - ambientMin) * wave;
    const dirIntensity = dirMin + (dirMax - dirMin) * wave;

    if (ambientRef.current) {
      ambientRef.current.intensity = ambientIntensity;
    }

    if (dirRef.current) {
      dirRef.current.intensity = dirIntensity;
      dirRef.current.position.x = Math.cos(t * Math.PI * 2) * 100;
      dirRef.current.position.z = Math.sin(t * Math.PI * 2) * 100;
      dirRef.current.position.y = 150;
    }
  });

  return (
    <group>
      <ambientLight ref={ambientRef} intensity={mapConfig.ambientLight ?? 1.2} color={mapConfig.accentColor || '#ffffff'} />
      <directionalLight
        ref={dirRef}
        position={[100, 200, 100]}
        intensity={mapConfig.directionalLight ?? 1.7}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
    </group>
  );
}

export default function MapEnvironment({ mapKey = 'academy', dynamicLighting = true, startedAt }) {
  const config = getMapConfig(mapKey);

  const theme = {
    groundColor: config.groundColor || '#1A2E1A',
    gridColor: config.fogColor || '#112211',
    hillColor: config.accentColor || '#2B4A2B',
    rockColor: '#555555',
    treeColor: config.theme === 'forest' ? '#14532D' : '#228B22',
    waterColor: config.theme === 'harbor' ? '#0284C7' : '#0284C7',
    ambientLight: config.ambientLight || 1.2,
    fogColor: config.fogColor || '#0A0E1A',
    hasRiver: config.theme === 'harbor' || config.theme === 'forest' || config.theme === 'academy',
    riverTexture: config.theme === 'harbor' ? 'smooth' : 'rough',
    buildingColor: config.theme === 'academy' ? '#8B7355' : '#3F2E23'
  };

  return (
    <group>
      {/* Dynamic Lighting */}
      <DynamicLighting mapConfig={config} enabled={dynamicLighting} startedAt={startedAt} />
      
      {/* Fog */}
      <fog attach="fog" args={[theme.fogColor, 200, 600]} />

      {/* Main ground plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[MAP_SIZE, MAP_SIZE, 100, 100]} />
        <meshStandardMaterial color={theme.groundColor} roughness={0.9} />
      </mesh>

      {/* Grid overlay */}
      <gridHelper args={[MAP_SIZE, 50, theme.gridColor, theme.gridColor]} position={[0, 0.01, 0]} />

      {/* Playable area border */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[MAP_SIZE * 0.5, MAP_SIZE * 0.8, 64]} />
        <meshStandardMaterial color={theme.gridColor} roughness={1} />
      </mesh>

      {/* Hills */}
      {MAP_OBSTACLES.filter(o => o.renderType === 'hill').map((h) => (
        <mesh key={h.id} position={[h.x, h.renderHeight * 0.4, h.z]} receiveShadow castShadow>
          <sphereGeometry args={[h.renderRadius, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={theme.hillColor} roughness={0.85} />
        </mesh>
      ))}

      {/* Rocks */}
      {MAP_OBSTACLES.filter(o => o.renderType === 'rock').map((o) => (
        <mesh key={o.id} position={[o.x, o.radius * 0.5, o.z]} rotation={[0, o.rotation || 0, 0]} castShadow receiveShadow>
          <dodecahedronGeometry args={[o.radius, 0]} />
          <meshStandardMaterial color={theme.rockColor} roughness={0.8} />
        </mesh>
      ))}

      {/* Trees */}
      {MAP_OBSTACLES.filter(o => o.renderType === 'tree').map((o) => (
        <group key={o.id} position={[o.x, 0, o.z]}>
          <mesh position={[0, o.renderScale * 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.3 * o.renderScale, 0.5 * o.renderScale, o.renderScale * 2.5, 6]} />
            <meshStandardMaterial color="#3E2723" roughness={0.9} />
          </mesh>
          <mesh position={[0, o.renderScale * 2.8, 0]} castShadow>
            <coneGeometry args={[o.renderScale * 1.5, o.renderScale * 2, 6]} />
            <meshStandardMaterial color={theme.treeColor} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Buildings */}
      {MAP_OBSTACLES.filter(o => o.renderType === 'building').map((o) => (
        <group key={o.id} position={[o.x, 0, o.z]} rotation={[0, o.rotation, 0]}>
          <mesh position={[0, o.height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[o.width, o.height, o.depth]} />
            <meshStandardMaterial color={theme.buildingColor} roughness={0.7} />
          </mesh>
          <mesh position={[0, o.height + 1, 0]} castShadow>
            <coneGeometry args={[o.renderScale * 1.5, 3, 4]} />
            <meshStandardMaterial color="#27272A" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* === RIVER & BRIDGE === */}
      {theme.hasRiver && (
        <group>
          <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 4]} receiveShadow>
            <planeGeometry args={[MAP_SIZE * 1.5, 60, 32, 4]} />
            <meshStandardMaterial 
              color={theme.waterColor} 
              transparent 
              opacity={0.7} 
              roughness={theme.riverTexture === 'smooth' ? 0.1 : 0.6} 
              metalness={theme.riverTexture === 'smooth' ? 0.6 : 0.1} 
            />
          </mesh>

          <group position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
              <boxGeometry args={[16, 1, 80]} />
              <meshStandardMaterial color="#451A03" roughness={0.9} />
            </mesh>
            <mesh position={[-7.5, 2, 0]} castShadow>
              <boxGeometry args={[1, 1, 80]} />
              <meshStandardMaterial color="#291202" />
            </mesh>
            <mesh position={[7.5, 2, 0]} castShadow>
              <boxGeometry args={[1, 1, 80]} />
              <meshStandardMaterial color="#291202" />
            </mesh>
            <mesh position={[0, -5, 30]} castShadow>
              <cylinderGeometry args={[2, 2, 12, 16]} />
              <meshStandardMaterial color={theme.rockColor} />
            </mesh>
            <mesh position={[0, -5, -30]} castShadow>
              <cylinderGeometry args={[2, 2, 12, 16]} />
              <meshStandardMaterial color={theme.rockColor} />
            </mesh>
          </group>
        </group>
      )}

      {/* Map Specific Overlays */}
      {mapKey === 'badinh' && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0.5, 0]} receiveShadow>
            <boxGeometry args={[40, 1, 40]} />
            <meshStandardMaterial color="#450A0A" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.5, 0]} receiveShadow>
            <boxGeometry args={[30, 1, 30]} />
            <meshStandardMaterial color="#7F1D1D" roughness={0.8} />
          </mesh>
        </group>
      )}

      {mapKey === 'pacbo' && (
        <group position={[MAP_SIZE * 0.3, 0, MAP_SIZE * 0.3]}>
          <mesh position={[0, 5, 0]} receiveShadow castShadow>
            <dodecahedronGeometry args={[12, 0]} />
            <meshStandardMaterial color="#374151" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4, 10]} receiveShadow castShadow>
            <sphereGeometry args={[4, 16, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
        </group>
      )}

    </group>
  );
}
