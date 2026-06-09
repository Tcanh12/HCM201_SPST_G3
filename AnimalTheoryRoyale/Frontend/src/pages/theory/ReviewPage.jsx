import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RefreshCcw, HelpCircle, Settings } from 'lucide-react';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import { reviewQuestions } from '../../data/reviewQuestions';

export default function ReviewPage() {
  const [isSetup, setIsSetup] = useState(true);
  const [questionLimit, setQuestionLimit] = useState(5);
  const [activeQuizData, setActiveQuizData] = useState([]);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { markQuizCompleted } = useLearningProgress();

  const startQuiz = () => {
    // Lấy random số lượng câu hỏi từ ngân hàng 15 câu
    const shuffled = [...reviewQuestions].sort(() => 0.5 - Math.random());
    setActiveQuizData(shuffled.slice(0, questionLimit));
    
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
    setIsSetup(false);
  };

  const handleSelect = (index) => {
    if (!isSubmitted) setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === activeQuizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < activeQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
      // Đánh dấu hoàn thành nếu đúng trên 60%
      const finalScore = score + (selectedOption === activeQuizData[currentQuestion].correctAnswer ? 1 : 0);
      if (finalScore >= Math.ceil(activeQuizData.length * 0.6)) {
        markQuizCompleted('quiz-general');
      }
    }
  };

  const restartQuiz = () => {
    setIsSetup(true); // Quay lại màn hình chọn số lượng
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-[#F8FAFC]">
      
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEE2E2] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FEF3C7] text-[#F59E0B] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" /> Ôn tập nhanh
          </div>
          <h1 className="text-4xl font-display font-black text-[#1F2937]">
            Kiểm tra Kiến thức
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {isSetup ? (
            <motion.div
              key="setup"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-gray-200 p-8 md:p-12 rounded-[2.5rem] shadow-lg text-center"
            >
              <Settings className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Tùy chỉnh số lượng câu hỏi</h2>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[5, 10, 15].map(num => (
                  <button
                    key={num}
                    onClick={() => setQuestionLimit(num)}
                    className={`px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all ${
                      questionLimit === num 
                        ? 'border-[#B91C1C] bg-[#FEE2E2] text-[#B91C1C] scale-105 shadow-md' 
                        : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {num} Câu
                  </button>
                ))}
              </div>
              <button
                onClick={startQuiz}
                className="px-10 py-4 bg-[#B91C1C] text-white rounded-xl font-bold transition-all shadow-md hover:scale-105 text-lg w-full max-w-sm"
              >
                Bắt đầu làm bài
              </button>
            </motion.div>
          ) : !showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white border border-gray-200 p-8 md:p-12 rounded-[2.5rem] shadow-lg relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-gray-500 font-bold">Câu hỏi {currentQuestion + 1} / {activeQuizData.length}</span>
                <div className="flex gap-1">
                  {activeQuizData.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-2 rounded-full ${i === currentQuestion ? 'bg-[#F59E0B]' : i < currentQuestion ? 'bg-gray-300' : 'bg-gray-100'}`} 
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#1F2937] mb-8 leading-snug">
                {activeQuizData[currentQuestion].question}
              </h2>

              <div className="space-y-4 mb-8">
                {activeQuizData[currentQuestion].options.map((opt, i) => {
                  let btnClass = "bg-[#F8FAFC] border-gray-200 text-[#1F2937] hover:bg-gray-50";
                  
                  if (isSubmitted) {
                    if (i === activeQuizData[currentQuestion].correctAnswer) {
                      btnClass = "bg-[#DCFCE7] border-[#15803d]/50 text-[#15803d]";
                    } else if (i === selectedOption) {
                      btnClass = "bg-[#FEE2E2] border-[#B91C1C]/50 text-[#B91C1C]";
                    }
                  } else if (selectedOption === i) {
                    btnClass = "bg-[#FEF3C7] border-[#F59E0B]/50 text-[#b45309]";
                  }

                  return (
                    <button
                      key={i}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${btnClass} flex items-center justify-between`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && i === activeQuizData[currentQuestion].correctAnswer && <CheckCircle className="w-5 h-5 text-[#15803d]" />}
                      {isSubmitted && i === selectedOption && i !== activeQuizData[currentQuestion].correctAnswer && <XCircle className="w-5 h-5 text-[#B91C1C]" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-8 p-4 bg-[#F8FAFC] border border-gray-200 rounded-xl"
                  >
                    <span className="text-sm font-bold text-[#F59E0B] block mb-2">Giải thích:</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{activeQuizData[currentQuestion].explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="px-8 py-3 bg-[#B91C1C] text-white rounded-xl font-bold disabled:opacity-50 transition-all flex items-center gap-2 shadow-md hover:scale-105"
                  >
                    Kiểm tra
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-[#1F2937] text-white rounded-xl font-bold transition-all flex items-center gap-2 hover:scale-105 shadow-md"
                  >
                    {currentQuestion < activeQuizData.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-gray-200 p-12 rounded-[2.5rem] shadow-xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FEF3C7] blur-[100px] rounded-full pointer-events-none" />
              <div className="w-24 h-24 bg-[#15803d] rounded-full mx-auto flex items-center justify-center mb-8 shadow-md">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#1F2937] mb-4">Kết quả ôn tập</h2>
              <p className="text-gray-500 text-lg mb-8">Bạn đã trả lời đúng</p>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-amber-500 mb-8">
                {score} / {activeQuizData.length}
              </div>
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-[#1F2937] rounded-xl font-bold transition-all flex items-center gap-2 mx-auto"
              >
                <RefreshCcw className="w-5 h-5" /> Về trang cài đặt
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
