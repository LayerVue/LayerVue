import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
import { resolve } from 'path';
import { initSidebar, initNav } from '../utils/index';
import { homepage, name, description, logo } from '../../package.json';
import markdownItCodeView from '../plugins/demoPreview';
const sidebar = initSidebar();
export default defineConfig({
  title: name,
  description,
  themeConfig: {
    logo,
    // https://vitepress.dev/reference/default-theme-config
    nav: [...initNav()],
    sidebar,
    socialLinks: [{ icon: 'github', link: homepage }],
    outlineTitle: '当前页',
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: homepage + '/docs/:path',
      text: '为此页提供修改建议',
    },
    lastUpdatedText: 'Updated Date',
  },
  head: [['link', { rel: 'icon', href: logo }]],
  base: `/${name}/`,
  vite: {
    plugins: [],
    resolve: {
      alias: [
        // @
        {
          find: /^@\/(.*)/,
          replacement: resolve(__dirname, '../../$1'),
        },
      ],
    },
  },
  markdown: {
    config(md) {
      md.use(markdownItCodeView, {
        componentName: 'CodeView',
        glob:['./components/**/*.vue', './demos/**/*.vue']
      });
    },
  },
});
