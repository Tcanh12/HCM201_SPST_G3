import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Network, Map, Clock, FileText, ChevronRight, BookOpen, BrainCircuit, Gamepad2 } from 'lucide-react';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import chapters from '../../data/chapters.json';

export default function TheoryHomePage() {
  const navigate = useNavigate();
  const { progress } = useLearningProgress();

  return (
    <div className="w-full h-full bg-[#F8FAFC]">
      {/* 6.2 SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
        {/* Background Network/Nodes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#F8FAFC] to-[#F8FAFC] z-0" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] z-0" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FEE2E2] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEF3C7] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] shadow-sm rounded-full mb-8 backdrop-blur-md"
          >
            <BrainCircuit className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-sm font-bold text-[#1F2937] uppercase tracking-widest">Concept Explorer</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B91C1C] to-red-500">Trực quan hóa</span>
            <br />
            <span className="text-[#1F2937]">Tư tưởng Hồ Chí Minh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed"
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
              className="px-8 py-4 bg-[#B91C1C] hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              {progress.lastVisitedRoute ? "Tiếp tục học" : "Bắt đầu học"} <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/theory/concept-map')}
              className="px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-[#1F2937] rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-sm"
            >
              <Map className="w-5 h-5 text-[#1E3A8A]" /> Xem bản đồ tri thức
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6.3 SECTION 2: VÌ SAO CẦN WEBSITE NÀY? */}
      <section className="py-24 px-4 bg-white border-y border-gray-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-[#1F2937]">Từ học thuộc sang <span className="text-[#F59E0B]">khám phá</span></h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Môn Tư tưởng Hồ Chí Minh có nhiều khái niệm quan trọng, nhưng nếu chỉ học bằng văn bản dài hoặc slide gạch đầu dòng, người học dễ cảm thấy khô khan và khó ghi nhớ. Concept Explorer chuyển nội dung giáo trình thành các lớp trực quan, giúp người học nhìn thấy cấu trúc, hiểu mối liên hệ và ghi nhớ bằng trải nghiệm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-3xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#FEE2E2] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-[#B91C1C] font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Vấn đề</h3>
              <p className="text-gray-600 leading-relaxed">
                Lý thuyết dài, nhiều khái niệm, khó ghi nhớ nếu chỉ đọc văn bản.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-lg transform md:-translate-y-4">
              <div className="w-12 h-12 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-[#F59E0B] font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Giải pháp</h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                Chuyển kiến thức thành bản đồ, timeline, card, case file và quiz tương tác.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-3xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#DCFCE7] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-[#15803d] font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1F2937]">Kết quả</h3>
              <p className="text-gray-600 leading-relaxed">
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
            
            <div className="group bg-white border border-gray-200 shadow-sm p-8 rounded-3xl hover:shadow-xl hover:border-[#B91C1C]/30 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEE2E2]/50 rounded-full blur-3xl group-hover:bg-[#FEE2E2] transition-all" />
              <BookOpen className="w-10 h-10 text-[#B91C1C] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 text-[#1F2937] relative z-10">Học theo giáo trình</h3>
              <p className="text-gray-600 mb-8 leading-relaxed relative z-10">Nội dung được chia theo từng chương, bám sát cấu trúc môn Tư tưởng Hồ Chí Minh.</p>
              <button onClick={() => navigate('/theory/chapters')} className="text-[#B91C1C] font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="group bg-white border border-gray-200 shadow-sm p-8 rounded-3xl hover:shadow-xl hover:border-[#F59E0B]/30 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEF3C7]/50 rounded-full blur-3xl group-hover:bg-[#FEF3C7] transition-all" />
              <Network className="w-10 h-10 text-[#F59E0B] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 text-[#1F2937] relative z-10">Bản đồ tri thức</h3>
              <p className="text-gray-600 mb-8 leading-relaxed relative z-10">Khám phá các khái niệm như một hệ thống node liên kết với nhau một cách trực quan.</p>
              <button onClick={() => navigate('/theory/concept-map')} className="text-[#F59E0B] font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="group bg-white border border-gray-200 shadow-sm p-8 rounded-3xl hover:shadow-xl hover:border-[#1E3A8A]/30 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DBEAFE]/50 rounded-full blur-3xl group-hover:bg-[#DBEAFE] transition-all" />
              <Clock className="w-10 h-10 text-[#1E3A8A] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 text-[#1F2937] relative z-10">Timeline lịch sử</h3>
              <p className="text-gray-600 mb-8 leading-relaxed relative z-10">Theo dõi quá trình hình thành và phát triển tư tưởng Hồ Chí Minh qua các giai đoạn.</p>
              <button onClick={() => navigate('/theory/timeline')} className="text-[#1E3A8A] font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

            <div className="group bg-white border border-gray-200 shadow-sm p-8 rounded-3xl hover:shadow-xl hover:border-[#15803d]/30 transition-all cursor-pointer overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#DCFCE7]/50 rounded-full blur-3xl group-hover:bg-[#DCFCE7] transition-all" />
              <FileText className="w-10 h-10 text-[#15803d] mb-6 relative z-10" />
              <h3 className="text-2xl font-bold mb-3 text-[#1F2937] relative z-10">Case Files</h3>
              <p className="text-gray-600 mb-8 leading-relaxed relative z-10">Biến lý thuyết thành tình huống thực tế, ví dụ hiện đại và câu hỏi ứng dụng thực tiễn.</p>
              <button onClick={() => navigate('/theory/case-files')} className="text-[#15803d] font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">Khám phá ngay <ChevronRight className="w-4 h-4" /></button>
            </div>

          </div>
        </div>
      </section>

      {/* 6.5 SECTION 4: BÁM SÁT GIÁO TRÌNH */}
      <section className="py-24 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-[#1F2937]">Học sâu theo từng chương giáo trình</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Website tổ chức nội dung theo các chương chính của môn Tư tưởng Hồ Chí Minh. Mỗi chương được trình bày bằng nhiều dạng giao diện khác nhau như tóm tắt trực quan, sơ đồ hóa, thẻ khái niệm, timeline, ví dụ thực tế và câu hỏi ôn tập.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => {
              const chapterProgress = progress.completedChapters.includes(chapter.id) ? 100 : (progress.completedSections[chapter.id]?.length > 0 ? 50 : 0);
              
              return (
                <div key={chapter.id} className="bg-white border border-gray-200 rounded-3xl p-6 flex flex-col hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-[#B91C1C] font-bold text-sm uppercase tracking-wider">Chương {chapter.chapterNumber}</div>
                    {chapterProgress === 100 && <span className="bg-[#DCFCE7] text-[#15803d] text-xs px-2 py-1 rounded-full font-bold">Hoàn thành</span>}
                    {chapterProgress > 0 && chapterProgress < 100 && <span className="bg-[#FEF3C7] text-[#F59E0B] text-xs px-2 py-1 rounded-full font-bold">Đang học</span>}
                  </div>
                  <h3 className="text-lg font-bold mb-3 leading-snug text-[#1F2937]">{chapter.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3">{chapter.summary}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">{chapter.conceptCount} khái niệm chính</span>
                    <button 
                      onClick={() => navigate(`/theory/chapters/${chapter.id}`)}
                      className="text-sm font-bold text-[#1E3A8A] hover:text-[#B91C1C] transition-colors flex items-center gap-1"
                    >
                      Xem chương <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6.6 SECTION 5: GAME MODE */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#DBEAFE]/50 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 bg-white border border-gray-200 p-12 rounded-[3rem] shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-[#1E3A8A] to-blue-500 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-lg transform rotate-12">
            <Gamepad2 className="w-10 h-10 text-white transform -rotate-12" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-[#1F2937]">Học xong lý thuyết, chuyển sang game để luyện tập</h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Sau khi khám phá nội dung lý thuyết, người học có thể chuyển sang Game Mode để ôn tập kiến thức bằng nhiệm vụ, thử thách và trải nghiệm tương tác trong môi trường game sinh tồn 3D.
          </p>
          
          <button 
            onClick={() => navigate('/')}
            className="px-10 py-5 bg-[#1E3A8A] text-white rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          >
            Vào Game Mode <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-200 bg-white">
        <p>Concept Explorer © 2026. Trực quan hóa môn Tư tưởng Hồ Chí Minh.</p>
      </footer>
    </div>
  );
}
