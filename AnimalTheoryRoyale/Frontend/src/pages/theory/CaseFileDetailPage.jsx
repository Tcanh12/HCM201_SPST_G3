import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, FileText, Target, Brain, Lightbulb, MessageCircleQuestion } from 'lucide-react';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import caseFilesData from '../../data/caseFiles.json';

export default function CaseFileDetailPage() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { progress, markCaseCompleted } = useLearningProgress();

  const caseData = caseFilesData.find(c => c.id === caseId);

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

  const isCompleted = progress.completedCaseFiles.includes(caseId);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/theory/case-files')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#15803d] font-medium text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tất cả Case Files
        </button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {caseData.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-[#DCFCE7] text-[#15803d] rounded-full text-xs font-bold border border-[#15803d]/20">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-[#1F2937] leading-tight mb-4">
            {caseData.title}
          </h1>
          <p className="text-xl text-gray-500">
            {caseData.summary}
          </p>
        </div>

        <div className="space-y-6">
          {/* Situation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-l-4 border-[#B91C1C] p-8 rounded-r-3xl rounded-bl-3xl border-y border-r border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-[#B91C1C]" />
              <h3 className="text-xl font-bold text-[#1F2937]">Tình huống thực tế</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {caseData.situation}
            </p>
          </motion.div>

          {/* Analysis */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-[#1E3A8A]" />
              <h3 className="text-xl font-bold text-[#1F2937]">Phân tích dưới góc độ tư tưởng HCM</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {caseData.analysis}
            </p>
          </motion.div>

          {/* Lesson */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#F8FAFC] border border-gray-200 p-8 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-[#F59E0B]" />
              <h3 className="text-xl font-bold text-[#1F2937]">Bài học rút ra</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              {caseData.lesson}
            </p>
          </motion.div>

          {/* Question */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E3A8A] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <MessageCircleQuestion className="w-6 h-6 text-[#FEF3C7]" />
              <h3 className="text-xl font-bold text-white">Câu hỏi suy ngẫm</h3>
            </div>
            <p className="text-white/90 leading-relaxed text-xl italic relative z-10">
              "{caseData.reflectionQuestion}"
            </p>
          </motion.div>
        </div>

        {/* Action */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => markCaseCompleted(caseId)}
            disabled={isCompleted}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-3 shadow-md ${
              isCompleted 
                ? 'bg-[#DCFCE7] text-[#15803d] cursor-default border border-[#15803d]/30 shadow-none' 
                : 'bg-[#15803d] text-white hover:bg-green-700 hover:scale-105'
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
