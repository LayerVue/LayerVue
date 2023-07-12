---
title: 安装
---

# 安装

注意，最新版仅支持 Vue3。如果你在使用 Vue2，请安装小于 2.0 的版本 <a href="https://gitee.com/finalsummer/LayerVue/blob/e0ef5c67f02081821222e00dfff99a13151c74f6/README.md" target="_blank">Vue2 版本文档</a>。

<a href="https://codesandbox.io/s/layer-vue-vue2-umd-6xg2b0" target="_blank">在 CodeSandbox 上查看 Vue2 版本的 LayerVue</a>

## 使用包管理器安装 LayerVue

::: code-group

```sh [npm]
$ npm i layer-vue@next
```

```sh [pnpm]
$ pnpm i layer-vue@next
```

```sh [yarn]
$ yarn add layer-vue@next
```

:::

## 使用 CDN 引入 LayerVue

你可以通过 CDN 的方式引入 LayerVue，不过请注意，你需要额外引入 Vue3。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- 引入样式 -->
    <link rel="stylesheet" href="https://unpkg.com/layer-vue/dist/layer-vue.css" />

    <!-- 引入 Vue3 -->
    <script src="https://unpkg.com/vue@next"></script>

    <!-- 引入组件库 -->
    <script src="https://unpkg.com/layer-vue/dist/layer-vue.umd.js"></script>
  </head>
  <body>
    <div id="app">
      <button @click="visible = true">打开弹出层</button>
      <layer-vue v-model:visible="visible"></layer-vue>
    </div>
    <script>
      const App = {
        setup() {
          return {
            visible: false,
          };
        },
      };
      const app = Vue.createApp(App);
      app.use(LayerVue);
      app.mount('#app');
    </script>
  </body>
</html>
```
