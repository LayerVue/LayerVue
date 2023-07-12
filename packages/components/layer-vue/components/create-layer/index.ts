import type { AppContext, VNode } from 'vue';
import { render } from 'vue';
import { getLayerInstance } from '../../../../utils/useGlobal';
import LayerConstructor from './create-layer.vue';
import type { UseLayerProps } from './props';
import type { LayerVueInst } from '../..';

export type Options = {
  props?: UseLayerProps;
  slots?: {
    default?: HTMLElement | VNode;
    title?: HTMLElement | VNode;
    max?: HTMLElement | VNode;
    min?: HTMLElement | VNode;
    close?: HTMLElement | VNode;
    restore?: HTMLElement | VNode;
  };
};

export type LayerInst = LayerVueInst & {
  destroy: () => void;
};

export type CreateLayer = (options: Options, appContext?: AppContext | null) => Promise<LayerInst>;

const createLayer: CreateLayer = async (options, appContext) => {
  return await new Promise(resolve => {
    const container = document.createElement('div');
    const vNode = h(
      LayerConstructor,
      {
        options: options.props,
        onMounted: v => {
          resolve({
            ...v,
            destroy: () => {
              if (v.status.visible) {
                v.toggleVisible();
              }
              render(null, container);
              document.body.removeChild(firstElementChild!);
            },
          });
        },
        onVanish: () => {
          if (toValue(options.props)?.destroyOnClose) {
            render(null, container);
            document.body.removeChild(firstElementChild!);
          }
        },
      },
      {
        default: () => options.slots?.default,
        title: () => options.slots?.title,
        max: () => options.slots?.max,
        min: () => options.slots?.min,
        close: () => options.slots?.close,
        restore: () => options.slots?.restore,
      }
    );
    appContext && (vNode.appContext = appContext);
    render(vNode, container);
    const { firstElementChild } = container;
    document.body.appendChild(firstElementChild!);
  });
};
const getLayerById = (id: string) => {
  return getLayerInstance(id)?.exposed;
};

export { createLayer, getLayerById };
