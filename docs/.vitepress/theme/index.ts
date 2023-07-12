import DefaultTheme from 'vitepress/theme';
import { Theme } from 'vitepress';
import { AsyncComponentLoader, defineAsyncComponent } from 'vue';
import codeViewPlugin from '../../plugins/vitepress-code-view-plugins';
import './custom.scss';
const themeOptions: Theme = {
  Layout: DefaultTheme.Layout,
  extends: codeViewPlugin,
  enhanceApp({ app }) {
    const requireModules = import.meta.glob([
      '../../components/**/*.vue',
      '../../demos/**/*.vue',
    ]) as Record<string, AsyncComponentLoader>;
    for (const [path, module] of Object.entries(requireModules)) {
      const initPath = path.replace('/index.vue', '.');
      const name = initPath.slice(initPath.lastIndexOf('/') + 1, initPath.lastIndexOf('.'));
      app.component(name, defineAsyncComponent(module));
    }
  },
};
export default themeOptions;
