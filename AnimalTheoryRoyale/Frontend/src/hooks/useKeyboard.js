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
    '4': false,
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

    const handleBlur = () => {
      setKeys(k => Object.keys(k).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('visibilitychange', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('visibilitychange', handleBlur);
    };
  }, []);

  return keys;
}
