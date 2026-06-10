/**
 * SoundManager — Placeholder audio system for Animal Theory Royale
 * 
 * Usage:
 *   import { playSound, toggleSound, isSoundEnabled } from '../utils/SoundManager';
 *   playSound('correct');
 *   playSound('wrong');
 *   playSound('skill_push');
 *
 * When actual audio files are added, update the SOUND_MAP below.
 * Sounds are loaded lazily on first play.
 */

// Sound enabled state (persisted in localStorage)
let _enabled = (() => {
  try {
    const saved = localStorage.getItem('sound_enabled');
    return saved === null ? true : saved === 'true';
  } catch {
    return true;
  }
})();

// Sound registry — map sound keys to audio file paths
// Replace null with actual paths when audio assets are available
const SOUND_MAP = {
  // UI
  click: null,
  hover: null,
  select_character: null,
  ready: null,

  // Game events
  game_start: null,
  countdown_tick: null,
  countdown_go: null,
  claim_question: null,
  correct: null,
  wrong: null,
  combo: null,

  // Combat
  shoot: null,
  hit: null,
  death: null,
  respawn: null,

  // Skills
  skill_push: null,
  skill_double: null,
  skill_dizzy: null,
  skill_ult: null,
  skill_chaos: null,

  // Troll skills (Phase 4)
  skill_banana: null,
  skill_ink: null,
  skill_confetti: null,
  skill_reverse: null,

  // Environment
  zone_shrink: null,
  zone_warning: null,
  low_hp: null,
  pickup_item: null,
  trap_trigger: null,

  // Results
  victory: null,
  defeat: null,
  podium: null,
};

// Audio cache
const _audioCache = {};

/**
 * Play a sound by key
 * @param {string} key — Sound key from SOUND_MAP
 * @param {number} volume — Volume 0-1 (default 0.5)
 */
export function playSound(key, volume = 0.5) {
  if (!_enabled) return;

  const path = SOUND_MAP[key];
  if (!path) {
    // No audio file yet — silently skip (placeholder mode)
    // Uncomment below for debugging:
    // console.log(`[SoundManager] 🔇 "${key}" (no audio file)`);
    return;
  }

  try {
    if (!_audioCache[key]) {
      _audioCache[key] = new Audio(path);
    }
    const audio = _audioCache[key];
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.currentTime = 0;
    audio.play().catch(() => {}); // Ignore autoplay restrictions
  } catch {
    // Fail silently
  }
}

/**
 * Toggle sound on/off
 * @returns {boolean} New state
 */
export function toggleSound() {
  _enabled = !_enabled;
  try {
    localStorage.setItem('sound_enabled', String(_enabled));
  } catch {}
  return _enabled;
}

/**
 * Check if sound is enabled
 * @returns {boolean}
 */
export function isSoundEnabled() {
  return _enabled;
}

/**
 * Set sound enabled state
 * @param {boolean} enabled
 */
export function setSoundEnabled(enabled) {
  _enabled = !!enabled;
  try {
    localStorage.setItem('sound_enabled', String(_enabled));
  } catch {}
}
