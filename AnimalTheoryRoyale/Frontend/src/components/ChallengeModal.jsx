import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ChallengeModal — Enhanced multi-type question modal
 * Phase 1: Supports MultipleChoice (backward compatible) + True/False
 * Phase 3 will add: FillBlank, Ordering, Matching, Categorization, CaseStudy, Hotspot, SpeedRound
 * 
 * Props:
 *   question: { content, options, timeLimit, type?, difficulty?, topicName?, payloadJson? }
 *   onSubmit: (answer) => void  — For MC: optionId, For T/F: true/false
 *   onClose: () => void
 *   isDoubleActive: boolean
 */

// Circular timer with sweep animation
function CircularTimer({ timeLeft, maxTime }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / maxTime) * circumference;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg width="64" height="64" className="absolute -rotate-90">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
        <circle
          cx="32" cy="32" r={radius} fill="none"
          stroke={isUrgent ? '#EF4444' : '#D4A843'}
          strokeWidth="3.5" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
        />
      </svg>
      <span
        className="text-xl font-black font-mono relative z-10"
        style={{
          color: isUrgent ? '#EF4444' : '#D4A843',
          animation: isUrgent ? 'countdownPulse 1s infinite' : 'none',
        }}
      >
        {timeLeft}
      </span>
    </div>
  );
}

