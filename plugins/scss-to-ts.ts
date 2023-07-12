import fs from 'fs';
import fg from 'fast-glob';
import { FilterPattern, Plugin, ResolvedConfig, createFilter } from 'vite';
import { compile } from 'sass';
import { cwd } from 'process';
export function vitePluginScss2Ts(options?: {
  root?: string;
  include?: FilterPattern | undefined;
  exclude?: FilterPattern | undefined;
  ext?: string;
  compress?: boolean;
}): Plugin {
  let config: ResolvedConfig;
  const { include, exclude, compress } = options || {};
  let root = options?.root;
  if (root) {
    root = root.replace(/\\/g, '/');
  }
  const filter = createFilter(include, exclude);
  return {
    name: 'generate-css-plugin',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig;
      if (!root) {
        root = resolvedConfig.root;
      }
    },
    // async configureServer(server) {
    //   server.watcher.on('change', filePath => {
    //     if (filePath.endsWith('.scss') && filter(filePath)) {
    //       css2ts(filePath, options?.ext, compress);
    //     }
    //   });
    // },
    async buildStart() {
      const files = await fg(root + '/**/*.scss', {
        deep: Infinity,
        ignore: ['node_modules/**'],
      });
      files.forEach(async filePath => {
        if (filePath.endsWith('.scss') && filter(filePath)) {
          css2ts(filePath, options?.ext, compress);
        }
      });
    },
  };
}

function css2ts(filePath: string, ext?: string, compress?: boolean) {
  const css = compile(filePath, {
    style: compress ? 'compressed' : undefined,
  }).css;
  const tsFilePath = filePath.replace(/\.scss$/, `.${ext || 'ts'}`);
  //判断文件是否存在
  if (fs.existsSync(tsFilePath)) {
    fs.writeFileSync(tsFilePath, `export default \`${css}\`;\r\n`);
  }
}
