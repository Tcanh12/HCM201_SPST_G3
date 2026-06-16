const fs = require('fs');

const dataPath = './advanced_questions.json';
let questions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

for (let q of questions) {
  if (q.QuestionType === 'ShortAnswer' || q.QuestionType === 'FillBlank') {
    let content = q.Content;
    let newPayload = { ...JSON.parse(q.ChallengePayloadJson || '{}') };
    
    // Default hint parsing
    let expected = newPayload.expected || newPayload.expectedKeywords?.[0] || '';
    if (newPayload.answers && newPayload.answers.length > 0) expected = newPayload.answers[0];

    // Convert Long Questions to CaseStudy
    if (
      content.includes("Vì sao sự ra đời của ba tổ chức cộng sản năm 1929") ||
      content.includes("Nêu ý nghĩa lịch sử của việc Đảng Cộng sản Việt Nam ra đời") ||
      content.includes("Vì sao nói Cương lĩnh đầu tiên có tính dân tộc sâu sắc") ||
      content.includes("Điểm sáng tạo của Cương lĩnh đầu tiên") ||
      content.includes("Vì sao Luận cương bị xem là còn nặng về đấu tranh giai cấp") ||
      content.includes("hạn chế hoặc bài học từ cao trào 1930–1931") ||
      content.includes("Cách mạng Tháng Tám 1945 là cuộc cách mạng giải phóng dân tộc mang tính chất gì")
    ) {
      q.QuestionType = "CaseStudy";
      newPayload.case = content;
      newPayload.criteria = ["từ khóa 1", "từ khóa 2"];
      q.ChallengePayloadJson = JSON.stringify(newPayload);
      continue;
    }

    // Rewrite ShortAnswers
    if (content.includes("Đường Kách mệnh")) {
      expected = "Đường Kách mệnh";
      newPayload.acceptedAnswers = ["Đường Kách mệnh", "Duong Kach menh", "DKM"];
      newPayload.hint = "Nhập tên tác phẩm, 3 từ.";
      newPayload.hintLevel1 = "Tác phẩm xuất bản năm 1927.";
      newPayload.maxInputLength = 20;
    } 
    else if (content.includes("Cương lĩnh") && content.includes("giai cấp")) {
      q.Content = "Theo Cương lĩnh chính trị đầu tiên, giai cấp lãnh đạo cách mạng là giai cấp nào?";
      expected = "công nhân";
      newPayload.acceptedAnswers = ["công nhân", "giai cấp công nhân", "cong nhan", "giai cap cong nhan"];
      newPayload.hint = "Nhập tên giai cấp, 2 từ.";
      newPayload.hintLevel1 = "Đây là giai cấp gắn với nền sản xuất công nghiệp.";
      newPayload.maxInputLength = 20;
    }
    else if (content.includes("Hội nghị Trung ương") && content.includes("chiến lược")) {
      expected = "8";
      newPayload.acceptedAnswers = ["8", "TW8", "Trung ương 8", "Hội nghị 8"];
      newPayload.hint = "Nhập số hội nghị, chỉ 1 ký tự.";
      newPayload.maxInputLength = 12;
    }
    else if (content.includes("Mặt trận Dân chủ Đông Dương") || expected.includes("Mặt trận Dân chủ")) {
      expected = "Mặt trận Dân chủ Đông Dương";
      newPayload.acceptedAnswers = ["Dân chủ Đông Dương", "Mặt trận Dân chủ", "MTDC", "Mặt trận Dân chủ Đông Dương"];
      newPayload.hint = "Nhập tên mặt trận.";
      newPayload.maxInputLength = 30;
    }
    else if (content.includes("Việt Minh") || expected.includes("Việt Minh") || expected.includes("Việt Nam độc lập đồng minh")) {
      expected = "Việt Minh";
      newPayload.acceptedAnswers = ["Việt Minh", "Viet Minh", "VM", "Việt Nam độc lập đồng minh"];
      newPayload.hint = "Tên viết tắt gồm 2 từ, bắt đầu bằng V.";
      newPayload.hintLevel1 = "Đây là mặt trận được thành lập năm 1941.";
      newPayload.maxInputLength = 30;
    }
    else if (content.includes("Nhật – Pháp bắn nhau") || expected.includes("phát xít Nhật")) {
      expected = "Đánh đuổi phát xít Nhật";
      newPayload.acceptedAnswers = ["Nhật", "phát xít Nhật", "đánh Nhật", "Đánh đuổi phát xít Nhật"];
      newPayload.hint = "Đánh đuổi thế lực nào?";
      newPayload.maxInputLength = 30;
    }
    else if (content.includes("Xô viết")) {
      expected = "Xô viết";
      newPayload.acceptedAnswers = ["Xô viết", "Xo viet", "Chính quyền Xô viết"];
      newPayload.hint = "Mô hình chính quyền ở Nghệ Tĩnh.";
      newPayload.maxInputLength = 20;
    }
    else if (content.includes("Ma Cao") || expected.includes("Ma Cao")) {
      expected = "Ma Cao";
      newPayload.acceptedAnswers = ["Ma Cao", "Macau"];
      newPayload.hint = "Địa điểm họp Đại hội I.";
      newPayload.maxInputLength = 10;
    }
    else if (content.includes("Tân Trào") || expected.includes("Tân Trào") || expected.includes("Dân tộc giải phóng")) {
      expected = "Tân Trào";
      newPayload.acceptedAnswers = ["Tân Trào", "Tan Trao", "Dân tộc giải phóng", "Dan toc giai phong"];
      newPayload.hint = "Nhập từ khóa ngắn.";
      newPayload.maxInputLength = 25;
    }
    else if (content.includes("Thời cơ") || expected.includes("thời cơ")) {
      expected = "thời cơ";
      newPayload.acceptedAnswers = ["thời cơ", "thoi co"];
      newPayload.hint = "Từ khóa gồm 2 chữ.";
      newPayload.maxInputLength = 10;
    }
    else if (content.includes("Độc lập dân tộc") || expected.includes("độc lập")) {
      expected = "Độc lập dân tộc";
      newPayload.acceptedAnswers = ["độc lập", "độc lập dân tộc", "doc lap"];
      newPayload.hint = "Mục tiêu quan trọng nhất.";
      newPayload.maxInputLength = 20;
    }
    else if (expected === "1925") {
      newPayload.acceptedAnswers = ["1925"];
      newPayload.hint = "Nhập 4 chữ số năm.";
      newPayload.maxInputLength = 4;
    }
    else if (expected === "1930") {
      newPayload.acceptedAnswers = ["1930"];
      newPayload.hint = "Nhập 4 chữ số năm.";
      newPayload.maxInputLength = 4;
    }
    else if (expected === "1941") {
      newPayload.acceptedAnswers = ["1941"];
      newPayload.hint = "Nhập 4 chữ số năm.";
      newPayload.maxInputLength = 4;
    }
    else if (expected === "1945") {
      newPayload.acceptedAnswers = ["1945"];
      newPayload.hint = "Nhập 4 chữ số năm.";
      newPayload.maxInputLength = 4;
    }
    else if (expected === "cộng sản") {
      newPayload.acceptedAnswers = ["cộng sản", "cong san"];
      newPayload.hint = "Xã hội gì?";
      newPayload.maxInputLength = 10;
    }
    else if (expected === "quần chúng") {
      newPayload.acceptedAnswers = ["quần chúng", "quan chung", "nhân dân", "nhan dan"];
      newPayload.hint = "Bạo lực của ai?";
      newPayload.maxInputLength = 15;
    }
    else if (expected === "Đông Dương") {
      newPayload.acceptedAnswers = ["Đông Dương", "Dong Duong"];
      newPayload.hint = "Tên gọi thay thế Việt Nam.";
      newPayload.maxInputLength = 15;
    }
    else if (expected === "tư tưởng") {
      newPayload.acceptedAnswers = ["tư tưởng", "tu tuong"];
      newPayload.hint = "Chuẩn bị về mặt gì?";
      newPayload.maxInputLength = 15;
    }
    else {
      // General short answer
      if (expected.length > 30) {
        // If it's still too long, fallback to MultipleChoice or CaseStudy
        q.QuestionType = "MultipleChoice";
      } else {
        newPayload.acceptedAnswers = [expected];
        newPayload.maxInputLength = expected.length + 5;
        newPayload.hint = "Nhập câu trả lời ngắn.";
      }
    }

    if (q.QuestionType === 'ShortAnswer' || q.QuestionType === 'FillBlank') {
      newPayload.expected = expected;
      newPayload.caseInsensitive = true;
      newPayload.ignoreDiacritics = true;
      q.ChallengePayloadJson = JSON.stringify(newPayload);
    }
  }
}

fs.writeFileSync(dataPath, JSON.stringify(questions, null, 2), 'utf8');
console.log('Update complete.');
