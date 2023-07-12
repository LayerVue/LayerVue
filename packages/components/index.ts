import type { App, Plugin, Component } from 'vue';
import { LayerVue } from './layer-vue';
import { LayerConfigProvider } from './config-provider';
import { LayerContextmenu } from './contextmenu';
import { LayerGlobalStyle } from './global-style';

export const components = [LayerVue, LayerConfigProvider, LayerContextmenu, LayerGlobalStyle];

function buildInstall(components: Component[] | Plugin<any>[]) {
  return function install(app: App) {
    components.forEach(component => {
      if (typeof component === 'function' || typeof component.install === 'function') {
        app.use(component as Plugin<any[]>);
      } else {
        app.component((component as Component).name!, component);
      }
    });
  };
}

export const install = buildInstall(components);

export * from './layer-vue';
export * from './config-provider';
export * from './contextmenu';
export * from './global-style';
