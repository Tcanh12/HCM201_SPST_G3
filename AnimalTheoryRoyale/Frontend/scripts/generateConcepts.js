import fs from 'fs';
import path from 'path';

const chapters = [
  { id: "chuong-1", title: "Chương 1: Khái niệm, đối tượng, phương pháp, ý nghĩa", chapterTitle: "Khái niệm, đối tượng, phương pháp nghiên cứu và ý nghĩa học tập môn tư tưởng Hồ Chí Minh" },
  { id: "chuong-2", title: "Chương 2: Cơ sở, quá trình hình thành", chapterTitle: "Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh" },
  { id: "chuong-3", title: "Chương 3: Độc lập dân tộc và CNXH", chapterTitle: "Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội" },
  { id: "chuong-4", title: "Chương 4: Đảng và Nhà nước", chapterTitle: "Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam và Nhà nước của nhân dân, do nhân dân, vì nhân dân" },
  { id: "chuong-5", title: "Chương 5: Đại đoàn kết", chapterTitle: "Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế" },
  { id: "chuong-6", title: "Chương 6: Văn hóa, đạo đức, con người", chapterTitle: "Tư tưởng Hồ Chí Minh về văn hóa, đạo đức, con người" }
];

const conceptData = [
  { id: "tu-tuong-ho-chi-minh", title: "Tư tưởng Hồ Chí Minh", chapterId: "core", level: 0 },
  // Chuong 1
  { id: "khai-niem-tu-tuong-ho-chi-minh", title: "Khái niệm Tư tưởng Hồ Chí Minh", chapterId: "chuong-1", level: 2 },
  { id: "doi-tuong-nghien-cuu", title: "Đối tượng nghiên cứu", chapterId: "chuong-1", level: 2 },
  { id: "phuong-phap-nghien-cuu", title: "Phương pháp nghiên cứu", chapterId: "chuong-1", level: 2 },
  { id: "thong-nhat-ly-luan-va-thuc-tien", title: "Thống nhất lý luận và thực tiễn", chapterId: "chuong-1", level: 2 },
  { id: "quan-diem-lich-su-cu-the", title: "Quan điểm lịch sử - cụ thể", chapterId: "chuong-1", level: 2 },
  { id: "quan-diem-toan-dien-he-thong", title: "Quan điểm toàn diện và hệ thống", chapterId: "chuong-1", level: 2 },
  { id: "y-nghia-hoc-tap", title: "Ý nghĩa học tập", chapterId: "chuong-1", level: 2 },
  // Chuong 2
  { id: "co-so-hinh-thanh", title: "Cơ sở hình thành tư tưởng Hồ Chí Minh", chapterId: "chuong-2", level: 2 },
  { id: "boi-canh-dan-toc", title: "Bối cảnh dân tộc", chapterId: "chuong-2", level: 2 },
  { id: "boi-canh-thoi-dai", title: "Bối cảnh thời đại", chapterId: "chuong-2", level: 2 },
  { id: "truyen-thong-dan-toc", title: "Truyền thống dân tộc", chapterId: "chuong-2", level: 2 },
  { id: "tinh-hoa-van-hoa-nhan-loai", title: "Tinh hoa văn hóa nhân loại", chapterId: "chuong-2", level: 2 },
  { id: "chu-nghia-mac-lenin", title: "Chủ nghĩa Mác - Lênin", chapterId: "chuong-2", level: 2 },
  { id: "nhan-to-chu-quan", title: "Nhân tố chủ quan", chapterId: "chuong-2", level: 2 },
  { id: "qua-trinh-hinh-thanh-phat-trien", title: "Quá trình hình thành và phát triển", chapterId: "chuong-2", level: 2 },
  { id: "gia-tri-tu-tuong", title: "Giá trị tư tưởng Hồ Chí Minh", chapterId: "chuong-2", level: 2 },
  // Chuong 3
  { id: "doc-lap-dan-toc", title: "Độc lập dân tộc", chapterId: "chuong-3", level: 2 },
  { id: "cach-mang-giai-phong-dan-toc", title: "Cách mạng giải phóng dân tộc", chapterId: "chuong-3", level: 2 },
  { id: "chu-nghia-xa-hoi", title: "Chủ nghĩa xã hội", chapterId: "chuong-3", level: 2 },
  { id: "doc-lap-dan-toc-gan-lien-cnxh", title: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội", chapterId: "chuong-3", level: 2 },
  { id: "nhan-dan-lam-chu", title: "Nhân dân làm chủ", chapterId: "chuong-3", level: 2 },
  { id: "suc-manh-dan-toc-va-thoi-dai", title: "Kết hợp sức mạnh dân tộc và sức mạnh thời đại", chapterId: "chuong-3", level: 2 },
  // Chuong 4
  { id: "dang-cong-san-viet-nam", title: "Đảng Cộng sản Việt Nam", chapterId: "chuong-4", level: 2 },
  { id: "xay-dung-dang", title: "Xây dựng Đảng", chapterId: "chuong-4", level: 2 },
  { id: "nha-nuoc-cua-dan", title: "Nhà nước của dân", chapterId: "chuong-4", level: 2 },
  { id: "nha-nuoc-do-dan", title: "Nhà nước do dân", chapterId: "chuong-4", level: 2 },
  { id: "nha-nuoc-vi-dan", title: "Nhà nước vì dân", chapterId: "chuong-4", level: 2 },
  { id: "can-bo", title: "Cán bộ", chapterId: "chuong-4", level: 2 },
  { id: "dao-duc-cong-vu", title: "Đạo đức công vụ", chapterId: "chuong-4", level: 2 },
  // Chuong 5
  { id: "dai-doan-ket", title: "Đại đoàn kết toàn dân tộc", chapterId: "chuong-5", level: 2 },
  { id: "luc-luong-dai-doan-ket", title: "Lực lượng đại đoàn kết", chapterId: "chuong-5", level: 2 },
  { id: "mat-tran-dan-toc-thong-nhat", title: "Mặt trận dân tộc thống nhất", chapterId: "chuong-5", level: 2 },
  { id: "doan-ket-quoc-te", title: "Đoàn kết quốc tế", chapterId: "chuong-5", level: 2 },
  { id: "ket-hop-suc-manh-dan-toc-quoc-te", title: "Kết hợp sức mạnh dân tộc và sức mạnh quốc tế", chapterId: "chuong-5", level: 2 },
  // Chuong 6
  { id: "van-hoa", title: "Văn hóa", chapterId: "chuong-6", level: 2 },
  { id: "ban-sac-dan-toc", title: "Bản sắc dân tộc", chapterId: "chuong-6", level: 2 },
  { id: "tiep-thu-tinh-hoa-nhan-loai", title: "Tiếp thu tinh hoa văn hóa nhân loại", chapterId: "chuong-6", level: 2 },
  { id: "dao-duc-cach-mang", title: "Đạo đức cách mạng", chapterId: "chuong-6", level: 2 },
  { id: "can-kiem-liem-chinh", title: "Cần, kiệm, liêm, chính", chapterId: "chuong-6", level: 2 },
  { id: "chi-cong-vo-tu", title: "Chí công vô tư", chapterId: "chuong-6", level: 2 },
  { id: "noi-di-doi-voi-lam", title: "Nói đi đôi với làm", chapterId: "chuong-6", level: 2 },
  { id: "chu-nghia-ca-nhan", title: "Chủ nghĩa cá nhân", chapterId: "chuong-6", level: 2 },
  { id: "con-nguoi", title: "Con người", chapterId: "chuong-6", level: 2 },
  { id: "trach-nhiem-cong-dan", title: "Trách nhiệm công dân", chapterId: "chuong-6", level: 2 },
  { id: "van-hoa-so", title: "Văn hóa số", chapterId: "chuong-6", level: 2 }
];

const nodes = [];

// Add Chapter nodes
for (const ch of chapters) {
  nodes.push({
    id: ch.id,
    title: ch.title,
    chapterId: ch.id,
    chapterTitle: ch.chapterTitle,
    type: "chapter",
    level: 1,
    shortDescription: `Tổng quan về ${ch.title}`,
    definition: `Nội dung cốt lõi của ${ch.title}`,
    cognitiveValue: `Giúp nắm bắt các khái niệm của ${ch.title}`,
    explanation: `Đây là một phần quan trọng trong chương trình học.`,
    keyIdeas: [
      `Hiểu được bối cảnh của ${ch.title}`,
      `Nắm được các luận điểm chính`
    ],
    prerequisites: [],
    relatedConceptIds: conceptData.filter(c => c.chapterId === ch.id).map(c => c.id),
    applications: [`Áp dụng kiến thức ${ch.title} vào thực tiễn`],
    commonMisconceptions: [`Hiểu sai về phạm vi của ${ch.title}`],
    reflectionQuestions: [`Ý nghĩa của ${ch.title} đối với bạn là gì?`],
    relatedTimelineIds: [],
    relatedCaseIds: [],
    requiresVerification: true
  });
}

// Add Concept nodes
for (const c of conceptData) {
  const ch = chapters.find(ch => ch.id === c.chapterId);
  let related = c.chapterId !== "core" ? [c.chapterId] : chapters.map(chap => chap.id);
  nodes.push({
    id: c.id,
    title: c.title,
    chapterId: c.chapterId,
    chapterTitle: ch ? ch.chapterTitle : "Tư tưởng Hồ Chí Minh",
    type: "concept",
    level: c.level,
    shortDescription: `Mô tả ngắn gọn về ${c.title}.`,
    definition: `Định nghĩa cốt lõi của ${c.title} dựa trên giáo trình.`,
    cognitiveValue: `Giúp người học nhận thức sâu sắc về ${c.title}.`,
    explanation: `Giải thích chi tiết về ${c.title} bằng ngôn ngữ dễ hiểu.`,
    keyIdeas: [
      `Ý chính 1 về ${c.title}`,
      `Ý chính 2 về ${c.title}`
    ],
    prerequisites: [],
    relatedConceptIds: related, // link back to chapter or all chapters
    applications: [
      `Liên hệ ${c.title} với đời sống thực tế.`
    ],
    commonMisconceptions: [
      `Những hiểu lầm phổ biến về ${c.title}.`
    ],
    reflectionQuestions: [
      `Vì sao ${c.title} lại quan trọng?`
    ],
    relatedTimelineIds: [],
    relatedCaseIds: [],
    requiresVerification: true
  });
}

const fileContent = `// TỰ ĐỘNG TẠO - CANONICAL CONCEPTS
export const canonicalConcepts = ${JSON.stringify(nodes, null, 2)};

export function getConceptTitle(id) {
  const concept = canonicalConcepts.find(c => c.id === id);
  if (concept) return concept.title;
  console.warn(\`Khái niệm chưa được định nghĩa: \${id}\`);
  return "Khái niệm cần kiểm chứng";
}
`;

const __dirname = path.resolve();
fs.writeFileSync(path.join(__dirname, 'src/data/canonicalConcepts.js'), fileContent, 'utf-8');
console.log('canonicalConcepts.js generated.');
