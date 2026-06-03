import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, X, BookOpen, FileText, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import conceptsData from '../../data/concepts.json';

// Helper to draw a curved SVG path between two points
const BezierCurve = ({ startX, startY, endX, endY, isActive }) => {
  const controlPointX = startX + (endX - startX) / 2;
  const path = `M ${startX} ${startY} C ${controlPointX} ${startY}, ${controlPointX} ${endY}, ${endX} ${endY}`;
  
  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full" style={{ zIndex: 0 }}>
      <motion.path
        d={path}
        fill="transparent"
        stroke={isActive ? '#ef4444' : 'rgba(255,255,255,0.1)'}
        strokeWidth={isActive ? 3 : 1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={isActive ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : ''}
      />
    </svg>
  );
};

export default function ConceptMapPage() {
  const navigate = useNavigate();
  const [selectedNodeId, setSelectedNodeId] = useState('tu-tuong-ho-chi-minh');
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  // Parse data
  const rootNode = conceptsData.find(c => c.level === 0);
  const level1Nodes = conceptsData.filter(c => c.level === 1);
  const level2Nodes = conceptsData.filter(c => c.level === 2);

  const selectedNode = conceptsData.find(c => c.id === selectedNodeId) || rootNode;

  // We will use a fixed coordinate system in a large virtual container, and handle scrolling if needed.
  // Virtual space: 1200x800
  const nodesWithPositions = useMemo(() => {
    let result = {};
    
    // Root
    result[rootNode.id] = { ...rootNode, x: 100, y: 400 };

    // Level 1
    const l1Spacing = 600 / Math.max(1, level1Nodes.length - 1);
    level1Nodes.forEach((node, i) => {
      const y = 100 + i * l1Spacing;
      result[node.id] = { ...node, x: 450, y };
    });

    // Level 2 (Positioned near their parents)
    const childrenByParent = {};
    level2Nodes.forEach(n => {
      if (!childrenByParent[n.parentId]) childrenByParent[n.parentId] = [];
      childrenByParent[n.parentId].push(n);
    });

    Object.keys(childrenByParent).forEach(parentId => {
      const parent = result[parentId];
      const children = childrenByParent[parentId];
      const l2Spacing = 100;
      const startY = parent.y - ((children.length - 1) * l2Spacing) / 2;
      
      children.forEach((child, i) => {
        result[child.id] = { ...child, x: 800, y: startY + i * l2Spacing };
      });
    });

    return result;
  }, []);

  // Compute edges
  const edges = useMemo(() => {
    const list = [];
    conceptsData.forEach(node => {
      if (node.parentId && nodesWithPositions[node.parentId] && nodesWithPositions[node.id]) {
        list.push({
          id: `${node.parentId}-${node.id}`,
          source: nodesWithPositions[node.parentId],
          target: nodesWithPositions[node.id],
          // Active if either source or target is selected, or if target is a child of selected
          isActive: selectedNodeId === node.parentId || selectedNodeId === node.id || 
                    (nodesWithPositions[selectedNodeId]?.parentId === node.parentId)
        });
      }
    });
    return list;
  }, [nodesWithPositions, selectedNodeId]);

  return (
    <div className={`w-full flex bg-[#050508] overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[calc(100vh-4rem)]'}`}>
      
      {/* MAP AREA */}
      <div className="flex-1 relative overflow-auto border-r border-white/10 custom-scrollbar">
        
        {/* Controls */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <div className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl font-bold text-white/80 flex items-center gap-2">
            <Network className="w-4 h-4 text-yellow-400" />
            Bản đồ Tri thức
          </div>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-white/80 transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>

        {/* Virtual Canvas (Minimum size to allow scrolling) */}
        <div className="relative min-w-[1100px] min-h-[800px] w-full h-full" ref={containerRef}>
          
          {/* Edges */}
          {edges.map(edge => (
            <BezierCurve
              key={edge.id}
              startX={edge.source.x + 180} // Node width offset
              startY={edge.source.y + 35}  // Node height offset
              endX={edge.target.x}
              endY={edge.target.y + 35}
              isActive={edge.isActive}
            />
          ))}

          {/* Nodes */}
          {Object.values(nodesWithPositions).map(node => {
            const isSelected = selectedNodeId === node.id;
            const isRelated = selectedNode?.relatedConcepts?.includes(node.id) || 
                              node.relatedConcepts?.includes(selectedNode?.id);
            const isParentOrChild = node.parentId === selectedNodeId || selectedNode?.parentId === node.id;
            
            // Dim nodes that are not related when something is selected
            const isDimmed = selectedNodeId && !isSelected && !isRelated && !isParentOrChild && node.id !== 'tu-tuong-ho-chi-minh';

            return (
              <motion.button
                key={node.id}
                onClick={() => {
                  setSelectedNodeId(node.id);
                  setIsPanelOpen(true);
                }}
                className={`absolute w-[180px] h-[70px] flex flex-col items-center justify-center text-center p-3 rounded-2xl border transition-all z-10 
                  ${isSelected ? 'bg-red-500 border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.5)] z-20 scale-110' : 
                    isParentOrChild ? 'bg-yellow-500/20 border-yellow-500/50 text-white shadow-[0_0_15px_rgba(234,179,8,0.2)]' :
                    'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/30'}
                `}
                style={{ 
                  left: node.x, top: node.y,
                  opacity: isDimmed ? 0.3 : 1
                }}
                whileHover={{ scale: isSelected ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : ''}`}>
                  {node.title}
                </span>
                {node.level === 0 && (
                  <div className="absolute -inset-1 bg-red-500/30 rounded-2xl blur-md -z-10 animate-pulse" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* DETAIL PANEL (Right) */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full bg-[#0a0a0f] border-l border-white/10 shrink-0 overflow-y-auto relative"
          >
            {selectedNode && (
              <div className="p-6 w-[380px]">
                <div className="flex items-center justify-between mb-6">
                  <div className="px-3 py-1 bg-white/10 text-white/50 text-xs font-bold rounded-full uppercase tracking-wider">
                    Node Chi Tiết
                  </div>
                  <button 
                    onClick={() => setIsPanelOpen(false)}
                    className="p-2 text-white/50 hover:bg-white/10 hover:text-white rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-display font-black text-white mb-2 leading-snug">
                    {selectedNode.title}
                  </h2>
                  <p className="text-yellow-400 font-medium text-sm mb-6 pb-6 border-b border-white/10">
                    {selectedNode.shortDescription}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Nội dung cốt lõi
                      </h3>
                      <p className="text-white/80 leading-relaxed text-sm bg-white/5 p-4 rounded-xl border border-white/5">
                        {selectedNode.content}
                      </p>
                    </div>

                    {selectedNode.relatedConcepts && selectedNode.relatedConcepts.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Network className="w-4 h-4" /> Khái niệm liên quan
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedNode.relatedConcepts.map(rId => {
                            const rel = conceptsData.find(c => c.id === rId);
                            if (!rel) return null;
                            return (
                              <button 
                                key={rId}
                                onClick={() => setSelectedNodeId(rId)}
                                className="px-3 py-1.5 bg-dark border border-white/10 text-white/70 text-xs font-medium rounded-lg hover:border-yellow-400 hover:text-yellow-400 transition-colors"
                              >
                                {rel.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-white/10 mt-8">
                      <button 
                        onClick={() => navigate(`/theory/chapters/${selectedNode.chapter}`)}
                        className="w-full py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:scale-[1.02] transition-transform"
                      >
                        <FileText className="w-4 h-4" /> Xem chương chi tiết <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

    </div>
  );
}
