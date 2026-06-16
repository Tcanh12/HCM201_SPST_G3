const fs = require('fs');
const path = require('path');

const dir = 'd:/FULearning/SUMMER 2026 Final/HCM202/HCM201_SPST_G3/AnimalTheoryRoyale/Frontend/src/data';

const map = {
  'sach-luoc-dan-chu': 'mat-tran-dan-chu',
  'chuyen-huong-chien-luoc': 'hoi-nghi-tw6',
  'hoi-nghi-tw-8': 'hoi-nghi-tw8',
  'bai-hoc-kinh-nghiem': 'nam-bat-thoi-co',
  'vnr-1930-1945': 'vnr202-root'
};

function replaceIds(text) {
  let res = text;
  for (const [oldId, newId] of Object.entries(map)) {
    res = res.replace(new RegExp(oldId, 'g'), newId);
  }
  return res;
}

// Update files
['caseFiles.json', 'timeline.json', 'timelineData.js'].forEach(file => {
  const fp = path.join(dir, file);
  if (fs.existsSync(fp)) {
    let text = fs.readFileSync(fp, 'utf8');
    text = replaceIds(text);
    fs.writeFileSync(fp, text);
    console.log('Updated ' + file);
  }
});

['reviewQuestions.js', 'lessons.js', 'chapterDetails.js'].forEach(file => {
  const fp = path.join(dir, file);
  if (fs.existsSync(fp)) {
    let text = fs.readFileSync(fp, 'utf8');
    text = replaceIds(text);
    if (file === 'lessons.js') {
      text = text.replace(/lessons:\s*\[(.*?)\]/gs, (match) => {
         return match.replace(/\}[\s]*\,[\s]*\{/g, ',\n    requiresVerification: false\n  },\n  {').replace(/\}[\s]*\]/g, ',\n    requiresVerification: false\n  }\n]');
      });
    }
    fs.writeFileSync(fp, text);
    console.log('Updated ' + file);
  }
});

// Add requiresVerification to conceptMapData.js
const cmdp = path.join(dir, 'conceptMapData.js');
let cmdt = fs.readFileSync(cmdp, 'utf8');
cmdt = cmdt.replace(/relatedTimeline:\s*\[(.*?)\]\s*\}/g, 'relatedTimeline: [$1],\n    requiresVerification: false\n  }');
fs.writeFileSync(cmdp, cmdt);
console.log('Updated conceptMapData.js');
