import { useState, useEffect } from 'react';

export default function QuestionModal({ question, onSubmit, onClose }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(question?.timeLimit || 15);
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

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, pointerEvents: 'auto',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px',
        padding: '32px',
        maxWidth: '600px',
        width: '90%',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        {/* Timer */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
        }}>
          <span style={{ fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', fontWeight: 700 }}>
            📖 Câu hỏi tri thức
          </span>
          <div style={{
            padding: '4px 14px', borderRadius: '20px', fontWeight: 900, fontFamily: 'monospace', fontSize: '18px',
            background: timeLeft <= 5 ? 'rgba(239,68,68,0.3)' : 'rgba(59,130,246,0.3)',
            color: timeLeft <= 5 ? '#EF4444' : '#3B82F6',
            border: `1px solid ${timeLeft <= 5 ? 'rgba(239,68,68,0.5)' : 'rgba(59,130,246,0.3)'}`,
          }}>
            {timeLeft}s
          </div>
        </div>

        {/* Question */}
        <h2 style={{
          fontSize: '20px', fontWeight: 700, color: 'white', lineHeight: 1.5, marginBottom: '24px',
        }}>
          {question.content}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {question.options?.map((opt) => (
            <button
              key={opt.id}
              onClick={() => !submitted && setSelectedOption(opt.id)}
              disabled={submitted}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 18px', borderRadius: '12px',
                background: selectedOption === opt.id ? 'rgba(79,70,229,0.3)' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${selectedOption === opt.id ? '#4F46E5' : 'rgba(255,255,255,0.1)'}`,
                color: 'white', fontSize: '15px', textAlign: 'left',
                cursor: submitted ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: submitted ? 0.7 : 1,
                pointerEvents: submitted ? 'none' : 'auto',
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={selectedOption === null || submitted}
          style={{
            width: '100%', padding: '14px',
            borderRadius: '12px', fontWeight: 700, fontSize: '16px',
            background: selectedOption !== null && !submitted ? '#4F46E5' : '#374151',
            color: selectedOption !== null && !submitted ? 'white' : '#6B7280',
            border: 'none', cursor: selectedOption !== null && !submitted ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s',
          }}
        >
          {submitted ? 'Đang xử lý...' : 'Xác Nhận Đáp Án'}
        </button>
      </div>
    </div>
  );
}
