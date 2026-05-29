import { useState, useRef, useEffect, useCallback } from 'react';

export default function HostDashboard({ gameState, myConnectionId, connection, roomCode }) {
  const players = gameState?.players || [];
  const items = gameState?.items || [];
  const safeZone = gameState?.safeZone || { centerX: 0, centerZ: 0, radius: 500, targetRadius: 500 };
  const zones = gameState?.knowledgeZones || [];
  const timeRemaining = gameState?.timeRemaining || 0;

  const [zoom, setZoom] = useState(0.8);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [focusPlayer, setFocusPlayer] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const mapRef = useRef(null);

  const MAP_SIZE = 1000;
  const MAP_PX = Math.min(window.innerWidth * 0.55, 700);
  const scale = (MAP_PX / MAP_SIZE) * zoom;

  const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const alive = players.filter(p => !p.isDead);

  // Follow focused player
  useEffect(() => {
    if (focusPlayer) {
      const p = players.find(pl => pl.id === focusPlayer);
      if (p) setPanOffset({ x: -p.x * scale + MAP_PX / 2, y: -p.z * scale + MAP_PX / 2 });
    }
  }, [focusPlayer, players, scale]);

  const toX = (wx) => MAP_PX / 2 + wx * scale + panOffset.x;
  const toY = (wz) => MAP_PX / 2 + wz * scale + panOffset.y;

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const onWheel = (e) => { e.stopPropagation(); setZoom(z => Math.max(0.3, Math.min(4, z - e.deltaY * 0.003))); };
  const onPointerDown = (e) => { setIsDragging(true); setFocusPlayer(null); dragStart.current = { x: e.clientX, y: e.clientY, ox: panOffset.x, oy: panOffset.y }; };
  const onPointerMove = (e) => { if (!isDragging) return; setPanOffset({ x: dragStart.current.ox + (e.clientX - dragStart.current.x), y: dragStart.current.oy + (e.clientY - dragStart.current.y) }); };
  const onPointerUp = () => setIsDragging(false);

  const focusedPlayer = focusPlayer ? players.find(p => p.id === focusPlayer) : null;

  const getHpColor = (p) => { const pct = p.hp / (p.maxHP || 100) * 100; return pct > 60 ? '#10B981' : pct > 30 ? '#F59E0B' : '#EF4444'; };
  const isOutsideZone = (p) => { const dx = p.x - (safeZone.centerX || 0), dz = p.z - (safeZone.centerZ || 0); return Math.sqrt(dx * dx + dz * dz) > (safeZone.radius || 500); };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0a0e1a', color: 'white', fontFamily: "'Inter', sans-serif", display: 'flex', overflow: 'hidden', zIndex: 100 }}>

      {/* ===== LEFT: TACTICAL MAP ===== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#F59E0B', letterSpacing: '2px' }}>🎮 HOST TACTICAL</div>
            <div style={{ padding: '4px 12px', borderRadius: '8px', background: gameState?.status === 'Playing' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', color: gameState?.status === 'Playing' ? '#10B981' : '#EF4444', fontSize: '12px', fontWeight: 700 }}>{gameState?.status || 'Unknown'}</div>
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#6B7280', textTransform: 'uppercase' }}>Time</div>
              <div style={{ fontSize: '22px', fontWeight: 900, fontFamily: 'monospace', color: timeRemaining < 60 ? '#EF4444' : '#E5E7EB' }}>{formatTime(timeRemaining)}</div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#6B7280', textTransform: 'uppercase' }}>Alive</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#10B981' }}>{alive.length}<span style={{ fontSize: '12px', color: '#6B7280' }}>/{players.length}</span></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#6B7280', textTransform: 'uppercase' }}>Phase</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: safeZone.isShrinking ? '#EF4444' : '#3B82F6' }}>{safeZone.phase || 0}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: '#6B7280', textTransform: 'uppercase' }}>Zoom</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#A78BFA' }}>{zoom.toFixed(1)}x</div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div ref={mapRef} style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab', background: '#0d1117' }}
          onWheel={onWheel} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>

          {/* Grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: `${30 * zoom}px ${30 * zoom}px`, backgroundPosition: `${panOffset.x + MAP_PX / 2}px ${panOffset.y + MAP_PX / 2}px` }} />

          {/* Map ground */}
          <div style={{ position: 'absolute', left: toX(-500), top: toY(-500), width: MAP_SIZE * scale, height: MAP_SIZE * scale, background: 'rgba(45, 80, 22, 0.3)', border: '2px solid rgba(45, 80, 22, 0.6)', borderRadius: '4px' }} />

          {/* Water */}
          <div style={{ position: 'absolute', left: toX(150) - 20 * scale, top: toY(-150) - 20 * scale, width: 40 * scale, height: 40 * scale, borderRadius: '50%', background: 'rgba(30, 111, 142, 0.4)', border: '1px solid rgba(30, 111, 142, 0.6)' }} />
          <div style={{ position: 'absolute', left: toX(-200) - 15 * scale, top: toY(200) - 15 * scale, width: 30 * scale, height: 30 * scale, borderRadius: '50%', background: 'rgba(30, 111, 142, 0.4)', border: '1px solid rgba(30, 111, 142, 0.6)' }} />

          {/* Safe Zone */}
          <div style={{ position: 'absolute', left: toX(safeZone.centerX || 0) - (safeZone.radius || 500) * scale, top: toY(safeZone.centerZ || 0) - (safeZone.radius || 500) * scale, width: (safeZone.radius || 500) * scale * 2, height: (safeZone.radius || 500) * scale * 2, borderRadius: '50%', border: '3px solid rgba(59, 130, 246, 0.7)', background: 'rgba(59, 130, 246, 0.06)', transition: 'all 0.5s linear', boxShadow: '0 0 30px rgba(59, 130, 246, 0.15)' }} />

          {/* Target Zone */}
          {(safeZone.targetRadius || 500) < (safeZone.radius || 500) && (
            <div style={{ position: 'absolute', left: toX(safeZone.centerX || 0) - safeZone.targetRadius * scale, top: toY(safeZone.centerZ || 0) - safeZone.targetRadius * scale, width: safeZone.targetRadius * scale * 2, height: safeZone.targetRadius * scale * 2, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.5)', animation: 'pulse 2s infinite' }} />
          )}

          {/* Knowledge Zones */}
          {zones.filter(z => z.isActive).map(z => {
            let c = '#3B82F6'; if (z.type === 'Boss') c = '#EF4444'; else if (z.type === 'LootBox') c = '#A855F7'; else if (z.isTrap) c = '#F59E0B';
            return (
              <div key={z.zoneId} style={{ position: 'absolute', left: toX(z.x) - (z.type === 'Boss' ? 8 : 5), top: toY(z.z) - (z.type === 'Boss' ? 8 : 5), width: z.type === 'Boss' ? 16 : 10, height: z.type === 'Boss' ? 16 : 10, background: c, borderRadius: '50%', boxShadow: `0 0 10px ${c}`, border: '2px solid rgba(255,255,255,0.3)' }}>
                <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', fontSize: '8px', color: c, fontWeight: 700, whiteSpace: 'nowrap' }}>{z.topicName?.substring(0, 8)}</div>
              </div>
            );
          })}

          {/* Items */}
          {items.map(item => {
            let c = '#10B981'; if (item.type === 'Score') c = '#FBBF24'; if (item.type === 'Speed') c = '#06B6D4';
            return <div key={item.id} style={{ position: 'absolute', left: toX(item.x) - 4, top: toY(item.z) - 4, width: 8, height: 8, background: c, transform: 'rotate(45deg)', boxShadow: `0 0 8px ${c}`, border: '1px solid rgba(255,255,255,0.4)' }} />;
          })}

          {/* Players */}
          {players.map(p => {
            const isFocused = focusPlayer === p.id;
            const outside = isOutsideZone(p);
            const hpPct = p.hp / (p.maxHP || 100);
            const lowHp = hpPct < 0.3;
            return (
              <div key={p.id} style={{ position: 'absolute', left: toX(p.x), top: toY(p.z), zIndex: isFocused ? 20 : 10, cursor: 'pointer', pointerEvents: 'auto' }}
                onClick={(e) => { e.stopPropagation(); setFocusPlayer(focusPlayer === p.id ? null : p.id); }}>

                {/* Focus ring */}
                {isFocused && <div style={{ position: 'absolute', left: -12, top: -12, width: 24, height: 24, borderRadius: '50%', border: '2px solid #F59E0B', animation: 'pulse 1s infinite', boxShadow: '0 0 20px rgba(245,158,11,0.5)' }} />}

                {/* Outside zone blink */}
                {outside && !p.isDead && <div style={{ position: 'absolute', left: -10, top: -10, width: 20, height: 20, borderRadius: '50%', border: '2px solid #EF4444', animation: 'pulse 0.5s infinite' }} />}

                {/* Direction arrow */}
                <div style={{ position: 'absolute', left: -6, top: -6, width: 12, height: 12, transform: `rotate(${-(p.rotationY || 0)}rad)`, transformOrigin: 'center' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: `12px solid ${p.isDead ? '#4B5563' : (sorted[0]?.id === p.id ? '#FBBF24' : '#10B981')}`, filter: `drop-shadow(0 0 ${isFocused ? '8' : '4'}px ${sorted[0]?.id === p.id ? '#FBBF24' : '#10B981'})` }} />
                </div>

                {/* HP bar */}
                {!p.isDead && (
                  <div style={{ position: 'absolute', top: -14, left: -16, width: 32, height: 4, background: 'rgba(0,0,0,0.6)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${hpPct * 100}%`, height: '100%', background: getHpColor(p), borderRadius: 2 }} />
                  </div>
                )}

                {/* Name + Score */}
                <div style={{ position: 'absolute', top: 10, left: -50, width: 100, textAlign: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: p.isDead ? '#6B7280' : '#E5E7EB', textShadow: '0 1px 3px #000', textDecoration: p.isDead ? 'line-through' : 'none' }}>{p.username}</div>
                  <div style={{ fontSize: '8px', color: '#06B6D4', fontWeight: 700 }}>{p.score || 0}pts</div>
                </div>

                {/* Status badges */}
                {p.isStunned && <div style={{ position: 'absolute', top: -22, left: -4, fontSize: '10px' }}>💫</div>}
                {p.hasDouble && <div style={{ position: 'absolute', top: -22, right: -4, fontSize: '10px' }}>🎲</div>}
                {p.isDead && <div style={{ position: 'absolute', top: -6, left: -6, fontSize: '12px' }}>💀</div>}
                {lowHp && !p.isDead && <div style={{ position: 'absolute', top: -22, left: 6, fontSize: '8px', color: '#EF4444', fontWeight: 900, animation: 'pulse 0.5s infinite' }}>LOW</div>}
              </div>
            );
          })}
        </div>

        {/* Bottom Controls */}
        <div style={{ display: 'flex', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button style={btnStyle('#3B82F6')} onClick={() => { setPanOffset({ x: 0, y: 0 }); setZoom(0.8); setFocusPlayer(null); }}>🔄 Reset</button>
          <button style={btnStyle('#10B981')} onClick={() => setZoom(z => Math.min(4, z + 0.3))}>🔍+</button>
          <button style={btnStyle('#F59E0B')} onClick={() => setZoom(z => Math.max(0.3, z - 0.3))}>🔍−</button>
          <button style={btnStyle(showHeatmap ? '#EF4444' : '#6B7280')} onClick={() => setShowHeatmap(!showHeatmap)}>🌡 Heatmap</button>
          {focusPlayer && <button style={btnStyle('#A855F7')} onClick={() => setFocusPlayer(null)}>❌ Unfollow</button>}
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div style={{ width: '340px', display: 'flex', flexDirection: 'column', borderLeft: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>

        {/* Focused Player Detail */}
        {focusedPlayer && (
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(245,158,11,0.05)' }}>
            <div style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>👁 SPECTATING</div>
            <div style={{ fontSize: '18px', fontWeight: 900 }}>{focusedPlayer.username}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
              <StatBox label="HP" value={`${focusedPlayer.hp}/${focusedPlayer.maxHP}`} color={getHpColor(focusedPlayer)} />
              <StatBox label="Score" value={focusedPlayer.score || 0} color="#06B6D4" />
              <StatBox label="Combo" value={`x${focusedPlayer.combo || 0}`} color="#F97316" />
              <StatBox label="Ammo" value={focusedPlayer.ammo || 0} color="#A78BFA" />
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
              {focusedPlayer.isDead && <Badge text="DEAD" color="#EF4444" />}
              {focusedPlayer.isStunned && <Badge text="STUNNED" color="#F59E0B" />}
              {focusedPlayer.isSilenced && <Badge text="SILENCED" color="#6B7280" />}
              {focusedPlayer.hasDouble && <Badge text="DOUBLE" color="#F59E0B" />}
              {focusedPlayer.activeBuff && <Badge text={focusedPlayer.activeBuff} color="#10B981" />}
              {isOutsideZone(focusedPlayer) && <Badge text="OUTSIDE ZONE" color="#EF4444" />}
              {focusedPlayer.hasQuestionShield && <Badge text="ANSWERING" color="#3B82F6" />}
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px' }}>
          <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>🏆 LIVE LEADERBOARD</div>
          {sorted.map((p, i) => {
            const isFocused = focusPlayer === p.id;
            const outside = isOutsideZone(p);
            const hpPct = p.hp / (p.maxHP || 100);
            return (
              <div key={p.id} onClick={() => setFocusPlayer(focusPlayer === p.id ? null : p.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', marginBottom: '4px', borderRadius: '8px', cursor: 'pointer', background: isFocused ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${isFocused ? 'rgba(245,158,11,0.3)' : 'transparent'}`, transition: 'all 0.2s' }}>
                <div style={{ width: '22px', fontSize: '14px', fontWeight: 900, color: i === 0 ? '#FBBF24' : i === 1 ? '#94A3B8' : i === 2 ? '#CD7F32' : '#6B7280' }}>
                  {i === 0 ? '👑' : `#${i + 1}`}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: p.isDead ? '#6B7280' : '#E5E7EB', textDecoration: p.isDead ? 'line-through' : 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {p.username} {p.isDead && '💀'} {outside && !p.isDead && <span style={{ color: '#EF4444', fontSize: '10px' }}>⚠</span>}
                  </div>
                  {/* HP mini bar */}
                  <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${hpPct * 100}%`, height: '100%', background: getHpColor(p), borderRadius: '2px', transition: 'width 0.3s' }} />
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', fontWeight: 900, color: '#06B6D4' }}>{p.score || 0}</div>
                  <div style={{ fontSize: '9px', color: '#6B7280' }}>{p.hp}/{p.maxHP} HP</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Match Stats */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>📊 MATCH STATS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <StatBox label="Questions" value={zones.filter(z => z.isActive).length} color="#3B82F6" />
            <StatBox label="Items" value={items.length} color="#10B981" />
            <StatBox label="Zone R" value={Math.round(safeZone.radius || 0)} color="#F59E0B" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontSize: '9px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontSize: '16px', fontWeight: 900, color }}>{value}</div>
    </div>
  );
}

function Badge({ text, color }) {
  return <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: `${color}22`, color, border: `1px solid ${color}44`, textTransform: 'uppercase' }}>{text}</span>;
}

const btnStyle = (color) => ({
  padding: '6px 14px', borderRadius: '8px', border: `1px solid ${color}66`, background: `${color}22`, color, fontSize: '12px', fontWeight: 700, cursor: 'pointer', pointerEvents: 'auto'
});
