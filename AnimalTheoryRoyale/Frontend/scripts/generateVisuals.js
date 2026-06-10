import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const dataPath = path.join(__dirname, '../src/data/lessons.js');
  const { lessons } = await import(pathToFileURL(dataPath).href);

  const visualsMap = {
    'chuong-1': [
      {
        id: "v-c1-1",
        chapterId: "chuong-1",
        type: "mindmap",
        title: "Tư tưởng Hồ Chí Minh là gì?",
        subtitle: "Hệ thống quan điểm toàn diện và sâu sắc",
        purpose: "Giúp sinh viên hiểu cấu trúc khái niệm Tư tưởng Hồ Chí Minh, không phải một câu định nghĩa rời rạc.",
        learningValue: "Sau khi xem sơ đồ, sinh viên có thể phân biệt Tư tưởng Hồ Chí Minh với tiểu sử, khẩu hiệu hoặc các câu nói rời rạc.",
        nodes: ["Hệ thống quan điểm", "Cách mạng Việt Nam", "Chủ nghĩa Mác – Lênin", "Truyền thống dân tộc", "Tinh hoa nhân loại"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Tư tưởng Hồ Chí Minh cần được học như một hệ thống, không học rời rạc từng câu."],
        commonMistakes: ["Chỉ nhớ các câu nói nổi tiếng mà không hiểu tư duy hệ thống."],
        reflectionQuestions: ["Bạn áp dụng tư duy hệ thống này vào học tập như thế nào?"],
        relatedConceptIds: ["khai-niem-tu-tuong-ho-chi-minh", "chu-nghia-mac-lenin", "truyen-thong-dan-toc"],
        requiresVerification: false
      },
      {
        id: "v-c1-2",
        chapterId: "chuong-1",
        type: "flowchart",
        title: "Cách học luận điểm Tư tưởng Hồ Chí Minh",
        subtitle: "Tránh học thuộc vẹt",
        purpose: "Giúp sinh viên biết cách tiếp cận một bài học về tư tưởng Hồ Chí Minh.",
        learningValue: "Cung cấp phương pháp luận chuẩn xác để không bị lạc lối trong lượng kiến thức lớn.",
        nodes: [],
        steps: ["Đọc khái niệm", "Xác định bối cảnh lịch sử", "Tìm cơ sở lý luận", "Liên hệ thực tiễn CMVN", "Vận dụng vào đời sống hiện nay"],
        comparisons: [],
        keyTakeaways: ["Không tách rời luận điểm với hoàn cảnh ra đời của nó."],
        commonMistakes: ["Học vẹt thuộc lòng mà không hiểu bối cảnh."],
        reflectionQuestions: ["Tại sao phải đặt tư tưởng Bác vào hoàn cảnh lịch sử?"],
        relatedConceptIds: ["phuong-phap-nghien-cuu", "quan-diem-lich-su-cu-the"],
        requiresVerification: false
      },
      {
        id: "v-c1-3",
        chapterId: "chuong-1",
        type: "comparison",
        title: "Học đúng và Học sai",
        subtitle: "Phân biệt tư duy máy móc và tư duy hệ thống",
        purpose: "Chỉ ra sai lầm phổ biến khi tiếp cận môn học.",
        learningValue: "Giúp sinh viên điều chỉnh thái độ học tập ngay từ đầu.",
        nodes: [],
        steps: [],
        comparisons: [
          { topic: "Phương pháp", wrong: "Học thuộc câu chữ", correct: "Hiểu bản chất và quan hệ" },
          { topic: "Hoàn cảnh", wrong: "Tách khỏi bối cảnh", correct: "Đặt vào hoàn cảnh lịch sử cụ thể" },
          { topic: "Mục đích", wrong: "Chỉ học để thi", correct: "Học để rèn tư duy và trách nhiệm" },
          { topic: "Kiến thức", wrong: "Nhớ khái niệm rời rạc", correct: "Kết nối khái niệm thành hệ thống" }
        ],
        keyTakeaways: ["Mục đích cuối cùng là hình thành tư duy và thái độ đúng đắn."],
        commonMistakes: ["Nghĩ môn lý thuyết chính trị chỉ là môn học thuộc lòng."],
        reflectionQuestions: ["Bạn đã mắc phải lỗi nào trong số các lỗi hiểu sai trên?"],
        relatedConceptIds: ["y-nghia-hoc-tap"],
        requiresVerification: false
      }
    ],
    'chuong-2': [
      {
        id: "v-c2-1",
        chapterId: "chuong-2",
        type: "relationship",
        title: "Vì sao cần tìm con đường cứu nước mới?",
        subtitle: "Sự bế tắc của các phong trào yêu nước cuối thế kỷ XIX",
        purpose: "Hiểu được bối cảnh lịch sử ép buộc phải có một sự chuyển hướng cách mạng.",
        learningValue: "Sinh viên nhận thức được việc ra đi tìm đường cứu nước của Bác là sự đáp ứng đòi hỏi khách quan của lịch sử.",
        nodes: ["Việt Nam bị thực dân Pháp xâm lược", "Phong trào cũ thất bại", "Yêu cầu tìm đường cứu nước mới", "Nguyễn Tất Thành ra đi", "Tiếp cận Chủ nghĩa Mác-Lênin"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Không có sự khủng hoảng đường lối thì không có sự ra đi tìm đường cứu nước."],
        commonMistakes: ["Cho rằng Bác ra đi tìm đường cứu nước chỉ vì tò mò về phương Tây."],
        reflectionQuestions: ["Điều gì khiến con đường của Nguyễn Tất Thành khác biệt so với các bậc tiền bối?"],
        relatedConceptIds: ["boi-canh-dan-toc", "boi-canh-thoi-dai"],
        requiresVerification: false
      },
      {
        id: "v-c2-2",
        chapterId: "chuong-2",
        type: "mindmap",
        title: "4 Nguồn gốc hình thành Tư tưởng Hồ Chí Minh",
        subtitle: "Sự hội tụ tinh hoa dân tộc và thời đại",
        purpose: "Làm rõ các yếu tố cấu thành nên hệ tư tưởng Hồ Chí Minh.",
        learningValue: "Hiểu rằng Tư tưởng Hồ Chí Minh không tự nhiên sinh ra, mà là một sự kết hợp khoa học.",
        nodes: ["Truyền thống tốt đẹp của dân tộc VN", "Tinh hoa văn hóa nhân loại", "Chủ nghĩa Mác – Lênin", "Nhân tố chủ quan Hồ Chí Minh"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Chủ nghĩa Mác - Lênin là cơ sở lý luận quyết định nhất.", "Nhân tố chủ quan là điều kiện hiện thực hóa."],
        commonMistakes: ["Quên mất nhân tố chủ quan, chỉ coi trọng hoàn cảnh khách quan."],
        reflectionQuestions: ["Trong 4 nguồn gốc, nguồn gốc nào là quan trọng nhất đối với bạn?"],
        relatedConceptIds: ["truyen-thong-dan-toc", "chu-nghia-mac-lenin", "nhan-to-chu-quan", "tinh-hoa-van-hoa-nhan-loai"],
        requiresVerification: false
      },
      {
        id: "v-c2-3",
        chapterId: "chuong-2",
        type: "timeline",
        title: "Quá trình hình thành và phát triển",
        subtitle: "Các mốc lịch sử quan trọng trong cuộc đời cách mạng",
        purpose: "Tóm tắt các giai đoạn hình thành tư tưởng của Bác.",
        learningValue: "Nắm được sự vận động và phát triển không ngừng của Tư tưởng Hồ Chí Minh.",
        nodes: [],
        steps: [
          "Trước 1911: Hình thành lòng yêu nước",
          "1911: Ra đi tìm đường cứu nước",
          "1920: Tiếp cận chủ nghĩa Mác - Lênin",
          "1930: Thành lập Đảng Cộng sản",
          "1945: Khai sinh nước Việt Nam DCCH",
          "1969: Di chúc Hồ Chí Minh"
        ],
        comparisons: [],
        keyTakeaways: ["Tư tưởng Hồ Chí Minh liên tục phát triển qua các thời kỳ cách mạng."],
        commonMistakes: ["Nghĩ rằng Tư tưởng Hồ Chí Minh hoàn thiện ngay từ năm 1911."],
        reflectionQuestions: ["Bước ngoặt quan trọng nhất trong hành trình của Bác là gì?"],
        relatedConceptIds: ["qua-trinh-hinh-thanh-phat-trien"],
        requiresVerification: false
      }
    ],
    'chuong-3': [
      {
        id: "v-c3-1",
        chapterId: "chuong-3",
        type: "relationship",
        title: "Độc lập dân tộc gắn liền với Chủ nghĩa xã hội",
        subtitle: "Sợi chỉ đỏ xuyên suốt của cách mạng Việt Nam",
        purpose: "Hiểu mối quan hệ biện chứng giữa độc lập dân tộc và CNXH.",
        learningValue: "Thấy được lý do vì sao Việt Nam không đi theo con đường tư bản chủ nghĩa.",
        nodes: ["Độc lập dân tộc là tiền đề", "CNXH là con đường bảo đảm độc lập", "Độc lập phải gắn với tự do hạnh phúc"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Mất độc lập thì không có CNXH, không có CNXH thì độc lập không vững chắc."],
        commonMistakes: ["Cho rằng chỉ cần giành được độc lập là hoàn thành nhiệm vụ cách mạng."],
        reflectionQuestions: ["Tại sao Bác nói độc lập mà dân không có tự do hạnh phúc thì độc lập không có ý nghĩa?"],
        relatedConceptIds: ["doc-lap-dan-toc", "chu-nghia-xa-hoi", "doc-lap-dan-toc-gan-lien-cnxh"],
        requiresVerification: false
      },
      {
        id: "v-c3-2",
        chapterId: "chuong-3",
        type: "flowchart",
        title: "Logic cách mạng giải phóng dân tộc",
        subtitle: "Các bước thực hiện thắng lợi mục tiêu giải phóng",
        purpose: "Vạch ra quy trình cách mạng theo hệ tư tưởng Hồ Chí Minh.",
        learningValue: "Hiểu tính logic và tính quy luật của lịch sử cách mạng Việt Nam.",
        nodes: [],
        steps: ["Dân tộc bị áp bức", "Nhiệm vụ giải phóng đặt lên hàng đầu", "Tập hợp lực lượng toàn dân", "Đảng lãnh đạo đúng đắn", "Giành độc lập", "Xây dựng xã hội mới"],
        comparisons: [],
        keyTakeaways: ["Cách mạng giải phóng dân tộc phải do Đảng Cộng sản lãnh đạo và là sự nghiệp của toàn dân."],
        commonMistakes: ["Nghĩ rằng cách mạng chỉ là việc của tầng lớp tinh hoa."],
        reflectionQuestions: ["Vai trò của toàn dân trong cách mạng giải phóng dân tộc là gì?"],
        relatedConceptIds: ["cach-mang-giai-phong-dan-toc"],
        requiresVerification: false
      },
      {
        id: "v-c3-3",
        chapterId: "chuong-3",
        type: "comparison",
        title: "Độc lập hình thức và Độc lập thực chất",
        subtitle: "Nhận diện giá trị cốt lõi của độc lập dân tộc",
        purpose: "Phân biệt khái niệm độc lập theo tư tưởng Hồ Chí Minh với tư duy cũ.",
        learningValue: "Nhận thức rõ giá trị thực sự của độc lập dân tộc là phải đem lại quyền làm chủ cho nhân dân.",
        nodes: [],
        steps: [],
        comparisons: [
          { topic: "Chủ quyền", wrong: "Chỉ có trên danh nghĩa (puppet state)", correct: "Hoàn toàn và thật sự" },
          { topic: "Đời sống nhân dân", wrong: "Không được quan tâm", correct: "Nhân dân có tự do, hạnh phúc" },
          { topic: "Phát triển", wrong: "Dễ phụ thuộc trở lại", correct: "Phát triển bền vững, tự chủ" }
        ],
        keyTakeaways: ["Độc lập thực chất phải gắn chặt với lợi ích sinh tồn và phát triển của nhân dân."],
        commonMistakes: ["Hiểu độc lập đơn thuần là không có ngoại xâm."],
        reflectionQuestions: ["Trách nhiệm của công dân trong việc bảo vệ độc lập thực chất là gì?"],
        relatedConceptIds: ["doc-lap-dan-toc"],
        requiresVerification: false
      }
    ],
    'chuong-4': [
      {
        id: "v-c4-1",
        chapterId: "chuong-4",
        type: "relationship",
        title: "Đảng, Nhà nước và Nhân dân",
        subtitle: "Cơ chế vận hành của hệ thống chính trị Việt Nam",
        purpose: "Hiểu vai trò và chức năng của từng chủ thể trong xã hội.",
        learningValue: "Sinh viên không bị nhầm lẫn giữa chức năng lãnh đạo của Đảng và chức năng quản lý của Nhà nước.",
        nodes: ["Đảng lãnh đạo", "Nhà nước quản lý", "Nhân dân làm chủ", "Cán bộ là công bộc"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Quyền lực nhà nước thuộc về nhân dân, cán bộ là người phục vụ nhân dân."],
        commonMistakes: ["Nhầm lẫn rằng cán bộ là 'quan cách mạng' đứng trên nhân dân."],
        reflectionQuestions: ["Khi nào cán bộ thoái hóa biến chất và làm hỏng mối quan hệ này?"],
        relatedConceptIds: ["dang-cong-san-viet-nam", "nha-nuoc-cua-dan", "can-bo"],
        requiresVerification: false
      },
      {
        id: "v-c4-2",
        chapterId: "chuong-4",
        type: "diagram",
        title: "Nhà nước Của dân, Do dân, Vì dân",
        subtitle: "Bản chất của nhà nước pháp quyền XHCN",
        purpose: "Phân tách rõ ba đặc tính cơ bản của Nhà nước kiểu mới.",
        learningValue: "Hiểu được nền tảng dân chủ sâu sắc trong tư tưởng Hồ Chí Minh về xây dựng nhà nước.",
        nodes: ["Của dân: Quyền lực tối cao thuộc về nhân dân", "Do dân: Dân tham gia xây dựng và kiểm soát", "Vì dân: Mọi hoạt động phục vụ lợi ích của dân"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Nhà nước không có lợi ích nào khác ngoài lợi ích của nhân dân."],
        commonMistakes: ["Cho rằng 'do dân' chỉ là việc dân đóng thuế."],
        reflectionQuestions: ["Làm thế nào để phát huy thực chất quyền 'do dân' trong thực tế?"],
        relatedConceptIds: ["nha-nuoc-do-dan", "nha-nuoc-vi-dan"],
        requiresVerification: false
      },
      {
        id: "v-c4-3",
        chapterId: "chuong-4",
        type: "flowchart",
        title: "Một cán bộ đúng tinh thần phục vụ",
        subtitle: "Quy trình làm việc chuẩn của người công bộc",
        purpose: "Rèn luyện phẩm chất và thái độ làm việc công.",
        learningValue: "Hình dung rõ ràng thế nào là một cán bộ 'vừa hồng vừa chuyên'.",
        nodes: [],
        steps: ["Gần dân", "Hiểu dân", "Tôn trọng dân", "Giải quyết minh bạch", "Chịu trách nhiệm trước dân"],
        comparisons: [],
        keyTakeaways: ["Cán bộ không gần dân là cán bộ quan liêu."],
        commonMistakes: ["Cho rằng chỉ cần giỏi chuyên môn là đủ để làm cán bộ."],
        reflectionQuestions: ["Bạn sẽ rèn luyện những đức tính này thế nào trong môi trường sinh viên?"],
        relatedConceptIds: ["can-bo", "dao-duc-cong-vu"],
        requiresVerification: false
      }
    ],
    'chuong-5': [
      {
        id: "v-c5-1",
        chapterId: "chuong-5",
        type: "mindmap",
        title: "Đại đoàn kết toàn dân tộc",
        subtitle: "Chiến lược sống còn của cách mạng Việt Nam",
        purpose: "Cung cấp cái nhìn toàn diện về sức mạnh của khối đại đoàn kết.",
        learningValue: "Nhận thức được ý nghĩa của câu nói 'Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công'.",
        nodes: ["Nền tảng sức mạnh dân tộc", "Tập hợp mọi lực lượng", "Lấy lợi ích chung làm điểm tựa", "Tôn trọng sự khác biệt", "Hướng tới độc lập, phát triển"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Đại đoàn kết không phải là sách lược nhất thời mà là chiến lược cốt lõi."],
        commonMistakes: ["Đại đoàn kết là phải xóa bỏ mọi sự khác biệt cá nhân."],
        reflectionQuestions: ["Vì sao cần phải tôn trọng điểm khác biệt trong khi xây dựng khối đại đoàn kết?"],
        relatedConceptIds: ["dai-doan-ket", "luc-luong-dai-doan-ket"],
        requiresVerification: false
      },
      {
        id: "v-c5-2",
        chapterId: "chuong-5",
        type: "diagram",
        title: "Mặt trận dân tộc thống nhất",
        subtitle: "Nơi quy tụ lòng yêu nước",
        purpose: "Hiểu cơ chế tổ chức thực hiện đại đoàn kết.",
        learningValue: "Phân biệt được chủ trương đoàn kết và tổ chức thực hiện đoàn kết.",
        nodes: ["Là hình thức tổ chức của khối đại đoàn kết", "Tập hợp mọi giai cấp, tôn giáo", "Hoạt động dựa trên hiệp thương dân chủ", "Gắn đoàn kết với hành động thực tiễn"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Đảng Cộng sản vừa là người lãnh đạo, vừa là một thành viên của Mặt trận."],
        commonMistakes: ["Cho rằng Mặt trận chỉ là tổ chức hình thức, không có thực quyền."],
        reflectionQuestions: ["Vai trò giám sát, phản biện xã hội của Mặt trận hiện nay là gì?"],
        relatedConceptIds: ["mat-tran-dan-toc-thong-nhat"],
        requiresVerification: false
      },
      {
        id: "v-c5-3",
        chapterId: "chuong-5",
        type: "relationship",
        title: "Đoàn kết dân tộc và Đoàn kết quốc tế",
        subtitle: "Kết hợp sức mạnh dân tộc và thời đại",
        purpose: "Làm rõ mối liên hệ hữu cơ giữa cách mạng Việt Nam và thế giới.",
        learningValue: "Hiểu được nghệ thuật ngoại giao của Hồ Chí Minh: làm bạn với mọi quốc gia yêu chuộng hòa bình.",
        nodes: ["Sức mạnh dân tộc là nền tảng", "Sức mạnh thời đại là hỗ trợ", "Không ỷ lại, dựa dẫm", "Kết hợp để thực hiện mục tiêu chung"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Tự lực tự cường là chính, nhưng không bao giờ tự cô lập mình."],
        commonMistakes: ["Đoàn kết quốc tế là phụ thuộc vào nước ngoài."],
        reflectionQuestions: ["Sự kết hợp này được thể hiện thế nào trong công cuộc Đổi mới hiện nay?"],
        relatedConceptIds: ["doan-ket-quoc-te", "ket-hop-suc-manh-dan-toc-quoc-te"],
        requiresVerification: false
      }
    ],
    'chuong-6': [
      {
        id: "v-c6-1",
        chapterId: "chuong-6",
        type: "mindmap",
        title: "Đạo đức cách mạng",
        subtitle: "Gốc rễ của người cách mạng",
        purpose: "Hệ thống hóa các phẩm chất đạo đức cốt lõi theo tư tưởng Hồ Chí Minh.",
        learningValue: "Nhận thức được vai trò sống còn của đạo đức trong việc xây dựng con người mới.",
        nodes: ["Cần, Kiệm, Liêm, Chính", "Chí công vô tư", "Trung với nước, hiếu với dân", "Nói đi đôi với làm", "Chống chủ nghĩa cá nhân"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Có tài mà không có đức là người vô dụng."],
        commonMistakes: ["Đạo đức cách mạng là khổ hạnh, tiêu diệt mọi nhu cầu cá nhân."],
        reflectionQuestions: ["Đạo đức cách mạng khác đạo đức phong kiến ở điểm nào?"],
        relatedConceptIds: ["dao-duc-cach-mang", "can-kiem-liem-chinh"],
        requiresVerification: false
      },
      {
        id: "v-c6-2",
        chapterId: "chuong-6",
        type: "comparison",
        title: "Chủ nghĩa cá nhân vs Đạo đức cách mạng",
        subtitle: "Kẻ thù nguy hiểm nhất ở bên trong mỗi con người",
        purpose: "Giúp sinh viên nhận diện và bài trừ các biểu hiện của chủ nghĩa cá nhân.",
        learningValue: "Cảnh giác trước sự tha hóa đạo đức và lối sống thực dụng.",
        nodes: [],
        steps: [],
        comparisons: [
          { topic: "Lợi ích", wrong: "Cá nhân trên tập thể", correct: "Hài hòa cá nhân và tập thể" },
          { topic: "Trách nhiệm", wrong: "Né tránh, đùn đẩy", correct: "Dám nhận và chịu trách nhiệm" },
          { topic: "Hành động", wrong: "Nói không đi đôi với làm", correct: "Thống nhất lời nói và việc làm" },
          { topic: "Thái độ", wrong: "Chạy theo thành tích giả", correct: "Học thật, làm thật" }
        ],
        keyTakeaways: ["Chủ nghĩa cá nhân là 'giặc nội xâm' tàn phá thành quả cách mạng."],
        commonMistakes: ["Cho rằng chủ nghĩa cá nhân đồng nghĩa với quyền lợi chính đáng của cá nhân."],
        reflectionQuestions: ["Làm thế nào để đấu tranh chống chủ nghĩa cá nhân trong thời đại mạng xã hội?"],
        relatedConceptIds: ["chu-nghia-ca-nhan", "noi-di-doi-voi-lam"],
        requiresVerification: false
      },
      {
        id: "v-c6-3",
        chapterId: "chuong-6",
        type: "relationship",
        title: "Văn hóa, Đạo đức và Con người",
        subtitle: "Mục tiêu và động lực của phát triển",
        purpose: "Hiểu mối quan hệ biện chứng giữa các yếu tố thượng tầng kiến trúc.",
        learningValue: "Thấy được chiến lược 'trồng người' của Hồ Chí Minh là vì sự phát triển bền vững.",
        nodes: ["Văn hóa soi đường", "Đạo đức là cái gốc", "Con người là mục tiêu & động lực", "Phát triển toàn diện"],
        steps: [],
        comparisons: [],
        keyTakeaways: ["Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người."],
        commonMistakes: ["Chỉ chăm lo phát triển kinh tế mà bỏ qua văn hóa, đạo đức."],
        reflectionQuestions: ["Bạn đánh giá thế nào về tầm quan trọng của 'văn hóa số' hiện nay?"],
        relatedConceptIds: ["van-hoa", "con-nguoi", "van-hoa-so"],
        requiresVerification: false
      }
    ]
  };

  const newLessons = lessons.map(lesson => {
    const chapterVisuals = visualsMap[lesson.chapterId];
    if (chapterVisuals) {
      lesson.visualLearning = chapterVisuals.map(v => ({ ...v, lessonId: lesson.lessonId }));
    }
    return lesson;
  });

  const fileContent = `export const lessons = ${JSON.stringify(newLessons, null, 2)};\n`;
  fs.writeFileSync(dataPath, fileContent, 'utf-8');
  console.log('Successfully updated lessons.js with detailed visual learning data.');
}

run();
