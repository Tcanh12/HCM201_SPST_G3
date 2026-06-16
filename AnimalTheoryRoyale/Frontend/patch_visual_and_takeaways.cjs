const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, 'src', 'data', 'lessons.js');

let content = fs.readFileSync(lessonsPath, 'utf8');
const jsonString = content.replace('export const lessons = ', '').replace(/;\s*$/, '');
const lessons = JSON.parse(jsonString);

const takeawaysData = {
  "chuong-1": [
    "Đảng Cộng sản Việt Nam ra đời là kết quả của sự kết hợp giữa chủ nghĩa Mác – Lênin, phong trào công nhân và phong trào yêu nước Việt Nam.",
    "Cương lĩnh chính trị đầu tiên đặt nhiệm vụ độc lập dân tộc lên vị trí trung tâm, phù hợp với yêu cầu của xã hội thuộc địa Việt Nam.",
    "Nguyễn Ái Quốc có vai trò quan trọng trong chuẩn bị tư tưởng, chính trị, tổ chức và chủ trì Hội nghị thành lập Đảng.",
    "Điểm sáng tạo của Cương lĩnh là xác định đúng mục tiêu, lực lượng và phương pháp cách mạng trong điều kiện Việt Nam.",
    "Khi ôn thi, cần so sánh Cương lĩnh đầu tiên với Luận cương tháng 10/1930 để thấy sự khác nhau về nhiệm vụ dân tộc và lực lượng cách mạng."
  ],
  "chuong-2": [
    "Phong trào 1930–1931 chứng minh năng lực lãnh đạo của Đảng và sức mạnh đấu tranh của công nhân, nông dân.",
    "Xô viết Nghệ Tĩnh là đỉnh cao của cao trào 1930–1931, thể hiện hình thức chính quyền cách mạng ở cơ sở.",
    "Luận cương chính trị tháng 10/1930 có ưu điểm về lập trường cách mạng nhưng còn hạn chế khi chưa đánh giá đầy đủ vấn đề dân tộc và lực lượng cách mạng rộng rãi.",
    "Sau đàn áp, Đảng phục hồi tổ chức qua hoạt động bí mật, nhà tù, huấn luyện cán bộ và xây dựng cơ sở quần chúng.",
    "Đại hội I năm 1935 đánh dấu sự phục hồi quan trọng về tổ chức, tạo tiền đề cho giai đoạn 1936–1939."
  ],
  "chuong-3": [
    "Giai đoạn 1936–1939 thể hiện sự linh hoạt của Đảng trong điều chỉnh sách lược đấu tranh.",
    "Nhiệm vụ trước mắt chuyển sang chống phát xít, chống chiến tranh, đòi tự do, dân chủ, cơm áo và hòa bình.",
    "Mặt trận Dân chủ Đông Dương giúp tập hợp lực lượng rộng rãi hơn trong điều kiện mới.",
    "Hình thức đấu tranh công khai, nửa công khai, hợp pháp, nửa hợp pháp giúp rèn luyện quần chúng và cán bộ.",
    "Bài học quan trọng là phải phân biệt mục tiêu chiến lược lâu dài với nhiệm vụ trước mắt."
  ],
  "chuong-4": [
    "Chiến tranh thế giới thứ hai làm tình hình Đông Dương thay đổi, khiến nhiệm vụ giải phóng dân tộc trở nên cấp bách.",
    "Hội nghị Trung ương 6 mở đầu chuyển hướng chiến lược từ đấu tranh dân chủ sang giải phóng dân tộc.",
    "Hội nghị Trung ương 8 hoàn chỉnh chuyển hướng chiến lược, đặt độc lập dân tộc lên hàng đầu.",
    "Nguyễn Ái Quốc có vai trò quan trọng trong việc xác định nhiệm vụ giải phóng dân tộc, thành lập Việt Minh và chuẩn bị khởi nghĩa vũ trang.",
    "Bài học lớn là phải xác định đúng mâu thuẫn chủ yếu và nhiệm vụ trung tâm trong từng hoàn cảnh lịch sử."
  ],
  "chuong-5": [
    "Mặt trận Việt Minh là hình thức tổ chức khối đại đoàn kết dân tộc để giành độc lập.",
    "Cao trào kháng Nhật cứu nước là bước chuẩn bị trực tiếp cho Tổng khởi nghĩa tháng Tám.",
    "Chỉ thị “Nhật – Pháp bắn nhau và hành động của chúng ta” thể hiện khả năng nhạy bén của Đảng trước biến động thời cuộc.",
    "Tổng khởi nghĩa tháng Tám thắng lợi nhờ đường lối đúng đắn, lực lượng được chuẩn bị và thời cơ được nắm bắt kịp thời.",
    "Bài học trọng tâm là độc lập dân tộc, đại đoàn kết, chuẩn bị lực lượng, nắm bắt thời cơ và vai trò lãnh đạo của Đảng."
  ]
};

