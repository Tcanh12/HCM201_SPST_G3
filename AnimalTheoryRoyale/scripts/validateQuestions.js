const fs = require('fs');
const path = require('path');

let hasError = false;

function reportError(msg) {
  console.error("❌ ERROR:", msg);
  hasError = true;
}

function checkGarbageStrings(content, fileName) {
  const forbidden = [
    "\\$\\{",
    "Biến thể",
    "Góc nhìn",
    "Phân tích 1",
    "Phân tích 2",
    "Chuỗi",
    "Tình huống \\$\\{",
    "Câu \\$\\{"
  ];
  
  forbidden.forEach(str => {
    const regex = new RegExp(str, 'g');
    if (regex.test(content)) {
      reportError(`File ${fileName} contains forbidden string/pattern: ${str}`);
    }
  });
}

function validateReviewQuestions() {
  const reqPath = path.join(__dirname, '../Frontend/src/data/reviewQuestions.js');
  let content = '';
  try {
    content = fs.readFileSync(reqPath, 'utf8');
  } catch(e) {
    reportError(`Could not read ${reqPath}`);
    return;
  }
  
  checkGarbageStrings(content, 'reviewQuestions.js');
  
  // To evaluate without export, we can just replace 'export const' with 'const' and eval
  const evalContent = content.replace('export const reviewQuestions =', 'const reviewQuestions =') + '; reviewQuestions;';
  let rqs;
  try {
    rqs = eval(evalContent);
  } catch(e) {
    reportError(`Could not parse reviewQuestions.js: ${e.message}`);
    return;
  }
  
  const ids = new Set();
  const qs = new Set();
  
  rqs.forEach((q, i) => {
    if (!q.id) reportError(`Question at index ${i} is missing id`);
    if (ids.has(q.id)) reportError(`Duplicate id found: ${q.id}`);
    ids.add(q.id);
    
    if (!q.question) reportError(`Question at index ${i} is missing question text`);
    if (qs.has(q.question)) reportError(`Duplicate question found: ${q.question}`);
    qs.add(q.question);
    
    if (!q.options || q.options.length !== 4) reportError(`Question ${q.id} does not have exactly 4 options`);
    if (q.options) {
      const opts = new Set();
      q.options.forEach(opt => {
        if (!opt || opt.trim() === '') reportError(`Question ${q.id} has empty option`);
        if (opts.has(opt)) reportError(`Question ${q.id} has duplicate options: ${opt}`);
        opts.add(opt);
      });
    }
    
    if (typeof q.correctAnswer !== 'number') reportError(`Question ${q.id} correctAnswer is not a number`);
    if (!q.explanation || q.explanation.length < 15) reportError(`Question ${q.id} explanation is too short`);
  });
  
  console.log(`✅ reviewQuestions.js validated: ${rqs.length} questions.`);
}

function validateAdvancedQuestions() {
  const reqPath = path.join(__dirname, '../Backend/Data/advanced_questions.json');
  let content = '';
  try {
    content = fs.readFileSync(reqPath, 'utf8');
  } catch(e) {
    reportError(`Could not read ${reqPath}`);
    return;
  }
  
  checkGarbageStrings(content, 'advanced_questions.json');
  
  let advs;
  try {
    advs = JSON.parse(content);
  } catch(e) {
    reportError(`Could not parse advanced_questions.json: ${e.message}`);
    return;
  }
  
  advs.forEach((q, i) => {
    if (!q.ChallengePayloadJson) reportError(`Advanced question at index ${i} is missing ChallengePayloadJson`);
    else {
      try {
        JSON.parse(q.ChallengePayloadJson);
      } catch(e) {
        reportError(`Advanced question at index ${i} has invalid ChallengePayloadJson string: ${e.message}`);
      }
    }
    if (!q.Explanation || q.Explanation.length < 15) reportError(`Advanced question ${i} explanation is too short`);
  });
  
  console.log(`✅ advanced_questions.json validated: ${advs.length} questions.`);
}

console.log("Running validation script...");
validateReviewQuestions();
validateAdvancedQuestions();

if (hasError) {
  console.error("❌ VALIDATION FAILED.");
  process.exit(1);
} else {
  console.log("🎉 ALL VALIDATIONS PASSED.");
}
