import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RefreshCcw, HelpCircle } from 'lucide-react';
import { useLearningProgress } from '../../components/theory/ProgressContext';

const quizData = [
  {
    id: 1,
    question: "Tư tưởng Hồ Chí Minh là gì?",
    options: [
      "Là sự sao chép nguyên xi chủ nghĩa Mác - Lênin",
      "Là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam",
      "Là sự tổng hợp các luồng tư tưởng phương Đông",
      "Là chủ trương của Đảng Cộng sản Đông Dương"
    ],
    correctAnswer: 1,
    explanation: "Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của nước ta."
  },
  {
    id: 2,
    question: "Nội dung nào thể hiện đúng tư tưởng Nhà nước của dân, do dân, vì dân?",
    options: [
      "Nhà nước là công cụ trấn áp giai cấp bóc lột",
      "Nhà nước do nhân dân làm chủ và phục vụ lợi ích của nhân dân",
      "Nhà nước tập trung toàn bộ quyền lực vào trung ương",
      "Nhà nước hoạt động độc lập với sự giám sát của nhân dân"
    ],
    correctAnswer: 1,
    explanation: "Nhà nước trong tư tưởng Hồ Chí Minh là Nhà nước của nhân dân, do nhân dân xây dựng, kiểm soát và hoạt động vì lợi ích của nhân dân."
  },
  {
    id: 3,
    question: "Cần, kiệm, liêm, chính thuộc nội dung nào trong tư tưởng Hồ Chí Minh?",
    options: [
      "Tư tưởng về văn hóa",
      "Tư tưởng về xây dựng Đảng",
      "Tư tưởng về đạo đức cách mạng",
      "Tư tưởng về đại đoàn kết toàn dân tộc"
    ],
    correctAnswer: 2,
    explanation: "Cần, kiệm, liêm, chính, chí công vô tư là những chuẩn mực đạo đức cốt lõi của người cách mạng theo tư tưởng Hồ Chí Minh."
  },
  {
    id: 4,
    question: "Đại đoàn kết toàn dân tộc có vai trò gì trong tư tưởng Hồ Chí Minh?",
    options: [
      "Tạo nên sức mạnh tổng hợp để thực hiện mục tiêu chung của dân tộc",
      "Giúp giải quyết các mâu thuẫn nội bộ trong một đảng",
      "Là phương pháp để duy trì quyền lực nhà nước",
      "Là hình thức ngoại giao để kêu gọi quốc tế ủng hộ"
    ],
    correctAnswer: 0,
    explanation: "Đoàn kết là sức mạnh vô địch. 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công'."
  }
];

export default function ReviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { markQuizCompleted } = useLearningProgress();

  const handleSelect = (index) => {
    if (!isSubmitted) setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
      if (score + (selectedOption === quizData[currentQuestion].correctAnswer ? 1 : 0) >= 3) {
        markQuizCompleted('quiz-general');
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
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
          {!showResult ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white border border-gray-200 p-8 md:p-12 rounded-[2.5rem] shadow-lg relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-gray-500 font-bold">Câu hỏi {currentQuestion + 1} / {quizData.length}</span>
                <div className="flex gap-1">
                  {quizData.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-2 rounded-full ${i === currentQuestion ? 'bg-[#F59E0B]' : i < currentQuestion ? 'bg-gray-300' : 'bg-gray-100'}`} 
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#1F2937] mb-8 leading-snug">
                {quizData[currentQuestion].question}
              </h2>

              <div className="space-y-4 mb-8">
                {quizData[currentQuestion].options.map((opt, i) => {
                  let btnClass = "bg-[#F8FAFC] border-gray-200 text-[#1F2937] hover:bg-gray-50";
                  
                  if (isSubmitted) {
                    if (i === quizData[currentQuestion].correctAnswer) {
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
                      {isSubmitted && i === quizData[currentQuestion].correctAnswer && <CheckCircle className="w-5 h-5 text-[#15803d]" />}
                      {isSubmitted && i === selectedOption && i !== quizData[currentQuestion].correctAnswer && <XCircle className="w-5 h-5 text-[#B91C1C]" />}
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
                    <p className="text-gray-600 text-sm leading-relaxed">{quizData[currentQuestion].explanation}</p>
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
                    {currentQuestion < quizData.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'} <ArrowRight className="w-4 h-4" />
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
                {score} / {quizData.length}
              </div>
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-[#1F2937] rounded-xl font-bold transition-all flex items-center gap-2 mx-auto"
              >
                <RefreshCcw className="w-5 h-5" /> Làm lại từ đầu
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
