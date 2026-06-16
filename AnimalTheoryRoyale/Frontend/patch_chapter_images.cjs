const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'chapterDetails.js');

let content = fs.readFileSync(filePath, 'utf8');
const jsonString = content.replace('export const chapterDetails = ', '').replace(/;\s*$/, '');
const chapterDetails = JSON.parse(jsonString);

const imageMappings = {
  "Ảnh Nguyễn Ái Quốc tại Pháp/Nga": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Ho_Chi_Minh_1921.jpg/800px-Ho_Chi_Minh_1921.jpg",
  "Mô phỏng/Ảnh tư liệu Hương Cảng 1930": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Thanh_lap_Dang_Cong_san_Viet_Nam.jpg/800px-Thanh_lap_Dang_Cong_san_Viet_Nam.jpg",
  "Ảnh phong trào nông dân Nghệ Tĩnh": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Demonstrations_of_peasants_in_Nghe_An_province.jpg/800px-Demonstrations_of_peasants_in_Nghe_An_province.jpg",
  "Ảnh Côn Đảo / Hỏa Lò": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Con_Dao_prison.jpg/800px-Con_Dao_prison.jpg"
};

for (const chapterId in chapterDetails) {
  const chapter = chapterDetails[chapterId];
  if (chapter.sections) {
    chapter.sections.forEach(section => {
      if (section.type === 'info-cards' && section.content) {
        section.content.forEach(card => {
          if (card.imagePlaceholder && imageMappings[card.imagePlaceholder]) {
            card.imageUrl = imageMappings[card.imagePlaceholder];
            // keep imagePlaceholder just in case, but imageUrl takes precedence
          }
        });
      }
    });
  }
}

const output = `export const chapterDetails = ${JSON.stringify(chapterDetails, null, 2)};\n`;
fs.writeFileSync(filePath, output, 'utf8');
console.log('Successfully updated chapterDetails.js with imageUrls');
