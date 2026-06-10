import React, { useState } from 'react';
import { Target, BookOpen, Brain, Lightbulb, Activity, CheckCircle, CheckCircle2, Flag, ChevronDown, ChevronUp, Network, GitBranch, SplitSquareHorizontal, Clock, Share2, X, AlertTriangle, MessageCircle, HelpCircle } from 'lucide-react';
import { getConceptTitle } from '../../data/canonicalConcepts';

export default function LessonDetailView({ lesson, completedSections, onSectionComplete }) {
  const [activeAccordion, setActiveAccordion] = useState('beginner');
  const [selectedVisual, setSelectedVisual] = useState(null);

  const renderCompletionButton = (sectionId) => {
    const isCompleted = completedSections.includes(sectionId);
    return (
      <div className="flex justify-end mt-6">
        <button
          onClick={() => onSectionComplete(sectionId)}
          disabled={isCompleted}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            isCompleted 
              ? 'bg-[#DCFCE7] text-[#15803d] cursor-default border border-[#15803d]/30' 
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 shadow-sm'
          }`}
        >
          {isCompleted ? (
            <><CheckCircle2 className="w-5 h-5" /> Đã học phần này</>
          ) : (
            <><CheckCircle className="w-5 h-5" /> Đánh dấu đã học</>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* SECTION: OVERVIEW */}
      <div id="overview" className="scroll-mt-24 space-y-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Độ khó: {lesson.difficulty}</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Thời lượng: {lesson.durationMinutes} phút</span>
          {lesson.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">#{tag}</span>
          ))}
        </div>

        <div className="bg-white border-l-4 border-[#F59E0B] p-6 rounded-r-2xl shadow-sm">
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-[#1F2937] mb-3">Mục tiêu học tập</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {lesson.learningObjectives.map((obj, i) => <li key={i}>{obj}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#F8FAFC] border border-gray-200 p-6 rounded-2xl">
          <h4 className="font-bold text-[#1F2937] mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> Tổng quan nhanh
          </h4>
          <p className="text-gray-700 leading-relaxed">{lesson.quickOverview}</p>
        </div>

        {renderCompletionButton('overview')}
      </div>

      {/* SECTION: THEORY */}
      <div id="theory" className="scroll-mt-24">
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
          <BookOpen className="w-6 h-6 text-[#B91C1C]" /> Lý thuyết cốt lõi
        </h3>
        <div className="space-y-4">
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <div key={level} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === level ? null : level)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 font-bold capitalize text-gray-800"
              >
                Mức độ: {level}
                {activeAccordion === level ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {activeAccordion === level && (
                <div className="p-6 text-gray-700 whitespace-pre-wrap leading-relaxed border-t border-gray-200">
                  {lesson.coreTheory[level]}
                </div>
              )}
            </div>
          ))}
        </div>

        {renderCompletionButton('theory')}
      </div>

      {/* SECTION: CONCEPTS */}
      <div id="concepts" className="scroll-mt-24">
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
          <Brain className="w-6 h-6 text-[#B91C1C]" /> Phân tích Khái niệm
        </h3>
        <div className="grid gap-6">
          {lesson.conceptBreakdown.map((concept, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
              <h4 className="font-bold text-lg text-[#1E3A8A] mb-4 border-b pb-2">
                Khái niệm: {getConceptTitle(concept.conceptId)}
              </h4>
              <div className="space-y-3 text-sm">
                <p><strong className="text-gray-800">Định nghĩa:</strong> {concept.definition}</p>
                <p><strong className="text-gray-800">Giải thích:</strong> {concept.explanation}</p>
                <p><strong className="text-gray-800">Tầm quan trọng:</strong> {concept.importance}</p>
                <p><strong className="text-gray-800">Ví dụ:</strong> {concept.examples}</p>
                <p><strong className="text-gray-800">Ứng dụng:</strong> {concept.applications}</p>
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                  <strong className="text-red-800 block mb-1">Các lỗi thường gặp:</strong>
                  <ul className="list-disc list-inside text-red-700">
                    {concept.commonMistakes.map((err, j) => <li key={j}>{err}</li>)}
                  </ul>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-2">
                  <strong className="text-yellow-800 block mb-1">Mẹo ghi nhớ:</strong>
                  <p className="text-yellow-700">{concept.memoryTips}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {renderCompletionButton('concepts')}
      </div>

      {/* SECTION: VISUAL LEARNING */}
      <div id="visual" className="scroll-mt-24">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h3 className="text-2xl font-bold text-[#1F2937] flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#B91C1C]" /> Sơ đồ tư duy & Hình ảnh
          </h3>
          <p className="text-gray-500 mt-2 text-sm">Học nhanh bằng sơ đồ, quan hệ khái niệm và tình huống trực quan.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lesson.visualLearning?.map((vl, i) => {
            let Icon = Network;
            if (vl.type === 'flowchart') Icon = GitBranch;
            if (vl.type === 'comparison') Icon = SplitSquareHorizontal;
            if (vl.type === 'timeline') Icon = Clock;
            if (vl.type === 'relationship') Icon = Share2;

            return (
              <div 
                key={i} 
                className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col h-full hover:border-[#B91C1C]/40 hover:shadow-lg transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-[#FEE2E2]/50 transition-colors"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 text-[#1F2937] rounded-xl flex items-center justify-center font-bold group-hover:bg-[#B91C1C] group-hover:text-white transition-colors shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    {vl.type}
                  </span>
                </div>
                
                <h5 className="font-bold text-[#1F2937] text-lg mb-2 leading-tight">{vl.title}</h5>
                <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1 leading-relaxed">{vl.subtitle || vl.purpose}</p>
                
                <button 
                  onClick={() => setSelectedVisual(vl)}
                  className="w-full py-2.5 bg-gray-50 hover:bg-[#1E3A8A] hover:text-white text-[#1F2937] border border-gray-200 font-bold rounded-xl text-sm transition-colors"
                >
                  Xem chi tiết
                </button>
              </div>
            );
          })}
        </div>

        {renderCompletionButton('visual')}
      </div>

      {/* Key Takeaways */}
      <div className="bg-[#1E3A8A] p-8 rounded-3xl text-white shadow-lg mt-12">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Flag className="w-6 h-6 text-yellow-400" /> Bài học rút ra (Key Takeaways)
        </h3>
        <ul className="space-y-4">
          {lesson.keyTakeaways?.map((takeaway, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/90 leading-relaxed font-medium">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* VISUAL MODAL */}
      {selectedVisual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm md:p-6" onClick={() => setSelectedVisual(null)}>
          <div 
            className="bg-white md:rounded-3xl w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {selectedVisual.type}
                </span>
                {selectedVisual.requiresVerification && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider rounded-md">
                    Chưa kiểm chứng
                  </span>
                )}
              </div>
              <button 
                onClick={() => setSelectedVisual(null)} 
                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              
              <div>
                <h3 className="text-3xl font-black text-[#1F2937] mb-3 leading-tight">{selectedVisual.title}</h3>
                {selectedVisual.subtitle && <p className="text-lg text-gray-500 font-medium">{selectedVisual.subtitle}</p>}
              </div>

              {selectedVisual.learningValue && (
                <div className="bg-[#DBEAFE]/50 border-l-4 border-[#1E3A8A] p-5 rounded-r-2xl">
                  <h4 className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Học được gì từ sơ đồ này?
                  </h4>
                  <p className="text-[#1F2937] leading-[1.6]">{selectedVisual.learningValue}</p>
                </div>
              )}

              {/* RENDER DIAGRAMS */}
              <div className="bg-[#F8FAFC] border border-gray-200 p-8 rounded-3xl overflow-hidden relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                
                {selectedVisual.type === 'mindmap' && (
                  <div className="flex flex-col items-center relative z-10">
                    <div className="px-8 py-4 bg-[#B91C1C] text-white font-bold rounded-2xl shadow-xl mb-10 text-center text-lg border-b-4 border-red-800">
                      {selectedVisual.nodes?.[0] || 'Trung tâm'}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                      {selectedVisual.nodes?.slice(1).map((node, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center font-semibold text-[#1F2937] flex-1 min-w-[200px] hover:border-red-300 transition-colors">
                          {node}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedVisual.type === 'flowchart' && (
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    {selectedVisual.steps?.map((step, i) => (
                      <React.Fragment key={i}>
                        <div className="bg-white px-6 py-4 rounded-xl border-2 border-blue-200 shadow-sm font-bold text-[#1E3A8A] text-center w-full max-w-md hover:scale-[1.02] transition-transform">
                          {i + 1}. {step}
                        </div>
                        {i < selectedVisual.steps.length - 1 && (
                          <div className="w-1 h-8 bg-blue-200"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {selectedVisual.type === 'comparison' && (
                  <div className="overflow-x-auto relative z-10 w-full">
                    <table className="w-full min-w-[600px] border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                      <thead>
                        <tr className="bg-gray-100 text-[#1F2937] text-left text-sm uppercase tracking-wider">
                          <th className="p-4 border-b border-gray-200">Nội dung</th>
                          <th className="p-4 border-b border-gray-200 text-[#B91C1C]">Hiểu sai</th>
                          <th className="p-4 border-b border-gray-200 text-[#15803d]">Hiểu đúng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedVisual.comparisons?.map((row, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 border-b border-gray-100 font-bold text-[#1F2937] align-top">{row.topic}</td>
                            <td className="p-4 border-b border-gray-100 text-[#B91C1C] align-top">{row.wrong}</td>
                            <td className="p-4 border-b border-gray-100 text-[#15803d] font-medium align-top">{row.correct}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {selectedVisual.type === 'relationship' && (
                  <div className="flex flex-col gap-6 relative z-10 items-center">
                    {selectedVisual.nodes?.map((node, i) => (
                      <React.Fragment key={i}>
                        <div className="bg-white p-5 rounded-xl border-l-4 border-[#F59E0B] shadow-md font-bold text-[#1F2937] text-center w-full max-w-md">
                          {node}
                        </div>
                        {i < selectedVisual.nodes.length - 1 && (
                          <Share2 className="w-6 h-6 text-[#F59E0B]" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {selectedVisual.type === 'timeline' && (
                  <div className="flex flex-col gap-0 relative z-10 w-full max-w-lg mx-auto">
                    {selectedVisual.steps?.map((step, i) => {
                      const [time, desc] = step.split(':');
                      return (
                        <div key={i} className="flex items-start gap-4">
                          <div className="flex flex-col items-center mt-1">
                            <div className="w-4 h-4 rounded-full bg-[#1E3A8A] border-4 border-blue-100"></div>
                            {i < selectedVisual.steps.length - 1 && <div className="w-0.5 h-16 bg-gray-200"></div>}
                          </div>
                          <div className="pb-8">
                            <h5 className="font-black text-[#1F2937] text-lg">{time}</h5>
                            <p className="text-gray-600 mt-1">{desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* DETAILS TEXT SECTION */}
              <div className="grid md:grid-cols-2 gap-8 pt-4">
                {selectedVisual.keyTakeaways?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#15803d]" /> Ý chính cần nhớ
                    </h4>
                    <ul className="space-y-3">
                      {selectedVisual.keyTakeaways.map((idea, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#15803d] mt-2 shrink-0"></div>
                          <span className="text-gray-600 leading-[1.6]">{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedVisual.commonMistakes?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-[#B91C1C]" /> Lỗi hiểu sai thường gặp
                    </h4>
                    <ul className="space-y-3">
                      {selectedVisual.commonMistakes.map((mis, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#B91C1C] mt-2 shrink-0"></div>
                          <span className="text-[#B91C1C] font-medium leading-[1.6]">{mis}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {selectedVisual.reflectionQuestions?.length > 0 && (
                <div className="bg-[#FEF3C7] p-6 rounded-2xl border border-[#F59E0B]/20">
                  <h4 className="text-sm font-bold text-[#B45309] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Câu hỏi tự suy ngẫm
                  </h4>
                  <ul className="space-y-3">
                    {selectedVisual.reflectionQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                        <span className="text-[#92400E] font-bold leading-[1.6]">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedVisual.relatedConceptIds?.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Khái niệm liên quan</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVisual.relatedConceptIds.map(id => {
                      const title = getConceptTitle(id);
                      return title !== "Khái niệm cần kiểm chứng" ? (
                        <div key={id} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg font-medium flex items-center gap-1.5">
                          <Network className="w-3 h-3" /> {title}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
