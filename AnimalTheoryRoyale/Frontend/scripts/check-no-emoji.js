import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, "..", "src");
const emojiRegex = /[\u{1F300}-\u{1FAFF}]/u;

const allowedFiles = new Set([
  // Nếu có file nội dung học tập thật sự cần emoji thì thêm ở đây, còn UI thì không được phép.
]);

let hasError = false;

function walk(dir) {
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!/\.(js|jsx|ts|tsx|json)$/.test(fullPath)) continue;

    const rel = path.relative(path.join(__dirname, ".."), fullPath).replace(/\\/g, "/");

    if (allowedFiles.has(rel)) continue;

    const content = fs.readFileSync(fullPath, "utf8");

    if (emojiRegex.test(content)) {
      console.error(`Emoji found in ${rel}`);
      hasError = true;
    }
  }
}

walk(SRC_DIR);

if (hasError) {
  console.error("Emoji check failed. Replace direct emoji icons with icon library imports.");
  process.exit(1);
}

console.log("Emoji check passed.");