// Difficulty badge
function DifficultyBadge({ difficulty }) {
  const config = {
    Easy: { label: 'Dễ', color: '#10B981', bg: 'rgba(16,185,129,0.15)' },
    Medium: { label: 'Vừa', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    Hard: { label: 'Khó', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
  };
  const c = config[difficulty] || config.Medium;

  return (
    <span
      className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border"
      style={{ color: c.color, background: c.bg, borderColor: `${c.color}30` }}
    >
      {c.label}
    </span>
  );
}

// Multiple Choice layout
function MultipleChoiceLayout({ options, selectedOption, onSelect, submitted }) {
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col gap-2 mb-4">
      {options?.map((opt, idx) => {
        const isSelected = selectedOption === opt.id;
        return (
          <motion.button
            key={opt.id}
            whileHover={!submitted ? { scale: 1.01, x: 4 } : {}}
            whileTap={!submitted ? { scale: 0.98 } : {}}
            onClick={() => !submitted && onSelect(opt.id)}
            disabled={submitted}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
            style={{
              background: isSelected ? 'rgba(212, 168, 67, 0.15)' : 'rgba(255,255,255,0.03)',
              border: `2px solid ${isSelected ? '#D4A843' : 'rgba(255,255,255,0.08)'}`,
              cursor: submitted ? 'not-allowed' : 'pointer',
              opacity: submitted ? 0.6 : 1,
              boxShadow: isSelected ? '0 0 20px rgba(212,168,67,0.2)' : 'none',
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-all"
              style={{
                background: isSelected ? '#D4A843' : 'rgba(255,255,255,0.08)',
                color: isSelected ? '#0A0E1A' : 'rgba(255,255,255,0.4)',
              }}
            >
              {isSelected ? '✓' : optionLetters[idx]}
            </div>
            <span className="text-sm text-white/90 leading-snug">{opt.text}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

// True/False layout
function TrueFalseLayout({ selectedOption, onSelect, submitted }) {
  const options = [
    { value: true, label: 'ĐÚNG', icon: '✅', color: '#10B981' },
    { value: false, label: 'SAI', icon: '❌', color: '#EF4444' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {options.map(opt => {
        const isSelected = selectedOption === opt.value;
        return (
          <motion.button
            key={String(opt.value)}
            whileHover={!submitted ? { scale: 1.03 } : {}}
            whileTap={!submitted ? { scale: 0.97 } : {}}
            onClick={() => !submitted && onSelect(opt.value)}
            disabled={submitted}
            className="flex flex-col items-center justify-center p-5 rounded-xl transition-all duration-200"
            style={{
              background: isSelected ? `${opt.color}20` : 'rgba(255,255,255,0.03)',
              border: `3px solid ${isSelected ? opt.color : 'rgba(255,255,255,0.08)'}`,
              cursor: submitted ? 'not-allowed' : 'pointer',
              opacity: submitted ? 0.6 : 1,
              boxShadow: isSelected ? `0 0 25px ${opt.color}30` : 'none',
            }}
          >
            <span className="text-3xl mb-2">{opt.icon}</span>
            <span className="text-lg font-black" style={{ color: isSelected ? opt.color : 'white' }}>
              {opt.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// Ordering layout
function OrderingLayout({ payloadJson, selectedOption, onSelect, submitted }) {
  const [items, setItems] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);

  useEffect(() => {
    try {
      // payloadJson is the CORRECT order. We shuffle it for display.
      const parsed = JSON.parse(payloadJson || '[]');
      setItems([...parsed].sort(() => Math.random() - 0.5));
    } catch (e) {
      setItems(['Lỗi tải dữ liệu sắp xếp']);
    }
  }, [payloadJson]);

  const handleItemClick = (item) => {
    if (submitted) return;
    if (currentOrder.includes(item)) {
      const newOrder = currentOrder.filter(i => i !== item);
      setCurrentOrder(newOrder);
      onSelect(newOrder.length === items.length ? newOrder : null);
    } else {
      const newOrder = [...currentOrder, item];
      setCurrentOrder(newOrder);
      onSelect(newOrder.length === items.length ? newOrder : null);
    }
  };

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="text-[11px] font-bold text-amber-300/80 uppercase tracking-wider mb-1">
        Hãy sắp xếp đúng thứ tự:
      </div>
      
      {/* Ordered Items Drop Zone */}
      <div className="min-h-[50px] p-2 border-2 border-dashed border-white/20 bg-black/30 rounded-xl flex flex-wrap gap-2 transition-all">
        {currentOrder.length === 0 && (
          <span className="text-white/30 text-sm m-auto italic">Bấm vào các mục bên dưới để chọn...</span>
        )}
        {currentOrder.map((item, idx) => (
          <motion.div
            layoutId={`item-${item}`}
            key={`selected-${item}`} 
            onClick={() => handleItemClick(item)} 
            className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-400 rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer"
          >
            <span className="text-blue-200 mr-2">{idx + 1}.</span>{item}
          </motion.div>
        ))}
      </div>

      {/* Available Items */}
      <div className="flex flex-wrap gap-2 mt-2">
        {items.filter(i => !currentOrder.includes(i)).map((item) => (
          <motion.div
            layoutId={`item-${item}`}
            key={`avail-${item}`} 
            onClick={() => handleItemClick(item)} 
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm cursor-pointer hover:bg-white/20 transition-all"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// FillBlank / ShortAnswer layout
function FillBlankLayout({ selectedOption, onSelect, submitted }) {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="text-[11px] font-bold text-cyan-300/80 uppercase tracking-wider mb-1">
        Nhập câu trả lời ngắn:
      </div>
      <input
        type="text"
        value={selectedOption || ''}
        onChange={(e) => onSelect(e.target.value)}
        disabled={submitted}
        placeholder="Nhập đáp án của bạn..."
        className="w-full px-4 py-3 bg-black/40 border-2 border-white/20 rounded-xl text-white outline-none focus:border-cyan-400 transition-all placeholder:text-white/20"
      />
    </div>
  );
}

// Matching layout
function MatchingLayout({ payloadJson, selectedOption, onSelect, submitted }) {
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [matches, setMatches] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);

  useEffect(() => {
    try {
      const data = JSON.parse(payloadJson || '{}');
      const keys = Object.keys(data).sort(() => Math.random() - 0.5);
      const values = Object.values(data).sort(() => Math.random() - 0.5);
      setLeftItems(keys);
      setRightItems(values);
    } catch {
      setLeftItems(['Lỗi dữ liệu']); setRightItems(['Lỗi dữ liệu']);
    }
  }, [payloadJson]);

  const handleLeftClick = (key) => {
    if (submitted) return;
    if (matches[key]) {
      const newMatches = { ...matches };
      delete newMatches[key];
      setMatches(newMatches);
      onSelect(Object.keys(newMatches).length === leftItems.length ? newMatches : null);
    } else {
      setSelectedLeft(key === selectedLeft ? null : key);
    }
  };

  const handleRightClick = (val) => {
    if (submitted || !selectedLeft) return;
    const newMatches = { ...matches, [selectedLeft]: val };
    setMatches(newMatches);
    setSelectedLeft(null);
    onSelect(Object.keys(newMatches).length === leftItems.length ? newMatches : null);
  };

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="text-[11px] font-bold text-pink-300/80 uppercase tracking-wider mb-1">
        Ghép nối cho đúng:
      </div>
      <div className="flex gap-4">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-2">
          {leftItems.map(key => {
            const isMatched = !!matches[key];
            const isSelected = selectedLeft === key;
            return (
              <motion.button
                key={`L-${key}`}
                onClick={() => handleLeftClick(key)}
                className="px-3 py-2 text-sm rounded-lg border-2 transition-all text-left truncate"
                style={{
                  background: isMatched ? 'rgba(16,185,129,0.2)' : isSelected ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.05)',
                  borderColor: isMatched ? '#10B981' : isSelected ? '#EC4899' : 'rgba(255,255,255,0.1)'
                }}
              >
                {key}
                {isMatched && <span className="float-right text-emerald-400">→</span>}
              </motion.button>
            );
          })}
        </div>
        {/* Right Column */}
        <div className="flex-1 flex flex-col gap-2">
          {rightItems.map(val => {
            const isMatched = Object.values(matches).includes(val);
            return (
              <motion.button
                key={`R-${val}`}
                onClick={() => handleRightClick(val)}
                className="px-3 py-2 text-sm rounded-lg border-2 transition-all text-left truncate"
                style={{
                  background: isMatched ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                  borderColor: isMatched ? '#10B981' : 'rgba(255,255,255,0.1)',
                  opacity: isMatched ? 0.5 : 1
                }}
              >
                {val}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ChallengeModal({ question, onSubmit, onClose, isDoubleActive }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const maxTime = question?.timeLimit || 15;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [submitted, setSubmitted] = useState(false);

  // Determine question type (fallback to MultipleChoice for backward compat)
  const questionType = question?.type || question?.questionType || 'MultipleChoice';

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!submitted) {
        setSubmitted(true);
        onSubmit(-1); // Time expired
      }
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleSubmit = useCallback(() => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);

    if (questionType === 'TrueFalse') {
      // Backend now expects 'true' or 'false' or the ID. Since we send ID in MC, let's just send the ID.
      // Wait, backend TrueFalse check says `int.TryParse`.
      // Let's find the correct Option ID.
      const options = question?.options || [];
      const correctOpt = options.find(o => (selectedOption === true && o.text?.match(/đúng|true/i)) || 
                                             (selectedOption === false && o.text?.match(/sai|false/i)));
      onSubmit((correctOpt?.id || -1).toString());
    } else if (questionType === 'Ordering' || questionType === 'Matching') {
      // Send the JSON payload directly to the backend
      onSubmit(JSON.stringify(selectedOption));
    } else if (questionType === 'FillBlank' || questionType === 'ShortAnswer') {
      onSubmit(selectedOption?.toString() || '');
    } else {
      // MultipleChoice
      onSubmit(selectedOption?.toString() || '-1');
    }
  }, [selectedOption, submitted, questionType, question, onSubmit]);

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="absolute top-[3%] right-[2%] z-[100]"
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="pointer-events-auto"
        style={{
          background: isDoubleActive
            ? 'linear-gradient(135deg, rgba(69,26,3,0.97) 0%, rgba(120,53,15,0.97) 50%, rgba(69,26,3,0.97) 100%)'
            : 'linear-gradient(135deg, rgba(10,14,26,0.97) 0%, rgba(30,41,59,0.97) 100%)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          padding: '20px',
          width: '400px',
          maxWidth: '95vw',
          border: `2px solid ${isDoubleActive ? 'rgba(212,168,67,0.4)' : 'rgba(139,26,26,0.3)'}`,
          boxShadow: isDoubleActive
            ? '0 0 60px rgba(212,168,67,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Double Active Warning */}
        <AnimatePresence>
          {isDoubleActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="text-center mb-4 p-2.5 rounded-xl border"
              style={{
                background: 'rgba(212,168,67,0.12)',
                borderColor: 'rgba(212,168,67,0.25)',
              }}
            >
              <div className="text-amber-300 font-black text-sm tracking-widest animate-pulse">
                ⚠️ LIỀU ĂN NHIỀU ⚠️
              </div>
              <div className="text-[11px] text-red-300 mt-0.5">
                ĐÚNG ×2 ĐIỂM — SAI ×2 SÁT THƯƠNG
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header: Type badge + Timer */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                📖 Thử thách tri thức
              </span>
              {question.difficulty && <DifficultyBadge difficulty={question.difficulty} />}
            </div>
            <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-red-800 to-amber-500" />
            {question.topicName && (
              <span className="text-[10px] text-white/30 mt-1 block">{question.topicName}</span>
            )}
          </div>
          <CircularTimer timeLeft={timeLeft} maxTime={maxTime} />
        </div>

        {/* Question Content */}
        <h2 className="text-[15px] font-bold text-white leading-relaxed mb-4">
          {question.content}
        </h2>

        {/* Answer Area — switch by type */}
        {questionType === 'TrueFalse' && (
          <TrueFalseLayout selectedOption={selectedOption} onSelect={setSelectedOption} submitted={submitted} />
        )}
        {questionType === 'Ordering' && (
          <OrderingLayout payloadJson={question.payloadJson} selectedOption={selectedOption} onSelect={setSelectedOption} submitted={submitted} />
        )}
        {(questionType === 'FillBlank' || questionType === 'ShortAnswer') && (
          <FillBlankLayout selectedOption={selectedOption} onSelect={setSelectedOption} submitted={submitted} />
        )}
        {questionType === 'Matching' && (
          <MatchingLayout payloadJson={question.payloadJson} selectedOption={selectedOption} onSelect={setSelectedOption} submitted={submitted} />
        )}
        {(questionType === 'MultipleChoice' || (!['TrueFalse', 'Ordering', 'FillBlank', 'ShortAnswer', 'Matching'].includes(questionType))) && (
          <MultipleChoiceLayout options={question.options} selectedOption={selectedOption} onSelect={setSelectedOption} submitted={submitted} />
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={selectedOption !== null && !submitted ? { scale: 1.01 } : {}}
          whileTap={selectedOption !== null && !submitted ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={selectedOption === null || submitted}
          className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200"
          style={{
            background: selectedOption !== null && !submitted
              ? 'linear-gradient(135deg, #8B1A1A, #D4A843)'
              : '#374151',
            color: selectedOption !== null && !submitted ? 'white' : '#6B7280',
            cursor: selectedOption !== null && !submitted ? 'pointer' : 'not-allowed',
            boxShadow: selectedOption !== null && !submitted ? '0 0 20px rgba(139,26,26,0.4)' : 'none',
          }}
        >
          {submitted ? '⏳ Đang xử lý...' : '✅ Xác Nhận Đáp Án'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
