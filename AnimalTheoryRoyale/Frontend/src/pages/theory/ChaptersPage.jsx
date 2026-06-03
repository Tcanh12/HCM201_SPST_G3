import { motion } from 'framer-motion';
import { ChevronRight, LayoutGrid, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import chapters from '../../data/chapters.json';

export default function ChaptersPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full min-h-screen pb-20 px-4">
      {/* Header */}
      <section className="pt-20 pb-12 max-w-7xl mx-auto border-b border-white/10 mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <LayoutGrid className="w-4 h-4" /> Giáo trình cốt lõi
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4">Danh sách Chương</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            Khám phá 6 chương học cốt lõi của môn Tư tưởng Hồ Chí Minh. Các nội dung đã được trực quan hóa để giúp bạn tiếp thu một cách chủ động và sâu sắc.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => (
            <motion.div 
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col hover:bg-white/10 hover:border-red-500/30 transition-all relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="px-3 py-1 bg-white/10 rounded-lg text-sm font-bold text-white/80">
                  Chương {chapter.chapterNumber}
                </span>
              </div>
              
              <h2 className="text-xl font-bold mb-3 text-white leading-snug relative z-10 group-hover:text-red-400 transition-colors">
                {chapter.title}
              </h2>
              
              <p className="text-white/50 text-sm mb-6 flex-1 relative z-10">
                {chapter.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {chapter.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-dark text-white/60 text-xs rounded-md border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-gradient-to-r from-red-500 to-yellow-400 rounded-full" />
                  </div>
                  <span className="text-xs text-white/40 font-mono">0%</span>
                </div>
                
                <button 
                  onClick={() => navigate(`/theory/chapters/${chapter.id}`)}
                  className="flex items-center gap-1 text-sm font-bold text-white hover:text-yellow-400 transition-colors"
                >
                  Vào học <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
