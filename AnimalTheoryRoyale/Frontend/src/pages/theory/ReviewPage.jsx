import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RefreshCcw, HelpCircle } from 'lucide-react';

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
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-[#050508]">
      
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" /> Ôn tập nhanh
          </div>
          <h1 className="text-4xl font-display font-black text-white">
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
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-white/50 font-bold">Câu hỏi {currentQuestion + 1} / {quizData.length}</span>
                <div className="flex gap-1">
                  {quizData.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-2 rounded-full ${i === currentQuestion ? 'bg-yellow-400' : i < currentQuestion ? 'bg-white/30' : 'bg-white/5'}`} 
                    />
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-8 leading-snug">
                {quizData[currentQuestion].question}
              </h2>

              <div className="space-y-4 mb-8">
                {quizData[currentQuestion].options.map((opt, i) => {
                  let btnClass = "bg-white/5 border-white/10 text-white hover:bg-white/10";
                  
                  if (isSubmitted) {
                    if (i === quizData[currentQuestion].correctAnswer) {
                      btnClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
                    } else if (i === selectedOption) {
                      btnClass = "bg-red-500/20 border-red-500/50 text-red-400";
                    }
                  } else if (selectedOption === i) {
                    btnClass = "bg-yellow-500/20 border-yellow-500/50 text-yellow-400";
                  }

                  return (
                    <button
                      key={i}
                      disabled={isSubmitted}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${btnClass} flex items-center justify-between`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && i === quizData[currentQuestion].correctAnswer && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                      {isSubmitted && i === selectedOption && i !== quizData[currentQuestion].correctAnswer && <XCircle className="w-5 h-5 text-red-400" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <span className="text-sm font-bold text-yellow-400 block mb-2">Giải thích:</span>
                    <p className="text-white/80 text-sm leading-relaxed">{quizData[currentQuestion].explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end pt-6 border-t border-white/10">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold disabled:opacity-50 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-105"
                  >
                    Kiểm tra
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-3 bg-white text-dark rounded-xl font-bold transition-all flex items-center gap-2 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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
              className="bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/10 p-12 rounded-[2.5rem] shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Kết quả ôn tập</h2>
              <p className="text-white/60 text-lg mb-8">Bạn đã trả lời đúng</p>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
                {score} / {quizData.length}
              </div>
              <button
                onClick={restartQuiz}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold transition-all flex items-center gap-2 mx-auto"
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
