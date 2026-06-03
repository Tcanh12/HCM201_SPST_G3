import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Tags, AlertCircle, BookOpen, MessageCircleQuestion, CornerDownRight } from 'lucide-react';
import caseFilesData from '../../data/caseFiles.json';

// A 3D Flip Card Component
const FlipCard = ({ caseFile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[400px] md:h-[450px] perspective-[1000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/10 rounded-3xl p-8 flex flex-col shadow-xl">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
            <FileText className="w-6 h-6 text-emerald-400" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
            {caseFile.title}
          </h3>
          
          <p className="text-white/60 text-base leading-relaxed flex-1">
            {caseFile.summary}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
            {caseFile.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded-lg flex items-center gap-1">
                <Tags className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>

          <div className="absolute top-8 right-8 animate-bounce">
            <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
              Lật thẻ <CornerDownRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-emerald-900/40 to-dark border border-emerald-500/30 rounded-3xl p-6 md:p-8 flex flex-col shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-5">
            
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Tình huống
              </h4>
              <p className="text-white/90 text-sm leading-relaxed">
                {caseFile.situation}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Liên hệ tư tưởng
              </h4>
              <p className="text-white/80 text-sm leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {caseFile.knowledge}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <MessageCircleQuestion className="w-4 h-4" /> Câu hỏi suy ngẫm
              </h4>
              <p className="text-white/90 text-sm font-bold leading-relaxed italic border-l-2 border-red-500 pl-3">
                "{caseFile.question}"
              </p>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default function CaseFilesPage() {
  return (
    <div className="w-full min-h-screen pb-20 px-4">
      {/* Header */}
      <section className="pt-20 pb-12 max-w-7xl mx-auto border-b border-white/10 mb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <FileText className="w-4 h-4" /> Case Files
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-4">Hồ sơ Tình huống</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Biến lý thuyết thành tình huống thực tế. Lật thẻ để xem cách vận dụng các khái niệm tư tưởng Hồ Chí Minh vào giải quyết các vấn đề trong đời sống, học tập và thời đại số.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseFilesData.map((caseFile, index) => (
            <motion.div
              key={caseFile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FlipCard caseFile={caseFile} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
