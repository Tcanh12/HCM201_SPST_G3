const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, 'src', 'data', 'lessons.js');
const chapterDetailsPath = path.join(__dirname, 'src', 'data', 'chapterDetails.js');

const newLessons = `export const lessons = [
  {
    "id": "vnr-ch1-cuong-linh-luan-cuong",
    "chapterId": "chuong-1",
    "title": "Đảng ra đời và nền tảng đường lối 1930",
    "readingTime": 25,
    "type": "theory",
    "difficulty": "Intermediate",
    "tags": ["Lịch sử", "Cương lĩnh", "1930"],
    "description": "Bối cảnh thành lập Đảng, Cương lĩnh chính trị đầu tiên và Luận cương chính trị tháng 10/1930 như nền tảng của đường lối đấu tranh cách mạng 1930–1945.",
    "learningObjectives": [
      "Phân tích bối cảnh thế giới và trong nước dẫn đến sự ra đời của Đảng.",
      "Hiểu rõ nội dung cốt lõi của Cương lĩnh chính trị đầu tiên do Nguyễn Ái Quốc soạn thảo.",
      "So sánh sự khác biệt và đánh giá ưu/khuyết điểm giữa Cương lĩnh đầu tiên và Luận cương tháng 10/1930.",
      "Rút ra ý nghĩa lịch sử của việc thành lập Đảng đối với tiến trình cách mạng Việt Nam."
    ],
    "coreTheory": [
      {
        "title": "1. Bối cảnh lịch sử",
        "content": [
          "Cuối thế kỷ XIX - đầu thế kỷ XX, chủ nghĩa tư bản chuyển sang giai đoạn đế quốc chủ nghĩa. Sự bóc lột của các nước đế quốc làm mâu thuẫn giữa các dân tộc thuộc địa và chủ nghĩa đế quốc ngày càng gay gắt.",
          "Cách mạng Tháng Mười Nga (1917) thành công, mở ra thời đại mới, cổ vũ mạnh mẽ phong trào giải phóng dân tộc. Quốc tế Cộng sản ra đời (1919) đã thúc đẩy phong trào cộng sản và công nhân quốc tế.",
          "Trong nước, thực dân Pháp tiến hành khai thác thuộc địa, làm biến đổi cơ cấu xã hội Việt Nam. Các giai cấp mới như công nhân, tư sản, tiểu tư sản xuất hiện. Mâu thuẫn cơ bản của xã hội Việt Nam là mâu thuẫn giữa toàn thể dân tộc Việt Nam với thực dân Pháp và tay sai.",
          "Các phong trào yêu nước theo khuynh hướng phong kiến và tư sản (như phong trào Cần Vương, Phan Bội Châu, Phan Châu Trinh) đều thất bại, đặt ra yêu cầu bức thiết phải có một đường lối cứu nước mới."
        ]
      },
      {
        "title": "2. Nguyễn Ái Quốc chuẩn bị thành lập Đảng",
        "content": [
          "Về tư tưởng: Nguyễn Ái Quốc truyền bá chủ nghĩa Mác - Lênin vào Việt Nam, nhấn mạnh cách mạng giải phóng dân tộc phải đi theo con đường cách mạng vô sản.",
          "Về chính trị: Chỉ rõ kẻ thù là chủ nghĩa đế quốc và phong kiến tay sai. Lực lượng cách mạng là quần chúng nhân dân, nòng cốt là công nông.",
          "Về tổ chức: Lập Hội Việt Nam Cách mạng Thanh niên (1925), mở các lớp huấn luyện cán bộ, xuất bản báo Thanh niên và tác phẩm Đường Kách mệnh (1927)."
        ]
      },
      {
        "title": "3. Hội nghị thành lập Đảng và Cương lĩnh chính trị đầu tiên",
        "content": [
          "Sự phát triển mạnh mẽ của phong trào công nhân đã dẫn đến sự ra đời của ba tổ chức cộng sản trong năm 1929: Đông Dương Cộng sản Đảng, An Nam Cộng sản Đảng, và Đông Dương Cộng sản Liên đoàn. Tuy nhiên, sự chia rẽ giữa các tổ chức này gây trở ngại cho phong trào.",
          "Từ ngày 6/1 đến 7/2/1930 tại Cửu Long (Hương Cảng, Trung Quốc), Nguyễn Ái Quốc chủ trì Hội nghị hợp nhất các tổ chức cộng sản thành Đảng Cộng sản Việt Nam.",
          "Cương lĩnh chính trị đầu tiên (Chính cương vắn tắt, Sách lược vắn tắt) xác định phương hướng chiến lược: 'Làm tư sản dân quyền cách mạng và thổ địa cách mạng để đi tới xã hội cộng sản'.",
          "Nhiệm vụ: Đánh đổ đế quốc Pháp, phong kiến và tư sản phản cách mạng, làm cho nước Việt Nam được hoàn toàn độc lập.",
          "Lực lượng: Công nhân, nông dân là gốc của cách mạng; đồng thời liên lạc với tiểu tư sản, trí thức, trung nông; lôi kéo hoặc trung lập phú nông, trung tiểu địa chủ, tư sản dân tộc."
        ]
      },
      {
        "title": "4. Luận cương chính trị tháng 10/1930",
        "content": [
          "Tháng 10/1930, Hội nghị Ban Chấp hành Trung ương lần thứ nhất quyết định đổi tên Đảng thành Đảng Cộng sản Đông Dương và thông qua Luận cương chính trị do Trần Phú khởi thảo.",
          "Nội dung: Tính chất của cách mạng Đông Dương lúc đầu là cách mạng tư sản dân quyền, có tính chất thổ địa và phản đế. Động lực chính là công nhân và nông dân.",
          "Hạn chế: Chưa vạch rõ mâu thuẫn chủ yếu của xã hội Đông Dương thuộc địa, không đặt nhiệm vụ giải phóng dân tộc lên hàng đầu mà nặng về đấu tranh giai cấp và cách mạng ruộng đất. Đánh giá không đúng khả năng cách mạng của tầng lớp tiểu tư sản, tư sản dân tộc."
        ]
      },
      {
        "title": "5. Ý nghĩa lịch sử",
        "content": [
          "Đảng ra đời chấm dứt thời kỳ khủng hoảng về đường lối cứu nước và giai cấp lãnh đạo.",
          "Chứng tỏ giai cấp công nhân Việt Nam đã trưởng thành và đủ sức lãnh đạo cách mạng.",
          "Cách mạng Việt Nam trở thành một bộ phận khăng khít của cách mạng thế giới."
        ]
      }
    ],
    "conceptBreakdown": [
      {
        "conceptId": "cuong-linh-1930",
        "title": "Cương lĩnh chính trị đầu tiên (2/1930)",
        "description": "Văn kiện nền tảng do Nguyễn Ái Quốc soạn thảo.",
        "definition": "Bản cương lĩnh xác định đường lối chiến lược, nhiệm vụ, lực lượng và phương pháp cách mạng của Đảng Cộng sản Việt Nam.",
        "explanation": "Điểm sáng tạo nhất là đặt vấn đề giải phóng dân tộc lên hàng đầu và đánh giá đúng vai trò của các tầng lớp trung gian (tiểu tư sản, tư sản dân tộc).",
        "importance": "Làm kim chỉ nam cho toàn bộ tiến trình đấu tranh cách mạng, giải quyết triệt để cuộc khủng hoảng đường lối.",
        "commonMistakes": [
          "Nhầm lẫn người soạn thảo: Cương lĩnh đầu tiên do Nguyễn Ái Quốc soạn, còn Luận cương tháng 10 do Trần Phú soạn.",
          "Nhầm lẫn mục tiêu cốt lõi: Cương lĩnh 1930 nhấn mạnh độc lập dân tộc, trong khi Luận cương 10/1930 nhấn mạnh đấu tranh giai cấp."
        ]
      },
      {
        "conceptId": "luan-cuong-1930",
        "title": "Luận cương chính trị (10/1930)",
        "description": "Văn kiện do Trần Phú khởi thảo.",
        "definition": "Xác định cách mạng Đông Dương là cách mạng tư sản dân quyền, có tính chất thổ địa và phản đế.",
        "explanation": "Chịu ảnh hưởng của khuynh hướng 'tả khuynh' từ Quốc tế Cộng sản, chưa đặt giải phóng dân tộc lên trên hết.",
        "importance": "Vẫn khẳng định được tính tất yếu của sự lãnh đạo của Đảng và con đường tiến lên CNXH, định hướng phong trào 1930-1931.",
        "commonMistakes": [
          "Cho rằng Luận cương hoàn toàn sai lầm (Sai: Luận cương có hạn chế nhưng về cơ bản vẫn giữ vững định hướng vô sản)."
        ]
      }
    ],
    "visualLearning": [
      {
        "type": "timeline",
        "title": "Tiến trình thành lập Đảng",
        "purpose": "Hệ thống hóa các mốc thời gian trước và trong khi thành lập Đảng",
        "subtitle": "Từ khi Nguyễn Ái Quốc ra đi tìm đường cứu nước đến Hội nghị thành lập Đảng"
      },
      {
        "type": "comparison",
        "title": "So sánh Cương lĩnh và Luận cương",
        "purpose": "Phân tích sự khác biệt về nhiệm vụ và lực lượng",
        "subtitle": "So sánh 2 văn kiện quan trọng nhất năm 1930"
      }
    ]
  },
  {
    "id": "vnr-ch2-xo-viet-phuc-hoi",
    "chapterId": "chuong-2",
    "title": "Cao trào 1930–1931, Xô viết Nghệ Tĩnh và Phục hồi tổ chức",
    "readingTime": 25,
    "type": "theory",
    "difficulty": "Intermediate",
    "tags": ["Lịch sử", "Xô viết Nghệ Tĩnh", "1930-1935"],
    "description": "Đỉnh cao phong trào đấu tranh 1930-1931, sự ra đời của chính quyền Xô viết và chặng đường gian nan phục hồi tổ chức Đảng 1932-1935.",
    "learningObjectives": [
      "Phân tích nguyên nhân bùng nổ cao trào cách mạng 1930-1931.",
      "Hiểu rõ bản chất, hoạt động và ý nghĩa của chính quyền Xô viết Nghệ Tĩnh.",
      "Đánh giá những khó khăn, thử thách và quá trình phục hồi tổ chức Đảng từ 1932 đến 1935.",
      "Nhận thức ý nghĩa của Đại hội lần thứ nhất của Đảng (1935)."
    ],
    "coreTheory": [
      {
        "title": "1. Nguyên nhân bùng nổ cao trào 1930-1931",
        "content": [
          "Khủng hoảng kinh tế thế giới (1929-1933) đã tác động nặng nề đến kinh tế Đông Dương. Nông nghiệp suy sụp, công nghiệp đình đốn, xuất nhập khẩu đình trệ.",
          "Thực dân Pháp tăng cường bóc lột, trút gánh nặng khủng hoảng lên vai nhân dân lao động. Sau khởi nghĩa Yên Bái, thực dân Pháp tiến hành khủng bố trắng, làm mâu thuẫn xã hội trở nên gay gắt chưa từng thấy.",
          "Sự ra đời của Đảng Cộng sản Việt Nam (1930) với đường lối đúng đắn đã kịp thời lãnh đạo quần chúng đứng lên đấu tranh."
        ]
      },
      {
        "title": "2. Phong trào đấu tranh và đỉnh cao Xô viết Nghệ Tĩnh",
        "content": [
          "Phong trào bắt đầu từ tháng 2 đến tháng 4/1930 với các cuộc bãi công của công nhân (đồn điền cao su Phú Riềng, nhà máy sợi Nam Định).",
          "Từ tháng 5/1930, phong trào bùng nổ mạnh mẽ nhân ngày Quốc tế Lao động. Hàng chục cuộc đấu tranh của công nhân và nông dân nổ ra khắp cả nước.",
          "Tháng 9/1930, phong trào đạt đến đỉnh cao ở Nghệ An và Hà Tĩnh. Quần chúng vũ trang tự vệ biểu tình, tấn công huyện lỵ, phá nhà giam.",
          "Hệ thống chính quyền địch ở nhiều thôn xã bị tê liệt, tan rã. Ban Chấp hành Nông hội xã do chi bộ Đảng lãnh đạo đã đứng ra quản lý mọi mặt đời sống nông thôn, làm chức năng của một chính quyền - chính quyền Xô viết."
        ]
      },
      {
        "title": "3. Hoạt động của Xô viết Nghệ Tĩnh",
        "content": [
          "Về chính trị: Thực hiện quyền tự do dân chủ, lập các đội tự vệ đỏ, tòa án nhân dân.",
          "Về kinh tế: Tịch thu ruộng đất công chia cho dân nghèo, bãi bỏ các thứ thuế vô lý, bắt địa chủ giảm tô.",
          "Về văn hóa - xã hội: Mở lớp dạy chữ Quốc ngữ, bài trừ hủ tục mê tín dị đoan, tổ chức đời sống mới."
        ]
      },
      {
        "title": "4. Đàn áp và quá trình phục hồi tổ chức (1932-1935)",
        "content": [
          "Trước sức mạnh của phong trào, thực dân Pháp tiến hành đàn áp dã man (ném bom đoàn biểu tình Hưng Nguyên, điều động binh lính càn quét).",
          "Nhiều cơ quan lãnh đạo của Đảng bị phá vỡ, hàng vạn cán bộ, đảng viên bị bắt, tù đày hoặc hy sinh. Cách mạng bước vào thời kỳ thoái trào.",
          "Từ năm 1932, những đảng viên trong nhà tù và những người hoạt động bí mật bên ngoài đã kiên trì khôi phục tổ chức. Các văn kiện như 'Chương trình hành động của Đảng Cộng sản Đông Dương' (6/1932) đã vạch ra con đường phục hồi.",
          "Tháng 3/1935, Đại hội đại biểu lần thứ nhất của Đảng họp tại Ma Cao (Trung Quốc). Đại hội đánh dấu tổ chức Đảng đã được phục hồi trên quy mô cả nước."
        ]
      },
      {
        "title": "5. Ý nghĩa và bài học kinh nghiệm",
        "content": [
          "Khẳng định đường lối cách mạng của Đảng là đúng đắn, chứng minh sức mạnh của liên minh công nông.",
          "Là cuộc diễn tập đầu tiên của Đảng và quần chúng cho Tổng khởi nghĩa tháng Tám sau này.",
          "Để lại bài học sâu sắc về xây dựng khối liên minh công nông, về phương pháp bạo lực cách mạng và xây dựng chính quyền."
        ]
      }
    ],
    "conceptBreakdown": [
      {
        "conceptId": "xo-viet-nghe-tinh",
        "title": "Xô viết Nghệ Tĩnh",
        "description": "Đỉnh cao của phong trào 1930-1931.",
        "definition": "Là hình thức chính quyền cách mạng sơ khai của nhân dân, do giai cấp công nhân lãnh đạo, xuất hiện ở các làng xã Nghệ Tĩnh.",
        "explanation": "Đây là lần đầu tiên nhân dân lao động Việt Nam thực sự nắm quyền làm chủ ở địa phương.",
        "importance": "Minh chứng cho khả năng lật đổ chính quyền địch và tổ chức đời sống mới của quần chúng nhân dân.",
        "commonMistakes": [
          "Nhầm lẫn Xô viết Nghệ Tĩnh là cuộc khởi nghĩa giành chính quyền toàn quốc (Chỉ là khởi nghĩa từng phần, chính quyền sơ khai ở cấp xã/thôn)."
        ]
      },
      {
        "conceptId": "phuc-hoi-to-chuc",
        "title": "Phục hồi tổ chức 1932-1935",
        "description": "Giai đoạn giữ lửa phong trào.",
        "definition": "Quá trình kiên trì xây dựng lại cơ sở Đảng sau đợt khủng bố trắng của thực dân Pháp.",
        "importance": "Giúp Đảng không bị tiêu diệt, tạo tiền đề tổ chức để bước vào cao trào dân chủ 1936-1939."
      }
    ],
    "visualLearning": [
      {
        "type": "flowchart",
        "title": "Tiến trình Phong trào",
        "purpose": "Hiểu sự leo thang của phong trào từ đấu tranh kinh tế lên đấu tranh chính trị",
        "subtitle": "Nguyên nhân -> Bùng nổ -> Đỉnh cao -> Đàn áp -> Phục hồi"
      }
    ]
  },
  {
    "id": "vnr-ch3-phong-trao-dan-chu",
    "chapterId": "chuong-3",
    "title": "Phong trào dân chủ 1936–1939",
    "readingTime": 25,
    "type": "theory",
    "difficulty": "Intermediate",
    "tags": ["Lịch sử", "Phong trào Dân chủ", "Mặt trận"],
    "description": "Sự điều chỉnh sách lược của Đảng trong bối cảnh nguy cơ chiến tranh thế giới, đòi quyền dân sinh, dân chủ và xây dựng Mặt trận.",
    "learningObjectives": [
      "Nhận biết sự thay đổi của tình hình thế giới và trong nước dẫn đến thay đổi đường lối của Đảng.",
      "Phân tích chủ trương chuyển hướng chỉ đạo chiến lược của Đảng giai đoạn 1936-1939.",
      "Mô tả các hình thức đấu tranh phong phú, linh hoạt trong phong trào dân chủ.",
      "Đánh giá ý nghĩa và bài học kinh nghiệm của phong trào 1936-1939."
    ],
    "coreTheory": [
      {
        "title": "1. Hoàn cảnh lịch sử",
        "content": [
          "Thế giới: Chủ nghĩa phát xít xuất hiện và lên cầm quyền ở Đức, Ý, Nhật, đe dọa hòa bình thế giới. Đại hội VII Quốc tế Cộng sản (7/1935) xác định kẻ thù nguy hiểm nhất là chủ nghĩa phát xít, chủ trương lập Mặt trận nhân dân chống phát xít. Ở Pháp, Mặt trận nhân dân Pháp lên cầm quyền, ban hành một số quyền tự do dân chủ cho thuộc địa.",
          "Trong nước: Hậu quả khủng hoảng kinh tế và chính sách bóc lột của Pháp làm đời sống các tầng lớp nhân dân cực khổ. Yêu cầu bức thiết lúc này là tự do, dân chủ, cải thiện đời sống."
        ]
      },
      {
        "title": "2. Chủ trương của Đảng",
        "content": [
          "Tháng 7/1936, Hội nghị Ban Chấp hành Trung ương Đảng họp tại Thượng Hải xác định:",
          "Kẻ thù trước mắt: Không phải là thực dân Pháp nói chung, mà là bọn phản động thuộc địa Pháp và tay sai không chịu thi hành chính sách của Mặt trận nhân dân Pháp.",
          "Nhiệm vụ trước mắt: Chống phát xít, chống chiến tranh đế quốc, đòi tự do, dân chủ, cơm áo và hòa bình. (Tạm gác khẩu hiệu độc lập dân tộc và cách mạng ruộng đất).",
          "Mặt trận: Thành lập Mặt trận nhân dân phản đế Đông Dương (đến tháng 3/1938 đổi thành Mặt trận dân chủ Đông Dương).",
          "Hình thức đấu tranh: Kết hợp công khai, nửa công khai, hợp pháp, nửa hợp pháp với bí mật, bất hợp pháp."
        ]
      },
      {
        "title": "3. Các phong trào đấu tranh tiêu biểu",
        "content": [
          "Đấu tranh đòi tự do, dân chủ: Phong trào Đông Dương đại hội (1936) nhằm thu thập dân nguyện gửi phái viên chính phủ Pháp; Phong trào đón rước phái viên Gô-đa và Toàn quyền Bơ-rê-vi-ê.",
          "Đấu tranh báo chí: Xuất bản nhiều tờ báo công khai (Tiền phong, Dân chúng, Tin tức...) để tuyên truyền đường lối của Đảng, đấu tranh tư tưởng.",
          "Đấu tranh nghị trường: Đưa người của Mặt trận ra ứng cử vào các cơ quan Viện dân biểu, Hội đồng thành phố để đấu tranh công khai, vạch mặt bọn phản động."
        ]
      },
      {
        "title": "4. Kết quả và ý nghĩa",
        "content": [
          "Buộc chính quyền thực dân phải nhượng bộ một số yêu sách: thả tù chính trị, ban hành luật lao động, nới lỏng quyền tự do báo chí.",
          "Đảng đã tập hợp, giáo dục và tổ chức được một đạo quân chính trị quần chúng rộng lớn.",
          "Đây là cuộc diễn tập thứ hai chuẩn bị cho Cách mạng Tháng Tám."
        ]
      },
      {
        "title": "5. Bài học kinh nghiệm",
        "content": [
          "Bài học về linh hoạt thay đổi sách lược: Biết phân biệt nhiệm vụ chiến lược dài hạn và nhiệm vụ trước mắt.",
          "Bài học về xây dựng mặt trận dân tộc thống nhất: Tập hợp rộng rãi các lực lượng trên cơ sở mục tiêu chung.",
          "Bài học về tận dụng mọi hình thức đấu tranh hợp pháp, công khai để phát triển lực lượng."
        ]
      }
    ],
    "conceptBreakdown": [
      {
        "conceptId": "mat-tran-dan-chu",
        "title": "Mặt trận Dân chủ Đông Dương",
        "description": "Hình thức mặt trận linh hoạt.",
        "definition": "Là tổ chức liên minh chính trị rộng rãi tập hợp mọi lực lượng yêu nước, dân chủ, tiến bộ để đòi quyền sống.",
        "explanation": "Đảng đã tạm gác khẩu hiệu đánh đổ Pháp để tập hợp cả những người Pháp tiến bộ ở Đông Dương.",
        "importance": "Minh chứng cho nghệ thuật sách lược mềm dẻo của Đảng.",
        "commonMistakes": [
          "Nhầm lẫn Mặt trận Dân chủ Đông Dương (1938) với Mặt trận Việt Minh (1941)."
        ]
      }
    ],
    "visualLearning": [
      {
        "type": "comparison",
        "title": "So sánh 1930-1931 và 1936-1939",
        "purpose": "Phân biệt nhiệm vụ, kẻ thù, mặt trận và hình thức đấu tranh",
        "subtitle": "Sự linh hoạt trong đường lối của Đảng"
      }
    ]
  },
  {
    "id": "vnr-ch4-hoi-nghi-tw6",
    "chapterId": "chuong-4",
    "title": "Chuyển hướng chiến lược 1939–1941",
    "readingTime": 30,
    "type": "theory",
    "difficulty": "Advanced",
    "tags": ["Lịch sử", "TW8", "Chuyển hướng chiến lược"],
    "description": "Quá trình Đảng chuyển hướng chỉ đạo chiến lược, đặt giải phóng dân tộc lên hàng đầu khi Chiến tranh thế giới II bùng nổ.",
    "learningObjectives": [
      "Hiểu rõ tác động của Chiến tranh thế giới II đến tình hình Đông Dương.",
      "Phân tích quá trình chuyển hướng chiến lược qua các Hội nghị TW 6 (1939) và TW 8 (1941).",
      "Đánh giá vai trò của Nguyễn Ái Quốc trong việc hoàn thiện đường lối giải phóng dân tộc.",
      "Nhận thức ý nghĩa quyết định của Hội nghị TW 8 đối với thắng lợi của Cách mạng Tháng Tám."
    ],
    "coreTheory": [
      {
        "title": "1. Bối cảnh lịch sử",
        "content": [
          "Tháng 9/1939, Chiến tranh thế giới thứ hai bùng nổ. Ở Pháp, chính phủ phản động lên cầm quyền, đàn áp phong trào dân chủ. Tại Đông Dương, thực dân Pháp thủ tiêu mọi quyền tự do dân chủ, thi hành chính sách kinh tế chỉ huy nhằm vơ vét sức người, sức của phục vụ chiến tranh.",
          "Tháng 9/1940, Nhật Bản nhảy vào Đông Dương. Nhân dân ta chịu cảnh 'một cổ hai tròng' áp bức của Pháp và Nhật.",
          "Mâu thuẫn giữa dân tộc Việt Nam với đế quốc, phát xít Pháp - Nhật trở nên gay gắt tột độ. Vấn đề sống còn là phải giải phóng dân tộc."
        ]
      },
      {
        "title": "2. Hội nghị Trung ương 6 (11/1939)",
        "content": [
          "Họp tại Bà Điểm (Hóc Môn, Gia Định) do Tổng Bí thư Nguyễn Văn Cừ chủ trì.",
          "Quyết định chuyển hướng chỉ đạo chiến lược: Đặt nhiệm vụ giải phóng dân tộc lên hàng đầu. Tạm gác khẩu hiệu 'cách mạng ruộng đất', thay bằng khẩu hiệu 'tịch thu ruộng đất của đế quốc và Việt gian', 'giảm tô, giảm tức'.",
          "Thành lập Mặt trận Thống nhất Dân tộc Phản đế Đông Dương.",
          "Chuyển phương pháp đấu tranh từ công khai, hợp pháp sang hoạt động bí mật, bất hợp pháp, chuẩn bị điều kiện tiến tới khởi nghĩa vũ trang."
        ]
      },
      {
        "title": "3. Hội nghị Trung ương 8 (5/1941) và sự hoàn chỉnh đường lối",
        "content": [
          "Đầu năm 1941, Nguyễn Ái Quốc về nước (Pác Bó, Cao Bằng) trực tiếp lãnh đạo cách mạng.",
          "Tháng 5/1941, Người chủ trì Hội nghị Trung ương 8. Hội nghị tiếp tục khẳng định nhiệm vụ giải phóng dân tộc là nhiệm vụ bức thiết nhất.",
          "Những điểm mới phát triển hoàn thiện đường lối:",
          "Thứ nhất, giải quyết vấn đề dân tộc trong khuôn khổ từng nước Đông Dương. Quyết định thành lập Mặt trận Việt Nam độc lập đồng minh (Việt Minh).",
          "Thứ hai, tạm gác hoàn toàn khẩu hiệu đánh đổ địa chủ, chia ruộng đất cho dân cày.",
          "Thứ ba, xác định hình thái khởi nghĩa ở nước ta là đi từ khởi nghĩa từng phần tiến lên Tổng khởi nghĩa.",
          "Thứ tư, chú trọng xây dựng lực lượng vũ trang và căn cứ địa cách mạng (chọn Cao Bằng làm căn cứ địa đầu tiên)."
        ]
      },
      {
        "title": "4. Ý nghĩa của sự chuyển hướng chiến lược",
        "content": [
          "Hoàn thành việc khắc phục những hạn chế của Luận cương chính trị tháng 10/1930, trở lại đúng với tư tưởng của Cương lĩnh chính trị đầu tiên do Nguyễn Ái Quốc soạn thảo.",
          "Giương cao ngọn cờ dân tộc, tập hợp được rộng rãi mọi tầng lớp nhân dân vào Mặt trận Việt Minh.",
          "Chuẩn bị trực tiếp mọi điều kiện về chính trị, vũ trang, căn cứ địa cho Tổng khởi nghĩa."
        ]
      }
    ],
    "conceptBreakdown": [
      {
        "conceptId": "hoi-nghi-tw8",
        "title": "Hội nghị Trung ương 8 (5/1941)",
        "description": "Cột mốc hoàn chỉnh chuyển hướng chiến lược.",
        "definition": "Hội nghị do Nguyễn Ái Quốc chủ trì, đặt giải phóng dân tộc cao hơn hết và thành lập Mặt trận Việt Minh.",
        "explanation": "Hội nghị giải quyết triệt để mối quan hệ giữa hai nhiệm vụ chống đế quốc và chống phong kiến, khắc phục hoàn toàn sự 'tả khuynh' trước đây.",
        "importance": "Là ngọn cờ dẫn đường trực tiếp đến Cách mạng Tháng Tám 1945.",
        "commonMistakes": [
          "Nhầm lẫn thời điểm chuyển hướng chiến lược: Bắt đầu từ TW6 (11/1939), hoàn chỉnh tại TW8 (5/1941)."
        ]
      }
    ],
    "visualLearning": [
      {
        "type": "flowchart",
        "title": "Chuyển hướng chiến lược",
        "purpose": "Hệ thống 3 hội nghị TW 6, 7, 8",
        "subtitle": "Quá trình hoàn thiện đường lối giải phóng dân tộc"
      }
    ]
  },
  {
    "id": "vnr-ch5-viet-minh-tong-khoi-nghia",
    "chapterId": "chuong-5",
    "title": "Việt Minh, Kháng Nhật và Cách mạng Tháng Tám",
    "readingTime": 35,
    "type": "theory",
    "difficulty": "Advanced",
    "tags": ["Lịch sử", "Cách mạng Tháng Tám", "1945"],
    "description": "Quá trình chuẩn bị lực lượng, chớp thời cơ và tiến hành Tổng khởi nghĩa tháng Tám năm 1945 lập ra nước VNDCCH.",
    "learningObjectives": [
      "Hiểu rõ quá trình xây dựng lực lượng chính trị, vũ trang và căn cứ địa cách mạng từ 1941 đến 1945.",
      "Phân tích sự nhạy bén của Đảng trong việc nhận định thời cơ và phát động Cao trào kháng Nhật cứu nước.",
      "Nắm vững diễn biến chính của Tổng khởi nghĩa tháng Tám.",
      "Đánh giá nguyên nhân thắng lợi, ý nghĩa lịch sử và bài học kinh nghiệm của Cách mạng Tháng Tám."
    ],
    "coreTheory": [
      {
        "title": "1. Xây dựng lực lượng tiến tới khởi nghĩa",
        "content": [
          "Xây dựng lực lượng chính trị: Phát triển các hội Cứu quốc trong Mặt trận Việt Minh (Nông dân cứu quốc, Công nhân cứu quốc, Phụ nữ cứu quốc...). Việt Minh phát triển rộng khắp từ Cao Bằng đến các tỉnh đồng bằng.",
          "Xây dựng lực lượng vũ trang: Thành lập các đội Cứu quốc quân. Ngày 22/12/1944, Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập theo chỉ thị của Hồ Chí Minh.",
          "Xây dựng căn cứ địa: Xây dựng căn cứ Cao Bằng, Bắc Sơn - Võ Nhai. Tháng 6/1945, thành lập Khu giải phóng Việt Bắc gồm 6 tỉnh."
        ]
      },
      {
        "title": "2. Cao trào kháng Nhật cứu nước",
        "content": [
          "Ngày 9/3/1945, Nhật đảo chính Pháp độc chiếm Đông Dương. Ngày 12/3/1945, Ban Thường vụ TW Đảng ra Chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta'.",
          "Xác định kẻ thù chính, cụ thể trước mắt là phát xít Nhật. Phát động Cao trào kháng Nhật cứu nước làm tiền đề cho Tổng khởi nghĩa.",
          "Khởi nghĩa từng phần nổ ra ở nhiều nơi. Đặc biệt, phong trào 'Phá kho thóc, giải quyết nạn đói' đã thu hút hàng triệu nông dân tham gia."
        ]
      },
      {
        "title": "3. Tổng khởi nghĩa tháng Tám",
        "content": [
          "Giữa tháng 8/1945, Nhật đầu hàng Đồng minh không điều kiện. Thời cơ ngàn năm có một đã đến: Kẻ thù đã ngã gục, quần chúng đã sẵn sàng, lực lượng cách mạng đã chuẩn bị chu đáo.",
          "Từ 13 đến 15/8/1945, Hội nghị toàn quốc của Đảng họp tại Tân Trào (Tuyên Quang) quyết định phát động Tổng khởi nghĩa.",
          "Ngày 16/8/1945, Đại hội Quốc dân Tân Trào tán thành chủ trương khởi nghĩa, cử ra Ủy ban Dân tộc giải phóng Việt Nam do Hồ Chí Minh làm Chủ tịch.",
          "Diễn biến chính: Quần chúng giành chính quyền tại Hà Nội (19/8), Huế (23/8), Sài Gòn (25/8). Chỉ trong 15 ngày, chính quyền trong cả nước về tay nhân dân.",
          "Ngày 2/9/1945, tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa."
        ]
      },
      {
        "title": "4. Nguyên nhân thắng lợi",
        "content": [
          "Khách quan: Chiến thắng của quân Đồng minh và Liên Xô trong việc đánh bại phát xít Nhật tạo thời cơ thuận lợi.",
          "Chủ quan: Sự lãnh đạo đúng đắn, sáng suốt của Đảng và Hồ Chí Minh. Khối đại đoàn kết toàn dân tộc vững chắc. Sự chuẩn bị chu đáo về mọi mặt suốt 15 năm (1930-1945)."
        ]
      },
      {
        "title": "5. Ý nghĩa và Bài học kinh nghiệm",
        "content": [
          "Ý nghĩa: Đập tan ách thống trị của thực dân Pháp và phát xít Nhật, lật đổ chế độ phong kiến, lập ra nước VNDCCH. Đưa nhân dân ta từ thân phận nô lệ lên làm chủ đất nước.",
          "Bài học về giương cao ngọn cờ độc lập dân tộc, kết hợp đúng đắn hai nhiệm vụ chống đế quốc và phong kiến.",
          "Bài học về xây dựng mặt trận dân tộc thống nhất trên nền tảng liên minh công nông.",
          "Bài học về nghệ thuật khởi nghĩa vũ trang: Nắm bắt đúng thời cơ, kết hợp đấu tranh chính trị với vũ trang."
        ]
      }
    ],
    "conceptBreakdown": [
      {
        "conceptId": "viet-minh",
        "title": "Mặt trận Việt Minh",
        "description": "Tổ chức nòng cốt tập hợp lực lượng.",
        "definition": "Việt Nam độc lập đồng minh, thành lập tháng 5/1941, tập hợp mọi lực lượng không phân biệt giai cấp, tôn giáo nhằm mục tiêu giành độc lập.",
        "importance": "Là trung tâm đoàn kết dân tộc, đóng vai trò quyết định trong việc huy động toàn dân khởi nghĩa.",
        "commonMistakes": [
          "Nhầm lẫn Việt Minh là một lực lượng quân sự (Sai: Việt Minh là mặt trận chính trị, còn Việt Nam Tuyên truyền Giải phóng quân mới là lực lượng quân sự)."
        ]
      },
      {
        "conceptId": "nam-bat-thoi-co",
        "title": "Nghệ thuật chớp thời cơ",
        "description": "Điều kiện sống còn của khởi nghĩa.",
        "definition": "Sự nhạy bén của Đảng khi quyết định phát động Tổng khởi nghĩa đúng vào khoảng trống quyền lực (Nhật đầu hàng Đồng minh, quân Đồng minh chưa vào Đông Dương).",
        "explanation": "Nếu khởi nghĩa trước ngày 15/8 (khi Nhật chưa đầu hàng) thì lực lượng ta sẽ bị thiệt hại nặng. Nếu khởi nghĩa sau ngày 5/9 (khi quân Đồng minh vào giải giáp Nhật) thì sẽ mất tính chính danh.",
        "importance": "Quyết định tính không đổ máu nhiều và thành công nhanh chóng của Cách mạng Tháng Tám."
      }
    ],
    "visualLearning": [
      {
        "type": "timeline",
        "title": "15 ngày rực lửa",
        "purpose": "Hệ thống các sự kiện Tháng 8/1945",
        "subtitle": "Quá trình giành chính quyền từ Bắc vào Nam"
      }
    ]
  }
];
`;

