import { useEffect, useState } from 'react';

export default function useKeyboard() {
  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    ' ': false,  // space for jump
    '1': false,
    '2': false,
    '3': false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys) {
        setKeys((k) => ({ ...k, [key]: true }));
      }
      // Also handle space
      if (e.code === 'Space') {
        setKeys((k) => ({ ...k, ' ': true }));
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys) {
        setKeys((k) => ({ ...k, [key]: false }));
      }
      if (e.code === 'Space') {
        setKeys((k) => ({ ...k, ' ': false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
}
