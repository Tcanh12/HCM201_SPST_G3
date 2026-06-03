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
      // Time expired → auto-submit wrong answer
      if (!submitted) {
          setSubmitted(true);
          onSubmit(-1);
      }
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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: 'absolute', top: '5%', right: '2%',
        zIndex: 100, pointerEvents: 'none',
        display: 'flex', justifyContent: 'flex-end',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          pointerEvents: 'auto',
          background: isDoubleActive
            ? 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #451a03 100%)'
            : 'linear-gradient(135deg, rgba(11,15,26,0.95) 0%, rgba(30,41,59,0.95) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          padding: '24px',
          width: '380px',
          border: `2px solid ${isDoubleActive ? 'rgba(245,158,11,0.4)' : 'rgba(217,28,28,0.4)'}`,
          boxShadow: isDoubleActive
            ? '0 0 60px rgba(245, 158, 11, 0.3)'
            : '0 25px 60px rgba(0,0,0,0.5), 0 0 20px rgba(217,28,28,0.2)',
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
            <div style={{ width: '40px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #D91C1C, #F5C542)' }} />
          </div>
          <CircularTimer timeLeft={timeLeft} maxTime={maxTime} />
        </div>

        {/* Question */}
        <h2 style={{
          fontSize: '16px', fontWeight: 700, color: 'white', lineHeight: 1.5, marginBottom: '20px',
        }}>
          {question.content}
        </h2>

        {/* Options with letter badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
          {question.options?.map((opt, idx) => {
            const isSelected = selectedOption === opt.id;
            // Uniform colors using primary/secondary theme
            const colors = {
              border: isSelected ? '#F5C542' : 'rgba(255,255,255,0.1)',
              bg: isSelected ? 'rgba(245,197,66,0.15)' : 'rgba(255,255,255,0.03)',
            };
            return (
              <motion.button
                key={opt.id}
                whileHover={!submitted ? { scale: 1.02 } : {}}
                whileTap={!submitted ? { scale: 0.98 } : {}}
                onClick={() => !submitted && setSelectedOption(opt.id)}
                disabled={submitted}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 14px', borderRadius: '12px',
                  background: colors.bg,
                  border: `2px solid ${colors.border}`,
                  color: 'white', fontSize: '13px', textAlign: 'left',
                  cursor: submitted ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: submitted ? 0.6 : 1,
                  pointerEvents: submitted ? 'none' : 'auto',
                  boxShadow: isSelected ? `0 0 15px rgba(245,197,66,0.3)` : 'none',
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '13px', flexShrink: 0,
                  background: isSelected ? '#F5C542' : 'rgba(255,255,255,0.1)',
                  color: isSelected ? '#000' : 'rgba(255,255,255,0.5)',
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
            width: '100%', padding: '12px',
            borderRadius: '12px', fontWeight: 700, fontSize: '14px',
            background: selectedOption !== null && !submitted
              ? 'linear-gradient(135deg, #D91C1C, #E10600)'
              : '#374151',
            color: selectedOption !== null && !submitted ? 'white' : '#6B7280',
            border: 'none',
            cursor: selectedOption !== null && !submitted ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
            boxShadow: selectedOption !== null && !submitted ? '0 0 20px rgba(217,28,28,0.4)' : 'none',
          }}
        >
          {submitted ? 'Đang xử lý...' : 'Xác Nhận Đáp Án'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
