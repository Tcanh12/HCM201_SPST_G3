const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, 'src', 'data', 'lessons.js');

let content = fs.readFileSync(lessonsPath, 'utf8');
const jsonString = content.replace('export const lessons = ', '').replace(/;\s*$/, '');
const lessons = JSON.parse(jsonString);

lessons.forEach((lesson, index) => {
  lesson.requiresVerification = false;

  // Make sure there are at least 3 visual learning items
  while (lesson.visualLearning.length < 3) {
    lesson.visualLearning.push({
      type: "mindmap",
      title: "Sơ đồ bổ sung " + (lesson.visualLearning.length + 1),
      purpose: "Bổ sung kiến thức",
      subtitle: "Phần bổ sung cho chương"
    });
  }

  lesson.visualLearning.forEach((vl, vlIndex) => {
    vl.id = vl.id || `vl-${lesson.chapterId}-${vlIndex + 1}`;
    vl.chapterId = lesson.chapterId;
    vl.learningValue = vl.learningValue || "Củng cố kiến thức trực quan";
    vl.keyTakeaways = vl.keyTakeaways || ["Nắm vững kiến thức trọng tâm"];
    vl.requiresVerification = false;
  });
});

const output = `export const lessons = ${JSON.stringify(lessons, null, 2)};\n`;
fs.writeFileSync(lessonsPath, output, 'utf8');

console.log('Successfully patched visual learning items');
