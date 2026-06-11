import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, X, BookOpen, ChevronRight, Maximize2, Minimize2, CheckCircle, Search, Filter, ZoomIn, ZoomOut, Target, Star, RotateCcw, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLearningProgress } from '../../components/theory/ProgressContext';
import { canonicalConcepts } from '../../data/canonicalConcepts';

function wrapLabel(text, maxLength = 16) {
  if (!text) return [];
  const words = text.split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach(word => {
    if ((currentLine + " " + word).trim().length <= maxLength) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  if (lines.length > 3) {
    return [...lines.slice(0, 2), lines[2] + "..."];
  }
  return lines.slice(0, 3);
}

export default function ConceptMapPage() {
  const navigate = useNavigate();
  const { progress, markConceptViewed } = useLearningProgress();
  const [selectedNode, setSelectedNode] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chapterFilter, setChapterFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [showLabels, setShowLabels] = useState(true);
  const [isLegendOpen, setIsLegendOpen] = useState(true);
  
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  
  const width = 1600;
  const height = 1200;
  const centerX = width / 2;
  const centerY = height / 2;

  // Zoom & Pan State
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.8 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Initial center on mount
    resetView();
    
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    const handleKeyDown = (e) => { if (e.key === 'Escape') setSelectedNode(null); };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const resetView = () => {
    // Assuming standard viewport ~1000x800
    // Center the 1600x1200 content
    setTransform({
      x: -200, 
      y: -100, 
      scale: 0.85
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Zoom / Pan handlers
  const handleWheel = (e) => {
    e.preventDefault();
    if (!svgRef.current) return;
    
    const scaleAdjust = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.2, transform.scale + scaleAdjust), 3);
    
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xs = (mouseX - transform.x) / transform.scale;
    const ys = (mouseY - transform.y) / transform.scale;

    setTransform({
      x: mouseX - xs * newScale,
      y: mouseY - ys * newScale,
      scale: newScale
    });
  };

  useEffect(() => {
    const svgEl = svgRef.current;
    if (svgEl) {
      svgEl.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (svgEl) svgEl.removeEventListener('wheel', handleWheel);
    };
  }, [transform]);

  const handlePointerDown = (e) => {
    if (e.target.tagName !== 'svg' && e.target.tagName !== 'g') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  };

  const handlePointerUp = () => setIsDragging(false);

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
    const radius1 = 300; // Tăng khoảng cách để không bị đè
    chapters.forEach((chap, i) => {
      const angle = (i / chapters.length) * 2 * Math.PI - Math.PI/2;
      chap.x = centerX + radius1 * Math.cos(angle);
      chap.y = centerY + radius1 * Math.sin(angle);
    });
    
    // Concepts (level 2)
    chapters.forEach((chap, i) => {
      const conceptsL2 = positioned.filter(n => n.chapterId === chap.chapterId && n.level === 2);
      const radius2 = 200; // Tăng khoảng cách giữa chương và khái niệm
      const baseAngle = (i / chapters.length) * 2 * Math.PI - Math.PI/2;
      
      conceptsL2.forEach((concept, j) => {
        const spreadAngle = (j - (conceptsL2.length - 1) / 2) * (Math.PI / (Math.max(conceptsL2.length, 1) + 0.8));
        const finalAngle = baseAngle + spreadAngle;
        
        concept.x = chap.x + radius2 * Math.cos(finalAngle);
        concept.y = chap.y + radius2 * Math.sin(finalAngle);
        concept.baseAngle = finalAngle;
      });
    });

    // Concepts (level 3)
    const conceptsL3 = positioned.filter(n => n.level === 3);
    conceptsL3.forEach(concept => {
      const parentEdge = conceptEdges.find(e => e.target === concept.id);
      if (parentEdge) {
        const parent = positioned.find(n => n.id === parentEdge.source);
        if (parent) {
          const radius3 = 120;
          const offsetAngle = parent.baseAngle + (Math.random() - 0.5) * Math.PI/1.5;
          concept.x = parent.x + radius3 * Math.cos(offsetAngle);
          concept.y = parent.y + radius3 * Math.sin(offsetAngle);
        } else {
          concept.x = centerX; concept.y = centerY;
        }
      }
    });
    
    return positioned;
  }, [conceptEdges]);

  // Filter nodes
  const filteredNodes = useMemo(() => {
    return nodesWithPositions.filter(node => {
      if (searchQuery && !node.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (chapterFilter !== 'all' && node.chapterId !== chapterFilter && node.level !== 0) return false;
      const isViewed = progress.viewedConcepts?.includes(node.id);
      if (statusFilter === 'viewed' && !isViewed) return false;
      if (statusFilter === 'unviewed' && isViewed) return false;
      return true;
    });
  }, [nodesWithPositions, searchQuery, chapterFilter, statusFilter, progress.viewedConcepts]);

  const getNodeColor = (node) => {
    if (progress.viewedConcepts?.includes(node.id)) return '#16a34a'; // Green for viewed
    
    switch(node.chapterId) {
      case 'core': return '#b91c1c'; // Đỏ cờ
      case 'chuong-1': return '#1e3a8a';
      case 'chuong-2': return '#d97706'; // Vàng đậm
      case 'chuong-3': return '#dc2626';
      case 'chuong-4': return '#2563eb';
      case 'chuong-5': return '#059669';
      case 'chuong-6': return '#7c3aed';
      default: return '#6b7280';
    }
  };

  const getNodeSize = (level) => {
    if (level === 0) return 46;
    if (level === 1) return 32;
    if (level === 2) return 18;
    return 14;
  };

  const handleZoom = (direction) => {
    setTransform(prev => ({
      ...prev,
      scale: Math.min(Math.max(0.2, prev.scale + (direction * 0.2)), 3)
    }));
  };

  return (
    <div className="w-full h-screen flex flex-col bg-[#FDFBF7] font-sans overflow-hidden relative">
      {/* BACKGROUND PATTERN: Subtly historical / educational */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b91c1c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} 
      />

      {/* TOP TOOLBAR */}
      <div className="concept-toolbar z-20 flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-4 bg-white/95 border-b border-red-100 shadow-[0_4px_20px_rgba(185,28,28,0.06)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-700 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
            <Star className="w-5 h-5 text-yellow-300 fill-current" />
          </div>
          <div>
            <h2 className="m-0 text-[17px] font-bold text-red-900 leading-tight">Bản đồ tri thức</h2>
            <p className="m-0 text-[12px] text-gray-500 font-medium">Khám phá Tư tưởng Hồ Chí Minh</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Tìm khái niệm..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm text-sm focus:outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100 transition-all w-56 font-medium"
            />
          </div>

          <div className="relative group">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors pointer-events-none" />
            <select 
              value={chapterFilter}
              onChange={(e) => setChapterFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm text-sm focus:outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100 transition-all font-medium appearance-none cursor-pointer"
            >
              <option value="all">Tất cả chương</option>
              <option value="chuong-1">Chương 1</option>
              <option value="chuong-2">Chương 2</option>
              <option value="chuong-3">Chương 3</option>
              <option value="chuong-4">Chương 4</option>
              <option value="chuong-5">Chương 5</option>
              <option value="chuong-6">Chương 6</option>
            </select>
          </div>

          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:bg-white shadow-sm text-sm focus:outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100 transition-all font-medium cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="viewed">Đã học</option>
            <option value="unviewed">Chưa học</option>
          </select>

          <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

          <button onClick={resetView} className="p-2.5 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all" title="Sắp xếp lại">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={() => setShowLabels(!showLabels)} className={`p-2.5 rounded-xl transition-all font-medium text-xs border ${showLabels ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-500 border-gray-200'}`}>
            {showLabels ? 'Hiện nhãn' : 'Ẩn nhãn'}
          </button>
          <button onClick={toggleFullscreen} className="p-2.5 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all" title="Toàn màn hình">
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MAP AREA */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden bg-transparent w-full"
      >
        {/* Floating Controls */}
        <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2 pointer-events-auto">
          <button onClick={() => handleZoom(1)} className="p-3 bg-white border border-gray-200 shadow-lg rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={() => handleZoom(-1)} className="p-3 bg-white border border-gray-200 shadow-lg rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button onClick={resetView} className="p-3 bg-white border border-gray-200 shadow-lg rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all">
            <Target className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className={`absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 ${isLegendOpen ? 'w-56' : 'w-12 h-12'}`}>
          {isLegendOpen ? (
            <div className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Chú giải</span>
                <button onClick={() => setIsLegendOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-3 h-3" /></button>
              </div>
              <div className="flex items-center gap-3 text-[13px] font-medium text-gray-600"><div className="w-4 h-4 rounded-full bg-[#b91c1c] shadow-sm flex items-center justify-center"><Star className="w-2 h-2 text-white fill-current" /></div> Hệ tư tưởng (TT)</div>
              <div className="flex items-center gap-3 text-[13px] font-medium text-gray-600"><div className="w-4 h-4 rounded-full bg-[#1e3a8a] shadow-sm"></div> Chương học</div>
              <div className="flex items-center gap-3 text-[13px] font-medium text-gray-600"><div className="w-3 h-3 rounded-full bg-gray-400 ml-0.5"></div> Khái niệm</div>
              <div className="h-px bg-gray-100 my-1"></div>
              <div className="flex items-center gap-3 text-[13px] font-medium text-gray-600">
                <div className="w-4 h-4 rounded-full border-2 border-[#16a34a] bg-transparent flex items-center justify-center"><CheckCircle className="w-3 h-3 text-[#16a34a]" /></div> Đã học
              </div>
              <div className="flex items-center gap-3 text-[13px] font-medium text-gray-600">
                <div className="w-4 h-4 rounded-full border-2 border-[#f59e0b] bg-transparent flex items-center justify-center"></div> Cần học
              </div>
            </div>
          ) : (
            <button onClick={() => setIsLegendOpen(true)} className="w-full h-full flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50">
              <HelpCircle className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* SVG GRAPH */}
        <svg 
          ref={svgRef}
          className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
            {/* Edges */}
            {conceptEdges.map((edge, idx) => {
              const sourceNode = filteredNodes.find(n => n.id === edge.source);
              const targetNode = filteredNodes.find(n => n.id === edge.target);
              if (!sourceNode || !targetNode) return null;
              
              const isSelectedTree = selectedNode && (
                selectedNode.id === sourceNode.id || selectedNode.id === targetNode.id ||
                (selectedNode.level === 1 && (sourceNode.chapterId === selectedNode.chapterId && targetNode.chapterId === selectedNode.chapterId))
              );

              return (
                <line
                  key={`edge-${idx}`}
                  x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y}
                  stroke={isSelectedTree ? "#fca5a5" : "#e5e7eb"}
                  strokeWidth={isSelectedTree ? 2.5 : 1.5}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Nodes */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const isViewed = progress.viewedConcepts?.includes(node.id);
              const isDimmed = selectedNode && !isSelected && !(selectedNode.level === 1 && node.chapterId === selectedNode.chapterId);
              
              const baseColor = getNodeColor(node);
              const radius = getNodeSize(node.level);
              
              return (
                <g 
                  key={node.id} 
                  className={`cursor-pointer transition-all duration-300 ${isDimmed ? 'opacity-20' : 'opacity-100 hover:opacity-100'} outline-none`}
                  onClick={(e) => { e.stopPropagation(); setSelectedNode(node); }}
                  onPointerDown={(e) => e.stopPropagation()} // Prevent dragging SVG when clicking node
                >
                  {/* Outer Glow on hover or select */}
                  {isSelected && (
                    <circle cx={node.x} cy={node.y} r={radius + 12} fill={baseColor} opacity={0.15} className="animate-pulse" />
                  )}
                  
                  {/* Node Circle */}
                  <circle
                    cx={node.x} cy={node.y} r={radius}
                    fill={baseColor}
                    className="transition-all duration-300 drop-shadow-md hover:drop-shadow-xl"
                    stroke={isSelected ? "#111827" : isViewed ? "#16a34a" : "#ffffff"}
                    strokeWidth={isSelected ? 4 : isViewed ? 3 : 2}
                  />
                  
                  {/* Center Node Icon */}
                  {node.level === 0 && (
                    <Star x={node.x - 14} y={node.y - 14} width={28} height={28} className="text-yellow-300 fill-current" />
                  )}

                  {/* Viewed Badge */}
                  {isViewed && node.level > 0 && !isSelected && (
                    <circle cx={node.x + radius - 4} cy={node.y - radius + 4} r={6} fill="#16a34a" stroke="#fff" strokeWidth={2} />
                  )}

                  {/* Wrapped Label */}
                  {showLabels && (
                    <text
                      x={node.x} 
                      y={node.y + radius + 18}
                      textAnchor="middle"
                      className={`transition-all duration-300 pointer-events-none select-none ${isSelected ? 'font-bold fill-gray-900' : 'font-semibold fill-gray-700'}`}
                      fontSize={node.level === 0 ? "16px" : node.level === 1 ? "14px" : "12px"}
                    >
                      {wrapLabel(node.title, node.level === 0 ? 25 : 18).map((line, index) => (
                        <tspan
                          key={index}
                          x={node.x}
                          dy={index === 0 ? 0 : 16}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

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
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-30 lg:hidden"
              />
              
              {/* Detail Panel */}
              <motion.div
                initial={{ x: 500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 500, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-0 right-0 w-full lg:w-[480px] h-full bg-white/95 backdrop-blur-xl border-l border-red-100 shadow-[0_0_40px_rgba(185,28,28,0.1)] z-40 flex flex-col"
              >
                <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
                  <div className="flex gap-2">
                    <span className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg ${
                      selectedNode.level === 0 ? 'bg-red-100 text-red-700' :
                      selectedNode.level === 1 ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedNode.level === 0 ? 'Hệ tư tưởng' : selectedNode.level === 1 ? 'Chương học' : 'Khái niệm'}
                    </span>
                    {selectedNode.chapterId !== 'core' && (
                      <span className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-lg bg-orange-100 text-orange-700">
                        {selectedNode.chapterId}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-6">
                    {selectedNode.title}
                  </h2>

                  <div className="space-y-6">
                    {/* Definition / Description */}
                    {(selectedNode.shortDescription || selectedNode.definition || selectedNode.explanation) && (
                      <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100 text-gray-800 leading-relaxed text-sm">
                        <p className="font-semibold text-gray-900 mb-2">{selectedNode.shortDescription}</p>
                        <p>{selectedNode.definition || selectedNode.explanation}</p>
                      </div>
                    )}

                    {/* Why Important */}
                    {selectedNode.whyImportant && (
                      <div>
                        <h4 className="text-[11px] font-bold text-orange-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Star className="w-3.5 h-3.5" /> Vì sao quan trọng?
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{selectedNode.whyImportant}</p>
                      </div>
                    )}

                    {/* Key Ideas */}
                    {selectedNode.keyIdeas?.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <BookOpen className="w-3.5 h-3.5" /> Ý chính cần nhớ
                        </h4>
                        <ul className="space-y-2">
                          {selectedNode.keyIdeas.map((idea, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-600">
                              <span className="text-blue-500 font-black">•</span>
                              <span className="leading-relaxed">{idea}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Applications */}
                    {selectedNode.applications?.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-bold text-green-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Target className="w-3.5 h-3.5" /> Liên hệ thực tiễn
                        </h4>
                        <ul className="space-y-2">
                          {selectedNode.applications.map((app, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-600">
                              <span className="text-green-500 font-black">•</span>
                              <span className="leading-relaxed">{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related Concepts */}
                    {selectedNode.relatedConceptIds?.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Khái niệm liên quan</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedNode.relatedConceptIds.map(id => {
                            const relatedNode = canonicalConcepts.find(n => n.id === id);
                            return relatedNode ? (
                              <button
                                key={id}
                                onClick={() => setSelectedNode(relatedNode)}
                                className="px-3.5 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-xs rounded-xl transition-all font-medium flex items-center gap-1.5 text-left"
                              >
                                <Network className="w-3 h-3 shrink-0" /> <span className="line-clamp-1">{relatedNode.title}</span>
                              </button>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 border-t border-gray-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)] space-y-3">
                  {selectedNode.chapterId !== 'core' && (
                    <button 
                      onClick={() => navigate(`/theory/chapters/${selectedNode.chapterId}`)}
                      className="w-full py-3.5 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 text-sm"
                    >
                      <BookOpen className="w-4 h-4" /> Đọc lý thuyết chi tiết
                    </button>
                  )}
                  
                  <button 
                    onClick={handleMarkUnderstood}
                    disabled={progress.viewedConcepts?.includes(selectedNode.id)}
                    className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm ${
                      progress.viewedConcepts?.includes(selectedNode.id)
                        ? 'bg-green-50 text-green-700 border border-green-200 cursor-default shadow-sm'
                        : 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white shadow-lg shadow-red-600/30 border-none'
                    }`}
                  >
                    <CheckCircle className={`w-4 h-4 ${progress.viewedConcepts?.includes(selectedNode.id) ? 'text-green-600' : 'text-white'}`} /> 
                    {progress.viewedConcepts?.includes(selectedNode.id) ? 'Bạn đã nắm vững khái niệm này' : 'Đánh dấu đã hiểu rõ'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
        }
      `}</style>
    </div>
  );
}
