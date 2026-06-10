import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, X, BookOpen, ChevronRight, Maximize, Minimize, CheckCircle, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import { canonicalConcepts, getConceptTitle } from '../../data/canonicalConcepts';

export default function ConceptMapPage() {
  const navigate = useNavigate();
  const { progress, markConceptViewed } = useLearningProgress();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chapterFilter, setChapterFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // all, viewed, unviewed
  
  const containerRef = useRef(null);
  
  const width = 1200;
  const height = 900;
  const centerX = width / 2;
  const centerY = height / 2;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Layout Algorithm
  const conceptEdges = useMemo(() => {
    const edges = [];
    canonicalConcepts.forEach(node => {
      if (node.relatedConceptIds) {
        node.relatedConceptIds.forEach(targetId => {
          if (canonicalConcepts.some(c => c.id === targetId)) {
            edges.push({ source: node.id, target: targetId });
          }
        });
      }
    });
    return edges;
  }, []);

  const nodesWithPositions = useMemo(() => {
    const positioned = JSON.parse(JSON.stringify(canonicalConcepts));
    
    // Root
    const root = positioned.find(n => n.level === 0);
    if(root) { root.x = centerX; root.y = centerY; }
    
    // Chapters (level 1)
    const chapters = positioned.filter(n => n.level === 1);
    const radius1 = 200;
    chapters.forEach((chap, i) => {
      const angle = (i / chapters.length) * 2 * Math.PI - Math.PI/2;
      chap.x = centerX + radius1 * Math.cos(angle);
      chap.y = centerY + radius1 * Math.sin(angle);
    });
    
    // Concepts (level 2)
    chapters.forEach((chap, i) => {
      const conceptsL2 = positioned.filter(n => n.chapterId === chap.chapterId && n.level === 2);
      const radius2 = 140;
      const baseAngle = (i / chapters.length) * 2 * Math.PI - Math.PI/2;
      
      conceptsL2.forEach((concept, j) => {
        const spreadAngle = (j - (conceptsL2.length - 1) / 2) * (Math.PI / (Math.max(conceptsL2.length, 1) + 1));
        const finalAngle = baseAngle + spreadAngle;
        
        concept.x = chap.x + radius2 * Math.cos(finalAngle);
        concept.y = chap.y + radius2 * Math.sin(finalAngle);
        concept.baseAngle = finalAngle; // Save for level 3
      });
    });

    // Concepts (level 3)
    const conceptsL3 = positioned.filter(n => n.level === 3);
    conceptsL3.forEach(concept => {
      // Find parent (lazy approach: find first edge where this is target, and source is L2)
      const parentEdge = conceptEdges.find(e => e.target === concept.id);
      if (parentEdge) {
        const parent = positioned.find(n => n.id === parentEdge.source);
        if (parent) {
          const radius3 = 100;
          // Random offset based on parent's angle
          const offsetAngle = parent.baseAngle + (Math.random() - 0.5) * Math.PI/2;
          concept.x = parent.x + radius3 * Math.cos(offsetAngle);
          concept.y = parent.y + radius3 * Math.sin(offsetAngle);
        } else {
          concept.x = centerX; concept.y = centerY;
        }
      }
    });
    
    return positioned;
  }, []);

  // Filter nodes
  const filteredNodes = useMemo(() => {
    return nodesWithPositions.filter(node => {
      // Search
      if (searchQuery && !node.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      // Chapter
      if (chapterFilter !== 'all' && node.chapterId !== chapterFilter && node.level !== 0) return false;
      // Status
      const isViewed = progress.viewedConcepts?.includes(node.id);
      if (statusFilter === 'viewed' && !isViewed) return false;
      if (statusFilter === 'unviewed' && isViewed) return false;
      return true;
    });
  }, [nodesWithPositions, searchQuery, chapterFilter, statusFilter, progress.viewedConcepts]);

  const getNodeColor = (node) => {
    if (progress.viewedConcepts?.includes(node.id)) return '#15803d'; // Green for viewed concepts
    
    // Color by chapter
    switch(node.chapterId) {
      case 'core': return '#B91C1C';
      case 'chuong-1': return '#1E3A8A'; // Navy
      case 'chuong-2': return '#F59E0B'; // Gold
      case 'chuong-3': return '#DC2626'; // Red
      case 'chuong-4': return '#2563EB'; // Blue
      case 'chuong-5': return '#059669'; // Green
      case 'chuong-6': return '#7C3AED'; // Purple
      default: return '#6B7280';
    }
  };

  const getNodeSize = (level) => {
    if (level === 0) return 30;
    if (level === 1) return 20;
    if (level === 2) return 12;
    return 8;
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  const handleMarkUnderstood = () => {
    if (selectedNode) {
      markConceptViewed(selectedNode.id);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#F8FAFC]">
      
      {/* MAP AREA */}
      <div 
        ref={containerRef}
        className={`relative ${isFullscreen ? 'w-full h-screen bg-white' : 'flex-1 h-[calc(100vh-4rem)]'} overflow-hidden border-r border-gray-200 bg-[#F8FAFC] flex flex-col`}
      >
        {/* Toolbar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex flex-col sm:flex-row justify-between gap-4 pointer-events-none">
          <div className="flex flex-col gap-2 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-bold uppercase tracking-widest w-max">
              <Network className="w-4 h-4 text-[#B91C1C]" /> Bản đồ tri thức
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Tìm khái niệm..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:border-[#B91C1C] transition-colors w-48"
                />
              </div>

              <select 
                value={chapterFilter}
                onChange={(e) => setChapterFilter(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:border-[#B91C1C] transition-colors"
              >
                <option value="all">Tất cả chương</option>
                <option value="chuong-1">Chương 1</option>
                <option value="chuong-2">Chương 2</option>
                <option value="chuong-3">Chương 3</option>
                <option value="chuong-4">Chương 4</option>
                <option value="chuong-5">Chương 5</option>
                <option value="chuong-6">Chương 6</option>
              </select>

              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:outline-none focus:border-[#B91C1C] transition-colors"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="viewed">Đã hiểu</option>
                <option value="unviewed">Chưa hiểu</option>
              </select>
            </div>
          </div>

          <button 
            onClick={toggleFullscreen}
            className="pointer-events-auto self-start p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-[#1F2937] hover:bg-gray-50 shadow-sm transition-all"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white border border-gray-200 p-3 rounded-xl shadow-sm text-xs text-gray-600 flex flex-col gap-2 pointer-events-auto">
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#B91C1C]"></div> Node trung tâm</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#1E3A8A]"></div> Chương học</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-500"></div> Khái niệm</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#15803d]"></div> Đã hiểu</div>
        </div>

        <div className="flex-1 overflow-auto bg-grid-pattern relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-[1200px] h-[900px] min-w-[1200px] min-h-[900px] mx-auto mt-10">
            {/* Edges */}
            {conceptEdges.map((edge, idx) => {
              const sourceNode = filteredNodes.find(n => n.id === edge.source);
              const targetNode = filteredNodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;
              
              const isHighlighted = selectedNode && (
                selectedNode.id === sourceNode.id || selectedNode.id === targetNode.id
              );

              return (
                <g key={idx}>
                  <line
                    x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y}
                    stroke={isHighlighted ? "#F59E0B" : "#E5E7EB"}
                    strokeWidth={isHighlighted ? 2 : 1}
                    className="transition-all duration-300"
                  />
                  {edge.label && isHighlighted && (
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 5}
                      textAnchor="middle"
                      fill="#F59E0B"
                      className="text-[10px] font-bold"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const isViewed = progress.viewedConcepts?.includes(node.id);
              const isHighlighted = selectedNode && (
                selectedNode.id === node.id || 
                conceptEdges.some(e => (e.source === selectedNode.id && e.target === node.id) || (e.target === selectedNode.id && e.source === node.id))
              );
              
              return (
                <g 
                  key={node.id} 
                  className={`cursor-pointer group ${!selectedNode || isHighlighted ? 'opacity-100' : 'opacity-30'}`}
                  onClick={() => handleNodeClick(node)}
                >
                  {/* Glow for selected */}
                  {isSelected && (
                    <circle cx={node.x} cy={node.y} r={getNodeSize(node.level) + 10} fill="rgba(245,158,11,0.2)" />
                  )}
                  
                  <circle
                    cx={node.x} cy={node.y} r={getNodeSize(node.level)}
                    fill={getNodeColor(node)}
                    className="transition-colors duration-300 shadow-lg"
                    stroke={isSelected ? "#F59E0B" : "#fff"}
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  
                  {isViewed && !isSelected && (
                    <circle cx={node.x + getNodeSize(node.level)} cy={node.y - getNodeSize(node.level)} r={5} fill="#fff" stroke="#15803d" strokeWidth={2} />
                  )}

                  <text
                    x={node.x} y={node.y + getNodeSize(node.level) + 16}
                    textAnchor="middle"
                    fill={isSelected ? "#1F2937" : "#6B7280"}
                    className={`text-xs transition-all duration-300 ${isSelected ? 'font-bold' : 'font-medium'} ${node.level === 0 ? 'text-sm' : ''}`}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* DETAIL PANEL */}
      <AnimatePresence>
        {selectedNode && (
          <>
            {/* Mobile Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="md:hidden fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30"
            />
            
            {/* Detail Panel */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed md:absolute bottom-0 md:bottom-auto md:right-0 md:top-0 w-full md:w-[480px] max-h-[85vh] md:h-full bg-white border-t md:border-t-0 md:border-l border-gray-200 shadow-2xl z-40 overflow-y-auto flex flex-col rounded-t-3xl md:rounded-none"
            >
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                {/* Mobile drag handle */}
                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 md:hidden" />

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                        selectedNode.level === 0 ? 'bg-[#FEE2E2] text-[#B91C1C]' :
                        selectedNode.level === 1 ? 'bg-[#DBEAFE] text-[#1E3A8A]' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {selectedNode.level === 0 ? 'Hệ tư tưởng' : selectedNode.level === 1 ? 'Chương học' : 'Khái niệm'}
                      </span>
                      {selectedNode.chapterId !== 'core' && (
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#FEF3C7] text-[#B45309]">
                          {selectedNode.chapterId}
                        </span>
                      )}
                      {selectedNode.requiresVerification && (
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-yellow-100 text-yellow-700">
                          Chưa kiểm chứng
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-[#1F2937] leading-tight">{selectedNode.title}</h2>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-2 shrink-0 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content Sections */}
                <div className="space-y-6 flex-1">
                  {selectedNode.shortDescription && (
                    <div className="bg-[#F8FAFC] border-l-4 border-[#1E3A8A] p-4 rounded-r-xl border-y border-r border-gray-200">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Hiểu nhanh</h4>
                      <p className="text-[#1F2937] font-medium leading-relaxed">{selectedNode.shortDescription}</p>
                    </div>
                  )}

                  {(selectedNode.definition || selectedNode.explanation) && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#1E3A8A]" /> Định nghĩa / Nội dung cốt lõi
                      </h4>
                      <p className="text-gray-600 leading-[1.6] text-sm">{selectedNode.definition || selectedNode.explanation}</p>
                    </div>
                  )}

                  {selectedNode.whyImportant && (
                    <div>
                      <h4 className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest mb-2">Vì sao quan trọng?</h4>
                      <p className="text-gray-600 leading-[1.6] text-sm">{selectedNode.whyImportant}</p>
                    </div>
                  )}

                  {selectedNode.keyIdeas?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ý chính cần nhớ</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1.5 leading-[1.6]">
                        {selectedNode.keyIdeas.map((idea, idx) => (
                          <li key={idx}>{idea}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.applications?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ứng dụng / Liên hệ thực tế</h4>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1.5 leading-[1.6]">
                        {selectedNode.applications.map((app, idx) => (
                          <li key={idx}>{app}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.commonMisconceptions?.length > 0 && (
                    <div className="bg-[#FEE2E2]/30 p-4 rounded-xl border border-[#B91C1C]/10">
                      <h4 className="text-xs font-bold text-[#B91C1C] uppercase tracking-widest mb-2">Lỗi hiểu sai thường gặp</h4>
                      <ul className="list-disc pl-5 text-sm text-[#B91C1C] space-y-1.5 leading-[1.6]">
                        {selectedNode.commonMisconceptions.map((mis, idx) => (
                          <li key={idx}>{mis}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.reflectionQuestions?.length > 0 && (
                    <div className="bg-[#FEF3C7] p-4 rounded-xl border border-[#F59E0B]/30">
                      <h4 className="text-xs font-bold text-[#B45309] uppercase tracking-widest mb-2">Câu hỏi tự suy ngẫm</h4>
                      <ul className="list-disc pl-5 text-sm text-[#B45309] space-y-1.5 leading-[1.6] font-medium">
                        {selectedNode.reflectionQuestions.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedNode.relatedConceptIds && selectedNode.relatedConceptIds.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Khái niệm liên quan</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.relatedConceptIds.map(id => {
                          const relatedNode = canonicalConcepts.find(n => n.id === id);
                          return relatedNode ? (
                            <button
                              key={id}
                              onClick={() => setSelectedNode(relatedNode)}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-[#DBEAFE] hover:text-[#1E3A8A] hover:border-[#1E3A8A]/30 text-xs rounded-lg transition-colors font-medium flex items-center gap-1.5"
                            >
                              <Network className="w-3 h-3" /> {relatedNode.title}
                            </button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 space-y-3 pb-8 md:pb-0">
                  {selectedNode.chapterId !== 'core' && (
                    <button 
                      onClick={() => navigate(`/theory/chapters/${selectedNode.chapterId}`)}
                      className="w-full py-3.5 bg-[#1F2937] hover:bg-[#111827] text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
                    >
                      <BookOpen className="w-4 h-4" /> Xem trong giáo trình <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button 
                    onClick={handleMarkUnderstood}
                    disabled={progress.viewedConcepts?.includes(selectedNode.id)}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                      progress.viewedConcepts?.includes(selectedNode.id)
                        ? 'bg-[#DCFCE7] text-[#15803d] cursor-default border border-[#15803d]/30 shadow-none'
                        : 'bg-white border border-gray-300 text-[#1F2937] hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" /> 
                    {progress.viewedConcepts?.includes(selectedNode.id) ? 'Đã hiểu khái niệm này' : 'Đánh dấu đã hiểu'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
