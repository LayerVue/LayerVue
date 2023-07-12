/// <reference types="vitest" />
import { UserConfig, defineConfig } from 'vite';
import { resolve, posix } from 'path';
import { readFileSync } from 'fs';
import fg from 'fast-glob';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { vitePluginScss2Ts } from './plugins/scss-to-ts';
import eslint from 'vite-plugin-eslint';
const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

const input = fg.sync('./packages/components/**/*.{ts,vue}', {
  cwd: __dirname,
  absolute: true,
  onlyFiles: true,
});
input.push(resolve(__dirname, './packages/index.ts'));
const externalPkgs = ['@vue'].concat(
  Object.keys(pkg.dependencies || {}),
  Object.keys(pkg.peerDependencies || {})
);
const external = (id: string) => externalPkgs.some(p => p === id || id.startsWith(`${p}/`));
const assetFileNames = (assetInfo: any) => {
  if (assetInfo.name) {
    const name = assetInfo.name.split('.vue?')[0].split('/').pop();
    return `style/${name}.css`;
  }
  return '[name].[ext]';
};
export default defineConfig(({ command, mode, ssrBuild }) => {
  const config: UserConfig = {
    test: {
      // 启用类似 jest 的全局测试 API
      globals: true,
      // 使用 happy-dom 模拟 DOM
      // 这需要你安装 happy-dom 作为对等依赖（peer dependency）
      environment: 'happy-dom',
    },
    plugins: [
      vitePluginScss2Ts({
        root: __dirname,
        include: ['./packages/**/index.scss'],
        exclude: ['node_modules'],
        compress: mode === 'full' ? true : false,
      }),
      vue(),
      eslint(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: ['vue'],
      }),
    ],
  };
  if (command === 'serve') {
    config.root = './examples';
  }
  if (mode === 'full') {
    config.build = {
      lib: {
        entry: './packages/index.ts',
        formats: ['es', 'umd', 'cjs'],
        name: pkg.name,
      },
      rollupOptions: {
        output: {
          assetFileNames: 'index.[ext]',
        },
      },
    };
  } else {
    config.build = {
      cssCodeSplit: true,
      sourcemap: true,
      target: 'esnext',
      lib: {
        entry: './packages/index.ts',
        name: pkg.name,
      },
      rollupOptions: {
        input,
        external,
        output: [
          {
            format: 'cjs',
            preserveModules: true,
            dir: 'lib',
            entryFileNames: '[name].cjs',
            globals: {
              vue: 'Vue',
            },
            assetFileNames,
          },
          {
            format: 'es',
            preserveModules: true,
            dir: 'es',
            entryFileNames: '[name].mjs',
            assetFileNames,
            globals: {
              vue: 'Vue',
            },
          },
        ],
        treeshake: false,
      },
      commonjsOptions: {
        sourceMap: false,
      },

      chunkSizeWarningLimit: 10000,
    };
  }
  return config;
});
