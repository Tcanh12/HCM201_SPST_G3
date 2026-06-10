const fs = require('fs');
const path = require('path');

const lessonsPath = path.join(__dirname, '../src/data/lessons.js');
let content = fs.readFileSync(lessonsPath, 'utf8');

const draftPath = path.join(__dirname, 'lessonsDraft.js');
let draftContent = fs.readFileSync(draftPath, 'utf8');

// remove "export const lessons = [\n" from lessons.js and keep the content.
// wait, lessons.js ends with "\n];"
// lessonsDraft.js starts with "const lessonsDraft = [\n" and ends with "\n];"

// just replace the end of lessons.js
// content ends with "];\n" or "];"
// draftContent starts with "const lessonsDraft = [\n"
// We want to remove the trailing "];" from content, add a comma, then add the body of draftContent.

const draftBodyMatch = draftContent.match(/const lessonsDraft = \[([\s\S]+)\];/);
if (draftBodyMatch) {
    const draftBody = draftBodyMatch[1];
    
    content = content.replace(/\];[\s]*$/, '');
    content = content + ',\n' + draftBody + '\n];\n';
    
    fs.writeFileSync(lessonsPath, content, 'utf8');
    console.log("Merge successful");
} else {
    console.error("Failed to parse draft");
}
