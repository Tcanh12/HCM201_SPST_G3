const fs = require('fs');

const generateSeedData = () => {
  let csharp = fs.readFileSync('Backend/Controllers/SeedController.cs', 'utf8');

  const topics = [
    "Nền tảng đường lối 1930",
    "Cao trào và phục hồi 1930–1935",
    "Phong trào dân chủ 1936–1939",
    "Chuyển hướng chiến lược 1939–1941",
    "Việt Minh và Cách mạng Tháng Tám 1945"
  ];

  let qsContent = `var qs = new (int tid, string diff, string content, string expl, string[] opts, int ci)[]
        {
`;

  let qCount = 0;
  for (let ch = 0; ch < 5; ch++) {
    for (let i = 0; i < 20; i++) {
      let diff = i < 7 ? "Easy" : i < 15 ? "Medium" : "Hard";
      let qText = `Seed Q${qCount+1} - ${topics[ch]}: Sự kiện tiêu biểu số ${i+1} có ý nghĩa gì?`;
      let expl = `Đây là điểm mấu chốt để hiểu về ${topics[ch]}.`;
      let opt0 = `Lựa chọn đúng về lịch sử Đảng ${i+1}`;
      let opt1 = `Lựa chọn sai A ${i+1}`;
      let opt2 = `Lựa chọn sai B ${i+1}`;
      let opt3 = `Lựa chọn sai C ${i+1}`;

      if (diff === "Hard") {
         qText = `Seed Q${qCount+1} - ${topics[ch]}: Vì sao quyết định này phản ánh năng lực lãnh đạo tài tình của Đảng?`;
      } else if (diff === "Easy") {
         qText = `Seed Q${qCount+1} - ${topics[ch]}: Sự kiện nào diễn ra vào thời điểm ${i+1}?`;
      }

      // Hardcoded quality question samples for seed
      if (qCount === 0) {
        qText = "Cương lĩnh chính trị đầu tiên do ai soạn thảo?";
        opt0 = "Nguyễn Ái Quốc"; opt1 = "Trần Phú"; opt2 = "Lê Hồng Phong"; opt3 = "Hà Huy Tập";
        expl = "Nguyễn Ái Quốc trực tiếp soạn thảo và thông qua tại Hội nghị thành lập Đảng 1930.";
      }
      if (qCount === 1) {
        qText = "Nhiệm vụ hàng đầu của cách mạng Đông Dương được xác định trong Cương lĩnh đầu tiên là gì?";
        opt0 = "Đánh đổ đế quốc Pháp giành độc lập"; opt1 = "Cách mạng ruộng đất"; opt2 = "Đánh đổ phong kiến"; opt3 = "Đấu tranh đòi quyền lợi kinh tế";
        expl = "Vấn đề dân tộc được Nguyễn Ái Quốc đặt lên hàng đầu.";
      }

      qsContent += `            (topics[topicNames[${ch}]], "${diff}", "${qText}", "${expl}", new[] { "${opt0}", "${opt1}", "${opt2}", "${opt3}" }, 0),\n`;
      qCount++;
    }
  }

  qsContent += `        };`;

  // Use indexOf and string slicing to replace the var qs array
  const startIndex = csharp.indexOf('var qs = new (int tid, string diff, string content, string expl, string[] opts, int ci)[]');
  const matchStr = '        };';
  const endIndex = csharp.indexOf(matchStr, startIndex) + matchStr.length;
  
  if (startIndex !== -1 && endIndex !== -1) {
    const before = csharp.substring(0, startIndex);
    const after = csharp.substring(endIndex);
    fs.writeFileSync('Backend/Controllers/SeedController.cs', before + qsContent + after);
    console.log("SeedController.cs updated with 100 questions.");
  } else {
    console.error("Could not find qs array in SeedController.cs");
  }
};

generateSeedData();
