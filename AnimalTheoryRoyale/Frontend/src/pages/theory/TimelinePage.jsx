import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Flag, ArrowRight, Map, BookOpen, Search, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import { timelineEvents } from '../../data/timelineData';
import { getConceptTitle } from '../../data/canonicalConcepts';
import chapters from '../../data/chapters.json';

export default function TimelinePage() {
  const navigate = useNavigate();
  const { progress, markTimelineEventViewed } = useLearningProgress();
  const [selectedEventId, setSelectedEventId] = useState(timelineEvents[0].id);

  const selectedEvent = timelineEvents.find(e => e.id === selectedEventId);

  useEffect(() => {
    if (selectedEventId) {
      markTimelineEventViewed(selectedEventId);
    }
  }, [selectedEventId, markTimelineEventViewed]);

  const viewedEvents = progress.viewedTimelineEvents || [];
  const progressPercent = Math.round((viewedEvents.length / timelineEvents.length) * 100);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col xl:flex-row bg-[#F8FAFC]">
      
      {/* 1. Sidebar - Timeline Navigation */}
      <aside className="w-full xl:w-[400px] flex-shrink-0 border-r border-gray-200 bg-white p-6 h-[50vh] xl:h-[calc(100vh-4rem)] overflow-y-auto z-10 shadow-sm relative">
        <div className="mb-8 sticky top-0 bg-white pt-2 pb-4 z-20 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DBEAFE] text-[#1E3A8A] rounded-full text-sm font-bold uppercase tracking-widest">
              <Clock className="w-4 h-4" /> Dòng thời gian
            </div>
            <span className="text-sm font-bold text-gray-500">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[#1E3A8A] rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
          <h2 className="text-2xl font-bold text-[#1F2937] leading-tight">Dòng chảy hình thành tư tưởng Hồ Chí Minh</h2>
        </div>

        <div className="relative border-l-2 border-gray-200 ml-4 space-y-6 pb-8">
          {timelineEvents.map((event) => {
            const isActive = event.id === selectedEventId;
            const isViewed = viewedEvents.includes(event.id);

            return (
              <div 
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className="relative pl-6 cursor-pointer group"
              >
                {/* Timeline dot */}
                <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                  isActive 
                    ? 'bg-[#1E3A8A] border-[#1E3A8A] scale-125' 
                    : isViewed
                      ? 'bg-white border-[#15803d]'
                      : 'bg-white border-gray-300 group-hover:border-[#1E3A8A]'
                }`}>
                  {isViewed && !isActive && <CheckCircle2 className="w-3 h-3 text-[#15803d] absolute" />}
                </div>

                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#DBEAFE] border border-[#1E3A8A]/30 shadow-sm' 
                    : 'bg-white border border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-bold ${isActive ? 'text-[#1E3A8A]' : 'text-gray-500'}`}>
                      {event.period}
                    </span>
                    {isViewed && !isActive && <span className="text-[10px] uppercase font-bold text-[#15803d] bg-[#DCFCE7] px-1.5 py-0.5 rounded">Đã xem</span>}
                  </div>
                  <h3 className={`font-bold line-clamp-2 ${isActive ? 'text-[#1F2937]' : 'text-gray-700'}`}>
                    {event.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 2. Main Content - Event Details */}
      <main className="flex-1 p-6 md:p-10 xl:p-12 h-auto xl:h-[calc(100vh-4rem)] overflow-y-auto relative bg-[#F8FAFC]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {selectedEvent && (
            <motion.div
              key={selectedEvent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="mb-10 bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm">
                <span className="text-[#1E3A8A] font-black text-5xl md:text-7xl opacity-10 block mb-2 -ml-1 tracking-tighter">
                  {selectedEvent.period}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black text-[#1F2937] leading-tight mb-4">
                  {selectedEvent.title}
                </h1>
                <p className="text-xl text-gray-500 font-medium">
                  {selectedEvent.shortDescription}
                </p>
              </div>

              {/* Story Detail Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Context */}
                <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#F3F4F6] rounded-xl flex items-center justify-center">
                      <Map className="w-5 h-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937]">Bối cảnh lịch sử</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedEvent.historicalContext}
                  </p>
                </div>

                {/* Problem */}
                <div className="bg-white border-l-4 border-[#F59E0B] border-y border-r border-gray-200 p-8 rounded-r-3xl rounded-bl-3xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#FEF3C7] rounded-xl flex items-center justify-center">
                      <Search className="w-5 h-5 text-[#F59E0B]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937]">Vấn đề đặt ra</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {selectedEvent.problem}
                  </p>
                </div>

                {/* Ideological Development */}
                <div className="bg-white border border-[#B91C1C]/20 p-8 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#FEE2E2] rounded-xl flex items-center justify-center">
                      <Flag className="w-5 h-5 text-[#B91C1C]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937]">Tư tưởng hình thành & Phát triển</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedEvent.ideologicalDevelopment}
                  </p>
                </div>

                {/* Impact & Learning Value */}
                <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#DBEAFE] rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1F2937]">Tác động & Giá trị</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Ý nghĩa:</strong> {selectedEvent.impact}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Bài học:</strong> {selectedEvent.learningValue}
                  </p>
                </div>

                {/* Key Questions */}
                <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 p-8 rounded-3xl shadow-sm md:col-span-2">
                  <h3 className="text-lg font-bold text-[#b45309] mb-4">Câu hỏi suy ngẫm:</h3>
                  <ul className="list-disc pl-5 text-[#b45309] font-medium space-y-2">
                    {selectedEvent.keyQuestions?.map((q, idx) => (
                      <li key={idx}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Tags */}
              <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm mb-12">
                <div className="flex items-center gap-2 mb-6 text-gray-500 font-bold uppercase tracking-wider text-sm">
                  <Info className="w-4 h-4" /> Mở rộng kiến thức
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-[#1F2937] mb-3">Chương liên quan:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.relatedChapterIds?.map(chId => {
                      const chapter = chapters.find(c => c.id === chId);
                      return chapter ? (
                        <button
                          key={chId}
                          onClick={() => navigate(`/theory/chapters/${chId}`)}
                          className="px-4 py-2 bg-[#F8FAFC] border border-gray-200 hover:border-[#1E3A8A]/30 hover:bg-[#DBEAFE] hover:text-[#1E3A8A] text-gray-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          <BookOpen className="w-4 h-4" /> {chapter.title || `Chương ${chapter.chapterNumber}`}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#1F2937] mb-3">Khái niệm cốt lõi:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.relatedConceptIds?.map(conceptId => (
                      <button
                        key={conceptId}
                        onClick={() => navigate('/theory/concept-map')}
                        className="px-3 py-1.5 bg-[#FEF3C7]/50 text-[#b45309] hover:bg-[#FEF3C7] rounded-lg text-sm font-medium transition-colors border border-[#F59E0B]/20"
                      >
                        #{getConceptTitle(conceptId)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
