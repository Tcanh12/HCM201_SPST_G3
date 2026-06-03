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
      }
    ]
  },
  "chuong-2": {
    id: "chuong-2",
    chapterNumber: 2,
    title: "Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh",
    objective: "Sau chương này, người học cần hiểu tư tưởng Hồ Chí Minh được hình thành từ những cơ sở nào, phát triển qua những giai đoạn nào và có giá trị như thế nào đối với cách mạng Việt Nam.",
    sections: [
      {
        id: "co-so-khach-quan",
        title: "1. Cơ sở khách quan",
        type: "concept-card-with-diagram",
        content: "Tư tưởng Hồ Chí Minh hình thành trong bối cảnh lịch sử dân tộc và thời đại có nhiều biến động. Ở Việt Nam, đất nước bị thực dân xâm lược, các phong trào yêu nước cuối thế kỷ XIX và đầu thế kỷ XX gặp nhiều khó khăn, đặt ra yêu cầu phải tìm con đường cứu nước mới. Trên thế giới, sự phát triển của chủ nghĩa tư bản, phong trào công nhân, phong trào giải phóng dân tộc và ảnh hưởng của Cách mạng Tháng Mười Nga đã tạo nên những tiền đề quan trọng cho sự hình thành tư tưởng Hồ Chí Minh.",
        diagram: {
          title: "Yêu cầu lịch sử đặt ra: phải tìm một con đường cứu nước mới.",
          nodes: [
            { label: "Bối cảnh Việt Nam", icon: "Flag" },
            { label: "Bối cảnh thế giới", icon: "Globe" }
          ]
        }
      },
      {
        id: "co-so-ly-luan",
        title: "2. Cơ sở lý luận",
        type: "three-pillars",
        content: "Tư tưởng Hồ Chí Minh kế thừa truyền thống tốt đẹp của dân tộc Việt Nam, tiếp thu tinh hoa văn hóa nhân loại và đặc biệt lấy chủ nghĩa Mác – Lênin làm cơ sở thế giới quan, phương pháp luận khoa học.",
        pillars: [
          { title: "Truyền thống dân tộc", description: "Yêu nước, nhân nghĩa, đoàn kết, ý chí độc lập." },
          { title: "Tinh hoa văn hóa nhân loại", description: "Tiếp thu có chọn lọc giá trị tiến bộ phương Đông và phương Tây." },
          { title: "Chủ nghĩa Mác – Lênin", description: "Cơ sở lý luận quyết định, giúp tìm ra con đường giải phóng dân tộc đúng đắn." }
        ]
      },
      {
        id: "nhan-to-chu-quan",
        title: "3. Nhân tố chủ quan",
        type: "infographic-list",
        content: "Bên cạnh điều kiện khách quan, tư tưởng Hồ Chí Minh còn hình thành từ phẩm chất cá nhân của Người: lòng yêu nước, tư duy độc lập, khả năng tiếp thu cái mới, năng lực tổng kết thực tiễn và ý chí tìm con đường giải phóng dân tộc.",
        items: [
          { title: "Lòng yêu nước", description: "Động lực thúc đẩy ra đi tìm đường cứu nước." },
          { title: "Tư duy độc lập", description: "Không giáo điều, sáng tạo trong cách nhìn nhận." },
          { title: "Khả năng học hỏi", description: "Luôn trau dồi tri thức ở mọi hoàn cảnh." },
          { title: "Gắn lý luận với thực tiễn", description: "Luôn đối chiếu lý thuyết với đời sống thật." },
          { title: "Ý chí giải phóng dân tộc", description: "Quyết tâm không gì lay chuyển nổi." }
        ]
      },
      {
        id: "qua-trinh-hinh-thanh",
        title: "4. Quá trình hình thành và phát triển",
        type: "infographic-list",
        content: "Quá trình hình thành và phát triển tư tưởng Hồ Chí Minh trải qua nhiều giai đoạn gắn liền với lịch sử cách mạng Việt Nam.",
        items: [
          { title: "Giai đoạn 1", description: "Hình thành tư tưởng yêu nước và chí hướng cứu nước." },
          { title: "Giai đoạn 2", description: "Ra đi tìm đường cứu nước và khảo nghiệm thực tiễn thế giới." },
          { title: "Giai đoạn 3", description: "Tiếp cận chủ nghĩa Mác – Lênin, tìm thấy con đường cách mạng vô sản." },
          { title: "Giai đoạn 4", description: "Hình thành cơ bản tư tưởng về cách mạng Việt Nam." },
          { title: "Giai đoạn 5", description: "Phát triển và hoàn thiện tư tưởng trong thực tiễn lãnh đạo cách mạng." }
        ]
      },
      {
        id: "gia-tri-tu-tuong",
        title: "5. Giá trị tư tưởng Hồ Chí Minh",
        type: "concept-card-with-diagram",
        content: "Tư tưởng Hồ Chí Minh là tài sản tinh thần to lớn của Đảng và dân tộc Việt Nam, góp phần định hướng con đường cách mạng Việt Nam và tiếp tục có giá trị trong sự nghiệp xây dựng, bảo vệ Tổ quốc hiện nay.",
        diagram: {
          title: "Tài sản vô giá",
          nodes: [
            { label: "Định hướng cách mạng", icon: "Compass" },
            { label: "Xây dựng bảo vệ Tổ quốc", icon: "ShieldCheck" }
          ]
        }
      }
    ],
    summary: "Chương 2 giúp người học hiểu rằng tư tưởng Hồ Chí Minh không hình thành ngẫu nhiên, mà là kết quả của sự kết hợp giữa bối cảnh lịch sử, truyền thống dân tộc, tinh hoa văn hóa nhân loại, chủ nghĩa Mác – Lênin và phẩm chất cá nhân của Hồ Chí Minh.",
    quiz: [
      {
        question: "Những cơ sở nào góp phần hình thành tư tưởng Hồ Chí Minh?",
        options: [
          "Chỉ từ chủ nghĩa Mác - Lênin",
          "Bối cảnh lịch sử, truyền thống dân tộc, tinh hoa văn hóa nhân loại và phẩm chất cá nhân",
          "Chỉ từ tinh hoa văn hóa phương Tây",
          "Từ sự chỉ đạo trực tiếp của Quốc tế Cộng sản"
        ],
        correctIndex: 1
      },
      {
        question: "Vì sao chủ nghĩa Mác – Lênin giữ vai trò quan trọng trong sự hình thành tư tưởng Hồ Chí Minh?",
        options: [
          "Vì đó là trào lưu đang thịnh hành",
          "Cung cấp thế giới quan, phương pháp luận khoa học để giải phóng dân tộc đúng đắn",
          "Vì dễ áp dụng vào Việt Nam ngay lập tức",
          "Vì được Quốc tế Cộng sản bắt buộc"
        ],
        correctIndex: 1
      }
    ]
  },
  "chuong-3": {
    id: "chuong-3",
    chapterNumber: 3,
    title: "Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội",
    objective: "Sau chương này, người học cần hiểu tư tưởng Hồ Chí Minh về độc lập dân tộc, cách mạng giải phóng dân tộc, chủ nghĩa xã hội và mối quan hệ giữa độc lập dân tộc với chủ nghĩa xã hội.",
    sections: [
      {
        id: "tu-tuong-doc-lap",
        title: "1. Tư tưởng về độc lập dân tộc",
        type: "mindmap",
        content: "Trong tư tưởng Hồ Chí Minh, độc lập dân tộc là quyền thiêng liêng, bất khả xâm phạm của mỗi dân tộc. Độc lập không chỉ là thoát khỏi ách thống trị của ngoại bang, mà còn phải gắn với tự do, hạnh phúc và quyền làm chủ của nhân dân.",
        diagram: {
          center: "Độc lập dân tộc",
          branches: [
            "Độc lập lãnh thổ",
            "Tự do",
            "Hạnh phúc",
            "Nhân dân làm chủ"
          ]
        }
      },
      {
        id: "cach-mang-giai-phong",
        title: "2. Cách mạng giải phóng dân tộc",
        type: "three-pillars",
        content: "Cách mạng giải phóng dân tộc muốn thắng lợi phải đi theo con đường cách mạng vô sản, đặt dưới sự lãnh đạo của Đảng Cộng sản, dựa vào sức mạnh của toàn dân tộc và kết hợp sức mạnh dân tộc với sức mạnh thời đại.",
        pillars: [
          { title: "Lãnh đạo", description: "Đảng Cộng sản Việt Nam" },
          { title: "Lực lượng", description: "Toàn dân tộc" },
          { title: "Sức mạnh", description: "Dân tộc + Thời đại" }
        ]
      },
      {
        id: "tu-tuong-cnxh",
        title: "3. Tư tưởng về chủ nghĩa xã hội",
        type: "infographic-list",
        content: "Chủ nghĩa xã hội trong tư tưởng Hồ Chí Minh là xã hội hướng tới nhân dân làm chủ, kinh tế phát triển, đời sống nhân dân ấm no, tự do, hạnh phúc, xã hội công bằng, dân chủ, văn minh và con người được phát triển toàn diện.",
        items: [
          { title: "Nhân dân làm chủ", description: "Quyền lực tối cao thuộc về nhân dân." },
          { title: "Kinh tế phát triển", description: "Đời sống ấm no, thịnh vượng." },
          { title: "Công bằng xã hội", description: "Không còn bóc lột, bất công." },
          { title: "Văn hóa tiến bộ", description: "Giáo dục, y tế, đạo đức phát triển." }
        ]
      },
      {
        id: "doc-lap-gan-cnxh",
        title: "4. Độc lập dân tộc gắn liền với chủ nghĩa xã hội",
        type: "concept-card-with-diagram",
        content: "Theo tư tưởng Hồ Chí Minh, độc lập dân tộc là điều kiện tiên quyết để đi lên chủ nghĩa xã hội, còn chủ nghĩa xã hội là con đường bảo đảm cho độc lập dân tộc được bền vững, nhân dân có cuộc sống tự do, ấm no và hạnh phúc.",
        diagram: {
          title: "Gắn bó hữu cơ",
          nodes: [
            { label: "Độc lập dân tộc (Tiền đề)", icon: "Flag" },
            { label: "CNXH (Con đường bền vững)", icon: "Target" }
          ]
        }
      }
    ],
    summary: "Độc lập dân tộc gắn liền với chủ nghĩa xã hội là tư tưởng cốt lõi, xuyên suốt trong cách mạng Việt Nam, bảo đảm mục tiêu phát triển bền vững.",
    quiz: [
      {
        question: "Độc lập dân tộc trong tư tưởng Hồ Chí Minh được hiểu như thế nào?",
        options: [
          "Chỉ là độc lập về mặt lãnh thổ",
          "Độc lập gắn với tự do, hạnh phúc và quyền làm chủ của nhân dân",
          "Tách biệt hoàn toàn với thế giới",
          "Chỉ là thay đổi người cai trị"
        ],
        correctIndex: 1
      }
    ]
  },
  "chuong-4": {
    id: "chuong-4",
    chapterNumber: 4,
    title: "Tư tưởng Hồ Chí Minh về Đảng và Nhà nước",
    objective: "Hiểu vai trò của Đảng Cộng sản Việt Nam, yêu cầu xây dựng Đảng trong sạch vững mạnh và tư tưởng Hồ Chí Minh về Nhà nước của dân, do dân, vì dân.",
    sections: [
      {
        id: "tu-tuong-dang",
        title: "1. Tư tưởng về Đảng Cộng sản Việt Nam",
        type: "infographic-list",
        content: "Hồ Chí Minh khẳng định Đảng Cộng sản Việt Nam là nhân tố lãnh đạo quyết định thắng lợi của cách mạng. Đảng phải có nền tảng tư tưởng đúng đắn, đường lối phù hợp, gắn bó mật thiết với nhân dân.",
        items: [
          { title: "Nền tảng tư tưởng", description: "Chủ nghĩa Mác - Lênin" },
          { title: "Đường lối", description: "Phù hợp với thực tiễn cách mạng" },
          { title: "Gắn bó với nhân dân", description: "Đại biểu trung thành lợi ích của giai cấp và dân tộc" }
        ]
      },
      {
        id: "nha-nuoc-cua-dan",
        title: "2. Nhà nước của dân, do dân, vì dân",
        type: "three-pillars",
        content: "Nhà nước trong tư tưởng Hồ Chí Minh là Nhà nước của nhân dân, do nhân dân và vì nhân dân. Nhân dân là chủ thể quyền lực. Nhà nước phải phục vụ lợi ích của nhân dân.",
        pillars: [
          { title: "Của dân", description: "Quyền lực cao nhất thuộc về nhân dân" },
          { title: "Do dân", description: "Nhân dân bầu ra, kiểm soát và tham gia quản lý" },
          { title: "Vì dân", description: "Phục vụ lợi ích của nhân dân, không có đặc quyền đặc lợi" }
        ]
      },
      {
        id: "can-bo-dao-duc",
        title: "3. Cán bộ và đạo đức công vụ",
        type: "concept-card-with-diagram",
        content: "Trong tư tưởng Hồ Chí Minh, cán bộ là gốc của mọi công việc. Cán bộ phải có đạo đức, năng lực, trách nhiệm, gần dân, hiểu dân, trọng dân và phục vụ nhân dân.",
        diagram: {
          title: "Phẩm chất cán bộ",
          nodes: [
            { label: "Đạo đức trong sáng", icon: "Heart" },
            { label: "Năng lực chuyên môn", icon: "Brain" },
            { label: "Phục vụ nhân dân", icon: "Users" }
          ]
        }
      }
    ],
    summary: "Xây dựng Đảng trong sạch vững mạnh và Nhà nước pháp quyền XHCN là điều kiện sống còn của cách mạng Việt Nam.",
    quiz: [
      {
        question: "Nhà nước 'Của dân' được hiểu là?",
        options: [
          "Dân lo mọi chi phí cho Nhà nước",
          "Mọi quyền lực trong Nhà nước và trong xã hội đều thuộc về nhân dân",
          "Nhân dân trực tiếp làm quan",
          "Nhà nước cho phép dân làm gì cũng được"
        ],
        correctIndex: 1
      }
    ]
  },
  "chuong-5": {
    id: "chuong-5",
    chapterNumber: 5,
    title: "Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế",
    objective: "Hiểu vai trò của đại đoàn kết toàn dân tộc, lực lượng, hình thức tổ chức khối đại đoàn kết và ý nghĩa của đoàn kết quốc tế.",
    sections: [
      {
        id: "vai-tro-dai-doan-ket",
        title: "1. Vai trò của đại đoàn kết toàn dân tộc",
        type: "mindmap",
        content: "Đại đoàn kết toàn dân tộc là tư tưởng lớn, xuyên suốt. Đoàn kết tạo nên sức mạnh để giành độc lập, xây dựng đất nước và bảo vệ Tổ quốc.",
        diagram: {
          center: "Mục tiêu chung",
          branches: [
            "Giành độc lập",
            "Xây dựng đất nước",
            "Bảo vệ Tổ quốc",
            "Hội nhập quốc tế"
          ]
        }
      },
      {
        id: "luc-luong-dai-doan-ket",
        title: "2. Lực lượng đại đoàn kết",
        type: "concept-card-with-diagram",
        content: "Lực lượng là toàn thể nhân dân Việt Nam, bao gồm mọi giai cấp, tầng lớp, dân tộc, tôn giáo, người Việt Nam trong và ngoài nước, miễn là có lòng yêu nước.",
        diagram: {
          title: "Các lực lượng",
          nodes: [
            { label: "Công, Nông, Trí thức", icon: "Users" },
            { label: "Tôn giáo, Dân tộc", icon: "Globe" },
            { label: "Việt kiều", icon: "Target" }
          ]
        }
      },
      {
        id: "hinh-thuc-to-chuc",
        title: "3. Hình thức tổ chức khối đại đoàn kết",
        type: "infographic-list",
        content: "Mặt trận dân tộc thống nhất là hình thức tổ chức quan trọng để tập hợp, đoàn kết và phát huy sức mạnh của toàn dân tộc.",
        items: [
          { title: "Lợi ích chung", description: "Lấy lợi ích dân tộc làm điểm tương đồng" },
          { title: "Khoan dung", description: "Tôn trọng khác biệt, nhân ái" },
          { title: "Tin vào nhân dân", description: "Nhân dân là sức mạnh vô tận" }
        ]
      },
      {
        id: "doan-ket-quoc-te",
        title: "4. Đoàn kết quốc tế",
        type: "three-pillars",
        content: "Hồ Chí Minh coi trọng kết hợp sức mạnh dân tộc với sức mạnh thời đại. Gắn bó giữa cách mạng Việt Nam với phong trào hòa bình, tiến bộ thế giới.",
        pillars: [
          { title: "Phong trào giải phóng", description: "Đoàn kết với các dân tộc thuộc địa" },
          { title: "Phong trào vô sản", description: "Đoàn kết với giai cấp công nhân quốc tế" },
          { title: "Phong trào hòa bình", description: "Đoàn kết với các lực lượng tiến bộ" }
        ]
      }
    ],
    summary: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công.",
    quiz: [
      {
        question: "Lực lượng của khối đại đoàn kết toàn dân tộc gồm những ai?",
        options: [
          "Chỉ giai cấp công nhân",
          "Chỉ nông dân và trí thức",
          "Toàn thể nhân dân Việt Nam yêu nước",
          "Chỉ những người trong Đảng"
        ],
        correctIndex: 2
      }
    ]
  },
  "chuong-6": {
    id: "chuong-6",
    chapterNumber: 6,
    title: "Tư tưởng Hồ Chí Minh về văn hóa, đạo đức, con người",
    objective: "Hiểu tư tưởng Hồ Chí Minh về vai trò văn hóa, chuẩn mực đạo đức cách mạng, nguyên tắc xây dựng đạo đức mới và quan điểm về con người.",
    sections: [
      {
        id: "tu-tuong-van-hoa",
        title: "1. Tư tưởng về văn hóa",
        type: "mindmap",
        content: "Văn hóa tham gia vào sự nghiệp xây dựng con người, bồi dưỡng tinh thần, đạo đức, lối sống và góp phần phát triển xã hội. Văn hóa là một mặt trận, người hoạt động văn hóa là chiến sĩ.",
        diagram: {
          center: "Văn hóa",
          branches: [
            "Giáo dục",
            "Đạo đức",
            "Lối sống",
            "Nghệ thuật"
          ]
        }
      },
      {
        id: "dao-duc-cach-mang",
        title: "2. Đạo đức cách mạng",
        type: "infographic-list",
        content: "Đạo đức cách mạng là nền tảng của người cách mạng. Hồ Chí Minh nhấn mạnh các phẩm chất cốt lõi.",
        items: [
          { title: "Cần", description: "Siêng năng, chăm chỉ, có kế hoạch." },
          { title: "Kiệm", description: "Tiết kiệm thời gian, tiền của, không lãng phí." },
          { title: "Liêm", description: "Trong sạch, không tham lam." },
          { title: "Chính", description: "Ngay thẳng, đúng đắn, công tâm." },
          { title: "Chí công vô tư", description: "Đặt lợi ích chung lên trên cá nhân." }
        ]
      },
      {
        id: "nguyen-tac-xay-dung-dao-duc",
        title: "3. Nguyên tắc xây dựng đạo đức mới",
        type: "three-pillars",
        content: "Xây dựng đạo đức mới cần nguyên tắc thực hành cụ thể, không chỉ là lý thuyết suông.",
        pillars: [
          { title: "Nói đi đôi với làm", description: "Hành động thực tế minh chứng cho lời nói." },
          { title: "Xây đi đôi với chống", description: "Xây dựng cái tốt, diệt trừ cái xấu." },
          { title: "Nêu gương", description: "Cán bộ đi trước, làng nước theo sau." }
        ]
      },
      {
        id: "tu-tuong-con-nguoi",
        title: "4. Tư tưởng về con người",
        type: "concept-card-with-diagram",
        content: "Con người là mục tiêu và động lực của cách mạng. Xây dựng con người mới là nhiệm vụ quan trọng hàng đầu.",
        diagram: {
          title: "Phát triển toàn diện",
          nodes: [
            { label: "Đức", icon: "Heart" },
            { label: "Trí", icon: "Brain" },
            { label: "Thể", icon: "Target" }
          ]
        }
      }
    ],
    summary: "Xây dựng con người mới, có đạo đức cách mạng, có trình độ văn hóa là nền tảng cốt lõi để xây dựng CNXH.",
    quiz: [
      {
        question: "Cần, kiệm, liêm, chính có ý nghĩa gì trong tư tưởng Hồ Chí Minh?",
        options: [
          "Là các đức tính chỉ dành cho người giàu",
          "Là chuẩn mực đạo đức cốt lõi của người cách mạng",
          "Là nguyên tắc làm giàu nhanh chóng",
          "Là quy định của luật pháp quốc tế"
        ],
        correctIndex: 1
      }
    ]
  }
};
