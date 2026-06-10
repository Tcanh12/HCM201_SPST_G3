import { motion, AnimatePresence } from 'framer-motion';

/**
 * DamageVignette — Red screen edge pulse when HP is low or taking damage
 * Overlay this on the game screen. It's purely visual — no logic changes.
 */
export default function DamageVignette({ hpPercent = 100, isOutsideZone = false, isDead = false }) {
  const isLowHP = hpPercent <= 30;
  const isCritical = hpPercent <= 15;

  return (
    <>
      {/* Low HP vignette — soft red edges */}
      <AnimatePresence>
        {isLowHP && !isDead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isCritical ? 0.6 : 0.35 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-[80]"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(220, 38, 38, 0.4) 100%)',
            }}
          >
            {/* Pulsing overlay for critical HP */}
            {isCritical && (
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(220, 38, 38, 0.3) 100%)',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outside safe zone — blue-purple damage edge */}
      <AnimatePresence>
        {isOutsideZone && !isDead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none z-[79]"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(59, 130, 246, 0.25) 85%, rgba(147, 51, 234, 0.3) 100%)',
              border: '3px solid rgba(59, 130, 246, 0.2)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
