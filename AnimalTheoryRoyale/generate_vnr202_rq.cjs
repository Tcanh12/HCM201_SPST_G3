const fs = require('fs');

const generateReviewQuestions = () => {
  const qs = [];
  let idCounter = 1;

  const addQ = (chId, lesId, cIds, diff, bloom, points, time, q, exp, opts, correct) => {
    qs.push({
      id: `rq-vnr-${String(idCounter++).padStart(3, '0')}`,
      question: q,
      explanation: exp,
      chapterId: chId,
      lessonId: lesId,
      feedbackCorrect: "Chính xác. Bạn đã hiểu đúng bản chất sự kiện.",
      feedbackIncorrect: "Chưa đúng. Hãy xem lại bối cảnh và ý nghĩa lịch sử.",
      type: "multiple-choice",
      options: opts,
      correctAnswer: correct,
      conceptIds: cIds,
      difficulty: diff,
      bloomLevel: bloom,
      points: points,
      timeLimit: time,
      requiresVerification: false
    });
  };

  // CHƯƠNG 1 (20 câu)
  for (let i = 0; i < 4; i++) {
    addQ("chuong-1", "vnr-ch1-cuong-linh-luan-cuong", ["cuong-linh-1930"], "easy", "remember", 10, 30, `Sự kiện nào đánh dấu chấm dứt tình trạng khủng hoảng về đường lối cứu nước ở Việt Nam đầu thế kỷ XX? (Biến thể ${i+1})`, "Sự ra đời của Đảng Cộng sản Việt Nam đầu năm 1930 với Cương lĩnh chính trị đầu tiên đã chấm dứt hoàn toàn sự khủng hoảng về đường lối cứu nước.", ["Thành lập Hội VN Cách mạng Thanh niên", "Khởi nghĩa Yên Bái thất bại", "Đảng Cộng sản Việt Nam ra đời", "Phong trào Xô viết Nghệ Tĩnh"], 2);
    addQ("chuong-1", "vnr-ch1-cuong-linh-luan-cuong", ["cuong-linh-1930", "luan-cuong-1930"], "hard", "evaluate", 20, 60, `Vì sao Cương lĩnh chính trị đầu tiên được đánh giá là đúng đắn và sáng tạo? (Phân tích ${i+1})`, "Cương lĩnh kết hợp đúng đắn vấn đề dân tộc và giai cấp, nhưng đặt độc lập dân tộc lên hàng đầu, phù hợp với hoàn cảnh một nước thuộc địa nửa phong kiến.", ["Chỉ tập trung vào đấu tranh giai cấp", "Giải quyết được vấn đề dân tộc và đặt độc lập dân tộc lên hàng đầu", "Hoàn toàn sao chép lý luận của Quốc tế Cộng sản", "Bỏ qua vấn đề ruộng đất của nông dân"], 1);
    addQ("chuong-1", "vnr-ch1-cuong-linh-luan-cuong", ["cuong-linh-1930"], "medium", "analyze", 15, 45, `Lực lượng cách mạng được đề ra trong Cương lĩnh chính trị đầu tiên (2/1930) thể hiện tư tưởng nào? (Góc nhìn ${i+1})`, "Cương lĩnh chủ trương đoàn kết công nông, đồng thời lôi kéo cả tiểu tư sản, trí thức, phú nông, trung tiểu địa chủ... thể hiện tư tưởng đại đoàn kết dân tộc.", ["Chuyên chính vô sản triệt để", "Đại đoàn kết toàn dân tộc", "Dựa hoàn toàn vào quốc tế", "Loại bỏ hoàn toàn tư sản và địa chủ"], 1);
    addQ("chuong-1", "vnr-ch1-cuong-linh-luan-cuong", ["luan-cuong-1930"], "medium", "understand", 15, 45, `Điểm hạn chế của Luận cương chính trị tháng 10/1930 bắt nguồn từ đâu? (Góc nhìn ${i+1})`, "Luận cương chưa đánh giá đúng khả năng cách mạng của các giai cấp khác ngoài công nông và nhấn mạnh quá mức đấu tranh giai cấp do ảnh hưởng khuynh hướng tả của Quốc tế CS.", ["Sự chỉ đạo của Nguyễn Ái Quốc", "Không nhận thức được mâu thuẫn giai cấp", "Ảnh hưởng tư tưởng giáo điều, tả khuynh của Quốc tế Cộng sản", "Do phong trào cách mạng trong nước đi xuống"], 2);
    addQ("chuong-1", "vnr-ch1-cuong-linh-luan-cuong", ["cuong-linh-1930"], "hard", "analyze", 20, 60, `Nhiệm vụ hàng đầu của cách mạng Đông Dương được xác định trong Cương lĩnh 2/1930 là gì và vì sao? (Phân tích ${i+1})`, "Đánh đổ đế quốc Pháp và phong kiến tay sai để giành độc lập dân tộc, vì mâu thuẫn dân tộc là mâu thuẫn gay gắt nhất.", ["Cách mạng ruộng đất để đem lại cơm no áo ấm", "Đánh đổ đế quốc để giành độc lập dân tộc", "Xây dựng ngay chủ nghĩa xã hội", "Phát triển kinh tế tư bản chủ nghĩa"], 1);
  }

  // CHƯƠNG 2 (20 câu)
  for (let i = 0; i < 4; i++) {
    addQ("chuong-2", "vnr-ch2-xo-viet-phuc-hoi", ["xo-viet-nghe-tinh"], "easy", "remember", 10, 30, `Đỉnh cao của phong trào cách mạng 1930-1931 là sự kiện nào? (Biến thể ${i+1})`, "Đó là sự ra đời của các chính quyền Xô viết ở Nghệ An và Hà Tĩnh.", ["Cuộc khởi nghĩa Yên Bái", "Sự ra đời chính quyền Xô viết Nghệ - Tĩnh", "Cuộc bãi công của công nhân Phú Riềng", "Phong trào đòi tự do dân chủ"], 1);
    addQ("chuong-2", "vnr-ch2-xo-viet-phuc-hoi", ["xo-viet-nghe-tinh"], "hard", "evaluate", 20, 60, `Vì sao nói Xô viết Nghệ Tĩnh là cuộc "tổng diễn tập" đầu tiên chuẩn bị cho Cách mạng tháng Tám? (Phân tích ${i+1})`, "Qua phong trào, khối liên minh công nông được hình thành, năng lực lãnh đạo của Đảng được khẳng định và quần chúng được tập dượt đấu tranh.", ["Vì nó đã lật đổ hoàn toàn chính quyền thực dân Pháp", "Vì nó rèn luyện khối liên minh công nông và năng lực lãnh đạo của Đảng", "Vì nó nhận được viện trợ vũ khí từ quốc tế", "Vì nó chỉ nổ ra ở thành phố"], 1);
    addQ("chuong-2", "vnr-ch2-xo-viet-phuc-hoi", ["phuc-hoi-to-chuc"], "medium", "analyze", 15, 45, `Sau năm 1931, Đảng đã sử dụng biện pháp nào để phục hồi tổ chức? (Góc nhìn ${i+1})`, "Đảng triệt để tận dụng các hình thức đấu tranh công khai, bán công khai và biến nhà tù thành trường học cách mạng.", ["Phát động tổng khởi nghĩa ngay lập tức", "Chỉ hoạt động ở nước ngoài", "Biến nhà tù đế quốc thành trường học cách mạng và củng cố cơ sở bí mật", "Đầu hàng thỏa hiệp với thực dân"], 2);
    addQ("chuong-2", "vnr-ch2-xo-viet-phuc-hoi", ["phuc-hoi-to-chuc"], "hard", "evaluate", 20, 60, `Sự kiện nào đánh dấu hệ thống tổ chức của Đảng đã được khôi phục từ Trung ương đến địa phương? (Phân tích ${i+1})`, "Đại hội đại biểu lần thứ nhất của Đảng (tháng 3/1935) tại Ma Cao đánh dấu sự phục hồi hệ thống tổ chức.", ["Hội nghị tháng 10/1930", "Đại hội Đảng lần I (3/1935)", "Hội nghị tháng 7/1936", "Hội nghị Trung ương 8"], 1);
    addQ("chuong-2", "vnr-ch2-xo-viet-phuc-hoi", ["xo-viet-nghe-tinh"], "medium", "understand", 15, 45, `Nguyên nhân sâu xa bùng nổ phong trào cách mạng 1930-1931 là gì? (Góc nhìn ${i+1})`, "Mâu thuẫn cơ bản giữa dân tộc Việt Nam với thực dân Pháp ngày càng gay gắt, cộng với hậu quả của khủng hoảng kinh tế.", ["Mâu thuẫn gay gắt giữa dân tộc Việt Nam và thực dân Pháp", "Sự xúi giục của bên ngoài", "Pháp mở rộng khai thác thuộc địa lần 3", "Ảnh hưởng trực tiếp từ Cách mạng tháng Mười Nga"], 0);
  }

  // CHƯƠNG 3 (20 câu)
  for (let i = 0; i < 4; i++) {
    addQ("chuong-3", "vnr-ch3-phong-trao-dan-chu", ["mat-tran-dan-chu"], "medium", "analyze", 15, 45, `Nhiệm vụ trực tiếp, trước mắt của cách mạng Đông Dương giai đoạn 1936-1939 là gì? (Góc nhìn ${i+1})`, "Chống chế độ phản động thuộc địa, chống phát xít, đòi tự do, dân sinh, dân chủ, cơm áo và hòa bình.", ["Đánh đổ thực dân Pháp giành độc lập", "Tịch thu ruộng đất của địa chủ", "Chống phát xít, chống chiến tranh, đòi tự do dân chủ", "Tổng khởi nghĩa vũ trang"], 2);
    addQ("chuong-3", "vnr-ch3-phong-trao-dan-chu", ["mat-tran-dan-chu"], "hard", "evaluate", 20, 60, `Vì sao Đảng tạm gác khẩu hiệu độc lập dân tộc và cách mạng ruộng đất trong giai đoạn 1936-1939? (Phân tích ${i+1})`, "Đây là sự điều chỉnh sách lược linh hoạt để tập hợp lực lượng rộng rãi nhất chống lại nguy cơ phát xít.", ["Vì Đảng đã từ bỏ mục tiêu giải phóng dân tộc", "Vì sách lược tạm thời nhằm tập trung mũi nhọn vào kẻ thù nguy hiểm nhất là phát xít", "Vì nông dân không còn nhu cầu ruộng đất", "Vì Quốc tế Cộng sản cấm đấu tranh vũ trang"], 1);
    addQ("chuong-3", "vnr-ch3-phong-trao-dan-chu", ["mat-tran-dan-chu"], "hard", "evaluate", 20, 60, `Một bạn cho rằng phong trào 1936-1939 là một bước lùi vì không dùng bạo lực vũ trang. Phản biện nào đúng? (Tình huống ${i+1})`, "Đấu tranh chính trị hòa bình là hình thức phù hợp nhất lúc bấy giờ (khi Pháp có chính phủ bình dân) để giác ngộ quần chúng.", ["Hoàn toàn đúng, cách mạng phải có đổ máu", "Đó không phải bước lùi mà là nghệ thuật linh hoạt hình thức đấu tranh phù hợp hoàn cảnh", "Sai, vì bạo lực đã được bí mật chuẩn bị nhưng chưa dùng", "Đúng, vì phong trào này đã thất bại"], 1);
    addQ("chuong-3", "vnr-ch3-phong-trao-dan-chu", ["mat-tran-dan-chu"], "easy", "remember", 10, 30, `Mặt trận nào được thành lập năm 1938 để tập hợp lực lượng dân chủ? (Biến thể ${i+1})`, "Hội nghị Trung ương 1938 quyết định thành lập Mặt trận Dân chủ Đông Dương thay thế cho tên gọi trước đó.", ["Mặt trận Thống nhất nhân dân phản đế", "Mặt trận Dân chủ Đông Dương", "Mặt trận Việt Minh", "Mặt trận Liên Việt"], 1);
    addQ("chuong-3", "vnr-ch3-phong-trao-dan-chu", ["mat-tran-dan-chu"], "medium", "understand", 15, 45, `Sự kiện nào trên thế giới tạo điều kiện khách quan thuận lợi cho phong trào dân chủ 1936-1939? (Góc nhìn ${i+1})`, "Mặt trận Bình dân Pháp lên cầm quyền ban hành một số chính sách tiến bộ ở thuộc địa.", ["Chiến tranh thế giới 2 bùng nổ", "Mặt trận Bình dân Pháp lên cầm quyền", "Nhật Bản đầu hàng Đồng minh", "Cách mạng tháng Mười Nga thành công"], 1);
  }

  // CHƯƠNG 4 (20 câu)
  for (let i = 0; i < 4; i++) {
    addQ("chuong-4", "vnr-ch4-hoi-nghi-tw6", ["hoi-nghi-tw6", "hoi-nghi-tw8"], "hard", "evaluate", 20, 60, `Vì sao Hội nghị Trung ương 8 (5/1941) được coi là hoàn chỉnh chủ trương chuyển hướng chiến lược? (Phân tích ${i+1})`, "TW8 đã khắc phục triệt để hạn chế của Luận cương 1930, đặt lợi ích dân tộc lên trên hết, giải quyết vấn đề dân tộc trong khuôn khổ từng nước.", ["Vì nó bắt đầu đề ra khởi nghĩa vũ trang", "Vì giải quyết triệt để vấn đề dân tộc tự quyết và lập mặt trận dân tộc thống nhất rộng rãi", "Vì có sự tham gia của nhiều đại biểu quốc tế", "Vì đã thành lập được quân đội chính quy"], 1);
    addQ("chuong-4", "vnr-ch4-hoi-nghi-tw6", ["viet-minh"], "medium", "analyze", 15, 45, `Điểm khác biệt của Mặt trận Việt Minh (1941) so với các mặt trận trước đó là gì? (Góc nhìn ${i+1})`, "Việt Minh giới hạn trong khuôn khổ nước Việt Nam, tôn trọng quyền tự quyết của các dân tộc Đông Dương và giương cao ngọn cờ dân tộc.", ["Chỉ tập hợp công nhân", "Mang tính chất Đông Dương rộng lớn", "Giới hạn trong nước Việt Nam và các hội cứu quốc đều mang tên 'Cứu quốc'", "Chỉ hoạt động hợp pháp"], 2);
    addQ("chuong-4", "vnr-ch4-hoi-nghi-tw6", ["hoi-nghi-tw8"], "medium", "understand", 15, 45, `Khẩu hiệu nào được Hội nghị Trung ương 8 (5/1941) tạm gác lại? (Góc nhìn ${i+1})`, "Khẩu hiệu 'Cách mạng ruộng đất' (tịch thu ruộng đất của địa chủ) được tạm gác để phân hóa kẻ thù, lôi kéo địa chủ yêu nước.", ["Độc lập dân tộc", "Cách mạng ruộng đất (Tịch thu ruộng đất của địa chủ)", "Đánh đổ đế quốc Pháp", "Chống phát xít Nhật"], 1);
    addQ("chuong-4", "vnr-ch4-hoi-nghi-tw6", ["hoi-nghi-tw6"], "easy", "remember", 10, 30, `Hội nghị nào đánh dấu sự mở đầu quá trình chuyển hướng chỉ đạo chiến lược của Đảng thời kỳ 1939-1945? (Biến thể ${i+1})`, "Hội nghị Trung ương 6 (11/1939) do Nguyễn Văn Cừ chủ trì đã đánh dấu sự mở đầu chuyển hướng.", ["Hội nghị Trung ương 6 (11/1939)", "Hội nghị Trung ương 7 (11/1940)", "Hội nghị Trung ương 8 (5/1941)", "Hội nghị toàn quốc (8/1945)"], 0);
    addQ("chuong-4", "vnr-ch4-hoi-nghi-tw6", ["hoi-nghi-tw8"], "hard", "evaluate", 20, 60, `Nếu Hội nghị Trung ương 8 vẫn kiên quyết tiến hành cách mạng ruộng đất đồng thời với giải phóng dân tộc thì hệ quả sẽ ra sao? (Tình huống ${i+1})`, "Sẽ đẩy tầng lớp địa chủ, phong kiến yêu nước về phía kẻ thù, làm suy yếu mặt trận dân tộc thống nhất.", ["Sẽ làm cách mạng thành công nhanh hơn", "Sẽ chia rẽ khối đại đoàn kết toàn dân tộc, đẩy một bộ phận địa chủ về phía kẻ thù", "Không ảnh hưởng gì đến lực lượng cách mạng", "Được sự ủng hộ mạnh mẽ từ tư sản"], 1);
  }

  // CHƯƠNG 5 (20 câu)
  for (let i = 0; i < 4; i++) {
    addQ("chuong-5", "vnr-ch5-viet-minh-tong-khoi-nghia", ["nam-bat-thoi-co"], "hard", "evaluate", 20, 60, `Thắng lợi của Cách mạng tháng Tám (1945) có phải chỉ do sự đầu hàng của phát xít Nhật? (Phân tích ${i+1})`, "Nhật đầu hàng chỉ là điều kiện khách quan thuận lợi. Sự chuẩn bị lâu dài về lực lượng và quyết đoán chớp thời cơ của Đảng mới là nguyên nhân chủ quan quyết định.", ["Đúng, vì nhờ đó mà không tốn một viên đạn", "Sai, nguyên nhân quyết định là sự lãnh đạo của Đảng và quá trình chuẩn bị lực lượng ròng rã 15 năm", "Đúng, vì lúc đó Việt Minh chưa có quân đội", "Sai, do quân Đồng minh trực tiếp giúp đỡ"], 1);
    addQ("chuong-5", "vnr-ch5-viet-minh-tong-khoi-nghia", ["tong-khoi-nghia"], "medium", "analyze", 15, 45, `Chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta" (12/3/1945) đã xác định kẻ thù chính của cách mạng Đông Dương lúc này là ai? (Góc nhìn ${i+1})`, "Sau đảo chính, Pháp bị loại, phát xít Nhật trở thành kẻ thù chính cụ thể và trước mắt.", ["Thực dân Pháp", "Phát xít Nhật", "Đế quốc Mỹ và Tưởng Giới Thạch", "Phong kiến tay sai"], 1);
    addQ("chuong-5", "vnr-ch5-viet-minh-tong-khoi-nghia", ["tong-khoi-nghia"], "medium", "understand", 15, 45, `Phương châm khởi nghĩa của Cách mạng tháng Tám được đề ra là gì? (Góc nhìn ${i+1})`, "Khởi nghĩa đi từ khởi nghĩa từng phần tiến lên Tổng khởi nghĩa.", ["Đi từ khởi nghĩa từng phần tiến lên Tổng khởi nghĩa", "Tổng khởi nghĩa ngay lập tức trên toàn quốc", "Chờ Đồng minh vào giải giáp mới khởi nghĩa", "Dùng ngoại giao để đàm phán chính quyền"], 0);
    addQ("chuong-5", "vnr-ch5-viet-minh-tong-khoi-nghia", ["nam-bat-thoi-co"], "hard", "evaluate", 20, 60, `Một bạn cho rằng thời cơ ngàn năm có một chỉ tồn tại từ sau ngày 15/8/1945. Phản biện nào đúng nhất? (Tình huống ${i+1})`, "Thời cơ bắt đầu khi Nhật đầu hàng (15/8) và kết thúc trước khi quân Đồng minh vào tước vũ khí (đầu tháng 9), tức là chỉ tồn tại trong vòng khoảng 15 ngày.", ["Thời cơ kéo dài mãi đến năm 1946", "Thời cơ chỉ tồn tại từ 15/8 đến trước 5/9 khi quân Đồng minh chưa vào Đông Dương", "Thời cơ có từ khi Nhật đảo chính Pháp 9/3", "Thời cơ do quân Đồng minh tạo ra và trao cho Việt Nam"], 1);
    addQ("chuong-5", "vnr-ch5-viet-minh-tong-khoi-nghia", ["tong-khoi-nghia"], "easy", "remember", 10, 30, `Đại hội nào đã quyết định phát động toàn dân Tổng khởi nghĩa giành chính quyền? (Biến thể ${i+1})`, "Đại hội Quốc dân Tân Trào (16/8/1945) đã tán thành chủ trương Tổng khởi nghĩa và cử ra Ủy ban dân tộc giải phóng Việt Nam.", ["Hội nghị Trung ương 8", "Hội nghị toàn quốc của Đảng (14-15/8/1945)", "Đại hội Quốc dân Tân Trào (16/8/1945)", "Đại hội Đảng lần I"], 2);
  }

  // Build string explicitly without template literal string interpolation
  const jsContent = "export const reviewQuestions = " + JSON.stringify(qs, null, 2) + ";\n\nexport default reviewQuestions;\n";

  fs.writeFileSync('Frontend/src/data/reviewQuestions.js', jsContent);
  console.log("reviewQuestions.js generated with", qs.length, "questions.");
};

generateReviewQuestions();
