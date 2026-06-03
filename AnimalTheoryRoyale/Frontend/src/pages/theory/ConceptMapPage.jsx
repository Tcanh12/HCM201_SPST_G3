import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, X, BookOpen, ChevronRight, Maximize, Minimize, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import conceptsData from '../../data/concepts.json';

export default function ConceptMapPage() {
  const navigate = useNavigate();
  const { progress, markConceptViewed } = useLearningProgress();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  
  const width = 900;
  const height = 700;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
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

  const getNodeColor = (node) => {
    if (selectedNode && selectedNode.id === node.id) return '#B91C1C';
    if (selectedNode && (selectedNode.connections.includes(node.id) || node.connections?.includes(selectedNode.id))) return '#F59E0B';
    if (progress.viewedConcepts.includes(node.id)) return '#15803d'; // Green for viewed concepts
    if (node.type === 'root') return '#B91C1C';
    if (node.type === 'chapter') return '#F59E0B';
    return '#6B7280';
  };

  const getNodeSize = (type) => {
    if (type === 'root') return 24;
    if (type === 'chapter') return 18;
    return 12;
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
        className={`relative ${isFullscreen ? 'w-full h-screen bg-white' : 'flex-1 h-[calc(100vh-4rem)]'} overflow-hidden border-r border-gray-200 bg-[#F8FAFC]`}
      >
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 shadow-sm rounded-full text-sm font-bold uppercase tracking-widest pointer-events-auto">
            <Network className="w-4 h-4 text-[#B91C1C]" /> Bản đồ tri thức
          </div>
          {!isFullscreen && (
            <p className="text-gray-500 text-sm max-w-xs pointer-events-auto bg-white/80 p-3 rounded-xl border border-gray-200 backdrop-blur-sm">
              Khám phá mối liên hệ giữa các khái niệm. Click vào một node để xem chi tiết.
            </p>
          )}
        </div>

        <button 
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-10 p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-[#1F2937] hover:bg-gray-50 shadow-sm transition-all"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white border border-gray-200 p-3 rounded-xl shadow-sm text-xs text-gray-600 flex flex-col gap-2">
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#B91C1C]"></div> Tư tưởng / Đang chọn</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div> Chương / Liên quan</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#15803d]"></div> Đã hiểu</div>
           <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-500"></div> Khái niệm</div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full cursor-grab active:cursor-grabbing">
          {/* Edges */}
          {conceptsData.map(node => 
            node.connections.map(targetId => {
              const targetNode = conceptsData.find(n => n.id === targetId);
              if (!targetNode) return null;
              
              const isHighlighted = selectedNode && (
                (selectedNode.id === node.id && selectedNode.connections.includes(targetId)) ||
                (selectedNode.id === targetId && node.connections.includes(selectedNode.id)) ||
                (selectedNode.connections.includes(node.id) && selectedNode.connections.includes(targetId))
              );

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.x} y1={node.y} x2={targetNode.x} y2={targetNode.y}
                  stroke={isHighlighted ? "#F59E0B" : "#E5E7EB"}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  className="transition-all duration-300"
                />
              );
            })
          )}

          {/* Nodes */}
          {conceptsData.map(node => {
            const isSelected = selectedNode?.id === node.id;
            const isViewed = progress.viewedConcepts.includes(node.id);
            
            return (
              <g 
                key={node.id} 
                className="cursor-pointer group"
                onClick={() => handleNodeClick(node)}
              >
                {/* Glow for selected */}
                {isSelected && (
                  <circle cx={node.x} cy={node.y} r={getNodeSize(node.type) + 8} fill="rgba(185,28,28,0.1)" />
                )}
                
                <circle
                  cx={node.x} cy={node.y} r={getNodeSize(node.type)}
                  fill={getNodeColor(node)}
                  className="transition-colors duration-300"
                  stroke={isSelected ? "#fff" : "none"}
                  strokeWidth={isSelected ? 2 : 0}
                />
                
                {isViewed && !isSelected && (
                  <circle cx={node.x + 8} cy={node.y - 8} r={4} fill="#fff" stroke="#15803d" strokeWidth={1.5} />
                )}

                <text
                  x={node.x} y={node.y + getNodeSize(node.type) + 16}
                  textAnchor="middle"
                  fill={isSelected ? "#1F2937" : "#6B7280"}
                  className={`text-xs md:text-sm transition-all duration-300 ${isSelected ? 'font-bold' : 'font-medium'}`}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* DETAIL PANEL */}
      <AnimatePresence>
        {selectedNode ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="w-full md:w-96 bg-white border-l border-gray-200 overflow-y-auto h-[calc(100vh-4rem)] shadow-lg z-20 flex-shrink-0"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
                  selectedNode.type === 'root' ? 'bg-[#FEE2E2] text-[#B91C1C]' :
                  selectedNode.type === 'chapter' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {selectedNode.type === 'root' ? 'Hệ tư tưởng' :
                   selectedNode.type === 'chapter' ? 'Chương học' : 'Khái niệm'}
                </div>
                <button 
                  onClick={() => setSelectedNode(null)}
                  className="p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">{selectedNode.label}</h2>
              <p className="text-gray-600 leading-relaxed mb-8 border-l-4 border-[#F59E0B] pl-4">
                {selectedNode.description}
              </p>

              {selectedNode.connections.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Liên kết với</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.connections.map(id => {
                      const relatedNode = conceptsData.find(n => n.id === id);
                      return relatedNode ? (
                        <button
                          key={id}
                          onClick={() => setSelectedNode(relatedNode)}
                          className="px-3 py-1.5 bg-[#F8FAFC] border border-gray-200 text-gray-600 hover:bg-[#FEE2E2] hover:text-[#B91C1C] hover:border-[#B91C1C]/30 text-sm rounded-lg transition-colors text-left"
                        >
                          {relatedNode.label}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-gray-100 space-y-3">
                {selectedNode.type === 'chapter' && (
                  <button 
                    onClick={() => navigate(`/theory/chapters/${selectedNode.id}`)}
                    className="w-full py-3 bg-[#B91C1C] hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" /> Xem trong giáo trình <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                
                <button 
                  onClick={handleMarkUnderstood}
                  disabled={progress.viewedConcepts.includes(selectedNode.id)}
                  className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    progress.viewedConcepts.includes(selectedNode.id)
                      ? 'bg-[#DCFCE7] text-[#15803d] cursor-default border border-[#15803d]/30'
                      : 'bg-white border border-gray-300 text-[#1F2937] hover:bg-gray-50'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" /> 
                  {progress.viewedConcepts.includes(selectedNode.id) ? 'Đã hiểu khái niệm này' : 'Đánh dấu đã hiểu'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="hidden md:flex w-96 bg-white border-l border-gray-200 h-[calc(100vh-4rem)] flex-col items-center justify-center p-8 text-center text-gray-500">
            <Network className="w-16 h-16 text-gray-200 mb-4" />
            <p>Chọn một node trên bản đồ để xem chi tiết, mối liên hệ và đánh dấu tiến độ.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
