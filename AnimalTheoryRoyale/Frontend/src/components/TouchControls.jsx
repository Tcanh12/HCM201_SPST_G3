import { useRef, useCallback, useState } from 'react';

export default function TouchControls({ onMove, onRotate, onShoot }) {
  const joystickRef = useRef(null);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickOrigin = useRef({ x: 0, y: 0 });
  const lastRotateX = useRef(0);

  const JOYSTICK_MAX = 70;

  // ===== LEFT SIDE: JOYSTICK =====
  const handleJoystickStart = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    joystickOrigin.current = { x: touch.clientX, y: touch.clientY };
    setJoystickActive(true);
    setJoystickPos({ x: 0, y: 0 });
  }, []);

  const handleJoystickMove = useCallback((e) => {
    e.preventDefault();
    if (!joystickActive) return;
    const touch = e.touches[0];
    let dx = touch.clientX - joystickOrigin.current.x;
    let dy = touch.clientY - joystickOrigin.current.y;

    // Clamp
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > JOYSTICK_MAX) {
      dx = (dx / dist) * JOYSTICK_MAX;
      dy = (dy / dist) * JOYSTICK_MAX;
    }

    setJoystickPos({ x: dx, y: dy });
    onMove(dx / JOYSTICK_MAX, dy / JOYSTICK_MAX);
  }, [joystickActive, onMove]);

  const handleJoystickEnd = useCallback((e) => {
    e.preventDefault();
    setJoystickActive(false);
    setJoystickPos({ x: 0, y: 0 });
    onMove(0, 0);
  }, [onMove]);

  // ===== RIGHT SIDE: CAMERA ROTATE =====
  const handleRotateStart = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    lastRotateX.current = touch.clientX;
  }, []);

  const handleRotateMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const dx = touch.clientX - lastRotateX.current;
    lastRotateX.current = touch.clientX;
    onRotate(dx);
  }, [onRotate]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 40, pointerEvents: 'none' }}>
      {/* Left: Virtual Joystick */}
      <div
        style={{
          position: 'absolute', bottom: '90px', left: '30px',
          width: '160px', height: '160px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '2px solid rgba(255,255,255,0.2)',
          pointerEvents: 'auto',
          touchAction: 'none',
        }}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
      >
        {/* Joystick thumb */}
        <div style={{
          position: 'absolute',
          left: `calc(50% + ${joystickPos.x}px - 30px)`,
          top: `calc(50% + ${joystickPos.y}px - 30px)`,
          width: '60px', height: '60px',
          borderRadius: '50%',
          background: joystickActive
            ? 'rgba(79, 70, 229, 0.8)'
            : 'rgba(255,255,255,0.3)',
          border: '2px solid rgba(255,255,255,0.5)',
          transition: joystickActive ? 'none' : 'all 0.2s',
          boxShadow: joystickActive ? '0 0 20px rgba(79,70,229,0.5)' : 'none',
        }} />
      </div>

      {/* Right: Camera rotate zone */}
      <div
        style={{
          position: 'absolute', bottom: '0', right: '0',
          width: '50%', height: '60%',
          pointerEvents: 'auto',
          touchAction: 'none',
        }}
        onTouchStart={handleRotateStart}
        onTouchMove={handleRotateMove}
      />

      {/* Shoot button */}
      <div
        style={{
          position: 'absolute', bottom: '100px', right: '30px',
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.4)',
          border: '3px solid rgba(239, 68, 68, 0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'auto',
          touchAction: 'none',
          fontSize: '28px',
          userSelect: 'none',
        }}
        onTouchStart={(e) => { e.preventDefault(); onShoot(); }}
      >
        🎯
      </div>

      {/* Labels */}
      <div style={{
        position: 'absolute', bottom: '70px', left: '55px',
        color: 'rgba(255,255,255,0.3)', fontSize: '10px', pointerEvents: 'none',
      }}>DI CHUYỂN</div>
      <div style={{
        position: 'absolute', bottom: '80px', right: '35px',
        color: 'rgba(255,255,255,0.3)', fontSize: '10px', pointerEvents: 'none',
      }}>BẮN</div>
    </div>
  );
}
