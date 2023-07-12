import fs from 'fs';
import path from 'path';

/**
 * @param {string} sourceDir
 * @param {string} targetDir
 */
function moveDtsFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.log(`源文件夹 ${sourceDir} 不存在`);
    return;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);

    const stats = fs.statSync(sourcePath);

    if (stats.isDirectory()) {
      moveDtsFiles(sourcePath, targetPath);
    } else if (stats.isFile() && file.endsWith('.d.ts')) {
      fs.renameSync(sourcePath, targetPath);
    }
  });
}

const sourceDir = './packages';
const targetDir = './types';
moveDtsFiles(sourceDir, targetDir);
