export const LOADING_TIPS = [
  {
    "text": "Cương lĩnh 1930 đặt độc lập dân tộc ở vị trí trung tâm.",
    "chapter": 1,
    "icon": "📘"
  },
  {
    "text": "Luận cương 10/1930 cần nhớ cả ưu điểm và hạn chế.",
    "chapter": 1,
    "icon": "🧠"
  },
  {
    "text": "So sánh Cương lĩnh và Luận cương là dạng câu rất hay gặp.",
    "chapter": 1,
    "icon": "⚖️"
  },
  {
    "text": "Xô viết Nghệ Tĩnh là đỉnh cao phong trào 1930–1931.",
    "chapter": 2,
    "icon": "🔥"
  },
  {
    "text": "Sau đàn áp, phục hồi tổ chức là nhiệm vụ sống còn.",
    "chapter": 2,
    "icon": "🛡️"
  },
  {
    "text": "Đại hội I năm 1935 đánh dấu sự phục hồi tổ chức Đảng.",
    "chapter": 2,
    "icon": "🏛️"
  },
  {
    "text": "1936–1939 là bài học về điều chỉnh sách lược.",
    "chapter": 3,
    "icon": "🔄"
  },
  {
    "text": "Dân sinh, dân chủ, hòa bình là khẩu hiệu trọng tâm 1936–1939.",
    "chapter": 3,
    "icon": "🕊️"
  },
  {
    "text": "Mặt trận Dân chủ giúp mở rộng lực lượng quần chúng.",
    "chapter": 3,
    "icon": "🤝"
  },
  {
    "text": "Từ 1939, giải phóng dân tộc trở thành nhiệm vụ cấp bách.",
    "chapter": 4,
    "icon": "🚩"
  },
  {
    "text": "Hội nghị Trung ương 8 hoàn chỉnh chuyển hướng chiến lược.",
    "chapter": 4,
    "icon": "📍"
  },
  {
    "text": "Nguyễn Ái Quốc về nước năm 1941 là mốc rất quan trọng.",
    "chapter": 4,
    "icon": "🌟"
  },
  {
    "text": "Việt Minh là mặt trận đoàn kết toàn dân vì độc lập.",
    "chapter": 5,
    "icon": "🇻🇳"
  },
  {
    "text": "Ngày 12/3/1945, Đảng phát động cao trào kháng Nhật.",
    "chapter": 5,
    "icon": "⚡"
  },
  {
    "text": "Sau 9/3/1945, kẻ thù trước mắt là phát xít Nhật.",
    "chapter": 5,
    "icon": "🎯"
  },
  {
    "text": "Tháng Tám 1945 thắng lợi nhờ chuẩn bị lâu dài và chớp thời cơ.",
    "chapter": 5,
    "icon": "⏰"
  },
  {
    "text": "Học theo chuỗi: bối cảnh → chủ trương → kết quả → bài học.",
    "chapter": null,
    "icon": "🧩"
  },
  {
    "text": "Đừng học mốc rời rạc; hãy nối mốc với sự thay đổi đường lối.",
    "chapter": null,
    "icon": "🗺️"
  },
  {
    "text": "Câu nhận xét thường hỏi: đúng đắn, sáng tạo, linh hoạt, hạn chế.",
    "chapter": null,
    "icon": "💡"
  },
  {
    "text": "Mỗi giai đoạn cần nhớ kẻ thù, nhiệm vụ, lực lượng, hình thức.",
    "chapter": null,
    "icon": "✅"
  }
];

export function getRandomTip(chapterFilter = null) {
  const filtered = chapterFilter
    ? LOADING_TIPS.filter(t => t.chapter === chapterFilter || t.chapter === null)
    : LOADING_TIPS;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export function getRandomTips(count = 3) {
  const shuffled = [...LOADING_TIPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
