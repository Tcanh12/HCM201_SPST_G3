import { motion } from 'framer-motion';
import { BookOpen, Target, Brain, Flag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-6"
          >
            Giới thiệu môn học
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/70 leading-relaxed"
          >
            Hiểu tư tưởng Hồ Chí Minh như một hệ thống tri thức có nguồn gốc, nội dung, giá trị và khả năng vận dụng trong thực tiễn.
          </motion.p>
        </div>
      </section>

      {/* Section 1: Môn học là gì? */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-display font-bold mb-6 text-white">Môn Tư tưởng Hồ Chí Minh là gì?</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Môn Tư tưởng Hồ Chí Minh nghiên cứu hệ thống quan điểm toàn diện và sâu sắc của Hồ Chí Minh về những vấn đề cơ bản của cách mạng Việt Nam. Nội dung môn học giúp người học hiểu khái niệm, nguồn gốc, quá trình hình thành, nội dung cốt lõi và giá trị của tư tưởng Hồ Chí Minh đối với cách mạng Việt Nam.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center">
              <span className="font-bold text-red-400">Khái niệm</span>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-center">
              <span className="font-bold text-yellow-400">Nguồn gốc</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-center">
              <span className="font-bold text-emerald-400">Nội dung</span>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-xl text-center">
              <span className="font-bold text-cyan-400">Giá trị & Vận dụng</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Học để làm gì? */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-10 text-center">Học môn này để làm gì?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-3xl">
            <BookOpen className="w-10 h-10 text-cyan-400 mb-6" />
            <h3 className="text-xl font-bold mb-4 text-white">Về kiến thức</h3>
            <p className="text-white/60 leading-relaxed">Người học nắm được những nội dung cơ bản về khái niệm, cơ sở hình thành, quá trình phát triển và các nội dung lớn trong tư tưởng Hồ Chí Minh.</p>
          </div>
          <div className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-3xl">
            <Brain className="w-10 h-10 text-yellow-400 mb-6" />
            <h3 className="text-xl font-bold mb-4 text-white">Về kỹ năng</h3>
            <p className="text-white/60 leading-relaxed">Hình thành năng lực phân tích, liên hệ lý luận với thực tiễn, biết nhìn nhận vấn đề xã hội bằng tư duy hệ thống và lịch sử.</p>
          </div>
          <div className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-8 rounded-3xl">
            <Flag className="w-10 h-10 text-red-400 mb-6" />
            <h3 className="text-xl font-bold mb-4 text-white">Về tư tưởng</h3>
            <p className="text-white/60 leading-relaxed">Bồi dưỡng lòng yêu nước, niềm tin vào độc lập dân tộc và chủ nghĩa xã hội, ý thức rèn luyện đạo đức, trách nhiệm công dân.</p>
          </div>
        </div>
      </section>

      {/* Section 3: So sánh */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold mb-4">Concept Explorer có gì khác biệt?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-dark border border-white/10 p-8 rounded-3xl opacity-70">
            <h3 className="text-xl font-bold text-white/50 mb-6 flex items-center gap-2">Cách học truyền thống</h3>
            <ul className="space-y-4 text-white/50">
              <li>- Đọc văn bản dài</li>
              <li>- Ghi nhớ bullet point</li>
              <li>- Học theo thứ tự cố định</li>
              <li>- Khó thấy mối liên hệ giữa các nội dung</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-yellow-900/20 border border-red-500/30 p-8 rounded-3xl shadow-[0_0_30px_rgba(217,28,28,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full" />
            <h3 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2 relative z-10">
              <Target className="w-5 h-5" /> Cách học trên Concept Explorer
            </h3>
            <ul className="space-y-4 text-white/90 relative z-10 font-medium">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"/> Xem bản đồ tri thức</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"/> Click vào từng khái niệm để khám phá</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"/> Học qua timeline và case file thực tế</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400"/> Làm quiz ngắn để tự ôn tập</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => navigate('/theory/chapters')}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            Bắt đầu học ngay <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
