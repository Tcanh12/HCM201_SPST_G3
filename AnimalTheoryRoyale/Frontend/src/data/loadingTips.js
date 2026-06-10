/**
 * Loading tips related to Tư tưởng Hồ Chí Minh
 * Used in loading screens, waiting screens, and between-match transitions
 * Content is accurate, respectful, and educational
 */

export const LOADING_TIPS = [
  // Chương 1: Khái niệm, đối tượng, phương pháp nghiên cứu
  {
    text: "Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam.",
    chapter: 1,
    icon: "📖"
  },
  {
    text: "Nghiên cứu Tư tưởng HCM cần kết hợp lý luận với thực tiễn, lịch sử với logic.",
    chapter: 1,
    icon: "🔬"
  },

  // Chương 2: Cơ sở, quá trình hình thành
  {
    text: "Năm 1911, người thanh niên Nguyễn Tất Thành rời Bến Nhà Rồng ra đi tìm đường cứu nước.",
    chapter: 2,
    icon: "⛵"
  },
  {
    text: "Tư tưởng Hồ Chí Minh được hình thành từ truyền thống văn hóa Việt Nam, tinh hoa nhân loại và chủ nghĩa Mác-Lênin.",
    chapter: 2,
    icon: "🌏"
  },
  {
    text: "Hồ Chí Minh đã tiếp thu có chọn lọc tinh hoa văn hóa phương Đông và phương Tây.",
    chapter: 2,
    icon: "📚"
  },

  // Chương 3: Độc lập dân tộc gắn liền CNXH
  {
    text: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội là luận điểm trung tâm trong tư tưởng Hồ Chí Minh.",
    chapter: 3,
    icon: "🏛️"
  },
  {
    text: "Không có gì quý hơn độc lập, tự do — Hồ Chí Minh",
    chapter: 3,
    icon: "⭐"
  },
  {
    text: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc phải do chính nhân dân thực hiện.",
    chapter: 3,
    icon: "✊"
  },

  // Chương 4: Đại đoàn kết dân tộc
  {
    text: "Đại đoàn kết dân tộc là chiến lược xuyên suốt trong cách mạng Việt Nam.",
    chapter: 4,
    icon: "🤝"
  },
  {
    text: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công — Hồ Chí Minh",
    chapter: 4,
    icon: "💪"
  },
  {
    text: "Mặt trận dân tộc thống nhất là tổ chức thể hiện khối đại đoàn kết dân tộc.",
    chapter: 4,
    icon: "🏴"
  },

  // Chương 5: Đạo đức cách mạng
  {
    text: "Tư tưởng HCM nhấn mạnh vai trò của đạo đức cách mạng: Cần, Kiệm, Liêm, Chính.",
    chapter: 5,
    icon: "⚖️"
  },
  {
    text: "Người cách mạng phải có đạo đức, không có đạo đức dù tài giỏi mấy cũng không lãnh đạo được nhân dân.",
    chapter: 5,
    icon: "🌟"
  },
  {
    text: "Hồ Chí Minh coi đạo đức là nền tảng, là gốc rễ của con người cách mạng.",
    chapter: 5,
    icon: "🌳"
  },

  // Chương 6: Văn hóa, con người
  {
    text: "Văn hóa soi đường cho quốc dân đi — Hồ Chí Minh",
    chapter: 6,
    icon: "🔦"
  },
  {
    text: "Muốn xây dựng chủ nghĩa xã hội phải có con người xã hội chủ nghĩa.",
    chapter: 6,
    icon: "👥"
  },
  {
    text: "Theo HCM, một dân tộc dốt là một dân tộc yếu. Giáo dục là nhiệm vụ cấp bách.",
    chapter: 6,
    icon: "🎓"
  },

  // Game tips
  {
    text: "💡 Trả lời đúng liên tiếp sẽ tăng combo và nhân điểm thưởng!",
    chapter: null,
    icon: "🎮"
  },
  {
    text: "💡 Đứng ngoài vòng bo sẽ mất máu liên tục — hãy di chuyển vào vùng an toàn!",
    chapter: null,
    icon: "🎯"
  },
  {
    text: "💡 Cột Boss (đỏ) cho điểm x5 nhưng câu hỏi khó hơn nhiều!",
    chapter: null,
    icon: "⚔️"
  },
  {
    text: "💡 Dùng kỹ năng Double trước khi trả lời: Đúng x2 điểm, Sai x2 sát thương!",
    chapter: null,
    icon: "🎲"
  },
];

/**
 * Get a random loading tip
 * @param {number|null} chapterFilter - Optional chapter number to filter by
 * @returns {Object} Random tip object
 */
export function getRandomTip(chapterFilter = null) {
  const filtered = chapterFilter
    ? LOADING_TIPS.filter(t => t.chapter === chapterFilter || t.chapter === null)
    : LOADING_TIPS;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

/**
 * Get multiple unique random tips
 * @param {number} count - Number of tips to get
 * @returns {Array} Array of tip objects
 */
export function getRandomTips(count = 3) {
  const shuffled = [...LOADING_TIPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
