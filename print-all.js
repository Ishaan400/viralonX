import fs from 'fs';
import path from 'path';

const OUTPUT_FILE = 'combine.txt';
const root = process.cwd();

const skipDirs = ['node_modules', '.next', '.git', '.vscode', '.idea'];
const skipExts = ['.png', '.jpg', '.jpeg', '.webp', '.ico', '.exe', '.zip'];

let combined = '';

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    const relPath = path.relative(root, filePath);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (skipDirs.includes(file)) continue;
      walk(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (skipExts.includes(ext)) continue;

      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        combined += `\n\n--- FILE: ${relPath} ---\n\n${content}`;
      } catch (err) {
        console.warn(`⚠️ Skipped (not UTF-8?): ${relPath}`);
      }
    }
  }
}

walk(root);

fs.writeFileSync(OUTPUT_FILE, combined, 'utf-8');

console.log(`✅ Combined project saved to ${OUTPUT_FILE}`);
