import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Circular timer component
function CircularTimer({ timeLeft, maxTime }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / maxTime) * circumference;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg width="56" height="56" className="absolute -rotate-90">
        {/* Background circle */}
        <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
        {/* Progress circle */}
        <circle
          cx="28" cy="28" r={radius} fill="none"
          stroke={isUrgent ? '#EF4444' : '#3B82F6'}
          strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
      </svg>
      <span
        className="text-lg font-black font-mono relative z-10"
        style={{
          color: isUrgent ? '#EF4444' : '#3B82F6',
          animation: isUrgent ? 'countdownPulse 1s infinite' : 'none',
        }}
      >
        {timeLeft}
      </span>
    </div>
  );
}

export default function QuestionModal({ question, onSubmit, onClose, isDoubleActive }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const maxTime = question?.timeLimit || 15;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [submitted, setSubmitted] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Time expired → auto-close without answering (penalty handled by server claim expiry)
      onClose();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onClose]);

  const handleSubmit = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    onSubmit(selectedOption);
  };

  if (!question) return null;

  const optionLetters = ['A', 'B', 'C', 'D'];
  const optionColors = [
    { bg: 'rgba(99,102,241,0.15)', border: '#6366F1', selected: 'rgba(99,102,241,0.3)' },
    { bg: 'rgba(16,185,129,0.15)', border: '#10B981', selected: 'rgba(16,185,129,0.3)' },
    { bg: 'rgba(245,158,11,0.15)', border: '#F59E0B', selected: 'rgba(245,158,11,0.3)' },
    { bg: 'rgba(236,72,153,0.15)', border: '#EC4899', selected: 'rgba(236,72,153,0.3)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'absolute', inset: 0,
        background: isDoubleActive ? 'rgba(200, 50, 0, 0.4)' : 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 100, pointerEvents: 'auto',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          background: isDoubleActive
            ? 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #451a03 100%)'
            : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '20px',
          padding: '28px 32px',
          maxWidth: '600px',
          width: '90%',
          border: `2px solid ${isDoubleActive ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.1)'}`,
          boxShadow: isDoubleActive
            ? '0 0 60px rgba(245, 158, 11, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Double active warning */}
        <AnimatePresence>
          {isDoubleActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              style={{
                textAlign: 'center', marginBottom: '16px', padding: '10px 16px',
                background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '12px',
              }}
            >
              <div style={{ color: '#FCD34D', fontWeight: 900, fontSize: '15px', letterSpacing: '2px', animation: 'flash 1.5s infinite' }}>
                ⚠️ LIỀU ĂN NHIỀU ⚠️
              </div>
              <div style={{ fontSize: '11px', color: '#FCA5A5', marginTop: '2px' }}>
                ĐÚNG ×2 ĐIỂM — SAI ×2 SÁT THƯƠNG
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with timer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', marginBottom: '2px' }}>
              📖 Câu hỏi tri thức
            </div>
            <div style={{ width: '40px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #4F46E5, #06B6D4)' }} />
          </div>
          <CircularTimer timeLeft={timeLeft} maxTime={maxTime} />
        </div>

        {/* Question */}
        <h2 style={{
          fontSize: '18px', fontWeight: 700, color: 'white', lineHeight: 1.6, marginBottom: '20px',
        }}>
          {question.content}
        </h2>

        {/* Options with letter badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
          {question.options?.map((opt, idx) => {
            const colors = optionColors[idx % optionColors.length];
            const isSelected = selectedOption === opt.id;
            return (
              <motion.button
                key={opt.id}
                whileHover={!submitted ? { scale: 1.01 } : {}}
                whileTap={!submitted ? { scale: 0.99 } : {}}
                onClick={() => !submitted && setSelectedOption(opt.id)}
                disabled={submitted}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', borderRadius: '12px',
                  background: isSelected ? colors.selected : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${isSelected ? colors.border : 'rgba(255,255,255,0.08)'}`,
                  color: 'white', fontSize: '14px', textAlign: 'left',
                  cursor: submitted ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: submitted ? 0.6 : 1,
                  pointerEvents: submitted ? 'none' : 'auto',
                  boxShadow: isSelected ? `0 0 15px ${colors.border}30` : 'none',
                }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '14px', flexShrink: 0,
                  background: isSelected ? colors.border : 'rgba(255,255,255,0.1)',
                  color: isSelected ? 'white' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s',
                }}>
                  {isSelected ? '✓' : optionLetters[idx]}
                </div>
                <span style={{ lineHeight: 1.4 }}>{opt.text}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Submit */}
        <motion.button
          whileHover={selectedOption !== null && !submitted ? { scale: 1.02 } : {}}
          whileTap={selectedOption !== null && !submitted ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={selectedOption === null || submitted}
          style={{
            width: '100%', padding: '14px',
            borderRadius: '12px', fontWeight: 700, fontSize: '15px',
            background: selectedOption !== null && !submitted
              ? 'linear-gradient(135deg, #4F46E5, #6366F1)'
              : '#374151',
            color: selectedOption !== null && !submitted ? 'white' : '#6B7280',
            border: 'none',
            cursor: selectedOption !== null && !submitted ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: selectedOption !== null && !submitted ? '0 0 20px rgba(79,70,229,0.3)' : 'none',
          }}
        >
          {submitted ? 'Đang xử lý...' : 'Xác Nhận Đáp Án'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
