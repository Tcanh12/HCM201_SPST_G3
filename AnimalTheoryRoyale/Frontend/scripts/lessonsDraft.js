const lessonsDraft = [
  // ... Chapter 1 (will be preserved) ...
  {
    lessonId: "hcm-ch02-co-so-hinh-thanh",
    chapterId: "chuong-2",
    moduleId: "tu-tuong-ho-chi-minh",
    title: "Cơ sở hình thành và phát triển Tư tưởng Hồ Chí Minh",
    difficulty: "intermediate",
    durationMinutes: 20,
    order: 2,
    tags: ["Cơ sở hình thành", "Lịch sử", "Mác-Lênin"],
    conceptIds: ["co-so-hinh-thanh", "chu-nghia-mac-lenin", "truyen-thong-dan-toc", "nhan-to-chu-quan", "tinh-hoa-van-hoa-nhan-loai"],
    learningObjectives: [
      "Hiểu rõ 3 cơ sở khách quan hình thành Tư tưởng HCM.",
      "Phân tích vai trò quyết định của nhân tố chủ quan.",
      "Nắm được các giai đoạn phát triển của Tư tưởng HCM."
    ],
    whyThisMatters: "Hiểu được cơ sở hình thành giúp nhận thức rõ Tư tưởng HCM không phải là sản phẩm chủ quan, duy ý chí mà là sự kết tinh của lịch sử, văn hóa dân tộc, trí tuệ nhân loại và quy luật khách quan.",
    quickOverview: "Tư tưởng Hồ Chí Minh được hình thành dựa trên cơ sở thực tiễn (bối cảnh lịch sử dân tộc và thời đại), cơ sở lý luận (truyền thống văn hóa dân tộc, tinh hoa văn hóa nhân loại, chủ nghĩa Mác-Lênin) và nhân tố chủ quan (tài năng, phẩm chất của Người).",
    coreTheory: {
      beginner: "Tư tưởng Hồ Chí Minh bắt nguồn từ truyền thống yêu nước của dân tộc, tiếp thu văn hóa Đông - Tây, và đặc biệt là chủ nghĩa Mác - Lênin. Phẩm chất cá nhân xuất chúng của Bác đóng vai trò quyết định.",
      intermediate: "Cơ sở hình thành gồm 3 yếu tố khách quan: bối cảnh lịch sử, truyền thống dân tộc, tinh hoa nhân loại và chủ nghĩa Mác-Lênin. Trong đó, chủ nghĩa Mác-Lênin là cơ sở thế giới quan và phương pháp luận quyết định bản chất cách mạng, khoa học của Tư tưởng HCM.",
      advanced: "Sự chuyển biến từ chủ nghĩa yêu nước đến chủ nghĩa Mác-Lênin là bước ngoặt quyết định. Nhân tố chủ quan của Hồ Chí Minh (tư duy độc lập, sáng tạo, thực tiễn) đã giúp Người không sao chép giáo điều mà vận dụng sáng tạo Mác-Lênin vào thực tiễn Việt Nam."
    },
    conceptBreakdown: [
      {
        conceptId: "truyen-thong-dan-toc",
        definition: "Là những giá trị văn hóa, tinh thần tốt đẹp của dân tộc, cốt lõi là chủ nghĩa yêu nước.",
        explanation: "Chủ nghĩa yêu nước là động lực, là chuẩn mực đạo đức cao nhất. Nó thúc đẩy Hồ Chí Minh ra đi tìm đường cứu nước.",
        importance: "Là tiền đề tư tưởng, cơ sở xuất phát điểm của Tư tưởng HCM.",
        examples: "Tinh thần bất khuất chống ngoại xâm, truyền thống đoàn kết, tương thân tương ái.",
        applications: "Phát huy lòng yêu nước trong xây dựng và bảo vệ đất nước hiện nay.",
        commonMistakes: ["Cho rằng Tư tưởng HCM chỉ bắt nguồn từ chủ nghĩa Mác-Lênin mà bỏ qua truyền thống dân tộc."],
        memoryTips: "Yêu nước là cội nguồn."
      },
      {
        conceptId: "chu-nghia-mac-lenin",
        definition: "Hệ thống lý luận khoa học và cách mạng của giai cấp công nhân.",
        explanation: "Cung cấp thế giới quan duy vật biện chứng và phương pháp luận khoa học để Hồ Chí Minh giải quyết các vấn đề cách mạng VN.",
        importance: "Cơ sở lý luận quyết định bước ngoặt trong tư tưởng Hồ Chí Minh.",
        examples: "Vận dụng lý luận về đấu tranh giai cấp và cách mạng vô sản vào thực tiễn thuộc địa.",
        applications: "Áp dụng phương pháp luận Mác-Lênin để giải quyết các vấn đề đương đại.",
        commonMistakes: ["Đồng nhất hoàn toàn Tư tưởng HCM với chủ nghĩa Mác-Lênin (sao chép)."],
        memoryTips: "Mác-Lênin là kim chỉ nam."
      },
      {
        conceptId: "nhan-to-chu-quan",
        definition: "Phẩm chất, năng lực và hoạt động thực tiễn của chính Hồ Chí Minh.",
        explanation: "Khả năng tư duy độc lập, tự chủ, sáng tạo; sự khổ công học tập và rèn luyện; tâm hồn và ý chí vĩ đại.",
        importance: "Yếu tố quyết định để tiếp thu và vận dụng sáng tạo các điều kiện khách quan.",
        examples: "Quyết định ra đi tìm đường cứu nước bằng con đường lao động thực tiễn.",
        applications: "Tinh thần tự học, tự rèn luyện của thanh niên.",
        commonMistakes: ["Chỉ nhấn mạnh hoàn cảnh lịch sử mà bỏ qua vai trò cá nhân lãnh tụ."],
        memoryTips: "Khách quan là điều kiện, chủ quan là quyết định."
      }
    ],
    visualLearning: [
      {
        type: "Mindmap",
        title: "Cơ sở hình thành Tư tưởng HCM",
        center: "Cơ sở hình thành",
        branches: ["Cơ sở thực tiễn", "Cơ sở lý luận", "Nhân tố chủ quan"],
        purpose: "Sơ đồ hóa các nguồn gốc hình thành."
      },
      {
        type: "Diagram",
        title: "Cấu trúc cơ sở lý luận",
        components: ["Truyền thống dân tộc", "Tinh hoa nhân loại", "Chủ nghĩa Mác-Lênin"],
        purpose: "Phân biệt 3 nguồn gốc lý luận."
      },
      {
        type: "Flowchart",
        title: "Quá trình hình thành",
        flow: ["Trước 1911: Yêu nước", "1911-1920: Tìm đường", "1920-1930: Hình thành cơ bản", "1930-1945: Vượt qua thử thách", "1945-1969: Tiếp tục phát triển"],
        purpose: "Hệ thống hóa các giai đoạn lịch sử."
      }
    ],
    interactiveLearning: [
      {
        type: "Reflection",
        questions: [
          "Nếu không có chủ nghĩa Mác-Lênin, con đường cứu nước của Bác sẽ ra sao?",
          "Nhân tố chủ quan nào của Bác mà bạn thấy ấn tượng nhất?",
          "Bạn áp dụng tinh thần tự học của Bác như thế nào?"
        ]
      }
    ],
    knowledgeCheck: {
      easy: [
        "Có bao nhiêu cơ sở khách quan hình thành tư tưởng HCM?",
        "Truyền thống quý báu nhất của dân tộc Việt Nam là gì?",
        "Bác Hồ ra đi tìm đường cứu nước năm nào?"
      ],
      medium: [
        "Vì sao nói chủ nghĩa Mác-Lênin là cơ sở lý luận quan trọng nhất?",
        "Nhân tố chủ quan đóng vai trò gì?",
        "Sự khác biệt giữa việc tiếp thu văn hóa phương Đông và phương Tây của Bác?"
      ],
      hard: []
    },
    challengeSection: [
      {
        title: "Vận dụng nhân tố chủ quan",
        situation: "Hãy đề xuất một phương pháp học tập/làm việc dựa trên phẩm chất 'tư duy độc lập, sáng tạo' của Bác.",
        suggestedAnswer: "Không sao chép máy móc, luôn đặt câu hỏi 'tại sao', tìm cách giải quyết vấn đề phù hợp với điều kiện thực tế của bản thân."
      }
    ],
    keyTakeaways: [
      "Cơ sở hình thành bao gồm: Thực tiễn, Lý luận, Nhân tố chủ quan.",
      "Chủ nghĩa Mác-Lênin là nguồn gốc lý luận quyết định bản chất.",
      "Nhân tố chủ quan đóng vai trò quyết định trong việc vận dụng sáng tạo.",
      "Quá trình hình thành là một quá trình liên tục qua nhiều giai đoạn lịch sử."
    ],
    requiresVerification: true
  },
  {
    lessonId: "hcm-ch03-doc-lap-dan-toc",
    chapterId: "chuong-3",
    moduleId: "tu-tuong-ho-chi-minh",
    title: "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội",
    difficulty: "intermediate",
    durationMinutes: 25,
    order: 3,
    tags: ["Độc lập", "CNXH", "Mục tiêu"],
    conceptIds: ["doc-lap-dan-toc", "chu-nghia-xa-hoi", "doc-lap-dan-toc-gan-lien-cnxh"],
    learningObjectives: [
      "Hiểu rõ quan điểm của HCM về độc lập dân tộc.",
      "Nắm vững đặc trưng của CNXH theo Tư tưởng HCM.",
      "Phân tích mối quan hệ hữu cơ giữa Độc lập dân tộc và CNXH."
    ],
    whyThisMatters: "Đây là tư tưởng cốt lõi, xuyên suốt của cách mạng Việt Nam, là sợi chỉ đỏ chỉ đường cho mọi thắng lợi của Đảng và nhân dân ta.",
    quickOverview: "Độc lập dân tộc là mục tiêu trước mắt, là tiền đề; CNXH là mục tiêu lâu dài, là điều kiện bảo đảm cho độc lập dân tộc được vững chắc. Hai mục tiêu này gắn bó chặt chẽ, không thể tách rời.",
    coreTheory: {
      beginner: "Độc lập dân tộc phải hoàn toàn, triệt để. Nước độc lập mà dân không được hưởng tự do, hạnh phúc thì độc lập cũng không có ý nghĩa. Do đó, phải tiến lên CNXH để mang lại ấm no cho dân.",
      intermediate: "Cách mạng giải phóng dân tộc phải đi theo con đường cách mạng vô sản. Sau khi giành độc lập, phải tiến hành cách mạng XHCN. CNXH là một chế độ xã hội do nhân dân làm chủ, có nền kinh tế phát triển cao, văn hóa tiên tiến, con người được giải phóng.",
      advanced: "Tính tất yếu của sự gắn kết: Độc lập dân tộc tạo tiền đề chính trị, vật chất cho CNXH. Ngược lại, CNXH tạo cơ sở vững chắc để giữ vững độc lập. Đây là sự sáng tạo của HCM so với lý luận Mác-Lênin đương thời khi áp dụng vào một nước thuộc địa."
    },
    conceptBreakdown: [
      {
        conceptId: "doc-lap-dan-toc",
        definition: "Quyền thiêng liêng, bất khả xâm phạm của dân tộc.",
        explanation: "Độc lập phải gắn với tự do, hạnh phúc của nhân dân, gắn với hòa bình và toàn vẹn lãnh thổ.",
        importance: "Là khát vọng lớn nhất và mục tiêu đấu tranh trực tiếp của cách mạng giải phóng dân tộc.",
        examples: "Bản Tuyên ngôn Độc lập năm 1945.",
        applications: "Bảo vệ chủ quyền toàn vẹn lãnh thổ trong bối cảnh toàn cầu hóa.",
        commonMistakes: ["Cho rằng độc lập dân tộc chỉ là việc đuổi ngoại xâm mà quên đi quyền lợi của nhân dân."],
        memoryTips: "Độc lập = Không có ngoại xâm + Dân có tự do hạnh phúc."
      },
      {
        conceptId: "chu-nghia-xa-hoi",
        definition: "Chế độ xã hội ưu việt nhất, không còn bóc lột, do nhân dân làm chủ.",
        explanation: "Mục đích cao nhất của CNXH là nâng cao đời sống vật chất và tinh thần của nhân dân.",
        importance: "Là tương lai tươi sáng của dân tộc, bảo đảm cho độc lập bền vững.",
        examples: "Chính sách an sinh xã hội, giáo dục miễn phí, y tế toàn dân.",
        applications: "Phấn đấu xây dựng xã hội công bằng, dân chủ, văn minh.",
        commonMistakes: ["Đồng nhất CNXH với sự nghèo nợ, cào bằng."],
        memoryTips: "CNXH = Dân giàu, nước mạnh, dân chủ, công bằng, văn minh."
      },
      {
        conceptId: "doc-lap-dan-toc-gan-lien-cnxh",
        definition: "Mối quan hệ biện chứng, tất yếu giữa hai mục tiêu chiến lược.",
        explanation: "Giải phóng dân tộc là tiền đề. Xây dựng CNXH là để giữ vững độc lập.",
        importance: "Là sợi chỉ đỏ xuyên suốt đường lối của Đảng.",
        examples: "Kháng chiến chống Pháp, chống Mỹ song song với xây dựng miền Bắc XHCN.",
        applications: "Kiên định mục tiêu độc lập dân tộc và CNXH trong đổi mới.",
        commonMistakes: ["Tách rời hai mục tiêu này."],
        memoryTips: "Độc lập là tiền đề, CNXH là đích đến."
      }
    ],
    visualLearning: [
      {
        type: "Mindmap",
        title: "Sợi chỉ đỏ xuyên suốt",
        center: "Độc lập & CNXH",
        branches: ["Độc lập dân tộc", "Cách mạng vô sản", "Chủ nghĩa xã hội"],
        purpose: "Thể hiện mối quan hệ biện chứng."
      },
      {
        type: "Diagram",
        title: "Đặc trưng CNXH",
        components: ["Chính trị: Dân làm chủ", "Kinh tế: Phát triển cao", "Văn hóa: Tiên tiến", "Con người: Giải phóng"],
        purpose: "Liệt kê các đặc trưng cốt lõi."
      },
      {
        type: "Flowchart",
        title: "Tiến trình cách mạng",
        flow: ["Giải phóng dân tộc", "Giải phóng giai cấp", "Giải phóng con người", "Xây dựng CNXH"],
        purpose: "Thể hiện các bước phát triển logic."
      }
    ],
    interactiveLearning: [
      {
        type: "Reflection",
        questions: [
          "Tại sao nói 'Độc lập mà dân không hưởng hạnh phúc thì độc lập không có ý nghĩa'?",
          "Bạn hiểu thế nào là 'nhân dân làm chủ'?",
          "Mục tiêu xây dựng đất nước hiện nay của chúng ta là gì?"
        ]
      }
    ],
    knowledgeCheck: {
      easy: [
        "Mục tiêu trước mắt của cách mạng Việt Nam theo tư tưởng HCM là gì?",
        "Sợi chỉ đỏ xuyên suốt của cách mạng VN là gì?"
      ],
      medium: [
        "Giải thích vì sao cách mạng giải phóng dân tộc phải đi theo con đường cách mạng vô sản?",
        "Nêu đặc trưng nổi bật nhất của CNXH theo HCM."
      ],
      hard: []
    },
    challengeSection: [
      {
        title: "Phân tích tình huống",
        situation: "Có quan điểm cho rằng trong bối cảnh toàn cầu hóa, chỉ cần kinh tế phát triển, không cần quan tâm đến định hướng XHCN. Bạn nghĩ sao?",
        suggestedAnswer: "Phát triển kinh tế mà bỏ qua định hướng XHCN sẽ dẫn đến phân hóa giàu nghèo, bất công xã hội, mất đi bản chất tốt đẹp của chế độ, cuối cùng có thể đe dọa cả độc lập dân tộc."
      }
    ],
    keyTakeaways: [
      "Độc lập dân tộc phải gắn liền với tự do, hạnh phúc của nhân dân.",
      "Cách mạng giải phóng dân tộc phải theo quỹ đạo cách mạng vô sản.",
      "CNXH là xã hội do nhân dân làm chủ, mục tiêu cao nhất là giải phóng con người.",
      "Độc lập dân tộc và CNXH có mối quan hệ biện chứng, là sợi chỉ đỏ của cách mạng VN."
    ],
    requiresVerification: true
  },
  {
    lessonId: "hcm-ch04-dang-nha-nuoc",
    chapterId: "chuong-4",
    moduleId: "tu-tuong-ho-chi-minh",
    title: "Đảng Cộng sản và Nhà nước của dân",
    difficulty: "advanced",
    durationMinutes: 30,
    order: 4,
    tags: ["Đảng", "Nhà nước", "Quyền lực"],
    conceptIds: ["dang-cong-san-viet-nam", "xay-dung-dang", "nha-nuoc-cua-dan", "nha-nuoc-do-dan", "nha-nuoc-vi-dan", "can-bo"],
    learningObjectives: [
      "Hiểu bản chất và vai trò lãnh đạo của Đảng Cộng sản Việt Nam.",
      "Nắm được các nguyên tắc xây dựng Đảng.",
      "Phân tích bản chất của Nhà nước của dân, do dân, vì dân.",
      "Nhận thức đúng về vai trò, đạo đức của người cán bộ."
    ],
    whyThisMatters: "Đây là hệ thống tổ chức đảm bảo thực hiện mục tiêu cách mạng. Hiểu về Đảng và Nhà nước giúp công dân nhận thức rõ quyền lợi, nghĩa vụ và cách thức vận hành của hệ thống chính trị.",
    quickOverview: "Đảng Cộng sản VN là lực lượng lãnh đạo cách mạng, mang bản chất giai cấp công nhân và đại diện cho lợi ích dân tộc. Nhà nước Việt Nam là nhà nước pháp quyền XHCN của dân, do dân, vì dân. Cán bộ là công bộc của nhân dân.",
    coreTheory: {
      beginner: "Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ. Nhà nước của ta phục vụ lợi ích của nhân dân, không có đặc quyền đặc lợi.",
      intermediate: "Đảng ra đời là sự kết hợp: Chủ nghĩa Mác-Lênin + Phong trào công nhân + Phong trào yêu nước. Nhà nước thể hiện quyền lực của nhân dân (Của dân), do dân lập ra và đóng thuế (Do dân), phục vụ lợi ích của dân (Vì dân).",
      advanced: "Xây dựng Đảng là quy luật tồn tại và phát triển của Đảng. Phải thường xuyên chỉnh đốn Đảng. Về Nhà nước, phải kết hợp quản lý bằng pháp luật (pháp trị) với giáo dục đạo đức (đức trị). Cán bộ phải 'Cần, kiệm, liêm, chính', chống tham ô, lãng phí, quan liêu."
    },
    conceptBreakdown: [
      {
        conceptId: "dang-cong-san-viet-nam",
        definition: "Đội tiên phong của giai cấp công nhân, nhân dân lao động và toàn dân tộc.",
        explanation: "Đảng không có lợi ích nào khác ngoài lợi ích của dân tộc. Sự lãnh đạo của Đảng là nhân tố quyết định mọi thắng lợi.",
        importance: "Lực lượng tổ chức, lãnh đạo cách mạng.",
        examples: "Đảng đề ra đường lối đổi mới.",
        applications: "Tin tưởng vào sự lãnh đạo của Đảng, tham gia xây dựng Đảng.",
        commonMistakes: ["Cho rằng Đảng đứng trên nhân dân."],
        memoryTips: "Đảng là người đầy tớ thật trung thành của nhân dân."
      },
      {
        conceptId: "nha-nuoc-cua-dan",
        definition: "Mọi quyền lực nhà nước đều thuộc về nhân dân.",
        explanation: "Nhân dân có quyền bầu cử, ứng cử, kiểm soát, bãi miễn đại biểu nếu họ không xứng đáng.",
        importance: "Bản chất dân chủ của chế độ.",
        examples: "Bầu cử Quốc hội.",
        applications: "Thực hiện quyền và nghĩa vụ công dân.",
        commonMistakes: ["Cho rằng nhà nước là công cụ cai trị dân."],
        memoryTips: "Dân là chủ."
      },
      {
        conceptId: "can-bo",
        definition: "Những người làm việc trong bộ máy Đảng, Nhà nước, đoàn thể.",
        explanation: "Cán bộ là cái gốc của mọi công việc. Phải có đức và tài, tận tụy phục vụ nhân dân.",
        importance: "Khâu then chốt để đưa đường lối vào thực tiễn.",
        examples: "Cán bộ y tế chống dịch cứu dân.",
        applications: "Phấn đấu trở thành cán bộ tốt, người có ích cho xã hội.",
        commonMistakes: ["Coi cán bộ là 'quan cách mạng' hưởng đặc quyền."],
        memoryTips: "Cán bộ là công bộc."
      }
    ],
    visualLearning: [
      {
        type: "Mindmap",
        title: "Đảng và Nhà nước",
        center: "Hệ thống chính trị",
        branches: ["Đảng lãnh đạo", "Nhà nước quản lý", "Nhân dân làm chủ"],
        purpose: "Mối quan hệ 3 bên."
      },
      {
        type: "Diagram",
        title: "Bản chất Nhà nước",
        components: ["Của dân", "Do dân", "Vì dân"],
        purpose: "Giải thích 3 yếu tố bản chất."
      },
      {
        type: "Flowchart",
        title: "Sự ra đời của Đảng",
        flow: ["CN Mác-Lênin", "PT Công nhân", "PT Yêu nước", "Đảng CSVN (1930)"],
        purpose: "Sự kết hợp độc đáo của Hồ Chí Minh."
      }
    ],
    interactiveLearning: [
      {
        type: "Reflection",
        questions: [
          "Thế nào là 'Đảng viên đi trước, làng nước theo sau'?",
          "Theo bạn, điều gì làm nên sức mạnh của Nhà nước?",
          "Tại sao cần phải phòng chống tham nhũng, lãng phí?"
        ]
      }
    ],
    knowledgeCheck: {
      easy: [
        "Sự ra đời của Đảng Cộng sản Việt Nam là kết hợp của mấy yếu tố?",
        "Bản chất của nhà nước ta là gì?"
      ],
      medium: [
        "Giải thích khái niệm 'Nhà nước do dân'.",
        "Vì sao Bác nói 'Cán bộ là cái gốc của mọi công việc'?"
      ],
      hard: []
    },
    challengeSection: [
      {
        title: "Trách nhiệm công bộc",
        situation: "Có ý kiến cho rằng cán bộ có quyền lực nên được hưởng nhiều đặc quyền. Bạn sử dụng tư tưởng HCM để phản biện thế nào?",
        suggestedAnswer: "Theo HCM, quyền lực của cán bộ là do nhân dân ủy thác. Cán bộ là 'công bộc' (người phục vụ) của dân, chứ không phải 'quan cách mạng'. Do đó, họ phải tận tụy phục vụ, không được lạm quyền, đặc quyền đặc lợi."
      }
    ],
    keyTakeaways: [
      "Đảng CSVN là lực lượng lãnh đạo, ra đời từ sự kết hợp của 3 yếu tố.",
      "Xây dựng Đảng là nhiệm vụ thường xuyên, then chốt.",
      "Nhà nước VN là nhà nước của dân, do dân, vì dân.",
      "Cán bộ phải là người đầy tớ thật trung thành của nhân dân, có đủ đức và tài."
    ],
    requiresVerification: true
  },
  {
    lessonId: "hcm-ch05-dai-doan-ket",
    chapterId: "chuong-5",
    moduleId: "tu-tuong-ho-chi-minh",
    title: "Đại đoàn kết toàn dân tộc và Đoàn kết quốc tế",
    difficulty: "beginner",
    durationMinutes: 20,
    order: 5,
    tags: ["Đoàn kết", "Quốc tế", "Mặt trận"],
    conceptIds: ["dai-doan-ket", "luc-luong-dai-doan-ket", "mat-tran-dan-toc-thong-nhat", "doan-ket-quoc-te", "ket-hop-suc-manh-dan-toc-quoc-te"],
    learningObjectives: [
      "Trình bày quan điểm của HCM về vai trò của đại đoàn kết.",
      "Xác định lực lượng và hình thức tổ chức của đại đoàn kết.",
      "Hiểu sự cần thiết của đoàn kết quốc tế."
    ],
    whyThisMatters: "Trong bối cảnh hội nhập, việc phát huy sức mạnh khối đại đoàn kết toàn dân và kết hợp sức mạnh thời đại là chìa khóa để Việt Nam phát triển và bảo vệ tổ quốc.",
    quickOverview: "Đoàn kết là sức mạnh vô địch. Đại đoàn kết toàn dân tộc là một chiến lược lâu dài. Cần kết hợp sức mạnh dân tộc với sức mạnh thời đại (đoàn kết quốc tế) để giành thắng lợi.",
    coreTheory: {
      beginner: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công. Sức mạnh của nhiều người gộp lại sẽ làm được việc lớn.",
      intermediate: "Đại đoàn kết là chiến lược cơ bản của cách mạng. Lực lượng đoàn kết là toàn thể nhân dân Việt Nam, không phân biệt tôn giáo, dân tộc, giai cấp. Hình thức tổ chức là Mặt trận dân tộc thống nhất.",
      advanced: "Để đoàn kết thành công, phải có lòng khoan dung độ lượng, lấy lợi ích chung (độc lập, thống nhất, giàu mạnh) làm điểm tương đồng. Phải kết hợp sức mạnh dân tộc (nội lực) với sức mạnh thời đại (ngoại lực), trong đó nội lực là quyết định."
    },
    conceptBreakdown: [
      {
        conceptId: "dai-doan-ket",
        definition: "Sự tập hợp, liên kết chặt chẽ mọi lực lượng trong xã hội.",
        explanation: "Là nguyên nhân của mọi thắng lợi, là động lực chủ yếu của cách mạng.",
        importance: "Quyết định sự sống còn của dân tộc.",
        examples: "Mặt trận Việt Minh, tinh thần đoàn kết chống dịch Covid-19.",
        applications: "Xây dựng môi trường học tập, làm việc đoàn kết, hỗ trợ nhau.",
        commonMistakes: ["Đoàn kết chỉ là thủ đoạn chính trị tạm thời."],
        memoryTips: "Đoàn kết là sức mạnh."
      },
      {
        conceptId: "doan-ket-quoc-te",
        definition: "Tập hợp lực lượng tiến bộ thế giới ủng hộ Việt Nam.",
        explanation: "Cách mạng VN là một bộ phận của cách mạng thế giới. Cần tranh thủ sự đồng tình, ủng hộ của nhân dân yêu chuộng hòa bình.",
        importance: "Tạo thêm sức mạnh tổng hợp, đánh bại kẻ thù lớn mạnh.",
        examples: "Phong trào phản chiến ủng hộ VN trên thế giới.",
        applications: "Chính sách đối ngoại đa phương hóa, làm bạn với tất cả các nước.",
        commonMistakes: ["Trông chờ ỷ lại hoàn toàn vào quốc tế."],
        memoryTips: "Nội lực là chính, ngoại lực là quan trọng."
      }
    ],
    visualLearning: [
      {
        type: "Mindmap",
        title: "Đại đoàn kết",
        center: "Đoàn kết",
        branches: ["Toàn dân tộc", "Quốc tế", "Mặt trận", "Đảng lãnh đạo"],
        purpose: "Các yếu tố cấu thành khối đại đoàn kết."
      },
      {
        type: "Diagram",
        title: "Kết hợp sức mạnh",
        components: ["Sức mạnh Dân tộc (Nội lực)", "Sức mạnh Thời đại (Ngoại lực)", "Thắng lợi Cách mạng"],
        purpose: "Sự kết hợp tạo sức mạnh tổng hợp."
      },
      {
        type: "Flowchart",
        title: "Tổ chức Mặt trận",
        flow: ["Cá nhân/Tổ chức", "Mặt trận Tổ quốc", "Hiệp thương dân chủ", "Hành động thống nhất"],
        purpose: "Cách thức hoạt động của Mặt trận."
      }
    ],
    interactiveLearning: [
      {
        type: "Reflection",
        questions: [
          "Vì sao Bác Hồ lại nhấn mạnh chữ 'Đại' trong 'Đại đoàn kết'?",
          "Trong môi trường mạng xã hội hiện nay, làm sao để giữ gìn khối đại đoàn kết?",
          "Ví dụ về sức mạnh của sự kết hợp dân tộc và quốc tế hiện nay?"
        ]
      }
    ],
    knowledgeCheck: {
      easy: [
        "Điền vào chỗ trống: 'Đoàn kết, đoàn kết, ... / Thành công, thành công, ...'",
        "Hình thức tổ chức của khối đại đoàn kết là gì?"
      ],
      medium: [
        "Vì sao nói nội lực là yếu tố quyết định?",
        "Nguyên tắc cơ bản để xây dựng khối đại đoàn kết là gì?"
      ],
      hard: []
    },
    challengeSection: [
      {
        title: "Văn hóa ứng xử",
        situation: "Trên mạng xã hội có những cuộc tranh cãi gây chia rẽ vùng miền. Bạn áp dụng tư tưởng Đại đoàn kết để nhìn nhận vấn đề này ra sao?",
        suggestedAnswer: "Phân biệt vùng miền đi ngược lại tư tưởng đại đoàn kết của Bác ('Nước Việt Nam là một, dân tộc Việt Nam là một'). Cần tôn trọng sự đa dạng, lấy điểm chung là tình yêu quê hương đất nước để gắn kết, tránh bị lợi dụng kích động."
      }
    ],
    keyTakeaways: [
      "Đại đoàn kết là chiến lược cơ bản, lâu dài, là nguyên nhân của mọi thắng lợi.",
      "Lực lượng đại đoàn kết bao gồm mọi người Việt Nam yêu nước.",
      "Mặt trận dân tộc thống nhất là nơi quy tụ sức mạnh đại đoàn kết.",
      "Kết hợp sức mạnh dân tộc và sức mạnh thời đại tạo nên sức mạnh tổng hợp."
    ],
    requiresVerification: true
  },
  {
    lessonId: "hcm-ch06-van-hoa-dao-duc",
    chapterId: "chuong-6",
    moduleId: "tu-tuong-ho-chi-minh",
    title: "Văn hóa, Đạo đức và Con người",
    difficulty: "intermediate",
    durationMinutes: 25,
    order: 6,
    tags: ["Văn hóa", "Đạo đức", "Con người"],
    conceptIds: ["van-hoa", "ban-sac-dan-toc", "dao-duc-cach-mang", "can-kiem-liem-chinh", "noi-di-doi-voi-lam", "chong-chu-nghia-ca-nhan", "con-nguoi"],
    learningObjectives: [
      "Trình bày quan điểm của HCM về vai trò của văn hóa.",
      "Nắm vững các chuẩn mực đạo đức cách mạng.",
      "Hiểu rõ tầm quan trọng của việc xây dựng con người mới."
    ],
    whyThisMatters: "Đây là phần gần gũi nhất với sinh viên, cung cấp kim chỉ nam cho việc rèn luyện đạo đức, lối sống, trách nhiệm cá nhân trong xã hội.",
    quickOverview: "Văn hóa soi đường cho quốc dân đi. Đạo đức là cái gốc của người cách mạng. Con người vừa là mục tiêu, vừa là động lực của cách mạng. Xây dựng con người là nhiệm vụ chiến lược 'trồng người'.",
    coreTheory: {
      beginner: "Văn hóa rất quan trọng, nó định hướng xã hội. Người cách mạng phải có đạo đức, cụ thể là Cần, Kiệm, Liêm, Chính. Con người là trung tâm của mọi sự phát triển.",
      intermediate: "Văn hóa là nền tảng tinh thần, phải giữ bản sắc dân tộc và tiếp thu tinh hoa nhân loại. Đạo đức cách mạng không phải là đạo đức thủ cựu, mà là vì nước vì dân, chống chủ nghĩa cá nhân. Trồng người là chiến lược lâu dài.",
      advanced: "Hồ Chí Minh nhấn mạnh sự thống nhất giữa lời nói và việc làm. Đạo đức phải được rèn luyện bền bỉ suốt đời. Chủ nghĩa cá nhân là thứ vi trùng độc hại nhất sinh ra mọi căn bệnh. Xây dựng con người phải toàn diện: Đức, Trí, Thể, Mỹ."
    },
    conceptBreakdown: [
      {
        conceptId: "dao-duc-cach-mang",
        definition: "Phẩm chất tốt đẹp của người tham gia cách mạng.",
        explanation: "Là cái gốc, nền tảng. Có tài mà không có đức là vô dụng.",
        importance: "Giữ vững bản chất cách mạng, không bị cám dỗ.",
        examples: "Cán bộ từ chối nhận hối lộ.",
        applications: "Sinh viên trung thực trong thi cử, trung thực trong nghiên cứu.",
        commonMistakes: ["Đồng nhất đạo đức cách mạng với sự khổ hạnh."],
        memoryTips: "Đạo đức là gốc."
      },
      {
        conceptId: "can-kiem-liem-chinh",
        definition: "Bốn đức tính cơ bản của con người.",
        explanation: "Cần cù lao động, tiết kiệm, trong sạch, ngay thẳng.",
        importance: "Thước đo nhân cách.",
        examples: "Tiết kiệm điện nước, chi tiêu hợp lý.",
        applications: "Rèn luyện nếp sống sinh hoạt hằng ngày.",
        commonMistakes: ["Cho rằng chỉ cán bộ mới cần liêm chính."],
        memoryTips: "Giống như 4 mùa của trời, 4 phương của đất."
      },
      {
        conceptId: "chong-chu-nghia-ca-nhan",
        definition: "Đấu tranh loại bỏ thói hư tật xấu vì lợi ích riêng.",
        explanation: "Chủ nghĩa cá nhân là mẹ đẻ ra mọi thứ bệnh: tham ô, lãng phí, quan liêu, kiêu ngạo.",
        importance: "Bảo vệ sự trong sạch của tổ chức.",
        examples: "Tham nhũng, lạm quyền.",
        applications: "Đặt lợi ích tập thể lên trên lợi ích cá nhân.",
        commonMistakes: ["Đồng nhất chủ nghĩa cá nhân với lợi ích cá nhân chính đáng."],
        memoryTips: "Kẻ thù hung ác nhất."
      }
    ],
    visualLearning: [
      {
        type: "Mindmap",
        title: "Tứ đức",
        center: "Đạo đức cách mạng",
        branches: ["Cần", "Kiệm", "Liêm", "Chính"],
        purpose: "Ghi nhớ 4 chuẩn mực cơ bản."
      },
      {
        type: "Diagram",
        title: "Chiến lược trồng người",
        components: ["Đức (Gốc)", "Trí", "Thể", "Mỹ"],
        purpose: "Sự phát triển toàn diện của con người."
      },
      {
        type: "Flowchart",
        title: "Rèn luyện đạo đức",
        flow: ["Học tập", "Thực hành (Nói đi đôi với làm)", "Tự phê bình", "Rèn luyện suốt đời"],
        purpose: "Quy trình tu dưỡng bản thân."
      }
    ],
    interactiveLearning: [
      {
        type: "Reflection",
        questions: [
          "Thế nào là 'Có tài mà không có đức là người vô dụng'?",
          "Chủ nghĩa cá nhân biểu hiện thế nào trong môi trường học đường?",
          "Bạn đánh giá thế nào về sự lan truyền của 'tin giả' dưới góc độ văn hóa?"
        ]
      }
    ],
    knowledgeCheck: {
      easy: [
        "Điền vào chỗ trống: 'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải ...'",
        "Theo HCM, cái gì là 'gốc' của người cách mạng?"
      ],
      medium: [
        "Phân biệt chủ nghĩa cá nhân và lợi ích cá nhân chính đáng.",
        "Nguyên tắc quan trọng nhất trong thực hành đạo đức là gì?"
      ],
      hard: []
    },
    challengeSection: [
      {
        title: "Văn hóa không gian mạng",
        situation: "Trên mạng có người ẩn danh dùng lời lẽ nhục mạ người khác. Bạn liên hệ hiện tượng này với tư tưởng HCM về văn hóa và đạo đức như thế nào?",
        suggestedAnswer: "Hành vi nhục mạ người khác thiếu 'văn hóa' và 'đạo đức'. Hồ Chí Minh đề cao lòng nhân ái, khoan dung và tình yêu thương con người. Dù ở không gian mạng hay thực tế, vẫn cần tuân thủ các chuẩn mực đạo đức, ứng xử văn minh."
      }
    ],
    keyTakeaways: [
      "Văn hóa soi đường cho quốc dân đi, cần giữ bản sắc và tiếp thu tinh hoa nhân loại.",
      "Đạo đức cách mạng là gốc, cốt lõi là trung với nước, hiếu với dân, Cần, Kiệm, Liêm, Chính.",
      "Phải nói đi đôi với làm, rèn luyện đạo đức suốt đời.",
      "Con người là mục tiêu, động lực của cách mạng, phải được giáo dục toàn diện."
    ],
    requiresVerification: true
  }
];
