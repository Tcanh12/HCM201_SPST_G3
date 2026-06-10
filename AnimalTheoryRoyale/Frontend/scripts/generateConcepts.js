import fs from 'fs';
import path from 'path';

const chapters = [
  { id: "chuong-1", title: "Chương 1", chapterTitle: "Khái niệm, đối tượng, phương pháp nghiên cứu và ý nghĩa học tập môn tư tưởng Hồ Chí Minh" },
  { id: "chuong-2", title: "Chương 2", chapterTitle: "Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh" },
  { id: "chuong-3", title: "Chương 3", chapterTitle: "Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội" },
  { id: "chuong-4", title: "Chương 4", chapterTitle: "Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam và Nhà nước của nhân dân, do nhân dân, vì nhân dân" },
  { id: "chuong-5", title: "Chương 5", chapterTitle: "Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế" },
  { id: "chuong-6", title: "Chương 6", chapterTitle: "Tư tưởng Hồ Chí Minh về văn hóa, đạo đức, con người" }
];

const enrichedConcepts = {
  "tu-tuong-ho-chi-minh": {
    shortDescription: "Hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, là kết quả của sự vận dụng và phát triển sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của nước ta.",
    definition: "Tư tưởng Hồ Chí Minh là một hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam, từ cách mạng dân tộc dân chủ nhân dân đến cách mạng xã hội chủ nghĩa.",
    whyImportant: "Là kim chỉ nam cho hành động của Đảng và cách mạng Việt Nam, định hướng sự phát triển của đất nước trên con đường độc lập dân tộc gắn liền với chủ nghĩa xã hội.",
    explanation: "Đó không chỉ là lý luận mà còn là phương pháp và phong cách hành động, kế thừa truyền thống dân tộc và tinh hoa nhân loại.",
    keyIdeas: [
      "Là hệ thống quan điểm toàn diện về cách mạng Việt Nam.",
      "Kế thừa tinh hoa văn hóa dân tộc và nhân loại.",
      "Vận dụng sáng tạo chủ nghĩa Mác - Lênin vào Việt Nam."
    ],
    applications: ["Áp dụng vào việc định hướng chiến lược phát triển đất nước.", "Vận dụng trong rèn luyện đạo đức cá nhân."],
    commonMisconceptions: ["Cho rằng tư tưởng Hồ Chí Minh chỉ là sự lặp lại chủ nghĩa Mác - Lênin mà không có sự sáng tạo."],
    reflectionQuestions: ["Tư tưởng Hồ Chí Minh có ý nghĩa như thế nào đối với thế hệ trẻ hiện nay?"]
  },
  "khai-niem-tu-tuong-ho-chi-minh": {
    shortDescription: "Định nghĩa chính thức về Tư tưởng Hồ Chí Minh do Đảng Cộng sản Việt Nam đúc kết.",
    definition: "Theo Đại hội đại biểu toàn quốc lần thứ XI (2011), Tư tưởng Hồ Chí Minh là một hệ thống quan điểm toàn diện và sâu sắc về những vấn đề cơ bản của cách mạng Việt Nam...",
    whyImportant: "Cung cấp nhận thức chuẩn xác và chính thống làm cơ sở cho toàn bộ quá trình nghiên cứu và học tập.",
    explanation: "Khái niệm này làm rõ bản chất cách mạng, khoa học của tư tưởng Hồ Chí Minh và khẳng định nguồn gốc hình thành của nó.",
    keyIdeas: [
      "Hệ thống quan điểm toàn diện về cách mạng.",
      "Kết quả vận dụng sáng tạo chủ nghĩa Mác - Lênin.",
      "Kế thừa truyền thống tốt đẹp của dân tộc."
    ],
    applications: ["Làm cơ sở phương pháp luận khi phân tích các chính sách của Nhà nước."],
    commonMisconceptions: ["Chỉ xem tư tưởng Hồ Chí Minh là các bài viết, bài nói rời rạc thay vì một hệ thống lý luận chặt chẽ."],
    reflectionQuestions: ["Yếu tố nào trong khái niệm thể hiện rõ nhất tính sáng tạo của Hồ Chí Minh?"]
  },
  "doi-tuong-nghien-cuu": {
    shortDescription: "Nghiên cứu hệ thống quan điểm của Hồ Chí Minh và quá trình hiện thực hóa các quan điểm đó.",
    definition: "Đối tượng nghiên cứu của môn học là hệ thống các quan điểm lý luận của Hồ Chí Minh và quá trình vận động, thực tiễn hóa các quan điểm đó trong cách mạng Việt Nam.",
    whyImportant: "Giúp sinh viên xác định đúng trọng tâm học tập, không bị nhầm lẫn sang môn Lịch sử Đảng hay Triết học.",
    explanation: "Học tư tưởng Hồ Chí Minh không chỉ là học câu chữ, mà phải học cách Người giải quyết các vấn đề thực tiễn của cách mạng.",
    keyIdeas: [
      "Nghiên cứu hệ thống quan điểm lý luận.",
      "Nghiên cứu quá trình hiện thực hóa trong thực tiễn."
    ],
    applications: ["Áp dụng để phân tích một sự kiện lịch sử dưới góc độ tư tưởng."],
    commonMisconceptions: ["Nhầm lẫn đối tượng nghiên cứu của môn này với môn Lịch sử Đảng Cộng sản Việt Nam."],
    reflectionQuestions: ["Sự khác biệt giữa việc học Lịch sử Đảng và học Tư tưởng Hồ Chí Minh là gì?"]
  },
  "phuong-phap-nghien-cuu": {
    shortDescription: "Các nguyên tắc và phương pháp khoa học để tiếp cận và hiểu đúng tư tưởng Hồ Chí Minh.",
    definition: "Bao gồm phương pháp luận duy vật biện chứng và duy vật lịch sử, cùng các phương pháp cụ thể như lôgic lịch sử, phân tích tổng hợp.",
    whyImportant: "Cung cấp công cụ tư duy đúng đắn để không bị suy diễn sai lệch hoặc hiểu một cách giáo điều tư tưởng của Bác.",
    explanation: "Sử dụng quan điểm toàn diện và lịch sử cụ thể để đặt các luận điểm của Bác vào đúng hoàn cảnh ra đời của nó.",
    keyIdeas: [
      "Thống nhất lý luận và thực tiễn.",
      "Quan điểm lịch sử - cụ thể.",
      "Quan điểm toàn diện và hệ thống."
    ],
    applications: ["Đánh giá khách quan các chính sách và quyết định lịch sử."],
    commonMisconceptions: ["Tách rời các câu nói của Bác ra khỏi hoàn cảnh lịch sử cụ thể để suy diễn."],
    reflectionQuestions: ["Vì sao phương pháp lịch sử - cụ thể lại đặc biệt quan trọng khi nghiên cứu tư tưởng Hồ Chí Minh?"]
  },
  "co-so-hinh-thanh": {
    shortDescription: "Những nền tảng khách quan và chủ quan tạo nên tư tưởng Hồ Chí Minh.",
    definition: "Bao gồm cơ sở khách quan (bối cảnh lịch sử, truyền thống dân tộc, tinh hoa văn hóa nhân loại, chủ nghĩa Mác-Lênin) và nhân tố chủ quan (phẩm chất cá nhân).",
    whyImportant: "Chứng minh tư tưởng Hồ Chí Minh ra đời là một tất yếu lịch sử, không phải là sự ngẫu nhiên.",
    explanation: "Tư tưởng Bác là sự hội tụ tinh hoa của dân tộc và thời đại, được nhào nặn qua trí tuệ và thiên tài của Người.",
    keyIdeas: [
      "Truyền thống tốt đẹp của dân tộc Việt Nam.",
      "Tinh hoa văn hóa nhân loại (Đông - Tây).",
      "Chủ nghĩa Mác - Lênin là cơ sở lý luận quyết định.",
      "Nhân tố chủ quan của Hồ Chí Minh."
    ],
    applications: ["Biết cách kế thừa và phát huy các giá trị truyền thống trong thời đại mới."],
    commonMisconceptions: ["Chỉ nhấn mạnh chủ nghĩa Mác - Lênin mà hạ thấp truyền thống dân tộc trong việc hình thành tư tưởng Bác."],
    reflectionQuestions: ["Trong các cơ sở hình thành, cơ sở nào mang tính quyết định nhất? Vì sao?"]
  },
  "truyen-thong-dan-toc": {
    shortDescription: "Nền tảng văn hóa, tư tưởng đầu tiên nuôi dưỡng tâm hồn và lý trí của Hồ Chí Minh.",
    definition: "Là chủ nghĩa yêu nước, tinh thần đoàn kết, nhân nghĩa, và ý chí tự lực tự cường của dân tộc Việt Nam hàng ngàn năm lịch sử.",
    whyImportant: "Là động lực căn bản thúc đẩy Hồ Chí Minh ra đi tìm đường cứu nước và là điểm tựa để Người tiếp thu chủ nghĩa Mác-Lênin.",
    explanation: "Chủ nghĩa yêu nước là dòng chủ lưu của lịch sử văn hóa Việt Nam, Bác đã hấp thụ nó từ gia đình, quê hương.",
    keyIdeas: [
      "Chủ nghĩa yêu nước là giá trị xuyên suốt.",
      "Tinh thần đoàn kết, tương thân tương ái.",
      "Ý chí đấu tranh bất khuất."
    ],
    applications: ["Giáo dục lòng yêu nước và tự hào dân tộc cho thế hệ trẻ."],
    commonMisconceptions: ["Cho rằng chủ nghĩa yêu nước của Bác hoàn toàn giống với chủ nghĩa quốc gia hẹp hòi."],
    reflectionQuestions: ["Chủ nghĩa yêu nước truyền thống đã được Hồ Chí Minh nâng tầm như thế nào?"]
  },
  "chu-nghia-mac-lenin": {
    shortDescription: "Cơ sở lý luận khoa học quyết định bước phát triển về chất của tư tưởng Hồ Chí Minh.",
    definition: "Học thuyết cách mạng tiên tiến nhất của thời đại, cung cấp thế giới quan và phương pháp luận khoa học cho Hồ Chí Minh.",
    whyImportant: "Là yếu tố quyết định bước ngoặt từ một người yêu nước trở thành một người cộng sản.",
    explanation: "Không có chủ nghĩa Mác-Lênin, phong trào yêu nước Việt Nam vẫn luẩn quẩn trong bế tắc. Bác tìm thấy ở đây con đường cứu nước đúng đắn.",
    keyIdeas: [
      "Cung cấp phương pháp luận khoa học.",
      "Chỉ ra con đường cách mạng vô sản.",
      "Là cơ sở lý luận quyết định nhất."
    ],
    applications: ["Vận dụng phương pháp luận duy vật biện chứng vào phân tích xã hội."],
    commonMisconceptions: ["Hồ Chí Minh chỉ sao chép nguyên xi chủ nghĩa Mác - Lênin mà không có sự sáng tạo."],
    reflectionQuestions: ["Hồ Chí Minh đã vận dụng sáng tạo chủ nghĩa Mác - Lênin vào điều kiện Việt Nam như thế nào?"]
  },
  "nhan-to-chu-quan": {
    shortDescription: "Phẩm chất, tài năng và trí tuệ thiên tài của cá nhân Hồ Chí Minh.",
    definition: "Sự kết hợp giữa tư duy độc lập, tự chủ, sáng tạo; sự khổ công học tập, rèn luyện; và tâm hồn, đạo đức cách mạng cao cả của Bác.",
    whyImportant: "Giải thích vì sao trong cùng một bối cảnh lịch sử, chỉ có Hồ Chí Minh mới tìm ra được con đường cứu nước đúng đắn.",
    explanation: "Hoàn cảnh khách quan tạo ra thời cơ, nhưng chính phẩm chất thiên tài của Bác mới là nhân tố trực tiếp biến khả năng thành hiện thực.",
    keyIdeas: [
      "Tư duy độc lập, sáng tạo.",
      "Nghị lực phi thường, chịu đựng gian khổ.",
      "Tình yêu thương con người bao la."
    ],
    applications: ["Học tập tấm gương tự học, tự rèn luyện và tư duy độc lập của Bác."],
    commonMisconceptions: ["Cho rằng thành công của Bác hoàn toàn do may mắn của bối cảnh thời đại."],
    reflectionQuestions: ["Nhân tố chủ quan nào của Hồ Chí Minh mà bạn ấn tượng nhất và muốn học theo?"]
  },
  "doc-lap-dan-toc": {
    shortDescription: "Độc lập dân tộc là quyền thiêng liêng, bất khả xâm phạm; phải gắn liền với tự do, hạnh phúc của nhân dân.",
    definition: "Là sự thống nhất toàn vẹn lãnh thổ, không can thiệp từ bên ngoài, và nhân dân được hưởng tự do, hạnh phúc thực sự.",
    whyImportant: "Giúp sinh viên hiểu vì sao độc lập dân tộc là mục tiêu hàng đầu của cách mạng Việt Nam và vì sao độc lập không chỉ dừng ở chủ quyền lãnh thổ.",
    explanation: "Độc lập mà nhân dân không được hưởng hạnh phúc, tự do thì độc lập ấy không có ý nghĩa. Nó phải mang lại ấm no cho dân.",
    keyIdeas: [
      "Là quyền thiêng liêng, bất khả xâm phạm.",
      "Độc lập phải hoàn toàn và thật sự.",
      "Độc lập dân tộc gắn liền với tự do, hạnh phúc của nhân dân."
    ],
    applications: ["Bảo vệ độc lập chủ quyền trên không gian mạng và đời sống thực."],
    commonMisconceptions: ["Hiểu độc lập dân tộc chỉ là độc lập lãnh thổ mà quên đi yếu tố tự do, hạnh phúc của nhân dân."],
    reflectionQuestions: ["Vì sao Bác nói 'Nếu nước độc lập mà dân không hưởng hạnh phúc tự do, thì độc lập cũng chẳng có ý nghĩa gì'?"]
  },
  "cach-mang-giai-phong-dan-toc": {
    shortDescription: "Cách mạng giải phóng dân tộc muốn thắng lợi phải đi theo con đường cách mạng vô sản.",
    definition: "Là cuộc đấu tranh để đánh đổ ách thống trị của chủ nghĩa thực dân, giành độc lập dân tộc, do Đảng Cộng sản lãnh đạo.",
    whyImportant: "Vạch ra đường lối chiến lược, phương pháp đấu tranh đúng đắn để giành thắng lợi.",
    explanation: "Cách mạng giải phóng dân tộc ở thuộc địa phải dựa vào sức mình là chính, có thể nổ ra và giành thắng lợi trước cách mạng vô sản ở chính quốc.",
    keyIdeas: [
      "Đi theo con đường cách mạng vô sản.",
      "Do Đảng Cộng sản lãnh đạo.",
      "Là sự nghiệp của toàn dân.",
      "Tiến hành chủ động, sáng tạo."
    ],
    applications: ["Xây dựng tinh thần tự lực, tự cường trong phát triển quốc gia hiện nay."],
    commonMisconceptions: ["Cho rằng cách mạng thuộc địa hoàn toàn phụ thuộc vào cách mạng ở chính quốc."],
    reflectionQuestions: ["Vì sao Hồ Chí Minh khẳng định cách mạng giải phóng dân tộc cần được tiến hành chủ động và có thể thắng lợi trước cách mạng ở chính quốc?"]
  },
  "chu-nghia-xa-hoi": {
    shortDescription: "Xã hội không có chế độ bóc lột người, một xã hội do nhân dân lao động làm chủ.",
    definition: "Là giai đoạn đầu của hình thái kinh tế - xã hội cộng sản chủ nghĩa, với mục tiêu cao nhất là giải phóng con người, mang lại ấm no, tự do, hạnh phúc.",
    whyImportant: "Định hướng mục tiêu lâu dài của cách mạng Việt Nam sau khi giành độc lập.",
    explanation: "Chủ nghĩa xã hội theo Bác rất thiết thực: là mọi người được ăn no, mặc ấm, được học hành, được chăm sóc y tế.",
    keyIdeas: [
      "Do nhân dân lao động làm chủ.",
      "Nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại.",
      "Không còn người bóc lột người."
    ],
    applications: ["Đóng góp vào công cuộc xây dựng xã hội công bằng, dân chủ, văn minh."],
    commonMisconceptions: ["Đồng nhất chủ nghĩa xã hội với một mô hình cứng nhắc, nghèo nàn, cào bằng."],
    reflectionQuestions: ["Đặc trưng nổi bật nhất của chủ nghĩa xã hội theo tư tưởng Hồ Chí Minh là gì?"]
  },
  "doc-lap-dan-toc-gan-lien-cnxh": {
    shortDescription: "Sợi chỉ đỏ xuyên suốt tư tưởng Hồ Chí Minh và đường lối cách mạng Việt Nam.",
    definition: "Độc lập dân tộc là tiền đề để tiến lên chủ nghĩa xã hội; và chủ nghĩa xã hội là cơ sở vững chắc để bảo vệ nền độc lập dân tộc.",
    whyImportant: "Khẳng định con đường đi lên tất yếu của cách mạng Việt Nam, tránh những sai lầm chệch hướng.",
    explanation: "Nếu chỉ giành độc lập mà không tiến lên CNXH thì dân không có ấm no hạnh phúc thực sự; ngược lại, mất độc lập thì không thể xây dựng CNXH.",
    keyIdeas: [
      "Độc lập dân tộc là điều kiện tiên quyết.",
      "CNXH là nền tảng bảo đảm cho độc lập bền vững.",
      "Là quy luật phát triển tất yếu của cách mạng Việt Nam."
    ],
    applications: ["Hiểu và bảo vệ đường lối đổi mới của Đảng hiện nay."],
    commonMisconceptions: ["Cho rằng trong thời đại toàn cầu hóa có thể giữ độc lập dân tộc mà không cần định hướng xã hội chủ nghĩa."],
    reflectionQuestions: ["Thực tiễn Việt Nam hiện nay đã chứng minh tính đúng đắn của mối quan hệ này như thế nào?"]
  },
  "dang-cong-san-viet-nam": {
    shortDescription: "Nhân tố quyết định mọi thắng lợi của cách mạng Việt Nam.",
    definition: "Là đội tiên phong của giai cấp công nhân, đồng thời là đội tiên phong của nhân dân lao động và của dân tộc Việt Nam.",
    whyImportant: "Khẳng định vai trò lãnh đạo tuyệt đối, toàn diện của Đảng đối với cách mạng và xã hội.",
    explanation: "Đảng không có lợi ích nào khác ngoài lợi ích của giai cấp, của nhân dân và của dân tộc.",
    keyIdeas: [
      "Sự ra đời của Đảng là quy luật tất yếu.",
      "Đảng mang bản chất giai cấp công nhân.",
      "Đảng phải luôn trong sạch, vững mạnh."
    ],
    applications: ["Tham gia xây dựng Đảng và hệ thống chính trị trong sạch, vững mạnh."],
    commonMisconceptions: ["Tách rời lợi ích của Đảng với lợi ích của dân tộc."],
    reflectionQuestions: ["Vì sao nói Đảng Cộng sản Việt Nam mang bản chất giai cấp công nhân nhưng lại là đội tiên phong của toàn dân tộc?"]
  },
  "nha-nuoc-cua-dan": {
    shortDescription: "Tất cả quyền lực nhà nước thuộc về nhân dân.",
    definition: "Nhà nước mà nhân dân là người chủ tối cao, có quyền quyết định những vấn đề quan trọng nhất của đất nước.",
    whyImportant: "Chỉ ra bản chất dân chủ của chế độ mới, khác biệt hoàn toàn với nhà nước phong kiến, tư sản.",
    explanation: "Dân là chủ và dân làm chủ. Cán bộ nhà nước chỉ là công bộc của dân, do dân ủy quyền.",
    keyIdeas: [
      "Dân là người chủ tối cao.",
      "Quyền lực nhà nước là do nhân dân ủy thác.",
      "Nhân dân có quyền bãi miễn đại biểu không xứng đáng."
    ],
    applications: ["Thực hiện tốt quyền bầu cử và giám sát cơ quan nhà nước."],
    commonMisconceptions: ["Nhầm lẫn giữa quyền làm chủ của nhân dân với sự tùy tiện, vô tổ chức."],
    reflectionQuestions: ["Làm thế nào để phát huy thực chất quyền làm chủ của nhân dân hiện nay?"]
  },
  "can-bo": {
    shortDescription: "Cán bộ là cái gốc của mọi công việc.",
    definition: "Là những người đem chính sách của Đảng, của Chính phủ giải thích cho dân chúng hiểu và thi hành, đồng thời đem tình hình của dân báo cáo lại.",
    whyImportant: "Nhấn mạnh vai trò quyết định của công tác cán bộ đối với sự thành bại của cách mạng.",
    explanation: "Muôn việc thành công hoặc thất bại đều do cán bộ tốt hoặc kém. Cán bộ phải vừa có 'đức' vừa có 'tài', trong đó 'đức' là gốc.",
    keyIdeas: [
      "Cán bộ là cái dây chuyền của bộ máy.",
      "Phải có đạo đức cách mạng làm nền tảng.",
      "Phải sâu sát quần chúng, hiểu dân."
    ],
    applications: ["Rèn luyện bản thân trở thành nguồn nhân lực chất lượng cao, có đạo đức."],
    commonMisconceptions: ["Tuyển chọn cán bộ chỉ chú trọng tài năng mà coi nhẹ phẩm chất đạo đức."],
    reflectionQuestions: ["Vì sao Chủ tịch Hồ Chí Minh lại coi đạo đức là cái gốc của người cán bộ?"]
  },
  "dai-doan-ket": {
    shortDescription: "Đoàn kết là sức mạnh vô địch, là chiến lược sống còn của cách mạng Việt Nam.",
    definition: "Là sự liên kết chặt chẽ, rộng rãi của mọi lực lượng, mọi tầng lớp nhân dân trong một mặt trận thống nhất nhằm thực hiện mục tiêu chung.",
    whyImportant: "Là bài học lớn nhất, là nhân tố quyết định bảo đảm thắng lợi cho cách mạng giải phóng dân tộc và xây dựng đất nước.",
    explanation: "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công. Sức mạnh dân tộc chỉ có được khi quy tụ được lòng dân.",
    keyIdeas: [
      "Đại đoàn kết là chiến lược cơ bản, lâu dài.",
      "Lực lượng đại đoàn kết là toàn dân.",
      "Đại đoàn kết phải được xây dựng trên cơ sở bảo đảm lợi ích tối cao của dân tộc."
    ],
    applications: ["Xây dựng khối đoàn kết trong tập thể lớp, trong công ty và cộng đồng."],
    commonMisconceptions: ["Đoàn kết là một chiều, xóa bỏ mọi sự khác biệt cá nhân."],
    reflectionQuestions: ["Làm thế nào để thực hiện đại đoàn kết trong điều kiện xã hội đa dạng hiện nay?"]
  },
  "mat-tran-dan-toc-thong-nhat": {
    shortDescription: "Tổ chức chính trị - xã hội rộng rãi nhất quy tụ sức mạnh đại đoàn kết toàn dân tộc.",
    definition: "Là hình thức tổ chức của khối đại đoàn kết dân tộc, tập hợp mọi giai cấp, tầng lớp, tôn giáo, dân tộc dưới sự lãnh đạo của Đảng.",
    whyImportant: "Tạo ra một lực lượng vật chất to lớn để thực hiện thắng lợi các nhiệm vụ cách mạng.",
    explanation: "Mặt trận là nơi quy tụ mọi người con đất Việt yêu nước, không phân biệt thành phần xuất thân, miễn là đồng ý với mục tiêu chung.",
    keyIdeas: [
      "Mặt trận hoạt động theo nguyên tắc hiệp thương dân chủ.",
      "Đảng vừa là thành viên, vừa là lực lượng lãnh đạo Mặt trận.",
      "Đoàn kết lâu dài, rộng rãi, chặt chẽ."
    ],
    applications: ["Tham gia các hoạt động cộng đồng, các tổ chức đoàn thể xã hội."],
    commonMisconceptions: ["Mặt trận chỉ là một tổ chức bù nhìn, không có quyền lực thực chất."],
    reflectionQuestions: ["Vai trò của Mặt trận Tổ quốc Việt Nam trong việc giám sát và phản biện xã hội hiện nay là gì?"]
  },
  "doan-ket-quoc-te": {
    shortDescription: "Kết hợp sức mạnh dân tộc với sức mạnh thời đại.",
    definition: "Là sự liên kết, hợp tác với các lực lượng cách mạng, tiến bộ và yêu chuộng hòa bình trên thế giới.",
    whyImportant: "Tạo thêm nguồn lực, sức mạnh tổng hợp để đánh thắng kẻ thù và xây dựng đất nước.",
    explanation: "Cách mạng Việt Nam là một bộ phận của cách mạng thế giới. Việc tranh thủ sự ủng hộ quốc tế là vô cùng quan trọng.",
    keyIdeas: [
      "Đoàn kết với phong trào cộng sản và công nhân quốc tế.",
      "Đoàn kết với các dân tộc bị áp bức.",
      "Đoàn kết với các lực lượng yêu chuộng hòa bình."
    ],
    applications: ["Tham gia hội nhập quốc tế, giao lưu văn hóa với bạn bè quốc tế một cách có bản lĩnh."],
    commonMisconceptions: ["Đoàn kết quốc tế là ỷ lại, dựa dẫm vào nước ngoài."],
    reflectionQuestions: ["Trong bối cảnh hội nhập hiện nay, đoàn kết quốc tế mang ý nghĩa như thế nào?"]
  },
  "van-hoa": {
    shortDescription: "Văn hóa soi đường cho quốc dân đi.",
    definition: "Là toàn bộ những giá trị vật chất và tinh thần do loài người sáng tạo ra. Trong tư tưởng Hồ Chí Minh, văn hóa là đời sống tinh thần của xã hội.",
    whyImportant: "Văn hóa là nền tảng tinh thần, là mục tiêu và động lực của sự phát triển kinh tế - xã hội.",
    explanation: "Văn hóa không thể đứng ngoài mà phải ở trong kinh tế và chính trị. Phải làm cho văn hóa thấm sâu vào tâm lý quốc dân.",
    keyIdeas: [
      "Văn hóa có tính dân tộc, khoa học, đại chúng.",
      "Văn hóa là động lực của sự phát triển.",
      "Chức năng của văn hóa là bồi dưỡng con người."
    ],
    applications: ["Xây dựng lối sống văn hóa lành mạnh, giữ gìn bản sắc văn hóa dân tộc trên không gian mạng."],
    commonMisconceptions: ["Coi văn hóa chỉ là các hoạt động giải trí, nghệ thuật thuần túy."],
    reflectionQuestions: ["Làm thế nào để phát triển văn hóa trong bối cảnh công nghiệp hóa, hiện đại hóa?"]
  },
  "dao-duc-cach-mang": {
    shortDescription: "Là gốc, là nền tảng của người cách mạng.",
    definition: "Là những phẩm chất tốt đẹp nhất của con người được hình thành và rèn luyện trong thực tiễn đấu tranh cách mạng: trung với nước, hiếu với dân...",
    whyImportant: "Đạo đức tạo nên sức mạnh nội tâm, giúp con người vượt qua mọi cám dỗ và khó khăn.",
    explanation: "Giống như sông có nguồn thì mới có nước, người cách mạng phải có đạo đức, không có đạo đức thì tài giỏi mấy cũng không lãnh đạo được dân.",
    keyIdeas: [
      "Trung với nước, hiếu với dân.",
      "Yêu thương con người.",
      "Cần, kiệm, liêm, chính, chí công vô tư."
    ],
    applications: ["Rèn luyện đạo đức nghề nghiệp, sự trung thực trong học tập và công việc."],
    commonMisconceptions: ["Cho rằng đạo đức cách mạng là sự khắc kỷ, khổ hạnh, từ bỏ mọi nhu cầu cá nhân chính đáng."],
    reflectionQuestions: ["Sự khác biệt giữa đạo đức cách mạng và đạo đức truyền thống phong kiến là gì?"]
  },
  "can-kiem-liem-chinh": {
    shortDescription: "Bốn đức tính cốt lõi của con người mới xã hội chủ nghĩa.",
    definition: "Cần là siêng năng; Kiệm là tiết kiệm; Liêm là trong sạch; Chính là ngay thẳng, không tà.",
    whyImportant: "Là thước đo phẩm giá con người, là điều kiện để xây dựng đất nước phồn vinh.",
    explanation: "Thiếu một đức thì không thành người. Bốn đức tính này gắn bó mật thiết với nhau, làm tiền đề cho nhau.",
    keyIdeas: [
      "Cần: lao động cần cù, sáng tạo.",
      "Kiệm: tiết kiệm thời gian, tiền bạc, sức lực.",
      "Liêm: không tham lam, giữ gìn sự trong sạch.",
      "Chính: trung thực, thẳng thắn."
    ],
    applications: ["Áp dụng vào việc quản lý tài chính cá nhân, quản lý thời gian hiệu quả."],
    commonMisconceptions: ["Hiểu chữ 'Kiệm' là bủn xỉn, keo kiệt; chữ 'Cần' là làm việc cật lực không có khoa học."],
    reflectionQuestions: ["Trong thời đại tiêu dùng số hiện nay, chữ 'Kiệm' nên được hiểu và thực hành như thế nào?"]
  },
  "noi-di-doi-voi-lam": {
    shortDescription: "Nguyên tắc thực hành đạo đức quan trọng nhất.",
    definition: "Sự thống nhất giữa lời nói và hành động, giữa lý luận và thực tiễn trong rèn luyện đạo đức.",
    whyImportant: "Tạo dựng niềm tin đối với nhân dân. Lời nói không đi đôi với việc làm là biểu hiện của sự suy thoái đạo đức.",
    explanation: "Một tấm gương sống còn có giá trị hơn một trăm bài diễn văn tuyên truyền. Cán bộ, đảng viên phải làm gương cho quần chúng.",
    keyIdeas: [
      "Nói phải đúng với làm.",
      "Nêu gương đạo đức bằng hành động thực tế.",
      "Chống lại thói đạo đức giả."
    ],
    applications: ["Xây dựng uy tín cá nhân thông qua việc giữ lời hứa và thực hiện đúng cam kết."],
    commonMisconceptions: ["Nghĩ rằng chỉ cần có khả năng diễn thuyết giỏi là đủ để lãnh đạo."],
    reflectionQuestions: ["Vì sao thói 'nói một đằng làm một nẻo' lại gây tác hại nguy hiểm cho niềm tin xã hội?"]
  },
  "con-nguoi": {
    shortDescription: "Con người vừa là mục tiêu, vừa là động lực của cách mạng.",
    definition: "Hồ Chí Minh nhìn nhận con người trong tính chỉnh thể, thống nhất giữa cá nhân và xã hội, mang bản chất giai cấp và tính nhân loại.",
    whyImportant: "Mọi nỗ lực cách mạng cuối cùng đều hướng tới việc giải phóng con người, mang lại hạnh phúc cho con người.",
    explanation: "Trồng người là chiến lược lâu dài. Muốn xây dựng chủ nghĩa xã hội, trước hết cần có những con người xã hội chủ nghĩa.",
    keyIdeas: [
      "Con người là vốn quý nhất.",
      "Chiến lược 'trồng người' là nền tảng.",
      "Phải yêu thương, tôn trọng và khoan dung với con người."
    ],
    applications: ["Phát triển bản thân toàn diện, tham gia tích cực vào các hoạt động phát triển nhân lực."],
    commonMisconceptions: ["Chỉ nhìn nhận con người như một công cụ lao động đơn thuần."],
    reflectionQuestions: ["Câu nói 'Vì lợi ích mười năm thì phải trồng cây, vì lợi ích trăm năm thì phải trồng người' mang triết lý gì?"]
  }
};

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
    shortDescription: `Tổng quan về ${ch.chapterTitle}`,
    definition: `Nội dung cốt lõi của ${ch.chapterTitle}`,
    whyImportant: `Giúp sinh viên nắm bắt cấu trúc học thuật của chương này.`,
    explanation: `Nội dung này bao quát toàn bộ các khái niệm thuộc chương.`,
    keyIdeas: [
      `Bối cảnh lịch sử.`,
      `Giá trị cốt lõi.`
    ],
    relatedConceptIds: conceptData.filter(c => c.chapterId === ch.id).map(c => c.id),
    applications: [],
    commonMisconceptions: [],
    reflectionQuestions: [],
    requiresVerification: false
  });
}

