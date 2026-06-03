import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import chapters from '../../data/chapters.json';
import { chapterDetails } from '../../data/chapterDetails';

export default function ChaptersPage() {
  const navigate = useNavigate();
  const { progress, calculateTotalProgress, calculateChapterProgress } = useLearningProgress();

  const totalProgress = calculateTotalProgress();
  const completedCount = progress.completedChapters.length;
  
  const lastChapter = chapters.find(c => c.id === progress.lastChapterId) || null;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4 relative bg-[#F8FAFC]">
      
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FEE2E2] text-[#B91C1C] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <LayoutGrid className="w-4 h-4" /> Nội dung giáo trình
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-[#1F2937] mb-6">
            Khám phá tư tưởng Hồ Chí Minh
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg">
            Khám phá môn Tư tưởng Hồ Chí Minh theo từng chương, với nội dung được trình bày bằng sơ đồ, thẻ khái niệm, timeline, ví dụ thực tế và câu hỏi ôn tập.
          </p>
        </div>

        {/* Progress Overview Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-[#1F2937] font-bold text-xl mb-1">Tiến độ học tập của bạn</h3>
                <p className="text-gray-500 text-sm">Số chương đã hoàn thành: <span className="font-bold text-[#1F2937]">{completedCount}/6</span></p>
              </div>
              <span className="text-3xl font-black text-[#B91C1C]">{totalProgress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#B91C1C] to-red-500 rounded-full"
              />
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            {lastChapter ? (
              <div className="flex flex-col items-start md:items-end">
                <span className="text-sm text-gray-500 mb-2">Bạn đang học gần nhất:</span>
                <button 
                  onClick={() => navigate(`/theory/chapters/${lastChapter.id}`)}
                  className="px-6 py-3 bg-[#1E3A8A] text-white rounded-xl font-bold hover:bg-[#1e3a8add] transition-colors flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
                >
                  Tiếp tục {lastChapter.title.split(' ').slice(0, 4).join(' ')}... <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-start md:items-end">
                <span className="text-sm text-gray-500 mb-2">Bạn chưa bắt đầu học.</span>
                <button 
                  onClick={() => navigate(`/theory/chapters/chuong-1`)}
                  className="px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md w-full sm:w-auto justify-center"
                >
                  Bắt đầu từ Chương 1 <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const isCompleted = progress.completedChapters.includes(chapter.id);
            const totalSections = chapterDetails[chapter.id]?.sections?.length || 0;
            const chapterProgress = calculateChapterProgress(chapter.id, totalSections);
            
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/theory/chapters/${chapter.id}`)}
                className={`group bg-white border ${isCompleted ? 'border-[#15803d]/30 shadow-[#DCFCE7]' : 'border-gray-200'} rounded-[2rem] p-8 flex flex-col hover:border-[#B91C1C]/30 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden`}
              >
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  {isCompleted ? (
                    <div className="flex items-center gap-1 text-[#15803d] bg-[#DCFCE7] px-3 py-1 rounded-full text-xs font-bold">
                      <CheckCircle className="w-3 h-3" /> Đã hoàn thành
                    </div>
                  ) : chapterProgress > 0 ? (
                    <div className="flex items-center gap-1 text-[#F59E0B] bg-[#FEF3C7] px-3 py-1 rounded-full text-xs font-bold">
                      <BookOpen className="w-3 h-3" /> Đang học
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-3 py-1 rounded-full text-xs font-bold">
                      Chưa học
                    </div>
                  )}
                </div>

                <div className="w-14 h-14 bg-[#F8FAFC] border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-bold text-[#B91C1C]">0{chapter.chapterNumber}</span>
                </div>
                
                <h2 className="text-xl font-bold text-[#1F2937] mb-4 leading-snug group-hover:text-[#B91C1C] transition-colors">
                  {chapter.title}
                </h2>
                
                <p className="text-gray-500 text-sm mb-6 flex-1">
                  {chapter.summary}
                </p>

                {/* Progress Bar for Chapter */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-gray-500">Tiến độ</span>
                    <span className={isCompleted ? 'text-[#15803d]' : 'text-[#B91C1C]'}>{chapterProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isCompleted ? 'bg-[#15803d]' : 'bg-[#B91C1C]'}`} 
                      style={{ width: `${chapterProgress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded text-xs font-medium border border-gray-100">
                      {chapter.conceptCount} khái niệm
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F8FAFC] flex items-center justify-center group-hover:bg-[#FEE2E2] transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#B91C1C]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
