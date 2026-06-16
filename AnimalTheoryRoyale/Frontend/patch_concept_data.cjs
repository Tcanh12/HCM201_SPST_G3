const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/conceptMapData.js');
let fileContent = fs.readFileSync(filePath, 'utf8');

const updates = {
  "vnr202-root": {
    title: "VNR202 – Đường lối đấu tranh cách mạng 1930–1945",
    shortDescription: "Bản đồ tổng hợp quá trình Đảng Cộng sản Việt Nam xác lập, điều chỉnh và hoàn thiện đường lối đấu tranh cách mạng từ khi ra đời đến thắng lợi của Cách mạng Tháng Tám.",
    coreContent: "Chủ đề tập trung phân tích sự phát triển đường lối qua các giai đoạn: Cương lĩnh chính trị đầu tiên năm 1930, Luận cương chính trị tháng 10/1930 và phong trào 1930–1931, phục hồi tổ chức Đảng 1932–1935, phong trào dân chủ 1936–1939, chuyển hướng chiến lược 1939–1945, thành lập Việt Minh, cao trào kháng Nhật cứu nước và Tổng khởi nghĩa tháng Tám năm 1945. Khi học, cần hiểu sự thay đổi giữa mục tiêu chiến lược lâu dài và nhiệm vụ trước mắt trong từng bối cảnh.",
    importance: "Đây là trục kiến thức trọng tâm của Chương 1 VNR202. Nội dung thường xuất hiện trong câu hỏi phân tích, so sánh Cương lĩnh với Luận cương, nhận xét chuyển hướng chiến lược và rút ra bài học về độc lập dân tộc, đại đoàn kết, nắm bắt thời cơ."
  },
  "cuong-linh-1930": {
    title: "Cương lĩnh chính trị đầu tiên",
    coreContent: "Cương lĩnh chính trị đầu tiên xác định phương hướng cách mạng Việt Nam là làm cách mạng dân tộc dân chủ, tiến tới xã hội cộng sản. Nhiệm vụ trước mắt là đánh đổ đế quốc Pháp và phong kiến, làm cho Việt Nam hoàn toàn độc lập. Điểm nổi bật là Cương lĩnh đặt vấn đề dân tộc lên vị trí trung tâm và có sách lược tập hợp lực lượng rộng rãi gồm công nhân, nông dân, tiểu tư sản, trí thức và các lực lượng yêu nước có thể tranh thủ.",
    importance: "Cương lĩnh thể hiện tư duy độc lập, sáng tạo của Nguyễn Ái Quốc trong việc vận dụng chủ nghĩa Mác – Lênin vào điều kiện thuộc địa Việt Nam. Đây là cơ sở quan trọng để so sánh với Luận cương tháng 10/1930."
  },
  "luan-cuong-1930": {
    title: "Luận cương chính trị 10/1930",
    coreContent: "Luận cương tháng 10/1930 xác định cách mạng Đông Dương là cách mạng tư sản dân quyền có tính chất thổ địa và phản đế, trong đó công nhân và nông dân là động lực chính. Văn kiện nhấn mạnh vai trò lãnh đạo của giai cấp công nhân và phương pháp đấu tranh cách mạng. Tuy nhiên, Luận cương còn hạn chế khi chưa đặt vấn đề giải phóng dân tộc lên vị trí nổi bật như Cương lĩnh đầu tiên và đánh giá chưa đầy đủ khả năng tham gia cách mạng của một số lực lượng yêu nước khác.",
    importance: "Đây là nội dung hay được hỏi ở dạng so sánh. Cần nắm cả ưu điểm và hạn chế của Luận cương để nhận xét sự phát triển đường lối của Đảng."
  },
  "xo-viet-nghe-tinh": {
    title: "Xô viết Nghệ Tĩnh",
    coreContent: "Xô viết Nghệ Tĩnh là đỉnh cao của phong trào cách mạng 1930–1931. Phong trào thể hiện sức mạnh đấu tranh của công nhân, nông dân và vai trò lãnh đạo của Đảng trong thực tiễn. Một số hình thức chính quyền cách mạng ở cơ sở xuất hiện, thể hiện khát vọng tự quản của quần chúng. Tuy bị đàn áp, phong trào đã rèn luyện lực lượng và để lại kinh nghiệm quan trọng cho các giai đoạn sau.",
    importance: "Xô viết Nghệ Tĩnh được xem là cuộc tổng diễn tập đầu tiên của cách mạng Việt Nam dưới sự lãnh đạo của Đảng."
  },
  "phuc-hoi-to-chuc": {
    title: "Phục hồi tổ chức 1932–1935",
    coreContent: "Sau tổn thất nặng nề của phong trào 1930–1931, Đảng từng bước khôi phục tổ chức thông qua hoạt động bí mật, chi bộ trong nhà tù, tuyên truyền, huấn luyện cán bộ và xây dựng lại cơ sở quần chúng. Đại hội I năm 1935 đánh dấu sự phục hồi về tổ chức và xác định nhiệm vụ củng cố Đảng, vận động quần chúng, chống đế quốc và chống chiến tranh.",
    importance: "Giai đoạn này cho thấy muốn có phong trào cách mạng bền vững thì phải có tổ chức, cán bộ và cơ sở quần chúng được chuẩn bị lâu dài."
  },
  "mat-tran-dan-chu": {
    title: "Phong trào dân chủ 1936–1939",
    coreContent: "Trong bối cảnh nguy cơ phát xít và chiến tranh thế giới tăng cao, Đảng điều chỉnh sách lược đấu tranh. Nhiệm vụ trước mắt là chống phát xít, chống chiến tranh, chống phản động thuộc địa, đòi tự do, dân chủ, cơm áo và hòa bình. Hình thức đấu tranh chuyển sang kết hợp công khai, nửa công khai, hợp pháp, nửa hợp pháp với hoạt động bí mật. Mặt trận Dân chủ Đông Dương là hình thức tập hợp lực lượng phù hợp trong giai đoạn này.",
    importance: "Giai đoạn 1936–1939 chứng minh sự linh hoạt của Đảng trong việc phân biệt mục tiêu chiến lược lâu dài với nhiệm vụ trước mắt."
  },
  "hoi-nghi-tw6": {
    title: "Hội nghị Trung ương 6",
    coreContent: "Hội nghị Trung ương 6 tháng 11/1939 mở đầu quá trình chuyển hướng chiến lược của Đảng. Trong bối cảnh Chiến tranh thế giới thứ hai bùng nổ, Đảng nhận định nhiệm vụ giải phóng dân tộc trở nên cấp bách, chủ trương rút vào hoạt động bí mật, chuyển trọng tâm về nông thôn và xây dựng mặt trận dân tộc thống nhất phản đế.",
    importance: "Đây là mốc mở đầu cho sự chuyển hướng từ đấu tranh dân chủ sang đấu tranh giải phóng dân tộc."
  },
  "hoi-nghi-tw8": {
    title: "Hội nghị Trung ương 8",
    coreContent: "Hội nghị Trung ương 8 tháng 5/1941 tại Pác Bó, Cao Bằng, dưới sự chỉ đạo của Nguyễn Ái Quốc, đã hoàn chỉnh chuyển hướng chiến lược giải phóng dân tộc. Hội nghị xác định nhiệm vụ trước mắt là giải phóng dân tộc, tạm gác khẩu hiệu cách mạng ruộng đất, thành lập Mặt trận Việt Minh và chuẩn bị khởi nghĩa vũ trang. Đây là quyết định có ý nghĩa trực tiếp đối với thắng lợi của Cách mạng Tháng Tám.",
    importance: "Hội nghị Trung ương 8 là mốc rất quan trọng trong VNR202. Cần ghi nhớ: đặt độc lập dân tộc lên hàng đầu, thành lập Việt Minh, chuẩn bị khởi nghĩa vũ trang."
  },
  "viet-minh": {
    title: "Mặt trận Việt Minh",
    coreContent: "Mặt trận Việt Minh là hình thức tổ chức khối đại đoàn kết dân tộc trong giai đoạn 1939–1945. Việt Minh tập hợp các lực lượng yêu nước không phân biệt giai cấp, tầng lớp, tôn giáo, nghề nghiệp, miễn là cùng mục tiêu đánh Pháp, đuổi Nhật, giành độc lập. Thông qua Việt Minh, lực lượng chính trị, lực lượng vũ trang và căn cứ địa cách mạng được xây dựng, mở rộng.",
    importance: "Việt Minh là minh chứng tiêu biểu cho bài học đại đoàn kết dân tộc và nghệ thuật tập hợp lực lượng của Đảng."
  },
  "cao-trao-khang-nhat": {
    title: "Cao trào kháng Nhật cứu nước",
    coreContent: "Sau khi Nhật đảo chính Pháp ngày 9/3/1945, Đảng ra chỉ thị 'Nhật – Pháp bắn nhau và hành động của chúng ta', xác định kẻ thù trước mắt là phát xít Nhật và phát động cao trào kháng Nhật cứu nước. Phong trào phá kho thóc giải quyết nạn đói, khởi nghĩa từng phần và xây dựng lực lượng vũ trang đã tạo khí thế cách mạng mạnh mẽ, chuẩn bị trực tiếp cho Tổng khởi nghĩa.",
    importance: "Cao trào kháng Nhật là bước chuẩn bị trực tiếp, biến lực lượng cách mạng từ thế chuẩn bị sang thế sẵn sàng giành chính quyền."
  },
  "tong-khoi-nghia": {
    title: "Tổng khởi nghĩa tháng Tám",
    coreContent: "Tổng khởi nghĩa tháng Tám năm 1945 diễn ra khi thời cơ cách mạng xuất hiện: Nhật đầu hàng Đồng minh, chính quyền tay sai hoang mang, quần chúng đã được chuẩn bị thông qua Việt Minh và cao trào kháng Nhật. Đảng kịp thời phát động toàn dân nổi dậy giành chính quyền trước khi quân Đồng minh vào Đông Dương. Thắng lợi này dẫn tới sự ra đời của nước Việt Nam Dân chủ Cộng hòa ngày 2/9/1945.",
    importance: "Đây là kết quả trực tiếp của đường lối giải phóng dân tộc đúng đắn, sự chuẩn bị lực lượng lâu dài và khả năng nắm bắt thời cơ của Đảng."
  },
  "dai-doan-ket": {
    title: "Đại đoàn kết dân tộc",
    coreContent: "Đại đoàn kết dân tộc là bài học lớn của giai đoạn 1930–1945, đặc biệt trong thời kỳ 1939–1945. Khi nhiệm vụ giải phóng dân tộc trở thành cấp bách, Đảng chủ trương tập hợp mọi lực lượng yêu nước, tạm gác những yêu cầu có thể chia rẽ lực lượng để hướng vào mục tiêu chung là độc lập dân tộc.",
    importance: "Bài học này giúp người học hiểu vì sao Mặt trận Việt Minh có vai trò quyết định trong thắng lợi của Cách mạng Tháng Tám."
  },
  "nam-bat-thoi-co": {
    title: "Nắm bắt thời cơ",
    coreContent: "Thời cơ cách mạng tháng Tám xuất hiện trong khoảng thời gian ngắn sau khi Nhật đầu hàng Đồng minh và trước khi quân Đồng minh vào Đông Dương. Đảng đã kịp thời phát lệnh Tổng khởi nghĩa, kết hợp lực lượng chính trị và vũ trang, giành chính quyền nhanh chóng trên phạm vi cả nước. Điều này cho thấy thời cơ chỉ có giá trị khi đã có sự chuẩn bị lực lượng và tổ chức từ trước.",
    importance: "Đây là bài học quan trọng về tư duy chiến lược: chuẩn bị lâu dài, hành động kịp thời, quyết đoán khi điều kiện chín muồi."
  }
};

for (const [id, data] of Object.entries(updates)) {
  const idRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?)(^  \\},|^\\];)`, 'gm');
  fileContent = fileContent.replace(idRegex, (match, p1, p2) => {
    let replaced = p1;
    if (data.title) replaced = replaced.replace(/title:\s*".*?",/, `title: "${data.title}",`);
    if (data.shortDescription) replaced = replaced.replace(/shortDescription:\s*".*?",/, `shortDescription: "${data.shortDescription}",`);
    if (data.coreContent) replaced = replaced.replace(/coreContent:\s*".*?",/, `coreContent: "${data.coreContent}",`);
    if (data.importance) replaced = replaced.replace(/importance:\s*".*?",/, `importance: "${data.importance}",`);
    return replaced + p2;
  });
}

fs.writeFileSync(filePath, fileContent);
console.log('Successfully patched conceptMapData.js');
