import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Search, ArrowRight, Lightbulb, Compass, Globe } from 'lucide-react';
import timelineData from '../../data/timeline.json';

export default function TimelinePage() {
  const [activeId, setActiveId] = useState(timelineData[0].id);
  const activeEvent = timelineData.find(t => t.id === activeId);

  return (
    <div className="w-full min-h-screen bg-[#050508] flex flex-col xl:flex-row pb-20 xl:pb-0 overflow-x-hidden">
      
      {/* LEFT: TIMELINE NAVIGATION */}
      <div className="w-full xl:w-2/5 p-6 md:p-12 lg:pl-20 flex flex-col border-r border-white/10 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <Clock className="w-4 h-4" /> Dòng thời gian lịch sử
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight">
            Quá trình hình thành & phát triển
          </h1>
        </div>

        <div className="relative flex-1">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-white/5 rounded-full" />

          <div className="space-y-10 relative">
            {timelineData.map((item, index) => {
              const isActive = activeId === item.id;
              
              return (
                <div 
                  key={item.id} 
                  className="flex gap-8 items-start cursor-pointer group"
                  onClick={() => setActiveId(item.id)}
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-xl ${
                    isActive ? 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-110' : 'bg-dark border border-white/20 group-hover:border-cyan-400'
                  }`}>
                    <span className={`font-bold text-sm ${isActive ? 'text-dark' : 'text-white/50'}`}>
                      {index + 1}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className={`pt-2 transition-all duration-300 ${isActive ? 'opacity-100 translate-x-2' : 'opacity-50 group-hover:opacity-80'}`}>
                    <div className={`text-sm font-black mb-1 ${isActive ? 'text-cyan-400' : 'text-white/40'}`}>
                      {item.year}
                    </div>
                    <h3 className={`text-xl font-bold mb-2 leading-snug ${isActive ? 'text-white' : 'text-white/80'}`}>
                      {item.title}
                    </h3>
                    {isActive && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-white/60 text-sm leading-relaxed"
                      >
                        {item.summary}
                      </motion.p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: STORY LAYER (DETAILS) */}
      <div className="w-full xl:w-3/5 p-6 md:p-12 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0a0a0f] to-[#12121a]">
        
        {/* Background Decorative */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative z-10 shadow-2xl"
          >
            <div className="text-cyan-400 font-black text-2xl mb-6">{activeEvent.year}</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-10 leading-snug">
              {activeEvent.title}
            </h2>

            <div className="space-y-6">
              
              {/* Context */}
              <div className="bg-dark/50 border border-white/5 p-6 rounded-2xl flex gap-4">
                <Globe className="w-8 h-8 text-white/30 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Bối cảnh lịch sử</h4>
                  <p className="text-white/80 leading-relaxed text-sm md:text-base">{activeEvent.details.context}</p>
                </div>
              </div>

              {/* Problem */}
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex gap-4">
                <Search className="w-8 h-8 text-red-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Vấn đề đặt ra</h4>
                  <p className="text-white/90 leading-relaxed font-medium text-sm md:text-base">{activeEvent.details.problem}</p>
                </div>
              </div>

              {/* Ideology */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl flex gap-4">
                <Lightbulb className="w-8 h-8 text-yellow-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-2">Tư tưởng hình thành</h4>
                  <p className="text-white/90 leading-relaxed font-medium text-sm md:text-base">{activeEvent.details.ideology}</p>
                </div>
              </div>

              {/* Impact */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-2xl flex gap-4">
                <Compass className="w-8 h-8 text-cyan-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Ý nghĩa</h4>
                  <p className="text-white/90 leading-relaxed font-medium text-sm md:text-base">{activeEvent.details.impact}</p>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
