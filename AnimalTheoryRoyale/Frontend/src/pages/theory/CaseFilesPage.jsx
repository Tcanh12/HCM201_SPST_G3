import { motion } from 'framer-motion';
import { FileText, ChevronRight, CheckCircle2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import caseFilesData from '../../data/caseFiles.json';

export default function CaseFilesPage() {
  const navigate = useNavigate();
  const { progress } = useLearningProgress();

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4 relative bg-[#F8FAFC]">
      
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10">
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7] text-[#15803d] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <FileText className="w-4 h-4" /> Hồ sơ tình huống
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-[#1F2937] mb-6">
            Case Files
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg mx-auto md:mx-0">
            Biến lý thuyết thành tình huống thực tế. Khám phá cách tư tưởng Hồ Chí Minh giải quyết các vấn đề đương đại thông qua các hồ sơ tình huống chi tiết.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {caseFilesData.map((caseFile, index) => {
            const isCompleted = progress.completedCaseFiles.includes(caseFile.id);

            return (
              <motion.div
                key={caseFile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => navigate(`/theory/case-files/${caseFile.id}`)}
                className={`group bg-white border ${isCompleted ? 'border-[#15803d]/30 shadow-[#DCFCE7]' : 'border-gray-200'} rounded-3xl p-6 flex flex-col hover:border-[#15803d]/50 hover:shadow-xl transition-all cursor-pointer relative`}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-[#15803d] bg-[#DCFCE7] px-2 py-1 rounded-full text-xs font-bold">
                      <CheckCircle2 className="w-3 h-3" /> Đã xong
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs font-bold">
                      Chưa xem
                    </div>
                  )}
                </div>

                <div className="w-12 h-12 bg-[#F8FAFC] border border-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-[#15803d]" />
                </div>
                
                <h2 className="text-xl font-bold text-[#1F2937] mb-3 leading-snug group-hover:text-[#15803d] transition-colors pr-16">
                  {caseFile.title}
                </h2>
                
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  {caseFile.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {caseFile.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs font-medium border border-gray-100 truncate max-w-[120px]">
                      {tag}
                    </span>
                  ))}
                  {caseFile.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs font-medium border border-gray-100">
                      +{caseFile.tags.length - 2}
                    </span>
                  )}
                </div>

                <button className="mt-auto w-full py-3 bg-gray-50 text-[#1F2937] font-bold rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#15803d] group-hover:text-white transition-colors">
                  Xem hồ sơ <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
