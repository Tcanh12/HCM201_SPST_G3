import { motion } from 'framer-motion';
import { BookOpen, Target, Brain, Flag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4 relative bg-[#F8FAFC]">
      
      {/* Background Decorative */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FEE2E2] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#DBEAFE] rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7] text-[#15803d] rounded-full text-sm font-bold uppercase tracking-widest mb-4">
            <BookOpen className="w-4 h-4" /> Giới thiệu môn học
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-[#1F2937] mb-6 leading-tight">
            Tư tưởng Hồ Chí Minh
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của nước ta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-[#F59E0B]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Mục tiêu môn học</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 flex-shrink-0" />
                Trang bị hệ thống tri thức cơ bản về tư tưởng Hồ Chí Minh.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 flex-shrink-0" />
                Nâng cao năng lực tư duy lý luận và phương pháp công tác.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2 flex-shrink-0" />
                Bồi dưỡng đạo đức cách mạng, bản lĩnh chính trị.
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-14 h-14 bg-[#DBEAFE] rounded-2xl flex items-center justify-center mb-6">
              <Brain className="w-7 h-7 text-[#1E3A8A]" />
            </div>
            <h3 className="text-2xl font-bold text-[#1F2937] mb-4">Đối tượng nghiên cứu</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-2 flex-shrink-0" />
                Hệ thống quan điểm của Hồ Chí Minh trong di sản của Người.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-2 flex-shrink-0" />
                Quá trình vận dụng tư tưởng đó trong thực tiễn cách mạng Việt Nam.
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] mt-2 flex-shrink-0" />
                Sự phát triển sáng tạo của Đảng qua các thời kỳ.
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="bg-[#1E3A8A] rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <Flag className="w-16 h-16 text-[#FEF3C7] mx-auto mb-6 relative z-10" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Sẵn sàng khám phá?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto relative z-10">
            Trải nghiệm phương pháp học tập trực quan mới lạ với bản đồ tri thức, dòng thời gian và các hồ sơ tình huống thực tế.
          </p>
          <button 
            onClick={() => navigate('/theory/chapters')}
            className="px-8 py-4 bg-white text-[#1E3A8A] hover:bg-gray-50 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2 mx-auto relative z-10"
          >
            Vào bài học ngay <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
