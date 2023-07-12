import fg from 'fast-glob';
import { writeFileSync, existsSync } from 'fs';
import { dirname } from 'path';
import { compile } from 'sass';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function getStylePath(path) {
  const input = fg.sync(path, {
    cwd: __dirname,
    absolute: true,
    onlyFiles: true,
  });
  return input;
}

/**
 * 生成对应的style/index.ts文件
 * @param {string} path
 */
function generateCssPlugin(path, force = false, compress = false) {
  getStylePath(path).forEach(item => {
    const tsFilePath = item.replace(/\.scss$/, '.ts');
    //如果ts文件已经存在，就不再生成
    if (existsSync(tsFilePath) && !force) {
      return;
    }
    const css = compile(item, {
      style: compress ? 'compressed' : undefined,
    }).css;
    const ts = `export default \`${css}\`;\r\n`;

    writeFileSync(tsFilePath, ts);
  });
}

generateCssPlugin(
  '../packages/**/style/index.scss',
  process.argv.slice(2)[0] === 'force' ? true : false,
  process.argv.slice(2)[1] === 'compress' ? true : false
);
