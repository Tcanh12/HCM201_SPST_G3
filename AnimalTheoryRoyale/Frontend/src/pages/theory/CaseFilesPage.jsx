import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight, CheckCircle2, Search, Target, Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import caseFilesData from '../../data/caseFiles.json';

// Utility to get difficulty color
const getDifficultyBadge = (level) => {
  switch (level) {
    case 'easy': return { label: 'Dễ', color: 'bg-green-100 text-green-700 border-green-200' };
    case 'hard': return { label: 'Khó', color: 'bg-red-100 text-red-700 border-red-200' };
    case 'medium': 
    default: 
      return { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
  }
};

export default function CaseFilesPage() {
  const navigate = useNavigate();
  const { progress } = useLearningProgress();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(caseFilesData.map(c => c.category || 'Khác'))];

  const filteredCases = filter === 'All' 
    ? caseFilesData 
    : caseFilesData.filter(c => c.category === filter);

  // Group by category for 'All' view
  const groupedCases = filteredCases.reduce((acc, caseFile) => {
    const cat = caseFile.category || 'Khác';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(caseFile);
    return acc;
  }, {});

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4 relative bg-[#F8FAFC]">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10">
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7] text-[#15803d] rounded-full text-sm font-bold uppercase tracking-widest mb-4 border border-[#15803d]/20">
            <FileText className="w-4 h-4" /> Case Study Tương Tác
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-[#1F2937] mb-6">
            Hồ Sơ Tình Huống Lịch Sử
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg mx-auto md:mx-0">
            Luyện tập phân tích tiến trình: bối cảnh → chủ trương → kết quả → bài học. 
            Giải quyết các tình huống thực tiễn trong giai đoạn 1930–1945 để hiểu sâu đường lối của Đảng.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filter === cat 
                  ? 'bg-[#15803d] text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat === 'All' ? 'Tất cả tình huống' : cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-12"
          >
            {Object.entries(groupedCases).map(([category, cases], groupIndex) => (
              <div key={category} className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1F2937] flex items-center gap-3 border-b border-gray-200 pb-3">
                  <span className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#15803d] text-sm font-black">
                    {groupIndex + 1}
                  </span>
                  {category}
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {cases.map((caseFile, index) => {
                    const isCompleted = progress.completedCaseFiles?.includes(caseFile.id);
                    const diffBadge = getDifficultyBadge(caseFile.difficulty);
                    const globalIndex = caseFilesData.findIndex(c => c.id === caseFile.id) + 1;

                    return (
                      <motion.div
                        key={caseFile.id}
                        whileHover={{ y: -4 }}
                        onClick={() => navigate(`/theory/case-files/${caseFile.id}`)}
                        className={`group bg-white border ${isCompleted ? 'border-[#15803d]/30 shadow-[#DCFCE7]' : 'border-gray-200'} rounded-3xl p-6 md:p-8 flex flex-col hover:border-[#15803d]/50 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden`}
                      >
                        {/* Status */}
                        <div className="absolute top-6 right-6 flex flex-col items-end gap-2">
                          {isCompleted ? (
                            <div className="flex items-center gap-1 text-[#15803d] bg-[#DCFCE7] px-3 py-1 rounded-full text-xs font-bold border border-[#15803d]/20">
                              <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold">
                              Chưa xem
                            </div>
                          )}
                          <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${diffBadge.color}`}>
                            {diffBadge.label}
                          </div>
                        </div>

                        <div className="text-[#15803d] font-black text-sm tracking-widest uppercase mb-2">
                          Case {String(globalIndex).padStart(2, '0')}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#1F2937] mb-4 leading-snug group-hover:text-[#15803d] transition-colors pr-24">
                          {caseFile.title}
                        </h3>
                        
                        {/* Problem Statement */}
                        <div className="bg-gray-50 border-l-4 border-gray-300 p-4 rounded-r-xl mb-6 flex-1">
                          <p className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                            <Target className="w-4 h-4" /> Vấn đề cần giải quyết:
                          </p>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            {caseFile.situation}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 mb-6 pt-4 border-t border-gray-100">
                           <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                             <Brain className="w-4 h-4" /> Luyện kỹ năng: 
                           </div>
                           <div className="flex flex-wrap gap-2">
                             {caseFile.tags.slice(0, 2).map((tag, i) => (
                               <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold">
                                 {tag}
                               </span>
                             ))}
                           </div>
                        </div>

                        <button className="w-full py-4 bg-gray-50 text-[#1F2937] font-bold rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#15803d] group-hover:text-white transition-colors border border-gray-200 group-hover:border-[#15803d]">
                          Mở hồ sơ & Luyện phân tích <ArrowRight className="w-5 h-5" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
