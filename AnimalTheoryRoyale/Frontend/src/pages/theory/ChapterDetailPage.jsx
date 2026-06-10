import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, BookOpen, Target, ArrowLeft, 
  CheckCircle2, Brain, Flag, Globe, LayoutList, CheckCircle, 
  Heart, Users, Compass, ShieldCheck
} from 'lucide-react';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import { chapterDetails } from '../../data/chapterDetails';
import chapters from '../../data/chapters.json';
import { lessons } from '../../data/lessons';
import LessonDetailView from '../../components/theory/LessonDetailView';

const IconMap = {
  BookOpen, Brain, Flag, Globe, Target, Heart, Users, Compass, ShieldCheck
};

export default function ChapterDetailPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { 
    progress, 
    saveLastVisited, 
    markSectionCompleted, 
    markChapterCompleted,
    calculateChapterProgress
  } = useLearningProgress();

  const chapterData = chapterDetails[chapterId];
  const chapterMeta = chapters.find(c => c.id === chapterId);
  const newLessonData = lessons.find(l => l.chapterId === chapterId);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (chapterId) {
      saveLastVisited(`/theory/chapters/${chapterId}`, chapterId);
    }
  }, [chapterId, saveLastVisited]);

  if (!chapterData || !chapterMeta) {
    return (
      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <BookOpen className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#1F2937] mb-2">Không tìm thấy nội dung chương này.</h2>
        <p className="text-gray-500 mb-8">Nội dung đang được cập nhật hoặc đường dẫn không hợp lệ.</p>
        <button 
          onClick={() => navigate('/theory/chapters')}
          className="px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-red-700"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách chương
        </button>
      </div>
    );
  }

  const displaySections = newLessonData 
    ? [
        { id: 'overview', title: 'Tổng quan & Mục tiêu' },
        { id: 'theory', title: 'Lý thuyết cốt lõi' },
        { id: 'concepts', title: 'Phân tích Khái niệm' },
        { id: 'visual', title: 'Sơ đồ tư duy & Hình ảnh' }
      ]
    : chapterData.sections || [];

  const completedSections = progress.completedSections[chapterId] || [];
  const isChapterCompleted = progress.completedChapters.includes(chapterId);
  const chapterProgress = calculateChapterProgress(chapterId, displaySections.length);

  const handleSectionComplete = (sectionId) => {
    markSectionCompleted(chapterId, sectionId);
  };

  const handleChapterComplete = () => {
    markChapterCompleted(chapterId);
  };

  const renderSection = (section) => {
    const isCompleted = completedSections.includes(section.id);

    return (
      <div id={section.id} key={section.id} className="mb-12 scroll-mt-24">
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
          <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#B91C1C]" />
          </div>
          {section.title}
        </h3>
        
        <div className="text-gray-700 leading-relaxed text-lg mb-8 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          {section.content}
        </div>

        {/* Dynamic Graphic Rendering based on section type */}
        {section.type === 'concept-card-with-diagram' && section.diagram && (
          <div className="bg-[#F8FAFC] border border-gray-200 p-8 rounded-2xl mb-8">
            <h4 className="text-center font-bold text-[#1E3A8A] mb-8">{section.diagram.title}</h4>
            <div className="flex flex-wrap justify-center gap-6">
              {section.diagram.nodes.map((node, i) => {
                const Icon = IconMap[node.icon] || BookOpen;
                return (
                  <div key={i} className="flex flex-col items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-40 text-center relative">
                    <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <span className="font-bold text-sm text-[#1F2937]">{node.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {section.type === 'mindmap' && section.diagram && (
          <div className="bg-[#F8FAFC] border border-gray-200 p-8 rounded-2xl mb-8 flex flex-col items-center">
            <div className="px-6 py-3 bg-[#B91C1C] text-white font-bold rounded-xl shadow-md mb-8 z-10">
              {section.diagram.center}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              {section.diagram.branches.map((branch, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center font-medium text-[#1F2937] flex items-center justify-center relative">
                  {branch}
                </div>
              ))}
            </div>
          </div>
        )}

        {section.type === 'infographic-list' && section.items && (
          <div className="grid gap-4 mb-8">
            {section.items.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#F59E0B] flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h5 className="font-bold text-[#1F2937] mb-1">{item.title}</h5>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {section.type === 'three-pillars' && section.pillars && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {section.pillars.map((pillar, i) => (
              <div key={i} className="bg-white border-t-4 border-[#B91C1C] p-6 rounded-b-xl border-x border-b border-gray-200 shadow-sm text-center">
                <h5 className="font-bold text-[#1F2937] mb-3">{pillar.title}</h5>
                <p className="text-gray-600 text-sm">{pillar.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Section Completion Button */}
        <div className="flex justify-end">
          <button
            onClick={() => handleSectionComplete(section.id)}
            disabled={isCompleted}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              isCompleted 
                ? 'bg-[#DCFCE7] text-[#15803d] cursor-default border border-[#15803d]/30' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
            }`}
          >
            {isCompleted ? (
              <><CheckCircle2 className="w-5 h-5" /> Đã học phần này</>
            ) : (
              <><CheckCircle className="w-5 h-5" /> Đánh dấu đã học</>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col xl:flex-row bg-[#F8FAFC]">
      
      {/* 1. Sidebar - Navigation */}
      <aside className="w-full xl:w-80 flex-shrink-0 border-r border-gray-200 bg-white p-6 hidden xl:block overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
        <button 
          onClick={() => navigate('/theory/chapters')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#B91C1C] font-medium text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </button>

        <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-4">Các chương học</h3>
        <div className="space-y-2">
          {chapters.map(c => {
            const isActive = c.id === chapterId;
            const isDone = progress.completedChapters.includes(c.id);
            return (
              <div 
                key={c.id} 
                onClick={() => navigate(`/theory/chapters/${c.id}`)}
                className={`p-3 rounded-xl cursor-pointer transition-colors border ${
                  isActive 
                    ? 'bg-[#FEE2E2] border-[#B91C1C]/30' 
                    : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isActive ? 'text-[#B91C1C]' : 'text-gray-500'}`}>
                    Chương {c.chapterNumber}
                  </span>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-[#15803d]" />}
                </div>
                <h4 className={`text-sm font-medium line-clamp-2 ${isActive ? 'text-[#B91C1C]' : 'text-[#1F2937]'}`}>
                  {c.title}
                </h4>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 max-w-4xl mx-auto p-4 md:p-8 lg:p-12 w-full">
        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FEE2E2] text-[#B91C1C] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Chương {chapterData.chapterNumber}
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-black text-[#1F2937] leading-tight mb-6">
            {chapterData.title}
          </h1>
          
          {newLessonData ? (
            <LessonDetailView 
              lesson={newLessonData} 
              completedSections={completedSections}
              onSectionComplete={handleSectionComplete}
            />
          ) : (
            <>
              <div className="bg-white border-l-4 border-[#F59E0B] p-6 rounded-r-2xl border-y border-r border-gray-200 shadow-sm mb-12">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-[#1F2937] mb-2">Mục tiêu học tập</h4>
                    <p className="text-gray-600 leading-relaxed">{chapterData.objective}</p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-4">
                {chapterData.sections.map(renderSection)}
              </div>

              {/* Chapter Summary */}
              {chapterData.summary && (
                <div className="mt-16 p-8 bg-[#1E3A8A] rounded-[2rem] text-white text-center shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <h3 className="text-2xl font-bold mb-4 relative z-10">Tóm tắt cuối chương</h3>
                  <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto relative z-10">
                    {chapterData.summary}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* 3. Right Panel - Progress & Tools */}
      <aside className="w-full xl:w-80 flex-shrink-0 border-l border-gray-200 bg-white p-6 xl:block sticky top-16 h-auto xl:h-[calc(100vh-4rem)] overflow-y-auto">
        <h3 className="font-bold text-[#1F2937] text-lg mb-6 flex items-center gap-2">
          <LayoutList className="w-5 h-5 text-[#B91C1C]" /> Tiến độ chương
        </h3>
        
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-gray-600">Hoàn thành</span>
            <span className="text-2xl font-black text-[#B91C1C]">{chapterProgress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div 
              className="h-full bg-[#B91C1C] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${chapterProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center">
            {completedSections.length} / {displaySections.length} phần đã học
          </p>
        </div>

        <h3 className="font-bold text-[#1F2937] mb-4">Mục lục</h3>
        <div className="space-y-2 mb-8">
          {displaySections.map((sec, i) => (
            <a 
              key={sec.id}
              href={`#${sec.id}`}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-3 text-sm p-2 rounded-lg transition-colors ${
                activeSection === sec.id ? 'bg-[#FEE2E2] border border-[#B91C1C]/30' : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                completedSections.includes(sec.id) ? 'bg-[#DCFCE7] text-[#15803d]' : 'bg-gray-100 text-gray-400'
              }`}>
                {completedSections.includes(sec.id) ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`line-clamp-2 ${completedSections.includes(sec.id) ? 'text-gray-700' : 'text-gray-500'}`}>
                {sec.title}
              </span>
            </a>
          ))}
        </div>

        {/* Complete Chapter Action */}
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={handleChapterComplete}
            disabled={isChapterCompleted || chapterProgress < 100}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
              isChapterCompleted
                ? 'bg-[#15803d] text-white shadow-md'
                : chapterProgress === 100
                  ? 'bg-[#B91C1C] text-white hover:bg-red-700 hover:shadow-md'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isChapterCompleted ? (
              <><CheckCircle className="w-5 h-5" /> Đã hoàn thành chương</>
            ) : (
              'Đánh dấu hoàn thành chương'
            )}
          </button>
          {chapterProgress < 100 && !isChapterCompleted && (
             <p className="text-xs text-center text-gray-500 mt-3">
               Bạn cần đọc và đánh dấu hoàn thành tất cả các mục để kết thúc chương.
             </p>
          )}
        </div>
      </aside>

    </div>
  );
}
