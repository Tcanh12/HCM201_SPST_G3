import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Network, Map, Clock, FileText, ChevronRight, BookOpen, BrainCircuit } from 'lucide-react';
import chapters from '../../data/chapters.json';

export default function TheoryHomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      {/* 6.2 SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background Network/Nodes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-[#0a0a0f] to-[#0a0a0f] z-0" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md"
          >
            <BrainCircuit className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-white/80 uppercase tracking-widest">Concept Explorer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">Trực quan hóa</span>
            <br />
            <span className="text-white">Tư tưởng Hồ Chí Minh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl leading-relaxed"
          >
            Khám phá môn học bằng bản đồ tri thức, timeline lịch sử, hồ sơ khái niệm, ví dụ thực tế và câu hỏi tương tác.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button 
              onClick={() => navigate('/theory/chapters')}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2"
            >
              Bắt đầu học <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/theory/concept-map')}
              className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Map className="w-5 h-5" /> Xem bản đồ tri thức
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-400 rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 backdrop-blur-md hidden sm:flex"
            >
              Vào Game Mode
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6.3 SECTION 2: VÌ SAO CẦN WEBSITE NÀY? */}
      <section className="py-24 px-4 bg-white/[0.02] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Từ học thuộc sang <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">khám phá</span></h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
              Môn Tư tưởng Hồ Chí Minh có nhiều khái niệm quan trọng, nhưng nếu chỉ học bằng văn bản dài hoặc slide gạch đầu dòng, người học dễ cảm thấy khô khan và khó ghi nhớ. Concept Explorer chuyển nội dung giáo trình thành các lớp trực quan, giúp người học nhìn thấy cấu trúc, hiểu mối liên hệ và ghi nhớ bằng trải nghiệm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 border border-red-500/30">
                <span className="text-red-400 font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-400">Vấn đề</h3>
              <p className="text-white/60 leading-relaxed">
                Lý thuyết dài, nhiều khái niệm, khó ghi nhớ nếu chỉ đọc văn bản.
              </p>
            </div>

            <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/20 p-8 rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.05)] transform md:-translate-y-4">
              <div className="w-12 h-12 bg-yellow-400/20 rounded-2xl flex items-center justify-center mb-6 border border-yellow-400/30">
                <span className="text-yellow-400 font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-400">Giải pháp</h3>
              <p className="text-white/80 leading-relaxed font-medium">
                Chuyển kiến thức thành bản đồ, timeline, card, case file và quiz tương tác.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
                <span className="text-emerald-400 font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-emerald-400">Kết quả</h3>
              <p className="text-white/60 leading-relaxed">
                Người học hiểu bản chất, nhớ mối liên hệ và biết vận dụng vào thực tế.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6.4 SECTION 3: CÁC CHẾ ĐỘ HỌC */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="group bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/10 p-8 rounded-3xl hover:border-red-500/50 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all" />
              <BookOpen className="w-10 h-10 text-red-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Học theo giáo trình</h3>
              <p className="text-white/60 mb-8 leading-relaxed">Nội dung được chia theo từng chương, bám sát cấu trúc môn Tư tưởng Hồ Chí Minh.</p>
              <button onClick={() => navigate('/theory/chapters')} className="text-red-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="group bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/10 p-8 rounded-3xl hover:border-yellow-400/50 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl group-hover:bg-yellow-400/20 transition-all" />
              <Network className="w-10 h-10 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Bản đồ tri thức</h3>
              <p className="text-white/60 mb-8 leading-relaxed">Khám phá các khái niệm như một hệ thống node liên kết với nhau một cách trực quan.</p>
              <button onClick={() => navigate('/theory/concept-map')} className="text-yellow-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="group bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/10 p-8 rounded-3xl hover:border-cyan-400/50 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl group-hover:bg-cyan-400/20 transition-all" />
              <Clock className="w-10 h-10 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Timeline lịch sử</h3>
              <p className="text-white/60 mb-8 leading-relaxed">Theo dõi quá trình hình thành và phát triển tư tưởng Hồ Chí Minh qua các giai đoạn.</p>
              <button onClick={() => navigate('/theory/timeline')} className="text-cyan-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="group bg-gradient-to-br from-[#1a1a24] to-[#0a0a0f] border border-white/10 p-8 rounded-3xl hover:border-emerald-400/50 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-all" />
              <FileText className="w-10 h-10 text-emerald-400 mb-6" />
              <h3 className="text-2xl font-bold mb-3">Case Files</h3>
              <p className="text-white/60 mb-8 leading-relaxed">Biến lý thuyết thành tình huống thực tế, ví dụ hiện đại và câu hỏi ứng dụng thực tiễn.</p>
              <button onClick={() => navigate('/theory/case-files')} className="text-emerald-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

          </div>
        </div>
      </section>

      {/* 6.5 SECTION 4: BÁM SÁT GIÁO TRÌNH */}
      <section className="py-24 px-4 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Học sâu theo từng chương giáo trình</h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
              Website tổ chức nội dung theo các chương chính của môn Tư tưởng Hồ Chí Minh. Mỗi chương được trình bày bằng nhiều dạng giao diện khác nhau như tóm tắt trực quan, sơ đồ hóa, thẻ khái niệm, timeline, ví dụ thực tế và câu hỏi ôn tập.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col hover:bg-white/10 transition-colors">
                <div className="text-red-400 font-bold text-sm uppercase tracking-wider mb-2">Chương {chapter.chapterNumber}</div>
                <h3 className="text-lg font-bold mb-3 leading-snug">{chapter.title}</h3>
                <p className="text-white/50 text-sm mb-6 flex-1 line-clamp-3">{chapter.summary}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40 font-medium">{chapter.conceptCount} khái niệm chính</span>
                  <button 
                    onClick={() => navigate(`/theory/chapters/${chapter.id}`)}
                    className="text-sm font-bold text-white hover:text-red-400 transition-colors flex items-center gap-1"
                  >
                    Xem chương <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.6 SECTION 5: GAME MODE */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-950/20 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-dark-lighter/80 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(245,158,11,0.4)] transform rotate-12">
            <Gamepad2 className="w-10 h-10 text-white transform -rotate-12" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Học xong lý thuyết, chuyển sang game để luyện tập</h2>
          <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Sau khi khám phá nội dung lý thuyết, người học có thể chuyển sang Game Mode để ôn tập kiến thức bằng nhiệm vụ, thử thách và trải nghiệm tương tác trong môi trường game sinh tồn 3D.
          </p>
          
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-white text-dark rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-3 mx-auto"
          >
            Vào Game Mode <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/30 text-sm border-t border-white/5">
        <p>Concept Explorer © 2026. Trực quan hóa môn Tư tưởng Hồ Chí Minh.</p>
      </footer>
    </div>
  );
}
