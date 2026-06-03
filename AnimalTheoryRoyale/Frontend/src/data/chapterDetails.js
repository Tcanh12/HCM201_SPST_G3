import { BookOpen, Target, Brain, Flag, Users, Globe, Lightbulb, Compass, ShieldCheck, Heart } from 'lucide-react';

export const chapterDetails = {
  "chuong-1": {
    id: "chuong-1",
    chapterNumber: 1,
    title: "Khái niệm, đối tượng, phương pháp nghiên cứu và ý nghĩa học tập",
    objective: "Sau chương này, người học cần hiểu tư tưởng Hồ Chí Minh là gì, môn học nghiên cứu nội dung nào, cần sử dụng những phương pháp nghiên cứu nào và vì sao việc học tập môn học này có ý nghĩa đối với sinh viên.",
    sections: [
      {
        id: "muc-1",
        title: "1. Khái niệm tư tưởng Hồ Chí Minh",
        type: "concept-card-with-diagram",
        content: "Tư tưởng Hồ Chí Minh là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam. Tư tưởng đó là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác – Lênin vào điều kiện cụ thể của Việt Nam, đồng thời kế thừa truyền thống tốt đẹp của dân tộc và tiếp thu tinh hoa văn hóa nhân loại.",
        diagram: {
          title: "4 Nguồn gốc hình thành",
          nodes: [
            { label: "Chủ nghĩa Mác – Lênin", icon: "BookOpen" },
            { label: "Truyền thống dân tộc", icon: "Flag" },
            { label: "Tinh hoa văn hóa nhân loại", icon: "Globe" },
            { label: "Phẩm chất & hoạt động thực tiễn", icon: "Brain" }
          ]
        }
      },
      {
        id: "muc-2",
        title: "2. Đối tượng nghiên cứu",
        type: "mindmap",
        content: "Đối tượng nghiên cứu của môn học là toàn bộ hệ thống quan điểm của Hồ Chí Minh thể hiện trong di sản của Người, bao gồm bài nói, bài viết, hoạt động thực tiễn và quá trình vận dụng tư tưởng đó trong cách mạng Việt Nam.",
        diagram: {
          center: "Đối tượng nghiên cứu",
          branches: [
            "Quan điểm của Hồ Chí Minh",
            "Di sản tư tưởng (Bài nói, viết)",
            "Hoạt động thực tiễn",
            "Quá trình vận dụng trong CMVN"
          ]
        }
      },
      {
        id: "muc-3",
        title: "3. Phương pháp nghiên cứu",
        type: "infographic-list",
        content: "Nghiên cứu tư tưởng Hồ Chí Minh cần dựa trên phương pháp luận khoa học, thống nhất giữa lý luận và thực tiễn, quan điểm lịch sử - cụ thể, quan điểm toàn diện và hệ thống.",
        items: [
          { title: "Thống nhất tính Đảng và tính khoa học", description: "Đảm bảo tính khách quan, khoa học gắn với lập trường giai cấp công nhân." },
          { title: "Thống nhất lý luận và thực tiễn", description: "Học đi đôi với hành, lý luận gắn liền với thực tế sinh động." },
          { title: "Quan điểm lịch sử - cụ thể", description: "Đặt hiện tượng vào đúng bối cảnh lịch sử mà nó phát sinh." },
          { title: "Quan điểm toàn diện và hệ thống", description: "Nhìn nhận sự vật trong mối liên hệ qua lại, nhiều mặt." },
          { title: "Kế thừa và phát triển", description: "Không giáo điều, máy móc mà phải vận dụng sáng tạo." }
        ]
      },
      {
        id: "muc-4",
        title: "4. Ý nghĩa học tập môn học",
        type: "three-pillars",
        content: "Việc học tập môn Tư tưởng Hồ Chí Minh giúp người học nâng cao năng lực tư duy lý luận, bồi dưỡng đạo đức cách mạng, củng cố niềm tin khoa học, rèn luyện phương pháp học tập, phương pháp làm việc.",
        pillars: [
          { title: "Tư duy lý luận", description: "Nâng cao năng lực phân tích, đánh giá vấn đề." },
          { title: "Đạo đức & Lòng yêu nước", description: "Giáo dục lý tưởng cách mạng, trách nhiệm công dân." },
          { title: "Phương pháp công tác", description: "Rèn luyện kỹ năng làm việc khoa học, hiệu quả." }
        ]
      }
    ],
    quiz: [
      {
        question: "Tư tưởng Hồ Chí Minh là gì?",
        options: [
          "Là sự sao chép nguyên xi chủ nghĩa Mác - Lênin",
          "Là hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam",
          "Là sự tổng hợp các luồng tư tưởng phương Đông",
          "Là chủ trương của Đảng Cộng sản Đông Dương"
        ],
        correctIndex: 1
      },
      {
        question: "Đối tượng nghiên cứu của môn học là gì?",
        options: [
          "Lịch sử Đảng Cộng sản Việt Nam",
          "Cuộc đời hoạt động của các nhà yêu nước",
          "Hệ thống quan điểm và di sản tư tưởng của Hồ Chí Minh",
          "Quá trình đấu tranh vũ trang của dân tộc"
        ],
        correctIndex: 2
      },
      {
        question: "Vì sao cần thống nhất lý luận và thực tiễn khi nghiên cứu?",
        options: [
          "Để tránh rơi vào bệnh giáo điều, máy móc",
          "Để học thuộc lòng dễ hơn",
          "Để phân biệt với tư tưởng của các nước khác",
          "Để viết bài luận dài hơn"
        ],
        correctIndex: 0
      }
    ]
  }
};
