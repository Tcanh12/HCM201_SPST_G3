import React, { useState } from 'react';
import { Target, BookOpen, Brain, Lightbulb, Activity, CheckCircle, CheckCircle2, Flag, ChevronDown, ChevronUp, Network, GitBranch, SplitSquareHorizontal, Clock, Share2, X, AlertTriangle, MessageCircle, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { getConceptTitle } from '../../data/canonicalConcepts';

export default function LessonDetailView({ lesson, chapterData, completedSections, onSectionComplete }) {
  const [selectedVisual, setSelectedVisual] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

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
          {lesson.difficulty && <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Độ khó: {lesson.difficulty}</span>}
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Thời lượng: {lesson.durationMinutes || lesson.readingTime || 15} phút</span>
          {lesson.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">#{tag}</span>
          ))}
        </div>

        <div className="bg-white border-l-4 border-[#F59E0B] p-6 rounded-r-2xl shadow-sm">
          <div className="flex items-start gap-3">
            <Target className="w-6 h-6 text-[#F59E0B] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-[#1F2937] mb-3">Mục tiêu học tập</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {lesson.learningObjectives?.map((obj, i) => <li key={i}>{obj}</li>) || <li>{lesson.description || 'Hoàn thành các nội dung trong bài học'}</li>}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#F8FAFC] border border-gray-200 p-6 rounded-2xl">
          <h4 className="font-bold text-[#1F2937] mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> Tổng quan nhanh
          </h4>
          <p className="text-gray-700 leading-relaxed">{lesson.quickOverview || lesson.description}</p>
        </div>

        {renderCompletionButton('overview')}
      </div>

      {/* SECTION: THEORY */}
      <div id="theory" className="scroll-mt-24">
        <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
          <BookOpen className="w-6 h-6 text-[#B91C1C]" /> Lý thuyết chuyên sâu
        </h3>
        <div className="space-y-8">
          {Array.isArray(lesson.coreTheory) ? (
            lesson.coreTheory.map((theory, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-xl font-bold text-[#1E3A8A] mb-4 pb-2 border-b border-blue-100">
                  {theory.title}
                </h4>
                <div className="text-gray-700 leading-relaxed space-y-4 text-base md:text-lg">
                  {Array.isArray(theory.content) ? theory.content.map((p, j) => <p key={j}>{p}</p>) : <p>{theory.content}</p>}
                </div>
              </div>
            ))
          ) : (
            ['beginner', 'intermediate', 'advanced'].map((level) => (
              <div key={level} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-4">
                <h4 className="text-lg font-bold text-[#1E3A8A] capitalize mb-3 border-b pb-2">Mức độ: {level}</h4>
                <div className="text-gray-700 leading-relaxed text-base">
                  {lesson.coreTheory?.[level]}
                </div>
              </div>
            ))
          )}
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
                Khái niệm: {concept.title || getConceptTitle(concept.conceptId)}
              </h4>
              <div className="space-y-3 text-sm">
                {concept.description && <p><strong className="text-gray-800">Mô tả:</strong> {concept.description}</p>}
                {concept.definition && <p><strong className="text-gray-800">Định nghĩa:</strong> {concept.definition}</p>}
                {concept.explanation && <p><strong className="text-gray-800">Giải thích:</strong> {concept.explanation}</p>}
                {concept.importance && <p><strong className="text-gray-800">Tầm quan trọng:</strong> {concept.importance}</p>}
                {concept.examples && <p><strong className="text-gray-800">Ví dụ:</strong> {concept.examples}</p>}
                {concept.applications && <p><strong className="text-gray-800">Ứng dụng:</strong> {concept.applications}</p>}
                
                {concept.commonMistakes && concept.commonMistakes.length > 0 && (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                    <strong className="text-red-800 block mb-1">Các lỗi thường gặp:</strong>
                    <ul className="list-disc list-inside text-red-700">
                      {concept.commonMistakes.map((err, j) => <li key={j}>{err}</li>)}
                    </ul>
                  </div>
                )}
                {concept.memoryTips && (
                  <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-2">
                    <strong className="text-yellow-800 block mb-1">Mẹo ghi nhớ:</strong>
                    <p className="text-yellow-700">{concept.memoryTips}</p>
                  </div>
                )}
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
            if (vl.type === 'image') Icon = ImageIcon;

            return (
              <div 
                key={i} 
                className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col h-full hover:border-[#B91C1C]/40 hover:shadow-lg transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -z-10 group-hover:bg-[#FEE2E2]/50 transition-colors"></div>
                
                {vl.imageUrl ? (
                  <div className="w-full h-32 mb-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center">
                    <img src={vl.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={vl.title} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/vnr202/fallback-vnr202.jpg"; }} />
                  </div>
                ) : (
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 text-[#1F2937] rounded-xl flex items-center justify-center font-bold group-hover:bg-[#B91C1C] group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                      {vl.type}
                    </span>
                  </div>
                )}
                
                {vl.imageUrl && (
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <Icon className="w-4 h-4 text-gray-400" />
                       <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                         {vl.type}
                       </span>
                    </div>
                  </div>
                )}
                
                <h5 className="font-bold text-[#1F2937] text-lg mb-2 leading-tight">{vl.title}</h5>
                <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1 leading-relaxed">{vl.description || vl.subtitle || vl.purpose}</p>
                
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

      {/* DYNAMIC SECTIONS FROM chapterDetails.js */}
      {chapterData?.sections && chapterData.sections.map((section, idx) => {
        const sectionId = section.id || section.title.toLowerCase().replace(/\s+/g, '-');
        
        return (
          <div id={sectionId} key={sectionId} className="scroll-mt-24">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
              <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#B91C1C]" />
              </div>
              {section.title}
            </h3>

            {/* Mindmap Type */}
            {section.type === 'mindmap' && section.content && (
              <div className="bg-[#F8FAFC] border border-gray-200 p-8 rounded-2xl mb-4 flex flex-col items-center shadow-inner">
                <div className="px-6 py-3 bg-[#B91C1C] text-white font-bold rounded-xl shadow-md mb-8 z-10 text-lg">
                  {section.content[0]?.label}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                  {section.content[0]?.children?.map((branch, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border-2 border-red-100 shadow-md text-center font-bold text-[#1F2937] flex items-center justify-center relative hover:scale-105 transition-transform">
                      <div className="absolute -top-3 w-6 h-6 bg-[#FEF2F2] border-2 border-red-200 rounded-full flex items-center justify-center text-xs text-red-600 font-bold">{i+1}</div>
                      {branch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Cards Type */}
            {section.type === 'info-cards' && section.content && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {section.content.map((card, i) => {
                  const isMistake = section.title.toLowerCase().includes('lỗi');
                  const isFocus = section.title.toLowerCase().includes('trọng tâm');
                  return (
                    <div key={i} className={`bg-white border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${isMistake ? 'border-orange-200 border-l-4 border-l-orange-500' : isFocus ? 'border-blue-200 border-l-4 border-l-blue-500' : 'border-gray-200'}`}>
                      {card.imageUrl ? (
                        <div className="w-full h-48 bg-gray-50 rounded-xl mb-4 flex overflow-hidden border border-gray-100">
                          <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/vnr202/fallback-vnr202.jpg"; }} />
                        </div>
                      ) : card.imagePlaceholder ? (
                        <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
                          <Activity className="w-8 h-8 mb-2 opacity-50" />
                          <span className="text-sm font-medium px-4 text-center">{card.imagePlaceholder}</span>
                        </div>
                      ) : null}
                      <h5 className={`font-bold mb-3 ${isMistake ? 'text-orange-700' : isFocus ? 'text-blue-700' : 'text-[#1F2937]'}`}>{card.title}</h5>
                      <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">{card.description}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Three Pillars Type */}
            {section.type === 'three-pillars' && section.content && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {section.content.map((pillar, i) => (
                  <div key={i} className="bg-white border-t-4 border-[#B91C1C] p-6 rounded-b-2xl border-x border-b border-gray-200 shadow-sm text-center hover:-translate-y-1 transition-transform">
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">{i+1}</div>
                    <h5 className="font-bold text-[#1F2937] mb-3 text-lg">{pillar.title}</h5>
                    <p className="text-gray-600 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comparison Table Type */}
            {section.type === 'comparison-table' && section.table && (
              <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {section.table.headers.map((h, i) => (
                        <th key={i} className="p-4 font-bold text-gray-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        {row.map((cell, j) => (
                          <td key={j} className="p-4 text-sm text-gray-700 whitespace-pre-wrap">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Timeline Type */}
            {section.type === 'timeline-mini' && section.content && (
              <div className="relative border-l-2 border-red-200 ml-4 mb-4 space-y-8 pb-4">
                {section.content.map((item, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-red-500"></div>
                    <div className="font-bold text-red-600 mb-1">{item.time}</div>
                    <h5 className="font-bold text-gray-900 mb-2">{item.title}</h5>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            )}

            {renderCompletionButton(sectionId)}
          </div>
        );
      })}

      {/* SECTION: QUIZ */}
      {chapterData?.quiz && chapterData.quiz.length > 0 && (
        <div id="quiz" className="scroll-mt-24">
          <h3 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
            <HelpCircle className="w-6 h-6 text-[#B91C1C]" /> Quiz cuối chương
          </h3>
          <div className="space-y-6">
            {chapterData.quiz.map((q, qIndex) => (
              <div key={qIndex} className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <p className="font-bold text-gray-800 mb-4 text-lg">{qIndex + 1}. {q.question}</p>
                <div className="space-y-3">
                  {q.options.map((opt, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = q.correctAnswer === oIndex;
                    const showResult = quizSubmitted;
                    
                    let btnClass = "w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ";
                    if (showResult) {
                      if (isCorrect) btnClass += "bg-green-50 border-green-500 text-green-800";
                      else if (isSelected) btnClass += "bg-red-50 border-red-500 text-red-800";
                      else btnClass += "bg-white border-gray-200 text-gray-500 opacity-60";
                    } else {
                      if (isSelected) btnClass += "bg-blue-50 border-blue-500 text-blue-800";
                      else btnClass += "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50";
                    }

                    return (
                      <button
                        key={oIndex}
                        disabled={quizSubmitted}
                        onClick={() => setQuizAnswers(p => ({ ...p, [qIndex]: oIndex }))}
                        className={btnClass}
                      >
                        {opt}
                        {showResult && isCorrect && <CheckCircle className="inline w-5 h-5 ml-2 text-green-600" />}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && q.explanation && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm">
                    <strong>Giải thích:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
            
            {!quizSubmitted ? (
              <button 
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < chapterData.quiz.length}
                className="w-full py-4 bg-[#B91C1C] text-white font-bold rounded-xl shadow-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Nộp bài và Xem kết quả
              </button>
            ) : (
              <button 
                onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Làm lại Quiz
              </button>
            )}
          </div>
          
          {renderCompletionButton('quiz')}
        </div>
      )}


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
              {selectedVisual.detailContent && (
                <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm text-gray-700 leading-relaxed text-base md:text-lg mb-6">
                  {selectedVisual.detailContent}
                </div>
              )}
              
              {selectedVisual.imageUrl && (
                <div className="flex flex-col items-center mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <img src={selectedVisual.imageUrl} alt={selectedVisual.title} className="rounded-xl shadow-md max-w-full h-auto max-h-[500px] object-contain mb-3" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/vnr202/fallback-vnr202.jpg"; }} />
                  {selectedVisual.caption && <p className="text-sm text-gray-600 font-medium italic mb-1 text-center">{selectedVisual.caption}</p>}
                  {selectedVisual.credit && (
                    <p className="text-xs text-gray-500 text-center">
                      Nguồn: {selectedVisual.sourceUrl ? <a href={selectedVisual.sourceUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{selectedVisual.credit}</a> : selectedVisual.credit}
                    </p>
                  )}
                  {selectedVisual.licenseNote && <p className="text-xs text-gray-400 text-center mt-1">Giấy phép: {selectedVisual.licenseNote}</p>}
                </div>
              )}
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
