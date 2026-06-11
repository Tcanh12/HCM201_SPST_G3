import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const filePath = path.join(__dirname, 'src/data/canonicalConcepts.js');

if (!fs.existsSync(filePath)) {
  console.error(`File không tồn tại: ${filePath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath, 'utf-8');

// Use a simple regex to extract the array, or just import it.
// Since it's a JS file with an export, we can import it dynamically.
async function validate() {
  try {
    const module = await import('file://' + filePath);
    const nodes = module.canonicalConcepts;
    
    let hasError = false;
    const errorNodes = [];
    
    const placeholders = [
      "Mô tả ngắn gọn về",
      "Định nghĩa cốt lõi của",
      "Ý chính 1",
      "Ý chính 2",
      "Hiểu lầm phổ biến",
      "Tổng quan về",
      "Nội dung cốt lõi của"
    ];

    for (const node of nodes) {
      let nodeErrors = [];
      
      // Check placeholders
      for (const ph of placeholders) {
        if (
          (node.shortDescription && node.shortDescription.includes(ph)) ||
          (node.definition && node.definition.includes(ph)) ||
          (node.keyIdeas && node.keyIdeas.some(idea => idea.includes(ph))) ||
          (node.commonMisconceptions && node.commonMisconceptions.some(mc => mc.includes(ph)))
        ) {
          nodeErrors.push(`Chứa placeholder: "${ph}"`);
        }
      }
      
      // Check empty required fields
      if (!node.shortDescription) nodeErrors.push("Thiếu shortDescription");
      if (!node.definition) nodeErrors.push("Thiếu definition");
      if (!node.keyIdeas || node.keyIdeas.length === 0) nodeErrors.push("Thiếu keyIdeas");
      
      // Check requiresVerification
      if (node.requiresVerification) {
        if (!node.sourceReferences || node.sourceReferences.length === 0) {
          nodeErrors.push("requiresVerification=true nhưng KHÔNG có sourceReferences");
        }
      }

      if (nodeErrors.length > 0) {
        hasError = true;
        errorNodes.push({ id: node.id, title: node.title, errors: nodeErrors });
      }
    }
    
    if (hasError) {
      console.error("❌ PHÁT HIỆN LỖI TRONG DATA CỦA CONCEPT MAP ❌");
      errorNodes.forEach(n => {
        console.error(`\nNode: [${n.id}] - ${n.title}`);
        n.errors.forEach(e => console.error(`   - ${e}`));
      });
      process.exit(1);
    } else {
      console.log("✅ TOÀN BỘ DATA ĐÃ ĐƯỢC KIỂM TRA. KHÔNG CÒN PLACEHOLDER HOẶC LỖI THIẾU TRƯỜNG.");
    }
    
  } catch (err) {
    console.error("Lỗi khi đọc hoặc phân tích file canonicalConcepts.js:", err);
    process.exit(1);
  }
}

validate();
