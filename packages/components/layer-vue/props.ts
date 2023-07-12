import { useThemeConfigDefault } from '../../utils/useThemeProps';
import type { VNode } from 'vue';
import type { Theme, ThemeConfig } from '../config-provider';
export type moveOutArray = [boolean | number, boolean | number, boolean | number, boolean | number];
export type ResizeArray = [
  boolean | number,
  boolean | number,
  boolean | number,
  boolean | number,
  boolean | number,
  boolean | number,
  boolean | number,
  boolean | number
];
export type Visible = boolean | undefined;
export type Title = number | string | boolean | undefined;
export type SetTop = boolean;
export type Move = string | boolean | undefined;
export type Area = string | number | [string | number, string | number] | undefined;
export type Offset =
  | string
  | number
  | undefined
  | [string | number | undefined, string | number | undefined]
  | undefined;
export type MaxMin = boolean | number | [boolean | number, boolean | number] | undefined;
export type Anim = number | undefined;
export type Content = number | string | VNode | HTMLElement | undefined;
export type Id = string | undefined;
export type DestroyOnClose = boolean | undefined;
export type Resize = number | boolean | ResizeArray | undefined;
export type MoveOut = number | boolean | moveOutArray | undefined;
export type OffsetReverse = boolean | number | [boolean | number, boolean | number] | undefined;
export type MinArea = [string | number, string | number] | undefined;

export interface LayerEmits {
  (event: 'update:visible', visible: boolean): void;
  (event: 'success', el: HTMLElement | null, id: string | undefined): void;
  (event: 'cancel', el: HTMLElement | null, id: string | undefined): void;
  (
    event: 'resizing',
    el: HTMLElement | null,
    id: string | undefined,
    width: number,
    height: number
  ): void;
  (
    event: 'resizeEnd',
    el: HTMLElement | null,
    id: string | undefined,
    width: number,
    height: number
  ): void;
  (
    event: 'moveEnd',
    el: HTMLElement | null,
    id: string | undefined,
    top: number,
    left: number
  ): void;
  (event: 'beforeClose', el: HTMLElement | null, id: string | undefined): boolean;
}

export interface PublicProps {
  appendTo?: string | HTMLElement;
  destroyOnClose?: DestroyOnClose;
  setTop?: SetTop;
  move?: Move;
  area?: Area;
  offset?: Offset;
  maxmin?: MaxMin;
  anim?: Anim;
  content?: Content;
  id?: Id;
  shade?: boolean;
  shadeClose?: boolean;
  themeConfig?: ThemeConfig;
  resize?: Resize;
  moveOut?: MoveOut;
  ratio?: boolean;
  lazy?: boolean;
  closeBtn?: boolean;
  theme?: Theme;
  zIndex?: number;
  offsetReverse?: OffsetReverse;
  minArea?: MinArea;
}

export interface LayerProps {
  visible?: Visible;
  title?: Title;
  showInOriginalOnClose?: boolean;
  appendTo?: string | HTMLElement;
  destroyOnClose?: DestroyOnClose;
  setTop?: SetTop;
  move?: Move;
  area?: Area;
  offset?: Offset;
  maxmin?: MaxMin;
  anim?: Anim;
  content?: Content;
  id?: Id;
  shade?: boolean;
  shadeClose?: boolean;
  themeConfig?: ThemeConfig;
  resize?: Resize;
  moveOut?: MoveOut;
  ratio?: boolean;
  lazy?: boolean;
  closeBtn?: boolean;
  theme?: Theme;
  zIndex?: number;
  offsetReverse?: OffsetReverse;
  minArea?: MinArea;
}

export interface LayerState {
  layer: any;
  randered: any;
  zIndexRef: any;
  isMax: any;
  isMin: any;
  offsetReactive: any;
  visibleRef: any;
  transitionRef: any;
  showGlassRef: any;
}

export type OffsetReactive = {
  top: number;
  left: number;
}; // layer的位置
export type AreaReactive = {
  width: number;
  height: number;
};

export type LayerMapValue = {
  width: number;
  height: number;
  top: number;
  left: number;
  offsetReactive: OffsetReactive;
  areaReactive: AreaReactive;
}; // layer的宽高和位置

export type LayerVueStatus = {
  isMax: boolean;
  isMin: boolean;
  visible: boolean;
  zIndex: number;
  width: number;
  height: number;
  top: number;
  left: number;
};

export interface LayerVueInst {
  resetOffset: () => void;
  resetArea: () => void;
  toTop: () => void;
  toggleVisible: () => void;
  status: LayerVueStatus;
  getDom: () => HTMLElement | null;
}

const defaultProps: LayerProps = {
  visible: false,
  title: '标题',
  setTop: false,
  offset: 'auto',
  move: '.layer-vue-title-text',
  area: 'auto',
  maxmin: false,
  anim: 1,
  content: undefined,
  shade: false,
  shadeClose: false,
  destroyOnClose: false,
  resize: false,
  moveOut: true,
  ratio: false,
  id: undefined,
  lazy: true,
  closeBtn: true,
  theme: undefined,
  zIndex: 200,
  offsetReverse: false,
  minArea: [300, 150],
  appendTo: 'body',
  themeConfig: useThemeConfigDefault(),
};
const useProps = () => {
  const props: {
    [key in keyof LayerProps]: () => any;
  } = {};
  for (const key in defaultProps) {
    if (Object.prototype.hasOwnProperty.call(defaultProps, key)) {
      const element = defaultProps[key as keyof LayerProps];
      if (typeof element === 'function') {
        props[key as keyof LayerProps] = element as () => any;
      } else {
        props[key as keyof LayerProps] = () => element;
      }
    }
  }
  return props;
};
export { useProps, defaultProps };
