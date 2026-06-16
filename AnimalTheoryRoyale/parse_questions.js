const fs = require('fs');

const rawText = fs.readFileSync('Backend/Data/questions_raw.txt', 'utf8');

const blocks = rawText.split(/### Câu \d+/).filter(b => b.trim());

const questions = [];

for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 8) continue;

    let topic = "";
    let difficulty = "medium";
    let qText = "";
    let opts = [];
    let correctLetter = "A";
    let expl = "";

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('**Chủ đề:**')) topic = line.replace('**Chủ đề:**', '').trim();
        else if (line.startsWith('**Độ khó:**')) difficulty = line.replace('**Độ khó:**', '').trim();
        else if (line.startsWith('**Câu hỏi:**')) qText = line.replace('**Câu hỏi:**', '').trim();
        else if (line.match(/^[A-D]\./)) opts.push(line.replace(/^[A-D]\./, '').trim());
        else if (line.startsWith('**Đáp án đúng:**')) correctLetter = line.replace('**Đáp án đúng:**', '').trim();
        else if (line.startsWith('**Giải thích:**')) expl = line.replace('**Giải thích:**', '').trim();
    }

    if (opts.length === 4 && qText && expl) {
        questions.push({
            topic, difficulty, qText, opts, correctLetter, expl
        });
    }
}

console.log("Parsed questions: " + questions.length);

const chapterMap = {
    "Đảng ra đời và nền tảng đường lối năm 1930": "vnr-ch1-dang-ra-doi",
    "Cương lĩnh chính trị đầu tiên": "vnr-ch1-dang-ra-doi",
    "Luận cương chính trị tháng 10/1930": "vnr-ch1-dang-ra-doi",
    "Cao trào 1930–1931 và Xô viết Nghệ Tĩnh": "vnr-ch1-cao-trao-1930",
    "Phục hồi tổ chức Đảng 1932–1935": "vnr-ch1-cao-trao-1930",
    "Phong trào dân chủ 1936–1939": "vnr-ch1-dan-chu-1936",
    "Chuyển hướng chỉ đạo chiến lược 1939–1941": "vnr-ch1-chuyen-huong-1939",
    "Hội nghị Trung ương 6, 7, 8": "vnr-ch1-chuyen-huong-1939",
    "Mặt trận Việt Minh": "vnr-ch1-chuyen-huong-1939",
    "Chỉ thị Nhật – Pháp bắn nhau": "vnr-ch1-tong-khoi-nghia",
    "Tổng khởi nghĩa tháng Tám 1945": "vnr-ch1-tong-khoi-nghia",
    "Bài học kinh nghiệm 1930-1945": "vnr-ch1-tong-khoi-nghia",
};

const frontendQuestions = questions.map((q, idx) => {
    let correctIndex = q.correctLetter === 'A' ? 0 : q.correctLetter === 'B' ? 1 : q.correctLetter === 'C' ? 2 : 3;
    let bloomLevel = q.difficulty === 'easy' ? 'remember' : q.difficulty === 'medium' ? 'understand' : 'analyze';
    return {
        id: `rq-vnr-${String(idx + 1).padStart(3, '0')}`,
        question: q.qText,
        explanation: q.expl,
        chapterId: "chuong-1",
        lessonId: chapterMap[q.topic] || "vnr-ch1-dang-ra-doi",
        feedbackCorrect: "Chính xác!",
        feedbackIncorrect: "Chưa đúng. Hãy xem lại kiến thức.",
        type: "multiple-choice",
        options: q.opts,
        correctAnswer: correctIndex,
        conceptIds: ["concept-0"],
        difficulty: q.difficulty,
        bloomLevel: bloomLevel,
        points: q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 20 : 30,
        timeLimit: q.difficulty === 'easy' ? 30 : q.difficulty === 'medium' ? 45 : 60,
        requiresVerification: true
    };
});

const jsContent = `// Tệp câu hỏi ôn tập tự động sinh ra cho VNR202\nexport const reviewQuestions = ${JSON.stringify(frontendQuestions, null, 2)};\n`;
fs.writeFileSync('Frontend/src/data/reviewQuestions.js', jsContent);
console.log("Wrote reviewQuestions.js");

// Now SeedController
let seedControllerTemplate = fs.readFileSync('Backend/Controllers/SeedController.cs', 'utf8');

// Replace the topics list with unique topics from the questions
const uniqueTopics = [...new Set(questions.map(q => q.topic))];
const topicsCSharp = uniqueTopics.map(t => `            "${t}",`).join('\n');

const qsCSharp = questions.map(q => {
    let diffCap = q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1);
    let optsArray = q.opts.map(o => `"${o.replace(/"/g, '\\"')}"`).join(', ');
    let ci = q.correctLetter === 'A' ? 0 : q.correctLetter === 'B' ? 1 : q.correctLetter === 'C' ? 2 : 3;
    let qTextEscaped = q.qText.replace(/"/g, '\\"');
    let explEscaped = q.expl.replace(/"/g, '\\"');
    return `            (topics["${q.topic}"], "${diffCap}", "${qTextEscaped}", "${explEscaped}", new[] { ${optsArray} }, ${ci}),`;
}).join('\n');

seedControllerTemplate = seedControllerTemplate.replace(/var topicNames = new\[\]\s*\{\s*[\s\S]*?\s*\};/, `var topicNames = new[]\n        {\n${topicsCSharp}\n        };`);

seedControllerTemplate = seedControllerTemplate.replace(/var qs = new \([\s\S]*?\)\[\]\s*\{\s*[\s\S]*?\s*\};\s*foreach/m, `var qs = new (int tid, string diff, string content, string expl, string[] opts, int ci)[]\n        {\n${qsCSharp}\n        };\n\n        foreach`);

fs.writeFileSync('Backend/Controllers/SeedController.cs', seedControllerTemplate);
console.log("Wrote SeedController.cs");
