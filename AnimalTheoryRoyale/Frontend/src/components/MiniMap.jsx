import { useState } from 'react';

export default function MiniMap({ gameState, myConnectionId }) {
  const players = gameState?.players || [];
  const items = gameState?.items || [];
  const safeZone = gameState?.safeZone || { centerX: 0, centerZ: 0, radius: 500, targetRadius: 500 };
  const zones = gameState?.knowledgeZones || [];
  
  const [zoom, setZoom] = useState(1);
  const MAP_SIZE = 1000;
  const isMobile = window.innerWidth < 768;
  const MINIMAP_SIZE = isMobile ? 140 : 220;
  
  // Real scale factors based on zoom
  const scale = (MINIMAP_SIZE / MAP_SIZE) * zoom;
  
  // Center minimap on player, or default center if dead
  const myPlayer = players.find(p => p.id === myConnectionId);
  const centerX = myPlayer ? myPlayer.x : 0;
  const centerZ = myPlayer ? myPlayer.z : 0;

  // We map coordinates relative to the player to keep them centered on the minimap
  const toMapX = (worldX) => MINIMAP_SIZE / 2 + (worldX - centerX) * scale;
  const toMapY = (worldZ) => MINIMAP_SIZE / 2 + (worldZ - centerZ) * scale;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        width: `${MINIMAP_SIZE}px`,
        height: `${MINIMAP_SIZE}px`,
        background: 'rgba(15, 23, 42, 0.85)',
        borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.3)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(59, 130, 246, 0.2)',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
      onWheel={(e) => {
        // Stop event propagation so it doesn't zoom camera
        e.stopPropagation();
        setZoom(z => Math.max(0.5, Math.min(3, z - e.deltaY * 0.002)));
      }}
    >
      {/* Grid Pattern Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        backgroundPosition: `${toMapX(0)}px ${toMapY(0)}px`
      }} />

      {/* Crosshair Center */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.1)' }} />

      {/* Safe Zone circle */}
      <div style={{
        position: 'absolute',
        left: `${toMapX(safeZone.centerX) - safeZone.radius * scale}px`,
        top: `${toMapY(safeZone.centerZ) - safeZone.radius * scale}px`,
        width: `${safeZone.radius * scale * 2}px`,
        height: `${safeZone.radius * scale * 2}px`,
        borderRadius: '50%',
        border: '2px solid rgba(59, 130, 246, 0.8)',
        background: 'rgba(59, 130, 246, 0.1)',
        transition: 'all 0.5s linear'
      }} />

      {/* Target shrink zone */}
      {safeZone.targetRadius < safeZone.radius && (
        <div style={{
          position: 'absolute',
          left: `${toMapX(safeZone.centerX) - safeZone.targetRadius * scale}px`,
          top: `${toMapY(safeZone.centerZ) - safeZone.targetRadius * scale}px`,
          width: `${safeZone.targetRadius * scale * 2}px`,
          height: `${safeZone.targetRadius * scale * 2}px`,
          borderRadius: '50%',
          border: '2px dashed rgba(255, 255, 255, 0.6)',
          animation: 'pulse 2s infinite'
        }} />
      )}

      {/* Knowledge Zones */}
      {zones.filter(z => z.isActive).map(z => {
        let color = '#3B82F6'; // Normal
        if (z.type === 'Boss') color = '#EF4444';
        else if (z.type === 'LootBox') color = '#A855F7';
        else if (z.isTrap) color = '#F59E0B';

        return (
          <div key={z.zoneId} style={{
            position: 'absolute',
            left: `${toMapX(z.x) - 4}px`,
            top: `${toMapY(z.z) - 4}px`,
            width: z.type === 'Boss' ? '10px' : '8px',
            height: z.type === 'Boss' ? '10px' : '8px',
            background: color,
            borderRadius: '50%',
            boxShadow: `0 0 8px ${color}`,
          }} />
        );
      })}

      {/* Items */}
      {items.map(item => {
        let color = '#10B981'; // HP
        if (item.type === 'Score') color = '#FBBF24';
        if (item.type === 'Speed') color = '#06B6D4';

        return (
          <div key={item.id} style={{
            position: 'absolute',
            left: `${toMapX(item.x) - 3}px`,
            top: `${toMapY(item.z) - 3}px`,
            width: '6px',
            height: '6px',
            background: color,
            transform: 'rotate(45deg)',
            boxShadow: `0 0 6px ${color}`,
            animation: 'pulse 1s infinite'
          }} />
        );
      })}

      {/* Other players */}
      {players.filter(p => p.id !== myConnectionId && !p.isDead).map(p => (
        <div key={p.id} style={{ position: 'absolute', left: `${toMapX(p.x)}px`, top: `${toMapY(p.z)}px` }}>
          <div style={{
            position: 'absolute',
            left: '-4px', top: '-4px',
            width: '8px', height: '8px',
            transform: `rotate(${-(p.rotationY || 0)}rad)`,
            transformOrigin: 'center',
          }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderBottom: '8px solid #EF4444',
              filter: 'drop-shadow(0 0 4px #EF4444)',
            }} />
          </div>
          {/* Player Name */}
          <div style={{
            position: 'absolute',
            top: '8px', left: '-50px', width: '100px',
            textAlign: 'center', fontSize: '8px',
            color: '#FCA5A5', textShadow: '0 1px 2px #000',
            whiteSpace: 'nowrap', pointerEvents: 'none'
          }}>
            {p.username}
          </div>
        </div>
      ))}

      {/* My player */}
      {myPlayer && (
        <div style={{
          position: 'absolute',
          left: `${toMapX(myPlayer.x) - 6}px`,
          top: `${toMapY(myPlayer.z) - 6}px`,
          width: '12px',
          height: '12px',
          transform: `rotate(${-(myPlayer.rotationY || 0)}rad)`,
          transformOrigin: 'center',
          zIndex: 10
        }}>
          {/* View Cone */}
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '-14px',
            width: 0, height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '30px solid rgba(255,255,255,0.15)',
          }} />
          {/* Arrow */}
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
        position: 'absolute', top: '8px', left: 0, right: 0,
        textAlign: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.6)',
        fontWeight: 'bold', letterSpacing: '2px', pointerEvents: 'none'
      }}>
        RADAR {zoom !== 1 ? `(${zoom.toFixed(1)}x)` : ''}
      </div>
    </div>
  );
}
