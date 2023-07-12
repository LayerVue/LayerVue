import type { MaybeRefOrGetter } from 'vue';
import type {
  Title,
  Anim,
  Area,
  Content,
  DestroyOnClose,
  Id,
  MaxMin,
  MinArea,
  Move,
  MoveOut,
  Offset,
  OffsetReverse,
  Resize,
  SetTop,
} from '../..';
import type { ThemeConfig, Theme } from '../../../config-provider';

export type InsideProps = {
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
  success?: (el: HTMLElement | null, id: string | undefined) => void;
  cancel?: (el: HTMLElement | null, id: string | undefined) => void;
  resizing?: (
    el: HTMLElement | null,
    id: string | undefined,
    width: number,
    height: number
  ) => void;
  resizeEnd?: (
    el: HTMLElement | null,
    id: string | undefined,
    width: number,
    height: number
  ) => void;
  moveEnd?: (el: HTMLElement | null, id: string | undefined, top: number, left: number) => void;
  beforeClose?: (el: HTMLElement | null, id: string | undefined) => boolean;
};

export type UseLayerProps = MaybeRefOrGetter<InsideProps>;
