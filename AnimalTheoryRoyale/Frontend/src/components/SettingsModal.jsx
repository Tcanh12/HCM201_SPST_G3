import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SettingsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('camera');
  const [mouseSensitivity, setMouseSensitivity] = useState(parseFloat(localStorage.getItem('mouseSensitivity') || '1.0'));
  const [invertY, setInvertY] = useState(localStorage.getItem('invertY') === 'true');

  useEffect(() => {
    // Make sure we release pointer lock when opening settings
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('mouseSensitivity', mouseSensitivity);
    localStorage.setItem('invertY', invertY);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] backdrop-blur-sm pointer-events-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl w-[90%] max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
          <h2 className="text-2xl font-black text-white tracking-widest">CÀI ĐẶT / HƯỚNG DẪN</h2>
          <button onClick={saveSettings} className="text-gray-400 hover:text-white text-2xl font-bold leading-none">&times;</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-800/50">
          <button onClick={() => setActiveTab('camera')} className={`flex-1 py-3 font-bold text-center border-b-2 transition-colors ${activeTab === 'camera' ? 'border-yellow-400 text-yellow-400 bg-gray-800' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>CAMERA</button>
          <button onClick={() => setActiveTab('controls')} className={`flex-1 py-3 font-bold text-center border-b-2 transition-colors ${activeTab === 'controls' ? 'border-yellow-400 text-yellow-400 bg-gray-800' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>ĐIỀU KHIỂN</button>
          <button onClick={() => setActiveTab('guide')} className={`flex-1 py-3 font-bold text-center border-b-2 transition-colors ${activeTab === 'guide' ? 'border-yellow-400 text-yellow-400 bg-gray-800' : 'border-transparent text-gray-400 hover:text-gray-200'}`}>HƯỚNG DẪN CHƠI</button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-gray-200">
          
          {activeTab === 'camera' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 mb-2">ĐỘ NHẠY CHUỘT (SENSITIVITY)</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="0.1" max="3" step="0.1" value={mouseSensitivity} onChange={(e) => setMouseSensitivity(e.target.value)} className="w-full accent-yellow-400" />
                  <span className="font-mono bg-gray-800 px-3 py-1 rounded text-yellow-400 w-16 text-center">{mouseSensitivity}</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={invertY} onChange={(e) => setInvertY(e.target.checked)} className="w-5 h-5 accent-yellow-400 rounded" />
                  <span className="font-bold text-lg">ĐẢO NGƯỢC TRỤC Y (INVERT Y)</span>
                </label>
                <p className="text-gray-400 text-sm mt-1 ml-8">Xoay chuột lên sẽ cúi camera xuống, và ngược lại.</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg mt-6 border border-gray-700">
                <h4 className="font-bold text-yellow-400 mb-2">💡 Gợi ý (Góc nhìn thứ nhất)</h4>
                <p className="text-sm leading-relaxed">Hãy click chuột vào bất kỳ đâu trên màn hình game để khoá trỏ chuột (Pointer Lock). Chuột sẽ đóng vai trò xoay camera y như các game bắn súng FPS. Nhấn phím <kbd className="bg-gray-700 px-2 rounded">ESC</kbd> để thoát chế độ này.</p>
              </div>
            </div>
          )}

          {activeTab === 'controls' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-yellow-400 mb-3 uppercase tracking-wider text-sm">Bàn phím & Chuột</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>Di chuyển:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">W A S D</kbd></li>
                  <li className="flex justify-between"><span>Nhảy:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">Space</kbd></li>
                  <li className="flex justify-between"><span>Xoay camera:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">Chuột</kbd></li>
                  <li className="flex justify-between"><span>Bắn:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">Chuột Trái</kbd></li>
                  <li className="flex justify-between"><span>Đẩy lùi:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">1</kbd></li>
                  <li className="flex justify-between"><span>Nhân đôi X2:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">2</kbd></li>
                  <li className="flex justify-between"><span>Gây choáng:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">3</kbd></li>
                  <li className="flex justify-between"><span>Tuyệt chiêu:</span> <kbd className="bg-gray-700 text-yellow-300 px-2 rounded">4</kbd></li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h3 className="font-bold text-blue-400 mb-3 uppercase tracking-wider text-sm">Cảm ứng (Mobile)</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>Di chuyển:</span> <span>Cần gạt trái</span></li>
                  <li className="flex justify-between"><span>Xoay camera:</span> <span>Vuốt màn hình</span></li>
                  <li className="flex justify-between"><span>Bắn / Skill:</span> <span>Các nút bên phải</span></li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-sm">
              <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-400">
                <h3 className="font-bold text-yellow-400 mb-1 text-base">🎯 Mục Tiêu</h3>
                <p>Sống sót, trả lời câu hỏi và chiến đấu để ghi điểm. Người sống sót lâu nhất và có nhiều điểm nhất sẽ chiến thắng!</p>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-blue-300">Trả lời câu hỏi:</strong> Đi vào vùng sáng hình lục giác để nhận câu hỏi.</li>
                <li><strong className="text-green-400">Trả lời đúng:</strong> Nhận điểm, buff tốc độ và hồi máu.</li>
                <li><strong className="text-red-400">Trả lời sai:</strong> Mất HP, mất điểm và có thể bị trừng phạt.</li>
                <li><strong className="text-red-500">Vòng bo:</strong> Theo thời gian, vùng an toàn sẽ thu nhỏ lại. Đứng ngoài vòng bo sẽ bị mất HP liên tục!</li>
                <li><strong className="text-pink-400">Mạng (Lives):</strong> Mỗi người có tối đa 3 mạng. Khi hết HP sẽ mất 1 mạng và hồi sinh sau 8 giây. Hết mạng sẽ bị loại khỏi trò chơi!</li>
              </ul>
              
              <h3 className="font-bold text-yellow-400 mt-4 mb-2">⚔️ Bảng Kỹ Năng</h3>
              <ul className="space-y-3 bg-gray-800 p-4 rounded-lg border border-gray-700">
                <li><strong className="text-yellow-300">Chiêu 1 (Đẩy lùi):</strong> Bắn một luồng sóng đẩy văng tất cả kẻ địch trước mặt ra xa.</li>
                <li><strong className="text-yellow-300">Chiêu 2 (X2 Rủi Ro):</strong> Câu hỏi tiếp theo bạn trả lời sẽ được NHÂN ĐÔI điểm nếu đúng, nhưng cũng NHÂN ĐÔI SÁT THƯƠNG nếu sai.</li>
                <li><strong className="text-yellow-300">Chiêu 3 (Choáng váng):</strong> Bắn một quả cầu khiến kẻ địch trúng phải bị xoay vòng, không thể di chuyển hay tấn công trong 5 giây.</li>
                <li><strong className="text-yellow-300">Chiêu 4 (Tuyệt chiêu riêng):</strong> Tuỳ thuộc vào loài động vật bạn chọn (Dậm đất, Mai Rùa, Lướt nhanh, Gài bẫy).</li>
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-800 flex justify-end">
          <button onClick={saveSettings} className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-6 py-2 rounded-lg transition-colors">
            XONG (LƯU & ĐÓNG)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
