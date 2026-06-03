import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Search, ArrowRight, Lightbulb, Compass, Globe } from 'lucide-react';
import timelineData from '../../data/timeline.json';

const IconMap = { Lightbulb, Compass, Globe, Search, Clock, CheckCircle2 };

export default function TimelinePage() {
  const [selectedEventId, setSelectedEventId] = useState(timelineData[0].id);
  const selectedEvent = timelineData.find(e => e.id === selectedEventId);

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col xl:flex-row bg-[#F8FAFC]">
      
      {/* 1. Sidebar - Timeline Navigation */}
      <aside className="w-full xl:w-96 flex-shrink-0 border-r border-gray-200 bg-white p-6 h-[50vh] xl:h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DBEAFE] text-[#1E3A8A] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <Clock className="w-4 h-4" /> Dòng thời gian
          </div>
          <h2 className="text-2xl font-bold text-[#1F2937] leading-tight">Quá trình hình thành & phát triển tư tưởng HCM</h2>
        </div>

        <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-8">
          {timelineData.map((event, index) => {
            const isActive = event.id === selectedEventId;
            return (
              <div 
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className="relative pl-6 cursor-pointer group"
              >
                {/* Timeline dot */}
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#1E3A8A] border-[#1E3A8A] scale-125' 
                    : 'bg-white border-gray-300 group-hover:border-[#1E3A8A]'
                }`} />

                <div className={`p-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#DBEAFE] border border-[#1E3A8A]/30 shadow-sm' 
                    : 'bg-white border border-transparent hover:bg-gray-50 hover:border-gray-200'
                }`}>
                  <span className={`text-sm font-bold block mb-1 ${isActive ? 'text-[#1E3A8A]' : 'text-gray-500'}`}>
                    {event.period}
                  </span>
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
      <main className="flex-1 p-6 md:p-12 xl:p-16 h-auto xl:h-[calc(100vh-4rem)] overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-[#F8FAFC] z-0 pointer-events-none" />
        
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
              <div className="mb-10">
                <span className="text-[#1E3A8A] font-black text-6xl md:text-8xl opacity-10 block mb-2 -ml-2 tracking-tighter">
                  {selectedEvent.period}
                </span>
                <h1 className="text-3xl md:text-5xl font-display font-black text-[#1F2937] leading-tight mb-6">
                  {selectedEvent.title}
                </h1>
                <p className="text-xl text-gray-500 leading-relaxed">
                  {selectedEvent.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedEvent.details.map((detail, idx) => {
                  const Icon = IconMap[detail.icon] || Search;
                  return (
                    <div key={idx} className="bg-white border border-gray-200 p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6 text-[#1E3A8A]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1F2937] mb-4">{detail.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {detail.content}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#1E3A8A] text-white p-8 md:p-10 rounded-[2rem] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-2xl font-bold mb-4 relative z-10 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#FEF3C7]" /> Ý nghĩa giai đoạn
                </h3>
                <p className="text-white/90 text-lg leading-relaxed relative z-10 font-medium">
                  {selectedEvent.significance}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </div>
  );
}
