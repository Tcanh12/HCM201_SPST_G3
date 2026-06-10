import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TrollFeed — A PUBG-style kill feed for troll skills and eliminations
 * Appears in the top right corner of the HUD
 */
export default function TrollFeed({ events = [] }) {
  // We keep a local state of active notifications to manage their lifecycle
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (events && events.length > 0) {
      const newEvent = events[events.length - 1];
      // Avoid duplicate adds
      if (!notifications.find(n => n.id === newEvent.id)) {
        setNotifications(prev => [...prev, newEvent]);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== newEvent.id));
        }, 4000);
      }
    }
  }, [events]);

  const getIconForType = (type) => {
    switch (type) {
      case 'push': return '💨';
      case 'dizzy': return '🌀';
      case 'ult': return '💥';
      case 'trap': return '🪤';
      case 'eliminate': return '💀';
      default: return '⚠️';
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'eliminate': return '#EF4444';
      case 'ult': return '#F59E0B';
      case 'dizzy': return '#A855F7';
      case 'push': return '#38BDF8';
      case 'trap': return '#F97316';
      default: return '#D1D5DB';
    }
  };

  return (
    <div className="absolute top-[100px] right-4 flex flex-col items-end gap-1.5 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-sm border rounded-lg shadow-lg"
            style={{ borderColor: `${getColorForType(notif.type)}40` }}
          >
            <span className="text-[11px] font-bold text-white drop-shadow-md">
              {notif.actorName}
            </span>
            <span className="text-sm filter drop-shadow-md">
              {getIconForType(notif.type)}
            </span>
            <span className="text-[11px] font-bold drop-shadow-md" style={{ color: getColorForType(notif.type) }}>
              {notif.targetName}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
