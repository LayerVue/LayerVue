/// <reference types="node" />
import markdownItContainer from 'markdown-it-container';
import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';
import { readFileSync } from 'node:fs';
import fg from 'fast-glob';
import { join } from 'path';
const glob = '**/*.vue';
function markdownItCodeView(
  md: MarkdownIt,
  options: {
    componentName: string;
    glob: string | string[];
  } = { componentName: 'CodeView', glob }
) {
  const templates = getTemplates(options.glob || glob);
  const { componentName = 'CodeView' } = options;
  md.use(markdownItContainer, 'code-view', {
    validate(params: string) {
      return params.trim().match(/^code-view\s*(.*)$/);
    },
    render(tokens: Token[], idx: number, options: any, env: any, self: Renderer) {
      const m = tokens[idx].info.trim().match(/^code-view\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        // 找到结束标记之前的 token
        let endIndex = idx + 1;
        while (tokens[endIndex].type !== 'container_code-view_close') {
          endIndex++;
        }

        // 获取结束标记之前的所有 token 的内容
        const contentTokens = tokens.slice(idx + 2, endIndex);

        // 将内容 token 数组转换为字符串

        // 在这里可以对获取到的内容进行处理
        const component = contentTokens.map(token => token.content).join('');
        const description = m && m.length > 1 ? m[1] : '';
        try {
          const template = templates.find(v => v.name === component)?.template;
          return `<DemoContainer>
          <${componentName} description="${description}" component="${component}" template="${encodeURIComponent(
            template!
          )}">`;
        } catch (error) {
          console.log(error);
        }
        return `<DemoContainer><${componentName} description="${md.render(description)}">`;
      }
      return `</${componentName}></DemoContainer>`;
    },
  });
}

const getTemplates = (glob: string[] | string) => {
  //node
  const files = fg.sync(glob, { onlyFiles: true, ignore: ['**/node_modules'] });
  return files.map(file => {
    return {
      name: file
        .replace(/\/index.vue$/, '')
        .replace(/\.vue$/, '')
        .split('/')
        .pop()!,
      template: readFileSync(join(__dirname, '../' + file), 'utf-8'),
    };
  });
};

export default markdownItCodeView;
