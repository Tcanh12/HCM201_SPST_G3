import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, FileText, Target, Brain, Lightbulb, MessageCircleQuestion, Database, GitMerge, ListChecks, CheckCircle, Eye, EyeOff, BookOpen, AlertCircle } from 'lucide-react';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import caseFilesData from '../../data/caseFiles.json';

export default function CaseFileDetailPage() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { progress, markCaseCompleted } = useLearningProgress();

  const caseData = caseFilesData.find(c => c.id === caseId);

  // Interaction states
  const [activeTab, setActiveTab] = useState("evidence");
  const [showSuggestedAnswer, setShowSuggestedAnswer] = useState(false);
  const [showTeacherNote, setShowTeacherNote] = useState(false);
  const [learnerAnswer, setLearnerAnswer] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState(null);

  // Reset state when case changes
  useEffect(() => {
    setActiveTab("evidence");
    setShowSuggestedAnswer(false);
    setShowTeacherNote(false);
    setLearnerAnswer("");
    setQuizAnswers({});
    setQuizSubmitted(false);
    setActiveEvidence(null);
  }, [caseId]);

  if (!caseData) {
    return (
      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Không tìm thấy hồ sơ tình huống này.</h2>
        <button 
          onClick={() => navigate('/theory/case-files')}
          className="px-6 py-3 bg-[#15803d] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 mt-4"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách Case Files
        </button>
      </div>
    );
  }

  const isCompleted = progress.completedCaseFiles?.includes(caseId);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAFC] py-12 px-4 relative overflow-x-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/theory/case-files')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#15803d] font-medium text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tất cả Case Files
        </button>

        {/* 1. Header & Case Brief */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#DCFCE7] text-[#15803d] rounded-full text-xs font-bold border border-[#15803d]/20">
              CASE FILE
            </span>
            {caseData.difficulty && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                caseData.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                caseData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                Độ khó: {caseData.difficulty === 'hard' ? 'Khó' : caseData.difficulty === 'medium' ? 'Trung bình' : 'Dễ'}
              </span>
            )}
            {caseData.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-white text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-[#1F2937] leading-tight mb-4">
            {caseData.title}
          </h1>
          <p className="text-xl text-gray-500 font-medium">
            {caseData.summary}
          </p>
        </div>

        {/* 2. Vấn đề cần giải quyết */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-l-4 border-[#B91C1C] p-6 md:p-8 rounded-r-3xl rounded-bl-3xl border-y border-r border-gray-200 shadow-sm mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-[#B91C1C]" />
            <h3 className="text-xl font-bold text-[#1F2937]">Vấn đề cần giải quyết</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {caseData.situation}
          </p>
        </motion.div>

        {/* 3. Interactive Tabs */}
        <div className="mb-10 bg-white rounded-3xl p-2 shadow-sm border border-gray-200">
          <div className="flex flex-wrap md:flex-nowrap gap-2 p-2 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
            <button 
              onClick={() => setActiveTab("evidence")}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === "evidence" ? "bg-white text-[#15803d] shadow-sm border border-gray-200" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Database className="w-4 h-4" /> Bằng chứng & Dữ kiện
            </button>
            <button 
              onClick={() => setActiveTab("analysis")}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                activeTab === "analysis" ? "bg-white text-[#1E3A8A] shadow-sm border border-gray-200" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <GitMerge className="w-4 h-4" /> Phân tích tiến trình
            </button>
            {caseData.interactiveTasks && (
              <button 
                onClick={() => setActiveTab("quiz")}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                  activeTab === "quiz" ? "bg-white text-[#B91C1C] shadow-sm border border-gray-200" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <ListChecks className="w-4 h-4" /> Kiểm tra nhanh
              </button>
            )}
          </div>

          <div className="px-4 md:px-6 pb-6">
            <AnimatePresence mode="wait">
              {/* TAB: EVIDENCE */}
              {activeTab === "evidence" && (
                <motion.div
                  key="evidence"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-lg font-bold text-[#1F2937] mb-4">Các dữ kiện cần thu thập:</h3>
                  {caseData.evidenceCards ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseData.evidenceCards.map((card, i) => (
                        <div 
                          key={i}
                          onClick={() => setActiveEvidence(activeEvidence === i ? null : i)}
                          className="bg-gray-50 border border-gray-200 p-5 rounded-2xl cursor-pointer hover:border-[#15803d] transition-all"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-[#15803d]">{card.title}</h4>
                            {activeEvidence === i ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                          </div>
                          {activeEvidence === i ? (
                            <p className="text-gray-700 text-sm mt-3 animate-in fade-in duration-200">
                              {card.content}
                            </p>
                          ) : (
                            <p className="text-gray-400 text-sm italic">Nhấn để xem chi tiết bằng chứng...</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-gray-500 text-center">
                      Case này chưa có thẻ dữ kiện riêng biệt. Hãy xem phần Phân tích.
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB: ANALYSIS */}
              {activeTab === "analysis" && (
                <motion.div
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-6 h-6 text-[#1E3A8A]" />
                    <h3 className="text-xl font-bold text-[#1F2937]">Phân tích đường lối và bối cảnh lịch sử</h3>
                  </div>
                  
                  {caseData.analysisSteps ? (
                    <div className="space-y-4">
                      {caseData.analysisSteps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-[#DBEAFE] text-[#1E3A8A] flex items-center justify-center font-bold shrink-0">
                              {i + 1}
                            </div>
                            {i < caseData.analysisSteps.length - 1 && (
                              <div className="w-0.5 h-full bg-blue-100 my-1"></div>
                            )}
                          </div>
                          <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-sm flex-1 mb-2">
                            <h4 className="font-bold text-[#1F2937] mb-1">{step.title}</h4>
                            <p className="text-gray-700 text-sm">{step.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-6 rounded-2xl border border-gray-200">
                      {caseData.analysis}
                    </p>
                  )}
                  
                  {/* Lesson/Takeaway */}
                  <div className="mt-8 bg-[#F8FAFC] border-l-4 border-[#F59E0B] p-6 rounded-r-2xl border-y border-r border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Lightbulb className="w-6 h-6 text-[#F59E0B]" />
                      <h3 className="text-lg font-bold text-[#1F2937]">Key Takeaways</h3>
                    </div>
                    {caseData.keyTakeaways ? (
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {caseData.keyTakeaways.map((k, i) => <li key={i}>{k}</li>)}
                      </ul>
                    ) : (
                      <p className="text-gray-700 font-medium">{caseData.lesson}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB: QUIZ */}
              {activeTab === "quiz" && caseData.interactiveTasks && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-lg font-bold text-[#1F2937] mb-6 flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-[#B91C1C]" /> Kiểm tra hiểu biết
                  </h3>
                  <div className="space-y-8">
                    {caseData.interactiveTasks.map((task, taskIdx) => (
                      <div key={taskIdx} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <p className="font-bold text-[#1F2937] mb-4 text-lg">{task.question}</p>
                        <div className="space-y-3">
                          {task.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[taskIdx] === optIdx;
                            const isCorrect = task.correctAnswer === optIdx;
                            const showResult = quizSubmitted;

                            let btnClass = "w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ";
                            if (showResult) {
                              if (isCorrect) btnClass += "bg-green-50 border-green-500 text-green-800";
                              else if (isSelected) btnClass += "bg-red-50 border-red-500 text-red-800";
                              else btnClass += "bg-white border-gray-200 text-gray-500 opacity-60";
                            } else {
                              if (isSelected) btnClass += "bg-blue-50 border-blue-500 text-blue-800";
                              else btnClass += "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-100";
                            }

                            return (
                              <button
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() => setQuizAnswers(prev => ({ ...prev, [taskIdx]: optIdx }))}
                                className={btnClass}
                              >
                                {opt}
                                {showResult && isCorrect && <CheckCircle className="inline w-5 h-5 ml-2 text-green-600" />}
                              </button>
                            );
                          })}
                        </div>
                        {quizSubmitted && task.explanation && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block mb-1">Giải thích:</strong>
                              {task.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {!quizSubmitted ? (
                      <button 
                        onClick={() => setQuizSubmitted(true)}
                        disabled={Object.keys(quizAnswers).length < caseData.interactiveTasks.length}
                        className="w-full py-4 bg-[#B91C1C] text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors shadow-md"
                      >
                        Nộp câu trả lời
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                        className="w-full py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                      >
                        Làm lại
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. Suy ngẫm & Trả lời */}
        <div className="bg-[#1E3A8A] text-white p-6 md:p-10 rounded-3xl shadow-lg relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
          
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <MessageCircleQuestion className="w-8 h-8 text-[#FEF3C7]" />
            <h3 className="text-2xl font-bold text-white">Câu hỏi tự luận / Suy ngẫm</h3>
          </div>
          
          <p className="text-white/90 leading-relaxed text-xl italic relative z-10 mb-8 border-l-4 border-[#FEF3C7] pl-4">
            "{caseData.reflectionQuestion}"
          </p>

          <div className="relative z-10 space-y-4">
            <textarea
              className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEF3C7] min-h-[120px]"
              placeholder="Nhập câu trả lời hoặc suy nghĩ của bạn vào đây trước khi xem gợi ý..."
              value={learnerAnswer}
              onChange={(e) => setLearnerAnswer(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setShowSuggestedAnswer(true)}
                className="px-6 py-3 bg-[#FEF3C7] text-[#1E3A8A] font-bold rounded-xl hover:bg-white transition-colors"
              >
                Tôi đã tự trả lời, xem gợi ý
              </button>
              {caseData.teacherNote && (
                <button 
                  onClick={() => setShowTeacherNote(!showTeacherNote)}
                  className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  {showTeacherNote ? "Ẩn Ghi chú giảng viên" : "Mở Ghi chú giảng viên"}
                </button>
              )}
            </div>

            <AnimatePresence>
              {showSuggestedAnswer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-6"
                >
                  <div className="bg-white text-[#1F2937] p-6 rounded-2xl shadow-inner border-l-4 border-[#15803d]">
                    <h4 className="font-bold text-[#15803d] mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" /> Gợi ý trả lời:
                    </h4>
                    <p className="leading-relaxed">{caseData.suggestedAnswer}</p>
                  </div>
                </motion.div>
              )}

              {showTeacherNote && caseData.teacherNote && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="bg-[#B91C1C] text-white p-6 rounded-2xl shadow-inner border border-red-500/50">
                    <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" /> Teacher Note:
                    </h4>
                    <p className="leading-relaxed text-white/90">{caseData.teacherNote}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Complete */}
        <div className="mt-12 flex justify-center pb-12">
          <button
            onClick={() => markCaseCompleted(caseId)}
            disabled={isCompleted}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 shadow-md ${
              isCompleted 
                ? 'bg-[#DCFCE7] text-[#15803d] cursor-default border border-[#15803d]/30 shadow-none' 
                : 'bg-[#15803d] text-white hover:bg-green-700 hover:scale-105 hover:shadow-lg'
            }`}
          >
            {isCompleted ? (
              <><CheckCircle2 className="w-6 h-6" /> Đã hoàn thành hồ sơ này</>
            ) : (
              <><CheckCircle2 className="w-6 h-6" /> Đánh dấu hoàn thành</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
