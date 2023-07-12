/// <reference types="vite/client" />
import { AsyncComponentLoader, defineAsyncComponent } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { Theme } from 'vitepress';
import { DirectiveBinding } from 'vue';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

// 注册语言模块
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
const codeHighlightPlugin = (): Theme => {
  return {
    Layout: DefaultTheme.Layout,
    extends: DefaultTheme,
    enhanceApp({ app }) {
      app.directive('highlight', {
        mounted(el: HTMLElement, binding: DirectiveBinding) {
          const code = binding.value as string;
          el.innerHTML = hljs.highlightAuto(code).value;
        },
      });
      const requireModules = import.meta.glob('./components/**/*.vue') as Record<
        string,
        AsyncComponentLoader
      >;
      for (const [path, module] of Object.entries(requireModules)) {
        const initPath = path.replace('/index.vue', '.');
        const name = initPath.slice(initPath.lastIndexOf('/') + 1, initPath.lastIndexOf('.'));
        app.component(name, defineAsyncComponent(module));
      }
    },
  };
};

export default codeHighlightPlugin;
