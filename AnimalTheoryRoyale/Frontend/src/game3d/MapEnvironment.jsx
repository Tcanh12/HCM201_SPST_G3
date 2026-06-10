import * as THREE from 'three';
import { MAP_OBSTACLES, MAP_SIZE } from './MapObstacles';

/**
 * Renders the map environment based on the mapKey.
 * Modifies ground textures, colors, lighting, and water effects
 * to match the selected theme while preserving the same collision obstacles.
 */
export default function MapEnvironment({ mapKey = 'knowledge_campus' }) {
  // Map-specific configurations
  const getThemeConfig = () => {
    switch(mapKey) {
      case 'pac_bo_forest':
        return {
          groundColor: '#1A3320', // Darker green
          gridColor: '#0F2414',
          hillColor: '#2B5E33',
          rockColor: '#4B5563',
          treeColor: '#14532D',
          waterColor: '#059669',
          ambientLight: '#10B981',
          fogColor: '#022C22',
          hasRiver: true,
          riverTexture: 'rough',
          buildingColor: '#3F2E23'
        };
      case 'nha_rong_harbor':
        return {
          groundColor: '#1E293B', // Navy slate
          gridColor: '#0F172A',
          hillColor: '#334155',
          rockColor: '#475569',
          treeColor: '#064E3B',
          waterColor: '#0284C7', // Bright blue
          ambientLight: '#0EA5E9',
          fogColor: '#082F49',
          hasRiver: true,
          riverTexture: 'smooth',
          buildingColor: '#7C2D12' // Wood/Brick
        };
      case 'viet_bac_mountain':
        return {
          groundColor: '#2E1A33', // Deep purple
          gridColor: '#1A0F1F',
          hillColor: '#4C1D95',
          rockColor: '#581C87',
          treeColor: '#3B0764',
          waterColor: '#7C3AED',
          ambientLight: '#8B5CF6',
          fogColor: '#2E1065',
          hasRiver: false,
          buildingColor: '#451A03'
        };
      case 'ba_dinh_square':
        return {
          groundColor: '#3F1515', // Dark red
          gridColor: '#2A0E0E',
          hillColor: '#7F1D1D',
          rockColor: '#991B1B',
          treeColor: '#B91C1C',
          waterColor: '#DC2626',
          ambientLight: '#EF4444',
          fogColor: '#450A0A',
          hasRiver: false,
          buildingColor: '#7F1D1D'
        };
      case 'knowledge_campus':
      default:
        return {
          groundColor: '#1A2E1A', // Standard dark green
          gridColor: '#112211',
          hillColor: '#2B4A2B',
          rockColor: '#555555',
          treeColor: '#228B22',
          waterColor: '#0284C7',
          ambientLight: '#D4A843',
          fogColor: '#0A0E1A',
          hasRiver: true,
          riverTexture: 'smooth',
          buildingColor: '#8B7355'
        };
    }
  };

  const theme = getThemeConfig();

  return (
    <group>
      {/* Dynamic Lighting based on Map */}
      <ambientLight intensity={0.4} color={theme.ambientLight} />
      <directionalLight position={[100, 200, 100]} intensity={0.8} color="#FFFFFF" castShadow shadow-mapSize={[2048, 2048]} />
      
      {/* Fog based on map */}
      <fog attach="fog" args={[theme.fogColor, 200, 600]} />

      {/* Main ground plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[MAP_SIZE, MAP_SIZE, 100, 100]} />
        <meshStandardMaterial color={theme.groundColor} roughness={0.9} />
      </mesh>

      {/* Grid overlay for spatial awareness */}
      <gridHelper args={[MAP_SIZE, 50, theme.gridColor, theme.gridColor]} position={[0, 0.01, 0]} />

      {/* Darker border around playable area */}
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
          {/* Trunk */}
          <mesh position={[0, o.renderScale * 1.2, 0]} castShadow>
            <cylinderGeometry args={[0.3 * o.renderScale, 0.5 * o.renderScale, o.renderScale * 2.5, 6]} />
            <meshStandardMaterial color="#3E2723" roughness={0.9} />
          </mesh>
          {/* Canopy */}
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
          {/* Roof */}
          <mesh position={[0, o.height + 1, 0]} castShadow>
            <coneGeometry args={[o.renderScale * 1.5, 3, 4]} />
            <meshStandardMaterial color="#27272A" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* === RIVER & BRIDGE === */}
      {theme.hasRiver && (
        <>
          {/* River */}
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

          {/* Bridge */}
          <group position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
            {/* Bridge floor */}
            <mesh position={[0, 1, 0]} castShadow receiveShadow>
              <boxGeometry args={[16, 1, 80]} />
              <meshStandardMaterial color="#451A03" roughness={0.9} />
            </mesh>
            {/* Bridge railings */}
            <mesh position={[-7.5, 2, 0]} castShadow>
              <boxGeometry args={[1, 1, 80]} />
              <meshStandardMaterial color="#291202" />
            </mesh>
            <mesh position={[7.5, 2, 0]} castShadow>
              <boxGeometry args={[1, 1, 80]} />
              <meshStandardMaterial color="#291202" />
            </mesh>
            {/* Pillars */}
            <mesh position={[0, -5, 30]} castShadow>
              <cylinderGeometry args={[2, 2, 12, 16]} />
              <meshStandardMaterial color={theme.rockColor} />
            </mesh>
            <mesh position={[0, -5, -30]} castShadow>
              <cylinderGeometry args={[2, 2, 12, 16]} />
              <meshStandardMaterial color={theme.rockColor} />
            </mesh>
          </group>
        </>
      )}

      {/* Ba Dinh Square specific central monument */}
      {mapKey === 'ba_dinh_square' && (
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

      {/* Pac Bo specific cave entrance */}
      {mapKey === 'pac_bo_forest' && (
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