// Add Concept nodes
for (const c of conceptData) {
  const ch = chapters.find(ch => ch.id === c.chapterId);
  const related = c.chapterId !== "core" ? [c.chapterId] : chapters.map(chap => chap.id);
  const data = enrichedConcepts[c.id] || {
    shortDescription: `Mô tả ngắn gọn về ${c.title}.`,
    definition: `Định nghĩa cốt lõi của ${c.title} dựa trên giáo trình.`,
    whyImportant: `Giúp người học nhận thức sâu sắc về tầm quan trọng của ${c.title}.`,
    explanation: `Giải thích chi tiết về ${c.title} bằng ngôn ngữ dễ hiểu.`,
    keyIdeas: [`Ý chính 1 về ${c.title}`, `Ý chính 2 về ${c.title}`],
    applications: [`Liên hệ thực tiễn về ${c.title}.`],
    commonMisconceptions: [`Hiểu lầm phổ biến về ${c.title}.`],
    reflectionQuestions: [`Bạn hiểu ${c.title} như thế nào?`],
    requiresVerification: true
  };

  nodes.push({
    id: c.id,
    title: c.title,
    chapterId: c.chapterId,
    chapterTitle: ch ? ch.chapterTitle : "Tư tưởng Hồ Chí Minh",
    type: c.level === 0 ? "core-concept" : "concept",
    level: c.level,
    shortDescription: data.shortDescription,
    definition: data.definition,
    whyImportant: data.whyImportant,
    explanation: data.explanation,
    keyIdeas: data.keyIdeas,
    relatedConceptIds: related, // link back to chapter or all chapters
    applications: data.applications,
    commonMisconceptions: data.commonMisconceptions,
    reflectionQuestions: data.reflectionQuestions,
    requiresVerification: data.requiresVerification !== undefined ? data.requiresVerification : false
  });
}

const fileContent = `// TỰ ĐỘNG TẠO BỞI SCRIPT - DỮ LIỆU ĐÃ ĐƯỢC CHUẨN HOÁ
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
console.log('canonicalConcepts.js generated with enriched content.');
