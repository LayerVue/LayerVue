declare module 'vue' {
  export interface GlobalComponents {
    LayerVue: typeof import('layer-vue')['LayerVue'];
    GlobalStyle: typeof import('layer-vue')['GlobalStyle'];
    ConfigProvider: typeof import('layer-vue')['ConfigProvider'];
    Contextmenu: typeof import('layer-vue')['Contextmenu'];
  }
}
export {};
