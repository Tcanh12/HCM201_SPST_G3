import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swords, Users } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-dark to-dark">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-display font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          ANIMAL THEORY ROYALE
        </h1>
        <h2 className="text-2xl font-display font-bold text-white/90 uppercase tracking-widest">
          Vòng Bo Tri Thức 3D
        </h2>
        <p className="mt-4 text-gray-400 max-w-lg mx-auto">
          Sinh tồn bằng tri thức. Chạy nhanh chưa đủ, muốn thắng phải hiểu đúng.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex gap-6"
      >
        <button 
          onClick={() => navigate('/create')}
          className="group relative px-8 py-4 bg-primary rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          <Swords className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Tạo Phòng Mới</span>
        </button>

        <button 
          onClick={() => navigate('/join')}
          className="group relative px-8 py-4 bg-white/10 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:bg-white/20 border border-white/20 flex items-center gap-3"
        >
          <Users className="w-6 h-6 relative z-10" />
          <span className="relative z-10">Tham Gia Bằng Mã</span>
        </button>
      </motion.div>
    </div>
  );
}