const visualData = {
  "chuong-1": [
    {
      id: "vl-ch1-1",
      chapterId: "chuong-1",
      title: "Tiến trình thành lập Đảng",
      type: "timeline",
      description: "Từ khi Nguyễn Ái Quốc ra đi tìm đường cứu nước đến Hội nghị thành lập Đảng đầu năm 1930.",
      detailContent: "Timeline này giúp người học thấy quá trình hình thành đường lối cách mạng không diễn ra đột ngột mà là kết quả của nhiều bước chuẩn bị. Từ khủng hoảng đường lối cứu nước cuối thế kỷ XIX – đầu thế kỷ XX, Nguyễn Ái Quốc tiếp cận chủ nghĩa Mác – Lênin, truyền bá tư tưởng cách mạng vô sản, chuẩn bị tổ chức thông qua Hội Việt Nam Cách mạng Thanh niên, rồi tiến tới thống nhất các tổ chức cộng sản đầu năm 1930.",
      steps: [
        "1911: Ra đi tìm đường cứu nước",
        "1920: Đọc Sơ thảo Luận cương Lênin",
        "1925: Lập Hội VN Cách mạng Thanh niên",
        "1929: Sự ra đời 3 tổ chức cộng sản",
        "2/1930: Hội nghị thành lập Đảng"
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch1-2",
      chapterId: "chuong-1",
      title: "So sánh Cương lĩnh và Luận cương",
      type: "comparison",
      description: "So sánh hai văn kiện quan trọng của năm 1930.",
      detailContent: "Cương lĩnh chính trị đầu tiên đặt vấn đề độc lập dân tộc lên trung tâm và có sách lược tập hợp lực lượng rộng rãi. Luận cương tháng 10/1930 nhấn mạnh tính chất thổ địa và phản đế, đề cao vai trò công nông nhưng còn hạn chế trong đánh giá vấn đề dân tộc và các lực lượng yêu nước ngoài công nông. Đây là nội dung rất dễ xuất hiện trong bài kiểm tra.",
      comparisons: [
        { topic: "Nhiệm vụ", correct: "Cương lĩnh: Độc lập dân tộc", wrong: "Luận cương: Cách mạng ruộng đất" },
        { topic: "Lực lượng", correct: "Cương lĩnh: Công, nông, trí thức, tiểu tư sản...", wrong: "Luận cương: Chỉ công nhân và nông dân" }
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch1-3",
      chapterId: "chuong-1",
      title: "Nguyễn Ái Quốc năm 1920",
      type: "image",
      description: "Ảnh Nguyễn Ái Quốc tại Pháp, thời kỳ tìm thấy con đường cứu nước.",
      detailContent: "Bức ảnh Nguyễn Ái Quốc (sau này là Chủ tịch Hồ Chí Minh) tại Đại hội Tours (Pháp) năm 1920. Tại đây, Người đã bỏ phiếu tán thành gia nhập Quốc tế III (Quốc tế Cộng sản) và tham gia sáng lập Đảng Cộng sản Pháp.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ho_Chi_Minh_1921.jpg/800px-Ho_Chi_Minh_1921.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_1921.jpg",
      caption: "Nguyễn Ái Quốc tại Đại hội Tours, Pháp (1920)",
      credit: "Wikimedia Commons / Agence de presse Meurisse",
      licenseNote: "Public Domain",
      requiresVerification: false
    }
  ],
  "chuong-2": [
    {
      id: "vl-ch2-1",
      chapterId: "chuong-2",
      title: "Cao trào 1930–1931",
      type: "timeline",
      description: "Các bước phát triển từ bãi công, biểu tình đến Xô viết Nghệ Tĩnh.",
      detailContent: "Timeline cần thể hiện sự phát triển từ các cuộc đấu tranh của công nhân, nông dân đầu năm 1930, cao trào tháng 5/1930, đỉnh cao ở Nghệ An – Hà Tĩnh và sự đàn áp của thực dân Pháp. Qua đó người học hiểu Xô viết Nghệ Tĩnh vừa là kết quả của phong trào quần chúng vừa là bài học về tổ chức và tương quan lực lượng.",
      steps: [
        "2/1930: Bãi công Phú Riềng",
        "5/1930: Bùng nổ dịp Quốc tế Lao động",
        "9/1930: Đỉnh cao Xô viết Nghệ Tĩnh",
        "1931: Khủng bố trắng",
        "1932: Phong trào tạm lắng"
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch2-2",
      chapterId: "chuong-2",
      title: "Sơ đồ phục hồi tổ chức 1932–1935",
      type: "mindmap",
      description: "Sơ đồ quá trình phục hồi sau đàn áp.",
      detailContent: "Sơ đồ gồm các nhánh: hoạt động bí mật, chi bộ trong nhà tù, tuyên truyền – huấn luyện, Ban Chỉ huy ở ngoài và Đại hội I năm 1935. Nội dung giúp người học thấy cách Đảng khôi phục lực lượng để chuẩn bị cho phong trào dân chủ sau đó.",
      nodes: [
        "Phục hồi tổ chức",
        "Chi bộ nhà tù",
        "Hoạt động bí mật",
        "Ban chỉ huy ở ngoài",
        "Đại hội I (1935)"
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch2-3",
      chapterId: "chuong-2",
      title: "Nông dân biểu tình tại Nghệ An",
      type: "image",
      description: "Cuộc đấu tranh của quần chúng trong phong trào Xô viết Nghệ Tĩnh.",
      detailContent: "Phong trào Xô viết Nghệ Tĩnh là minh chứng lịch sử đầu tiên cho sức mạnh dời non lấp biển của liên minh công - nông Việt Nam dưới sự lãnh đạo của Đảng Cộng sản.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Demonstrations_of_peasants_in_Nghe_An_province.jpg/800px-Demonstrations_of_peasants_in_Nghe_An_province.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Demonstrations_of_peasants_in_Nghe_An_province.jpg",
      caption: "Nông dân biểu tình trong phong trào Xô viết Nghệ Tĩnh (1930)",
      credit: "Wikimedia Commons",
      licenseNote: "Public Domain",
      requiresVerification: false
    }
  ],
  "chuong-3": [
    {
      id: "vl-ch3-1",
      chapterId: "chuong-3",
      title: "Bối cảnh dân chủ 1936–1939",
      type: "timeline",
      description: "Từ nguy cơ phát xít đến phong trào dân chủ Đông Dương.",
      detailContent: "Timeline cần thể hiện mối liên hệ giữa nguy cơ phát xít, chủ trương của Quốc tế Cộng sản, Mặt trận Nhân dân Pháp thắng cử và sự điều chỉnh sách lược của Đảng ở Đông Dương. Trọng tâm là hiểu vì sao Đảng chuyển sang đấu tranh dân sinh, dân chủ, hòa bình.",
      steps: [
        "1933: Phát xít lên cầm quyền ở Đức",
        "7/1935: Đại hội VII Quốc tế Cộng sản",
        "1936: Mặt trận ND Pháp thắng cử",
        "7/1936: Đảng quyết định chuyển hướng",
        "1938: Lập Mặt trận Dân chủ Đông Dương"
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch3-2",
      chapterId: "chuong-3",
      title: "Chiến lược và sách lược",
      type: "comparison",
      description: "Phân biệt mục tiêu lâu dài và nhiệm vụ trước mắt.",
      detailContent: "Mục tiêu chiến lược của cách mạng không thay đổi, nhưng nhiệm vụ trước mắt trong giai đoạn 1936–1939 là chống phát xít, chống chiến tranh, chống phản động thuộc địa, đòi quyền dân sinh, dân chủ. Đây là ví dụ rõ về sự linh hoạt trong lãnh đạo.",
      comparisons: [
        { topic: "Mục tiêu chiến lược (Lâu dài)", correct: "Giành độc lập dân tộc & XHCN", wrong: "Chỉ đòi dân chủ" },
        { topic: "Nhiệm vụ sách lược (Trước mắt)", correct: "Đòi dân sinh, dân chủ, chống phát xít", wrong: "Đánh đổ đế quốc Pháp ngay lập tức" }
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch3-3",
      chapterId: "chuong-3",
      title: "Báo Dân Chúng (1938)",
      type: "image",
      description: "Báo Dân Chúng - Cơ quan ngôn luận của Trung ương Đảng Cộng sản Đông Dương.",
      detailContent: "Báo Dân Chúng ra mắt lần đầu ngày 22/7/1938 tại Sài Gòn, là tiếng nói đấu tranh công khai trực diện của Đảng Cộng sản nhằm vạch trần tội ác của thực dân, bảo vệ quyền lợi của giai cấp công nhân và nhân dân lao động.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/vi/thumb/9/91/Trang_nhat_bao_Dan_Chung.jpg/600px-Trang_nhat_bao_Dan_Chung.jpg",
      sourceUrl: "https://vi.wikipedia.org/wiki/T%E1%BA%ADp_tin:Trang_nhat_bao_Dan_Chung.jpg",
      caption: "Trang nhất Báo Dân Chúng xuất bản công khai năm 1938",
      credit: "Wikipedia",
      licenseNote: "Public Domain (Tài liệu lịch sử)",
      requiresVerification: false
    }
  ],
  "chuong-4": [
    {
      id: "vl-ch4-1",
      chapterId: "chuong-4",
      title: "Ba hội nghị chuyển hướng",
      type: "timeline",
      description: "Hội nghị Trung ương 6, 7, 8 trong quá trình chuyển hướng chiến lược.",
      detailContent: "Timeline cần thể hiện Hội nghị Trung ương 6 mở đầu chuyển hướng, Hội nghị Trung ương 7 tiếp tục bổ sung, và Hội nghị Trung ương 8 hoàn chỉnh đường lối giải phóng dân tộc. Đây là trục kiến thức quan trọng nhất của giai đoạn 1939–1941.",
      steps: [
        "9/1939: Chiến tranh TG II bùng nổ",
        "11/1939: Hội nghị TW 6 (Bắt đầu chuyển hướng)",
        "11/1940: Hội nghị TW 7 (Phát triển)",
        "5/1941: Hội nghị TW 8 (Hoàn chỉnh)"
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch4-2",
      chapterId: "chuong-4",
      title: "Sơ đồ Hội nghị Trung ương 8",
      type: "mindmap",
      description: "Độc lập dân tộc, Việt Minh, tạm gác ruộng đất, chuẩn bị khởi nghĩa.",
      detailContent: "Sơ đồ cần đặt Hội nghị Trung ương 8 ở trung tâm, nối với các nhánh: nhiệm vụ giải phóng dân tộc, thành lập Việt Minh, chuẩn bị khởi nghĩa vũ trang, vai trò Nguyễn Ái Quốc và ý nghĩa hoàn chỉnh chuyển hướng chiến lược.",
      nodes: [
        "Hội nghị TW 8 (5/1941)",
        "Giải phóng dân tộc là số 1",
        "Thành lập Mặt trận Việt Minh",
        "Tạm gác CM ruộng đất",
        "Chuẩn bị khởi nghĩa vũ trang"
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch4-3",
      chapterId: "chuong-4",
      title: "Hang Cốc Bó, Pác Bó",
      type: "image",
      description: "Nơi Nguyễn Ái Quốc làm việc khi về nước năm 1941.",
      detailContent: "Tháng 1/1941, lãnh tụ Nguyễn Ái Quốc về nước sau 30 năm bôn ba hải ngoại. Người đã chọn hang Cốc Bó (Pác Bó, Cao Bằng) làm nơi hoạt động bí mật, trực tiếp lãnh đạo cách mạng và chủ trì Hội nghị Trung ương 8 lịch sử.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Coc_Bo_cave.jpg/800px-Coc_Bo_cave.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Coc_Bo_cave.jpg",
      caption: "Hang Cốc Bó (Pác Bó, Cao Bằng) - Nguồn cội của Mặt trận Việt Minh",
      credit: "Wikimedia Commons / Nuntius",
      licenseNote: "CC BY-SA 4.0",
      requiresVerification: false
    }
  ],
  "chuong-5": [
    {
      id: "vl-ch5-1",
      chapterId: "chuong-5",
      title: "Từ kháng Nhật đến Tổng khởi nghĩa",
      type: "timeline",
      description: "Chuỗi sự kiện từ 9/3/1945 đến 2/9/1945.",
      detailContent: "Timeline cần thể hiện: Nhật đảo chính Pháp, Chỉ thị ngày 12/3/1945, cao trào kháng Nhật cứu nước, khởi nghĩa từng phần, Hội nghị toàn quốc của Đảng, Đại hội Quốc dân Tân Trào, Tổng khởi nghĩa và Tuyên ngôn Độc lập. Đây là chuỗi mốc phải nhớ để làm bài phân tích.",
      steps: [
        "9/3/1945: Nhật đảo chính Pháp",
        "12/3/1945: Chỉ thị Nhật - Pháp bắn nhau",
        "13-15/8/1945: Hội nghị toàn quốc Đảng",
        "16/8/1945: Đại hội Quốc dân Tân Trào",
        "19/8/1945: Khởi nghĩa tại Hà Nội",
        "2/9/1945: Tuyên ngôn Độc lập"
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch5-2",
      chapterId: "chuong-5",
      title: "Bài học Cách mạng Tháng Tám",
      type: "comparison",
      description: "Các bài học có thể vận dụng khi nhận xét đường lối 1930–1945.",
      detailContent: "Bảng cần hệ thống các bài học: xác định mục tiêu chiến lược, xây dựng đại đoàn kết dân tộc, chuẩn bị lực lượng lâu dài, kết hợp đấu tranh chính trị và vũ trang, nắm bắt thời cơ và giữ vai trò lãnh đạo thống nhất của Đảng.",
      comparisons: [
        { topic: "Xác định mục tiêu", correct: "Giải phóng dân tộc là trên hết", wrong: "Đấu tranh giai cấp chung chung" },
        { topic: "Tập hợp lực lượng", correct: "Đại đoàn kết qua Mặt trận Việt Minh", wrong: "Chỉ dựa vào công nhân" },
        { topic: "Chớp thời cơ", correct: "Nhật ngã gục, Đồng minh chưa vào", wrong: "Nổi dậy tự phát sớm hoặc quá muộn" }
      ],
      requiresVerification: false
    },
    {
      id: "vl-ch5-3",
      chapterId: "chuong-5",
      title: "Cuộc mít tinh tại Quảng trường Ba Đình",
      type: "image",
      description: "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập ngày 2/9/1945.",
      detailContent: "Sự kiện lịch sử trọng đại, chấm dứt hàng ngàn năm phong kiến và hơn 80 năm ách đô hộ của thực dân Pháp, khai sinh ra nước Việt Nam Dân chủ Cộng hòa - nhà nước công nông đầu tiên ở Đông Nam Á.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Ho_Chi_Minh_declares_independence_1945.jpg/800px-Ho_Chi_Minh_declares_independence_1945.jpg",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_declares_independence_1945.jpg",
      caption: "Biển người tại Quảng trường Ba Đình ngày 2/9/1945",
      credit: "Wikimedia Commons / Nguồn tài liệu lịch sử quốc gia",
      licenseNote: "Public Domain",
      requiresVerification: false
    }
  ]
};

lessons.forEach(lesson => {
  if (takeawaysData[lesson.chapterId]) {
    lesson.keyTakeaways = takeawaysData[lesson.chapterId];
  }
  if (visualData[lesson.chapterId]) {
    lesson.visualLearning = visualData[lesson.chapterId];
    
    // Fill the required metadata fields for our schema
    lesson.visualLearning.forEach(vl => {
      vl.purpose = vl.title;
      vl.learningValue = vl.detailContent;
      vl.keyTakeaways = []; // Optional
    });
  }
});

const output = `export const lessons = ${JSON.stringify(lessons, null, 2)};\n`;
fs.writeFileSync(lessonsPath, output, 'utf8');
console.log('Successfully updated lessons.js with key takeaways and visual objects');
