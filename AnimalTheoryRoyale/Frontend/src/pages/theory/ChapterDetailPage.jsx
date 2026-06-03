import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, BookOpen, Target, ArrowLeft, 
  CheckCircle2, Brain, Flag, Globe, LayoutList, CheckCircle
} from 'lucide-react';
import { chapterDetails } from '../../data/chapterDetails';
import chapters from '../../data/chapters.json';

// Helper component to render icons by string name
const IconByName = ({ name, className }) => {
  const icons = { BookOpen, Flag, Globe, Brain };
  const Icon = icons[name] || CheckCircle2;
  return <Icon className={className} />;
};

export default function ChapterDetailPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('muc-1');
  const [quizScores, setQuizScores] = useState({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Fallback to basic info if deep content is missing (for Ch 2-6 currently)
  const basicInfo = chapters.find(c => c.id === chapterId);
  const detailedInfo = chapterDetails[chapterId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]);

  if (!basicInfo) {
    return <div className="text-center py-20 text-white">Chương không tồn tại.</div>;
  }

  // Calculate Progress
  const totalSections = detailedInfo?.sections?.length || 0;
  // Simplistic progress logic based on active section index
  const activeIndex = detailedInfo?.sections?.findIndex(s => s.id === activeSection) || 0;
  const progressPercent = totalSections > 0 ? Math.round(((activeIndex + 1) / totalSections) * 100) : 0;

  const handleQuizAnswer = (qIndex, oIndex) => {
    setQuizScores(prev => ({ ...prev, [qIndex]: oIndex }));
  };

  const calculateQuizResult = () => {
    if (!detailedInfo?.quiz) return 0;
    let score = 0;
    detailedInfo.quiz.forEach((q, i) => {
      if (quizScores[i] === q.correctIndex) score++;
    });
    return score;
  };

  return (
    <div className="w-full min-h-screen pb-20 flex flex-col md:flex-row relative max-w-[1600px] mx-auto">
      
      {/* 1. SIDEBAR (Left) */}
      <aside className="w-full md:w-64 lg:w-80 border-r border-white/10 p-6 flex flex-col h-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 bg-[#0a0a0f] z-10 shrink-0 overflow-y-auto hidden md:flex">
        <button 
          onClick={() => navigate('/theory/chapters')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </button>

        <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Chương {basicInfo.chapterNumber}</div>
        <h2 className="text-xl font-bold mb-8 text-white leading-snug">{basicInfo.title}</h2>

        <div className="space-y-2 flex-1">
          <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-4">Nội dung chương</div>
          {detailedInfo ? detailedInfo.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(sec.id);
                document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium flex items-start gap-3 ${
                activeSection === sec.id 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 mt-0.5 ${
                activeSection === sec.id ? 'bg-red-500 text-white' : 'bg-white/10 text-white/50'
              }`}>
                {idx + 1}
              </span>
              <span className="leading-snug">{sec.title.replace(/^[0-9.]+\s/, '')}</span>
            </button>
          )) : (
             <div className="text-white/40 text-sm">Nội dung chi tiết đang được cập nhật...</div>
          )}
        </div>
      </aside>

      {/* 2. MAIN CONTENT (Center) */}
      <main className="flex-1 px-4 md:px-12 lg:px-20 py-8 md:py-12 overflow-x-hidden">
        
        {/* Mobile Header */}
        <div className="md:hidden mb-8">
          <button onClick={() => navigate('/theory/chapters')} className="flex items-center gap-2 text-white/50 mb-4 text-sm"><ArrowLeft className="w-4 h-4" /> Quay lại</button>
          <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Chương {basicInfo.chapterNumber}</div>
          <h1 className="text-3xl font-display font-black text-white">{basicInfo.title}</h1>
        </div>

        {/* Hero / Objective */}
        <div className="bg-gradient-to-br from-red-900/20 to-yellow-900/10 border border-red-500/20 rounded-3xl p-6 md:p-10 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
          <Target className="w-12 h-12 text-red-400 mb-6 relative z-10" />
          <h2 className="text-2xl font-bold mb-4 text-white relative z-10">Mục tiêu cần nắm</h2>
          <p className="text-white/80 text-lg leading-relaxed relative z-10">
            {detailedInfo?.objective || basicInfo.summary}
          </p>
        </div>

        {/* Sections Content */}
        {detailedInfo ? detailedInfo.sections.map((sec) => (
          <section 
            key={sec.id} 
            id={sec.id}
            className="mb-20 scroll-mt-24"
            onMouseEnter={() => setActiveSection(sec.id)}
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-white">{sec.title}</h3>
            
            <p className="text-white/70 text-lg leading-relaxed mb-8 bg-white/5 p-6 rounded-2xl border border-white/10">
              {sec.content}
            </p>

            {/* Dynamic Diagrams based on Type */}
            {sec.type === 'concept-card-with-diagram' && (
              <div className="mt-8 border border-white/10 rounded-3xl p-8 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]">
                <h4 className="text-center text-yellow-400 font-bold mb-8 text-xl">{sec.diagram.title}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {sec.diagram.nodes.map((node, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:border-yellow-400/50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20 shrink-0">
                        <IconByName name={node.icon} className="w-6 h-6 text-yellow-400" />
                      </div>
                      <span className="font-bold text-white/90">{node.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sec.type === 'mindmap' && (
              <div className="mt-8 relative py-12 flex flex-col items-center">
                <div className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(220,38,38,0.3)] z-10 text-center">
                  {sec.diagram.center}
                </div>
                <div className="w-0.5 h-12 bg-red-500/50" />
                <div className="w-full max-w-2xl h-0.5 bg-red-500/50 relative">
                  <div className="absolute left-0 right-0 top-0 flex justify-between">
                    <div className="w-0.5 h-6 bg-red-500/50" />
                    <div className="w-0.5 h-6 bg-red-500/50" />
                    <div className="w-0.5 h-6 bg-red-500/50" />
                    <div className="w-0.5 h-6 bg-red-500/50" />
                  </div>
                </div>
                <div className="w-full max-w-[48rem] grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {sec.diagram.branches.map((branch, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center text-sm font-bold text-white/80 hover:bg-white/10 hover:-translate-y-1 transition-transform">
                      {branch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sec.type === 'infographic-list' && (
              <div className="mt-8 space-y-4">
                {sec.items.map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center shrink-0 border border-cyan-500/30">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-2">{item.title}</h4>
                      <p className="text-white/60">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sec.type === 'three-pillars' && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                {sec.pillars.map((pillar, i) => (
                  <div key={i} className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-white/30 transition-colors">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                      <LayoutList className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-white mb-3">{pillar.title}</h4>
                    <p className="text-sm text-white/60">{pillar.description}</p>
                  </div>
                ))}
              </div>
            )}

          </section>
        )) : (
          <div className="py-20 text-center text-white/40">
            Nội dung chi tiết của chương này sẽ được bổ sung sau.
          </div>
        )}

      </main>

      {/* 3. RIGHT PANEL (Concepts + Progress + Quiz) */}
      <aside className="w-full lg:w-80 border-l border-white/10 p-6 flex flex-col h-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 bg-[#0a0a0f] z-10 shrink-0 overflow-y-auto">
        
        {/* Progress Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-white/80">Tiến độ bài học</span>
            <span className="text-sm font-black text-red-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-dark rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-red-500 to-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Key Concepts Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Khái niệm chính
          </h3>
          <div className="flex flex-wrap gap-2">
            {basicInfo.tags.map(tag => (
              <span key={tag} className="px-3 py-1.5 bg-dark border border-white/5 text-white/80 text-xs rounded-lg hover:border-yellow-400/50 hover:text-yellow-400 transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Quiz Box */}
        {detailedInfo?.quiz && (
          <div className="bg-gradient-to-br from-[#1a1a24] to-[#12121a] border border-cyan-500/20 rounded-2xl p-5 flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
              <CheckCircle className="w-4 h-4" /> Quiz Ôn Tập
            </h3>
            
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 relative z-10">
              {detailedInfo.quiz.map((q, qIndex) => (
                <div key={qIndex} className="bg-dark/50 border border-white/5 rounded-xl p-4">
                  <p className="text-sm font-bold text-white mb-3">{qIndex + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIndex) => {
                      const isSelected = quizScores[qIndex] === oIndex;
                      const isSubmitted = showQuizResult;
                      const isCorrect = isSubmitted && oIndex === q.correctIndex;
                      const isWrong = isSubmitted && isSelected && oIndex !== q.correctIndex;

                      let btnStyle = "bg-white/5 border-white/10 text-white/70 hover:bg-white/10";
                      if (isSelected && !isSubmitted) btnStyle = "bg-cyan-500/20 border-cyan-500/50 text-cyan-400";
                      if (isCorrect) btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400";
                      if (isWrong) btnStyle = "bg-red-500/20 border-red-500/50 text-red-400";

                      return (
                        <button
                          key={oIndex}
                          disabled={isSubmitted}
                          onClick={() => handleQuizAnswer(qIndex, oIndex)}
                          className={`w-full text-left p-3 rounded-lg border text-xs font-medium transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 relative z-10">
              {!showQuizResult ? (
                <button
                  onClick={() => setShowQuizResult(true)}
                  disabled={Object.keys(quizScores).length < detailedInfo.quiz.length}
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-dark font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <div className="text-sm text-white/60 mb-1">Kết quả của bạn</div>
                  <div className="text-2xl font-black text-cyan-400">
                    {calculateQuizResult()} / {detailedInfo.quiz.length}
                  </div>
                  <button 
                    onClick={() => { setShowQuizResult(false); setQuizScores({}); }}
                    className="mt-3 text-xs text-white/40 hover:text-white underline"
                  >
                    Làm lại
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </aside>

    </div>
  );
}
