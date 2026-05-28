export default function MiniMap({ gameState, myConnectionId }) {
  const players = gameState?.players || [];
  const safeZone = gameState?.safeZone || { centerX: 0, centerZ: 0, radius: 500, targetRadius: 500 };
  const zones = gameState?.knowledgeZones || [];
  const MAP_SIZE = 1000;
  const isMobile = window.innerWidth < 768;
  const MINIMAP_SIZE = isMobile ? 120 : 200;
  const scale = MINIMAP_SIZE / MAP_SIZE;

  const toMapX = (worldX) => MINIMAP_SIZE / 2 + worldX * scale;
  const toMapY = (worldZ) => MINIMAP_SIZE / 2 + worldZ * scale;

  const myPlayer = players.find(p => p.id === myConnectionId);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        width: `${MINIMAP_SIZE}px`,
        height: `${MINIMAP_SIZE}px`,
        background: 'rgba(0,0,0,0.7)',
        borderRadius: '12px',
        border: '2px solid rgba(255,255,255,0.2)',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Safe Zone circle */}
      <div style={{
        position: 'absolute',
        left: `${toMapX(safeZone.centerX) - safeZone.radius * scale}px`,
        top: `${toMapY(safeZone.centerZ) - safeZone.radius * scale}px`,
        width: `${safeZone.radius * scale * 2}px`,
        height: `${safeZone.radius * scale * 2}px`,
        borderRadius: '50%',
        border: '2px solid rgba(59, 130, 246, 0.8)',
        background: 'rgba(59, 130, 246, 0.05)',
      }} />

      {/* Target zone (where it's shrinking to) */}
      {safeZone.targetRadius < safeZone.radius && (
        <div style={{
          position: 'absolute',
          left: `${toMapX(safeZone.centerX) - safeZone.targetRadius * scale}px`,
          top: `${toMapY(safeZone.centerZ) - safeZone.targetRadius * scale}px`,
          width: `${safeZone.targetRadius * scale * 2}px`,
          height: `${safeZone.targetRadius * scale * 2}px`,
          borderRadius: '50%',
          border: '2px dashed rgba(255, 255, 255, 0.4)',
        }} />
      )}

      {/* Knowledge Zones - only show if scanning */}
      {myPlayer?.isScanning && zones.filter(z => z.isActive).map(z => (
        <div key={z.zoneId} style={{
          position: 'absolute',
          left: `${toMapX(z.x) - 3}px`,
          top: `${toMapY(z.z) - 3}px`,
          width: '6px',
          height: '6px',
          background: '#FBBF24',
          borderRadius: '50%',
          boxShadow: '0 0 6px #FBBF24',
        }} />
      ))}

      {/* Other players - only show if scanning */}
      {myPlayer?.isScanning && players.filter(p => p.id !== myConnectionId && !p.isDead).map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${toMapX(p.x) - 4}px`,
          top: `${toMapY(p.z) - 4}px`,
          width: '8px',
          height: '8px',
          transform: `rotate(${-(p.rotationY || 0)}rad)`,
          transformOrigin: 'center',
        }}>
          {/* Directional Triangle */}
          <div style={{
            width: 0, height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: '8px solid #EF4444',
            filter: 'drop-shadow(0 0 4px #EF4444)',
          }} />
        </div>
      ))}

      {/* My player (larger, green, directional arrow) */}
      {myPlayer && (
        <div style={{
          position: 'absolute',
          left: `${toMapX(myPlayer.x) - 6}px`,
          top: `${toMapY(myPlayer.z) - 6}px`,
          width: '12px',
          height: '12px',
          transform: `rotate(${-(myPlayer.rotationY || 0)}rad)`,
          transformOrigin: 'center',
          display: 'flex', alignItems: 'center', justifyItems: 'center', flexDirection: 'column'
        }}>
          {/* Directional Triangle */}
          <div style={{
            width: 0, height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderBottom: '12px solid #10B981',
            filter: 'drop-shadow(0 0 8px #10B981)',
          }} />
        </div>
      )}

      {/* Labels */}
      <div style={{
        position: 'absolute',
        top: '4px',
        left: '6px',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.5)',
        fontWeight: 'bold',
      }}>MINIMAP</div>
    </div>
  );
}
