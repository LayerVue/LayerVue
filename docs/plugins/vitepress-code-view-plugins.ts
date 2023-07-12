/// <reference types="vite/client" />
import DefaultTheme from 'vitepress/theme';
import { Theme, EnhanceAppContext, Awaitable } from 'vitepress';
import { DefineComponent } from 'vue';
import codeView from './vitepress-code-highlight-plugin';
const vitepressPlugin = (themes: Theme[], Layout: DefineComponent = DefaultTheme.Layout): Theme => {
  const theme: Theme = {
    Layout: Layout,
  };
  const enhanceApps = themes.reduce((pre, theme) => {
    const { enhanceApp } = theme;
    if (enhanceApp) {
      pre.push((ctx: EnhanceAppContext) => {
        return enhanceApp(ctx);
      });
    }
    return pre;
  }, [] as ((ctx: EnhanceAppContext) => Awaitable<void>)[]);
  theme.enhanceApp = ctx => {
    for (const enhanceApp of enhanceApps) {
      enhanceApp(ctx);
    }
  };

  return theme;
};

const codeViewPlugin = vitepressPlugin([codeView()]);
export default codeViewPlugin;
export { vitepressPlugin };
