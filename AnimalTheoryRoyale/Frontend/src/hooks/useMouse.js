import { useEffect, useRef } from 'react';

export default function useMouse() {
  const mouseRef = useRef({ x: 0, y: 0, dx: 0, dy: 0, isDown: false });

  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current.dx = e.movementX;
      mouseRef.current.dy = e.movementY;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleDown = (e) => {
      mouseRef.current.isDown = true;
    };

    const handleUp = (e) => {
      mouseRef.current.isDown = false;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return mouseRef;
}
