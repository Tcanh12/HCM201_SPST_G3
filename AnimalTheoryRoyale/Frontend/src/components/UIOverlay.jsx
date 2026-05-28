import { useState } from 'react';

export default function UIOverlay({ gameState, myConnectionId, onSkill, onAiming }) {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const players = gameState?.players || [];
  const safeZone = gameState?.safeZone || {};
  const timeRemaining = gameState?.timeRemaining || 0;

  const myPlayer = players.find(p => p.id === myConnectionId);
  const sorted = [...players].sort((a, b) => (b.score || 0) - (a.score || 0));
  const myRank = sorted.findIndex(p => p.id === myConnectionId) + 1;

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  if (!myPlayer) return null;

  const hpPercent = Math.max(0, myPlayer.hp / (myPlayer.maxHP || 100) * 100);
  const hpColor = hpPercent > 60 ? '#10B981' : hpPercent > 30 ? '#F59E0B' : '#EF4444';

  const handlePointerDown = (e, type, cd) => {
    e.preventDefault();
    if (cd <= 0 && onAiming) onAiming(type);
  };

  const handlePointerUp = (e, type, cd) => {
    e.preventDefault();
    if (cd <= 0) {
      if (onAiming) onAiming(null);
      if (onSkill) onSkill(type);
    }
  };

  const handlePointerCancel = () => {
    if (onAiming) onAiming(null);
  };

  const renderSkillBtn = (name, icon, cd, key, type, tooltip) => (
    <div
      style={{
        position: 'relative', width: '56px', height: '56px', borderRadius: '12px',
        background: cd > 0 ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.1)',
        border: `2px solid ${cd > 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)'}`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        pointerEvents: cd > 0 ? 'none' : 'auto', cursor: cd > 0 ? 'default' : 'pointer',
        boxShadow: cd > 0 ? 'none' : '0 4px 12px rgba(0,0,0,0.5)',
        transition: 'all 0.2s', overflow: 'visible', touchAction: 'none'
      }}
      onPointerDown={(e) => handlePointerDown(e, type, cd)}
      onPointerUp={(e) => handlePointerUp(e, type, cd)}
      onPointerLeave={() => { handlePointerCancel(); setHoveredSkill(null); }}
      onPointerCancel={() => { handlePointerCancel(); setHoveredSkill(null); }}
      onPointerEnter={() => setHoveredSkill(type)}
    >
      <div style={{ fontSize: '20px', zIndex: 2, opacity: cd > 0 ? 0.4 : 1 }}>{icon}</div>
      <div style={{ fontSize: '10px', fontWeight: 'bold', zIndex: 2, opacity: cd > 0 ? 0.4 : 1 }}>{name}</div>
      <div style={{ position: 'absolute', top: 2, right: 4, fontSize: '10px', color: '#FBBF24', fontWeight: 'bold', zIndex: 2 }}>
        [{key}]
      </div>
      {cd > 0 && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', color: '#EF4444'
        }}>
          {Math.ceil(cd)}s
        </div>
      )}

      {/* Tooltip */}
      {hoveredSkill === type && (
        <div style={{
          position: 'absolute', bottom: '70px', right: '0', width: '220px',
          background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px', padding: '12px', color: 'white', textAlign: 'left',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50,
          animation: 'fadeUp 0.2s ease-out forwards'
        }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#FBBF24', marginBottom: '4px' }}>{name}</div>
          <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.4' }}>{tooltip}</div>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ pointerEvents: 'none', color: 'white', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Center: Timer + Zone Info */}
      <div style={{
        position: 'absolute', top: '12px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: '16px',
        background: 'rgba(0,0,0,0.6)', borderRadius: '16px', padding: '8px 24px',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase' }}>Thời gian</div>
          <div style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'monospace', color: timeRemaining < 60 ? '#EF4444' : 'white' }}>
            {formatTime(timeRemaining)}
          </div>
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase' }}>Vòng bo</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: safeZone.isShrinking ? '#EF4444' : '#3B82F6' }}>
            {safeZone.isShrinking ? '⚠️ ĐANG THU' : `Phase ${safeZone.phase || 0}`}
          </div>
          {!safeZone.isShrinking && safeZone.nextShrinkIn > 0 && (
            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
              Thu sau {Math.ceil(safeZone.nextShrinkIn)}s
            </div>
          )}
        </div>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#9CA3AF', textTransform: 'uppercase' }}>Còn sống</div>
          <div style={{ fontSize: '20px', fontWeight: 900 }}>
            {players.filter(p => !p.isDead).length}/{players.length}
          </div>
        </div>
      </div>

      {/* Bottom Center: HP Bar + Stats */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.7)', borderRadius: '16px', padding: '12px 24px',
        border: '1px solid rgba(255,255,255,0.1)', minWidth: '400px',
      }}>
        {myPlayer.activeBuff && (
          <div style={{
            position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(52, 211, 153, 0.2)', border: '1px solid #34D399', borderRadius: '8px',
            padding: '4px 12px', color: '#34D399', fontWeight: 'bold', fontSize: '14px',
            boxShadow: '0 0 10px rgba(52, 211, 153, 0.5)', animation: 'pulse 1.5s infinite'
          }}>
            ⬆️ BUFF: {myPlayer.activeBuff}
          </div>
        )}

        {/* HP Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '30px' }}>HP</span>
          <div style={{
            flex: 1, height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '7px', overflow: 'hidden'
          }}>
            <div style={{
              width: `${hpPercent}%`, height: '100%', background: hpColor, borderRadius: '7px',
              transition: 'width 0.3s, background 0.3s',
              boxShadow: `0 0 10px ${hpColor}50`,
            }} />
          </div>
          <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', minWidth: '60px', textAlign: 'right' }}>
            {myPlayer.hp}/{myPlayer.maxHP}
          </span>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Điểm</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#06B6D4' }}>{myPlayer.score || 0}</div>
          </div>
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Combo</div>
            <div style={{ 
              fontSize: '20px', fontWeight: 900, color: '#F97316',
              textShadow: (myPlayer.combo || 0) >= 3 ? '0 0 10px #F97316, 0 0 20px #EF4444' : 'none',
              transform: (myPlayer.combo || 0) >= 3 ? 'scale(1.2)' : 'none',
              transition: 'all 0.3s'
            }}>x{myPlayer.combo || 0}</div>
            
            {/* Big floating combo effect */}
            {(myPlayer.combo || 0) >= 2 && (
              <div style={{
                position: 'absolute', bottom: '100%', left: '50%', transform: 'translate(-50%, -10px)',
                fontSize: '24px', fontWeight: '900', color: '#FEF08A',
                textShadow: '0 0 15px #F59E0B, 0 0 30px #EF4444',
                whiteSpace: 'nowrap', pointerEvents: 'none',
                animation: 'bounce 1s infinite alternate'
              }}>
                🔥 COMBO x{(myPlayer.combo || 0)}
              </div>
            )}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Đạn</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#A78BFA' }}>{myPlayer.ammo || 0}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#9CA3AF' }}>Hạng</div>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#FBBF24' }}>#{myRank}</div>
          </div>
        </div>
      </div>

      {/* Right Bottom: Skills */}
      <div style={{
        position: 'absolute', bottom: '16px', right: '16px',
        display: 'flex', gap: '12px', alignItems: 'flex-end',
        filter: myPlayer.isSilenced ? 'grayscale(100%)' : 'none'
      }}>
        {myPlayer.isSilenced && (
          <div style={{ position: 'absolute', top: '-30px', right: '0', color: '#EF4444', fontWeight: 'bold' }}>
            BỊ CẤM CHIÊU!
          </div>
        )}
        {renderSkillBtn('Push', '💨', myPlayer.pushCD || 0, '1', 'push', 'Đẩy văng kẻ địch trước mặt ra xa. Có thể đẩy đối thủ ra khỏi vùng an toàn hoặc cướp câu hỏi.')}
        {renderSkillBtn('Double', '🎲', myPlayer.doubleCD || 0, '2', 'double', 'Bật trước khi trả lời. Nếu ĐÚNG: x2 Điểm. Nếu SAI: Nhận x2 Sát thương & Trừ x2 Điểm cơ bản. Liều ăn nhiều!')}
        {renderSkillBtn('Chaos', '🌀', myPlayer.chaosCD || 0, '3', 'chaos', 'Làm lộn xộn camera và đảo ngược phím di chuyển của tất cả kẻ địch xung quanh bạn trong 3s.')}
        {renderSkillBtn('Silence', '🔇', myPlayer.silenceCD || 0, '4', 'silence', 'Bắn 1 luồng sóng khóa kỹ năng (Cấm chiêu) kẻ địch đầu tiên trúng phải trong 4s.')}
      </div>

      {/* Death Screen */}
      {myPlayer.isDead && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(200, 0, 0, 0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', pointerEvents: 'auto'
        }}>
          <div style={{ fontSize: '48px', fontWeight: 900, color: '#EF4444', textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
            BẠN ĐÃ BỊ HẠ
          </div>
          <div style={{ fontSize: '18px', color: '#FCA5A5', marginTop: '8px' }}>
            Hồi sinh sau vài giây...
          </div>
        </div>
      )}

      {/* Top Right: Leaderboard */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px',
        background: 'rgba(0,0,0,0.6)', borderRadius: '12px', padding: '10px 14px',
        border: '1px solid rgba(255,255,255,0.1)', minWidth: '180px',
      }}>
        <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
          Bảng xếp hạng
        </div>
        {sorted.slice(0, 5).map((p, i) => (
          <div key={p.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '3px 0', fontSize: '13px',
            color: p.id === myConnectionId ? '#10B981' : (p.isDead ? '#6B7280' : 'white'),
            fontWeight: p.id === myConnectionId ? 700 : 400,
          }}>
            <span>{i + 1}. {p.username || '???'}</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{p.score || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