const newChapterDetails = `export const chapterDetails = {
  "chuong-1": {
    "title": "Đảng ra đời và nền tảng đường lối 1930",
    "description": "Bối cảnh thành lập Đảng, Cương lĩnh chính trị đầu tiên và Luận cương chính trị tháng 10/1930 như nền tảng của đường lối đấu tranh cách mạng 1930–1945.",
    "sections": [
      {
        "title": "Ba trục phân tích chính",
        "type": "three-pillars",
        "content": [
          {
            "title": "Bối cảnh lịch sử",
            "description": "Khủng hoảng đường lối cứu nước cuối TK XIX, sự xuất hiện của giai cấp công nhân và vai trò của Nguyễn Ái Quốc."
          },
          {
            "title": "Văn kiện nền tảng",
            "description": "Nắm vững nhiệm vụ, lực lượng, phương pháp của Cương lĩnh đầu tiên và Luận cương tháng 10/1930."
          },
          {
            "title": "Ý nghĩa sự kiện",
            "description": "Chấm dứt thời kỳ bế tắc về đường lối, mở ra kỷ nguyên độc lập gắn liền với chủ nghĩa xã hội."
          }
        ]
      },
      {
        "title": "Bảng so sánh Cương lĩnh 1930 và Luận cương 1930",
        "type": "comparison-table",
        "table": {
          "headers": ["Tiêu chí", "Cương lĩnh (2/1930)", "Luận cương (10/1930)"],
          "rows": [
            ["Người soạn thảo", "Nguyễn Ái Quốc", "Trần Phú"],
            ["Nhiệm vụ hàng đầu", "Đánh đổ đế quốc, giành độc lập dân tộc", "Đánh đổ phong kiến, cách mạng ruộng đất"],
            ["Lực lượng", "Công, nông, tiểu tư sản, trí thức. Trung lập phú nông, tư sản dân tộc", "Chỉ dựa vào công nhân và nông dân"],
            ["Nhận xét chung", "Sáng tạo, linh hoạt, phù hợp thực tiễn", "Máy móc, giáo điều, tả khuynh"]
          ]
        }
      },
      {
        "title": "Timeline sự kiện thành lập Đảng",
        "type": "timeline-mini",
        "content": [
          {
            "time": "Năm 1911",
            "title": "Ra đi tìm đường cứu nước",
            "description": "Nguyễn Tất Thành rời cảng Nhà Rồng."
          },
          {
            "time": "Năm 1920",
            "title": "Chọn con đường vô sản",
            "description": "Nguyễn Ái Quốc đọc Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa của Lênin."
          },
          {
            "time": "Năm 1925",
            "title": "Chuẩn bị tổ chức",
            "description": "Thành lập Hội Việt Nam Cách mạng Thanh niên."
          },
          {
            "time": "Năm 1929",
            "title": "Sự ra đời các tổ chức cộng sản",
            "description": "Đông Dương CS Đảng, An Nam CS Đảng, Đông Dương CS Liên đoàn."
          },
          {
            "time": "Tháng 2/1930",
            "title": "Đảng Cộng sản Việt Nam ra đời",
            "description": "Hội nghị hợp nhất tại Cửu Long (Hương Cảng)."
          }
        ]
      },
      {
        "title": "Hình ảnh và Tư liệu gợi ý",
        "type": "info-cards",
        "content": [
          {
            "title": "Nguyễn Ái Quốc",
            "imagePlaceholder": "Ảnh Nguyễn Ái Quốc tại Pháp/Nga",
            "description": "Người chuẩn bị mọi điều kiện về tư tưởng, chính trị, tổ chức và trực tiếp sáng lập Đảng."
          },
          {
            "title": "Hội nghị thành lập Đảng",
            "imagePlaceholder": "Mô phỏng/Ảnh tư liệu Hương Cảng 1930",
            "description": "Sự kiện lịch sử thống nhất các tổ chức cộng sản."
          }
        ]
      },
      {
        "title": "Trọng tâm thi",
        "type": "info-cards",
        "content": [
          {
            "title": "Điểm ưu việt của Cương lĩnh 1930",
            "description": "Giải quyết đúng đắn mối quan hệ giữa dân tộc và giai cấp, xác định đúng kẻ thù và lực lượng cần lôi kéo."
          },
          {
            "title": "Hạn chế của Luận cương 1930",
            "description": "Tuyệt đối hóa đấu tranh giai cấp, không thấy được khả năng cách mạng của các tầng lớp trên."
          }
        ]
      },
      {
        "title": "Lỗi thường gặp khi làm bài",
        "type": "info-cards",
        "content": [
          {
            "title": "Nhầm lẫn nội dung 2 văn kiện",
            "description": "Thường gắn 'cách mạng tư sản dân quyền' cho Cương lĩnh, thực chất Cương lĩnh dùng cụm từ 'tư sản dân quyền cách mạng và thổ địa cách mạng'."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "Sự kiện nào đánh dấu bước ngoặt trong tư tưởng của Nguyễn Ái Quốc, từ chủ nghĩa yêu nước đến chủ nghĩa Mác - Lênin?",
        "options": [
          "Đưa yêu sách đến hội nghị Versailles (1919)",
          "Đọc sơ thảo Luận cương của Lênin (1920)",
          "Thành lập Hội Việt Nam cách mạng thanh niên (1925)",
          "Xuất bản tác phẩm Đường Kách mệnh (1927)"
        ],
        "correctAnswer": 1,
        "explanation": "Tháng 7/1920, Nguyễn Ái Quốc đọc Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và thuộc địa của Lênin, tìm thấy con đường cứu nước đúng đắn."
      },
      {
        "question": "Mâu thuẫn cơ bản nhất của xã hội Việt Nam dưới ách thuộc địa thực dân Pháp là:",
        "options": [
          "Mâu thuẫn giữa công nhân và tư sản",
          "Mâu thuẫn giữa nông dân và địa chủ phong kiến",
          "Mâu thuẫn giữa toàn thể dân tộc Việt Nam với thực dân Pháp",
          "Mâu thuẫn giữa tư sản Việt Nam và tư sản Pháp"
        ],
        "correctAnswer": 2,
        "explanation": "Dưới ách thuộc địa, mâu thuẫn bao trùm và cơ bản nhất là mâu thuẫn dân tộc giữa toàn thể dân Việt Nam và đế quốc Pháp."
      },
      {
        "question": "Theo Cương lĩnh chính trị đầu tiên, nhiệm vụ hàng đầu của cách mạng Việt Nam là gì?",
        "options": [
          "Đánh đổ phong kiến, chia ruộng đất cho dân cày",
          "Đánh đổ đế quốc, giành độc lập dân tộc",
          "Xây dựng chủ nghĩa xã hội",
          "Xóa bỏ tư hữu tư bản chủ nghĩa"
        ],
        "correctAnswer": 1,
        "explanation": "Cương lĩnh 1930 đặt nhiệm vụ giải phóng dân tộc, đánh đổ đế quốc Pháp lên hàng đầu."
      },
      {
        "question": "Điểm hạn chế lớn nhất của Luận cương tháng 10/1930 là:",
        "options": [
          "Không xác định được giai cấp lãnh đạo",
          "Không đặt nhiệm vụ giải phóng dân tộc lên hàng đầu",
          "Không chủ trương liên minh công nông",
          "Không gắn cách mạng Việt Nam với cách mạng thế giới"
        ],
        "correctAnswer": 1,
        "explanation": "Luận cương bị ảnh hưởng bởi tư tưởng 'tả khuynh', quá nhấn mạnh đấu tranh giai cấp mà không thấy được nhiệm vụ bức thiết là giải phóng dân tộc."
      }
    ]
  },
  "chuong-2": {
    "title": "Cao trào 1930–1931 và phục hồi 1932–1935",
    "description": "Phong trào cách mạng đầu tiên dưới sự lãnh đạo của Đảng và quá trình khôi phục tổ chức 1932–1935.",
    "sections": [
      {
        "title": "Ba trục phân tích chính",
        "type": "three-pillars",
        "content": [
          {
            "title": "Nguyên nhân",
            "description": "Tác động của khủng hoảng kinh tế thế giới 1929-1933 và chính sách khủng bố của Pháp làm mâu thuẫn đạt đỉnh."
          },
          {
            "title": "Diễn biến Xô viết Nghệ Tĩnh",
            "description": "Phong trào đấu tranh chính trị kết hợp bạo lực, thành lập chính quyền Xô viết quản lý đời sống nhân dân."
          },
          {
            "title": "Phục hồi tổ chức",
            "description": "Giai đoạn 1932-1935 kiên trì khôi phục cơ sở Đảng qua các văn kiện và hoạt động bí mật."
          }
        ]
      },
      {
        "title": "Timeline phong trào 1930-1935",
        "type": "timeline-mini",
        "content": [
          {
            "time": "Tháng 2-4/1930",
            "title": "Các cuộc bãi công",
            "description": "Phú Riềng, Nam Định mở màn phong trào."
          },
          {
            "time": "Tháng 5/1930",
            "title": "Bùng nổ diện rộng",
            "description": "Đấu tranh nhân ngày Quốc tế Lao động."
          },
          {
            "time": "Tháng 9/1930",
            "title": "Đỉnh cao Xô viết Nghệ Tĩnh",
            "description": "Chính quyền địch tan rã ở nhiều xã, lập chính quyền Xô viết."
          },
          {
            "time": "Năm 1931",
            "title": "Khủng bố trắng",
            "description": "Thực dân Pháp đàn áp khốc liệt, phong trào thoái trào."
          },
          {
            "time": "Năm 1932-1935",
            "title": "Phục hồi tổ chức",
            "description": "Đại hội lần thứ nhất (3/1935) đánh dấu Đảng phục hồi."
          }
        ]
      },
      {
        "title": "Hình ảnh và Tư liệu gợi ý",
        "type": "info-cards",
        "content": [
          {
            "title": "Xô viết Nghệ Tĩnh",
            "imagePlaceholder": "Ảnh phong trào nông dân Nghệ Tĩnh",
            "description": "Nông dân biểu tình với gậy gộc, biểu ngữ đỏ."
          },
          {
            "title": "Nhà tù đế quốc",
            "imagePlaceholder": "Ảnh Côn Đảo / Hỏa Lò",
            "description": "Nơi rèn luyện ý chí và tổ chức các lớp học chính trị của tù nhân cộng sản."
          }
        ]
      },
      {
        "title": "Trọng tâm thi",
        "type": "info-cards",
        "content": [
          {
            "title": "Bản chất chính quyền Xô viết",
            "description": "Là chính quyền của dân, do dân, vì dân sơ khai nhất, thể hiện tính ưu việt ở các chính sách kinh tế, văn hóa."
          },
          {
            "title": "Ý nghĩa phong trào",
            "description": "Là cuộc diễn tập đầu tiên chuẩn bị cho Cách mạng Tháng Tám."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "Nguyên nhân trực tiếp và sâu xa nào dẫn đến bùng nổ cao trào cách mạng 1930-1931?",
        "options": [
          "Sự chỉ đạo trực tiếp của Quốc tế Cộng sản",
          "Tác động của khủng hoảng kinh tế 1929-1933 và chính sách khủng bố trắng của Pháp",
          "Ảnh hưởng của phong trào Ngũ Tứ ở Trung Quốc",
          "Sự ra đời của Mặt trận Dân chủ Đông Dương"
        ],
        "correctAnswer": 1,
        "explanation": "Khủng hoảng kinh tế làm đời sống điêu đứng, cộng với sự đàn áp của Pháp đẩy mâu thuẫn lên đỉnh điểm, làm bùng nổ phong trào."
      },
      {
        "question": "Điểm khác biệt của Xô viết Nghệ Tĩnh so với các hình thức chính quyền trước đó là gì?",
        "options": [
          "Chính quyền đầu tiên của giai cấp công nhân và nông dân",
          "Chính quyền của giai cấp tư sản",
          "Chính quyền phong kiến tiến bộ",
          "Chính quyền do quân đội Nhật lập ra"
        ],
        "correctAnswer": 0,
        "explanation": "Xô viết Nghệ Tĩnh là hình thức chính quyền cách mạng sơ khai của liên minh công - nông, do Đảng lãnh đạo."
      }
    ]
  },
  "chuong-3": {
    "title": "Phong trào dân chủ 1936–1939",
    "description": "Sự điều chỉnh sách lược của Đảng trong bối cảnh chống phát xít, đòi dân sinh, dân chủ.",
    "sections": [
      {
        "title": "Bảng so sánh Chủ trương 1930-1931 và 1936-1939",
        "type": "comparison-table",
        "table": {
          "headers": ["Tiêu chí", "1930 - 1931", "1936 - 1939"],
          "rows": [
            ["Kẻ thù", "Đế quốc Pháp và phong kiến", "Bọn phản động thuộc địa và tay sai"],
            ["Nhiệm vụ", "Độc lập dân tộc và người cày có ruộng", "Chống phát xít, chống chiến tranh, đòi tự do dân chủ"],
            ["Hình thức tập hợp", "Khối liên minh công nông", "Mặt trận Dân chủ Đông Dương (rất rộng rãi)"],
            ["Hình thức đấu tranh", "Bí mật, bạo trang", "Công khai, nửa công khai, hợp pháp, nghị trường"]
          ]
        }
      },
      {
        "title": "Timeline phong trào",
        "type": "timeline-mini",
        "content": [
          {
            "time": "Tháng 7/1936",
            "title": "Hội nghị Ban Chấp hành TW",
            "description": "Xác định kẻ thù và nhiệm vụ mới."
          },
          {
            "time": "Năm 1936",
            "title": "Phong trào Đông Dương đại hội",
            "description": "Thu thập dân nguyện đòi tự do dân chủ."
          },
          {
            "time": "Năm 1937",
            "title": "Phong trào đón Gô-đa",
            "description": "Biểu dương lực lượng quần chúng."
          },
          {
            "time": "Năm 1938",
            "title": "Mặt trận Dân chủ Đông Dương",
            "description": "Mở rộng khối đoàn kết toàn dân."
          }
        ]
      },
      {
        "title": "Trọng tâm thi",
        "type": "info-cards",
        "content": [
          {
            "title": "Ý nghĩa sách lược",
            "description": "Chứng minh sự trưởng thành của Đảng trong việc nhạy bén chuyển hướng sách lược, biết kết hợp mục tiêu trước mắt và lâu dài."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "Kẻ thù trước mắt của cách mạng Đông Dương được xác định trong giai đoạn 1936-1939 là:",
        "options": [
          "Đế quốc Pháp và địa chủ phong kiến",
          "Bọn phản động thuộc địa Pháp và tay sai",
          "Phát xít Nhật và Pháp",
          "Giai cấp tư sản mại bản"
        ],
        "correctAnswer": 1,
        "explanation": "Đảng nhận định kẻ thù nguy hiểm nhất lúc này không phải Pháp nói chung mà là bọn phản động không chịu thi hành chính sách dân chủ của Mặt trận nhân dân Pháp."
      },
      {
        "question": "Hình thức đấu tranh chủ yếu trong phong trào 1936-1939 là:",
        "options": [
          "Đấu tranh vũ trang, khởi nghĩa từng phần",
          "Công khai, hợp pháp, nửa công khai, nghị trường, báo chí",
          "Bãi công bí mật",
          "Đánh du kích"
        ],
        "correctAnswer": 1,
        "explanation": "Tận dụng cơ hội chính phủ cánh tả ở Pháp nới lỏng chính sách, Đảng chủ trương đấu tranh công khai, hợp pháp (báo chí, mít tinh, nghị trường)."
      }
    ]
  },
  "chuong-4": {
    "title": "Chuyển hướng chiến lược 1939–1941",
    "description": "Quá trình Đảng chuyển hướng chiến lược, đặt giải phóng dân tộc lên hàng đầu khi CTTG II bùng nổ.",
    "sections": [
      {
        "title": "Sự phát triển đường lối qua 3 Hội nghị Trung ương",
        "type": "three-pillars",
        "content": [
          {
            "title": "Hội nghị TW 6 (11/1939)",
            "description": "Bắt đầu chuyển hướng: Đặt giải phóng dân tộc lên hàng đầu, tạm gác khẩu hiệu cách mạng ruộng đất."
          },
          {
            "title": "Hội nghị TW 7 (11/1940)",
            "description": "Duy trì hướng giải phóng dân tộc, chỉ đạo các cuộc khởi nghĩa Bắc Sơn, Nam Kỳ."
          },
          {
            "title": "Hội nghị TW 8 (5/1941)",
            "description": "Hoàn chỉnh chuyển hướng: Thành lập Việt Minh, giải quyết vấn đề dân tộc trong từng nước, xác định khởi nghĩa vũ trang."
          }
        ]
      },
      {
        "title": "Lỗi thường gặp khi làm bài",
        "type": "info-cards",
        "content": [
          {
            "title": "Xác định sai thời điểm bắt đầu chuyển hướng",
            "description": "Chuyển hướng BẮT ĐẦU từ TW6 (1939) và HOÀN CHỈNH tại TW8 (1941), không phải đợi đến 1941 mới chuyển hướng."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "Sự kiện nào đánh dấu quá trình chuyển hướng chỉ đạo chiến lược hoàn chỉnh của Đảng trong thời kỳ 1939-1945?",
        "options": [
          "Hội nghị TW 6 (11/1939)",
          "Hội nghị TW 7 (11/1940)",
          "Hội nghị TW 8 (5/1941)",
          "Đại hội Quốc dân Tân Trào (8/1945)"
        ],
        "correctAnswer": 2,
        "explanation": "Hội nghị TW 8 do lãnh tụ Nguyễn Ái Quốc chủ trì đã hoàn chỉnh đường lối chuyển hướng chiến lược giải phóng dân tộc."
      }
    ]
  },
  "chuong-5": {
    "title": "Việt Minh, Kháng Nhật và Cách mạng Tháng Tám",
    "description": "Chuẩn bị lực lượng, chớp thời cơ và tiến hành Tổng khởi nghĩa lập ra nước VNDCCH.",
    "sections": [
      {
        "title": "Timeline 15 ngày Tổng khởi nghĩa",
        "type": "timeline-mini",
        "content": [
          {
            "time": "14-15/8/1945",
            "title": "Nhật đầu hàng",
            "description": "Hội nghị toàn quốc của Đảng phát lệnh Tổng khởi nghĩa."
          },
          {
            "time": "16/8/1945",
            "title": "Đại hội Tân Trào",
            "description": "Tán thành khởi nghĩa, lập Ủy ban Dân tộc giải phóng."
          },
          {
            "time": "19/8/1945",
            "title": "Giành chính quyền tại Hà Nội",
            "description": "Thắng lợi mang tính quyết định cổ vũ cả nước."
          },
          {
            "time": "23/8 & 25/8",
            "title": "Huế và Sài Gòn",
            "description": "Lần lượt giành chính quyền, Vua Bảo Đại thoái vị (30/8)."
          },
          {
            "time": "2/9/1945",
            "title": "Tuyên ngôn Độc lập",
            "description": "Khai sinh nước Việt Nam Dân chủ Cộng hòa."
          }
        ]
      },
      {
        "title": "Trọng tâm thi",
        "type": "info-cards",
        "content": [
          {
            "title": "Nguyên nhân thắng lợi nhanh chóng",
            "description": "Kết hợp sức mạnh dân tộc và thời đại. Chọn đúng thời cơ (Nhật đầu hàng nhưng Đồng minh chưa vào)."
          },
          {
            "title": "Nghệ thuật chớp thời cơ",
            "description": "Khoảng thời gian ngàn năm có một kéo dài khoảng 15 ngày."
          }
        ]
      }
    ],
    "quiz": [
      {
        "question": "Chỉ thị 'Nhật - Pháp bắn nhau và hành động của chúng ta' ra đời trong hoàn cảnh nào?",
        "options": [
          "Ngay khi Nhật tiến vào Đông Dương (9/1940)",
          "Khi Nhật đảo chính Pháp (9/3/1945)",
          "Khi Nhật đầu hàng Đồng minh (8/1945)",
          "Sau Đại hội Tân Trào (16/8/1945)"
        ],
        "correctAnswer": 1,
        "explanation": "Ngay sau khi Nhật đảo chính Pháp ngày 9/3/1945, Đảng ra chỉ thị xác định kẻ thù chính là phát xít Nhật và phát động cao trào kháng Nhật."
      },
      {
        "question": "Điều kiện nào được coi là thời cơ ngàn năm có một để Tổng khởi nghĩa?",
        "options": [
          "Pháp đầu hàng Đức ở châu Âu",
          "Nhật đảo chính Pháp",
          "Phát xít Nhật đầu hàng Đồng minh không điều kiện, quân Đồng minh chưa vào",
          "Liên Xô tuyên chiến với Nhật"
        ],
        "correctAnswer": 2,
        "explanation": "Thời cơ chín muồi khi kẻ thù trực tiếp ngã gục (Nhật đầu hàng), tạo ra khoảng trống quyền lực trước khi quân Đồng minh vào tước vũ khí."
      }
    ]
  }
};
`;

fs.writeFileSync(lessonsPath, newLessons, 'utf-8');
fs.writeFileSync(chapterDetailsPath, newChapterDetails, 'utf-8');

console.log('Successfully updated lessons.js and chapterDetails.js');
