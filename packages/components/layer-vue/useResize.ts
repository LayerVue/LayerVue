import type {
  LayerEmits,
  moveOutArray,
  LayerProps,
  ResizeArray,
  Resize,
  AreaReactive,
  OffsetReactive,
} from './props';
import { Directions } from './enums';
import { getRatioHeight, getRatioWidth, getTitleHeight, toArray } from '../../utils/tools';
// import { getTransition } from '../../utils/useGlobal';
import { setStorage, storageKeys } from '../../utils/useStorage';
const docMove = (
  id: Ref<string>,
  e: MouseEvent,
  layer: Ref<HTMLElement>,
  width: number,
  height: number,
  direction: Directions,
  props: LayerProps,
  defaultArea: { width: number; height: number; ratio: number },
  emits: LayerEmits,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive,
  minAreaComputed: ComputedRef<number[]>,
  transition: Ref<string>
) => {
  const { left, top } = offsetReactive;
  const minArea = minAreaComputed.value;
  const Listener = (docE: MouseEvent) => {
    docE.preventDefault();
    const area = { width, height };
    const offset = { top, left };
    const { clientX, clientY } = docE;
    const { innerHeight, innerWidth } = window;

    // 获取clientX和0的最大值后和innerWidth取最小值，获取clientY和0的最大值后和innerHeight取最小值
    const clientXMax = Math.min(Math.max(clientX, 0), innerWidth);
    const clientYMax = Math.min(Math.max(clientY, 0), innerHeight);

    const move = {
      X: clientXMax - e.clientX,
      Y: clientYMax - e.clientY,
    };
    const titleHeight = getTitleHeight(props.title, id);
    const moveOut = toArray(props.moveOut, 4, false) as moveOutArray;
    const widthConfine = (fun?: () => void) => {
      if (area.width < minArea[0]) {
        area.width = minArea[0];
        fun?.();
      }
    };
    const heightConfine = (fun?: () => void) => {
      if (area.height < minArea[1]) {
        area.height = minArea[1];
        fun?.();
      }
    };
    const leftCompute = () => {
      offset.left = left + width - area.width;
    };
    const topCompute = () => {
      offset.top = top + height - area.height;
    };
    const getRW = () => {
      area.width = getRatioWidth(area.height, titleHeight, defaultArea.ratio);
    };
    const getRH = () => {
      area.height = getRatioHeight(area.width, titleHeight, defaultArea.ratio);
    };
    const minConfine = () => {
      widthConfine();
      heightConfine();
    };
    const topConfine = () => {
      if (!moveOut[0]) {
        if (offset.top < 0) {
          offset.top = 0;
          area.height = top + height;
        }
      }
    };
    const rightConfine = () => {
      if (!moveOut[1]) {
        if (offset.left + area.width > innerWidth) {
          area.width = innerWidth - offset.left;
        }
      }
    };
    const bottomConfine = () => {
      if (!moveOut[2]) {
        if (offset.top + area.height > innerHeight) {
          area.height = innerHeight - offset.top;
        }
      }
    };
    const leftConfine = () => {
      if (!moveOut[3]) {
        if (offset.left < 0) {
          offset.left = 0;
          area.width = left + width;
        }
      }
    };
    const isRatio = props.ratio && props.area !== 'auto';
    switch (direction) {
      case Directions.t:
        area.height = height - move.Y;
        if (isRatio) {
          heightConfine();
          getRW();
          widthConfine(getRH);
          topCompute();
          offset.left = left + (width - area.width) / 2;
          if (!moveOut[0] && offset.top < 0) {
            offset.top = 0;
            area.height = top + height;
            getRW();
            offset.left = left - (area.width - width) / 2;
          }
          if (!moveOut[1] && offset.top + area.height > innerHeight) {
            area.width = (innerWidth - left - width) * 2 + width;
            offset.left = innerWidth - area.width;
            getRH();
            topCompute();
          }
          if (!moveOut[3] && offset.left < 0) {
            offset.left = 0;
            area.width = left * 2 + width;
            getRH();
            topCompute();
          }
        } else {
          minConfine();
          topCompute();
          topConfine();
        }

        break;
      case Directions.rt:
        if (isRatio) {
          if (move.X * defaultArea.ratio > -move.Y) {
            area.width = width + move.X;
            widthConfine();
            getRH();
            heightConfine(getRW);
          } else {
            area.height = height - move.Y;
            heightConfine();
            getRW();
            widthConfine(getRH);
          }
          topCompute();
          if (!moveOut[0] && offset.top < 0) {
            offset.top = 0;
            area.height = top + height;
            getRW();
          }
          if (!moveOut[1] && offset.left + area.width > innerWidth) {
            area.width = innerWidth - left;
            offset.left = innerWidth - area.width;
            getRH();
            topCompute();
          }
        } else {
          area.width = width + move.X;
          area.height = height - move.Y;
          minConfine();
          topCompute();
          topConfine();
          rightConfine();
        }

        break;
      case Directions.r:
        area.width = width + move.X;
        if (isRatio) {
          widthConfine();
          getRH();
          heightConfine(getRW);
          offset.top = top + (height - area.height) / 2;
          if (!moveOut[0] && offset.top < 0) {
            offset.top = 0;
            area.height = top * 2 + height;
            getRW();
          }
          if (!moveOut[1] && offset.left + area.width > innerWidth) {
            area.width = innerWidth - left;
            offset.left = innerWidth - area.width;
            getRH();
            offset.top = top - (area.height - height) / 2;
          }
          if (!moveOut[2] && offset.top + area.height > innerHeight) {
            area.height = (innerHeight - height - top) * 2 + height;
            offset.top = innerHeight - area.height;
            getRW();
          }
        } else {
          minConfine();
          rightConfine();
        }

        break;
      case Directions.rb:
        if (isRatio) {
          if (move.X * defaultArea.ratio > move.Y) {
            area.width = width + move.X;
            widthConfine();
            getRH();
            heightConfine(getRW);
          } else {
            area.height = height + move.Y;
            heightConfine();
            getRW();
            widthConfine(getRH);
          }
          if (!moveOut[1] && offset.left + area.width > innerWidth) {
            area.width = innerWidth - left;
            offset.left = innerWidth - area.width;
            getRH();
          }
          if (!moveOut[2] && offset.top + area.height > innerHeight) {
            area.height = innerHeight - top;
            getRW();
          }
        } else {
          area.width = width + move.X;
          area.height = height + move.Y;
          minConfine();
          rightConfine();
          bottomConfine();
        }

        break;
      case Directions.b:
        area.height = move.Y + height;
        if (isRatio) {
          heightConfine();
          getRW();
          widthConfine(getRH);
          offset.left = left + (width - area.width) / 2;
          if (!moveOut[1] && offset.left + area.width > innerWidth) {
            area.width = (innerWidth - left - width) * 2 + width;
            getRH();
            offset.left = innerWidth - area.width;
          }
          if (!moveOut[2] && offset.top + area.height > innerHeight) {
            area.height = innerHeight - offset.top;
            getRW();
            offset.left = left - (area.width - width) / 2;
          }
          if (!moveOut[3] && offset.left < 0) {
            offset.left = 0;
            area.width = left * 2 + width;
            getRH();
          }
        } else {
          minConfine();
          bottomConfine();
        }

        break;
      case Directions.lb:
        if (isRatio) {
          if (-move.X * defaultArea.ratio > move.Y) {
            area.width = width - move.X;
            widthConfine();
            getRH();
            heightConfine(getRW);
          } else {
            area.height = height + move.Y;
            heightConfine();
            getRW();
            widthConfine(getRH);
          }
          leftCompute();
          if (!moveOut[2] && offset.top + area.height > innerHeight) {
            area.height = innerHeight - top;
            getRW();
            leftCompute();
          }
          if (!moveOut[3] && offset.left < 0) {
            offset.left = 0;
            area.width = left + width;
            getRH();
          }
        } else {
          area.width = width - move.X;
          area.height = height + move.Y;
          minConfine();
          leftCompute();
          leftConfine();
          bottomConfine();
        }

        break;
      case Directions.l:
        area.width = width - move.X;
        if (isRatio) {
          widthConfine();
          getRH();
          heightConfine(getRW);
          leftCompute();
          offset.top = top + (height - area.height) / 2;
          if (!moveOut[0] && offset.top < 0) {
            offset.top = 0;
            area.height = top * 2 + height;
            getRW();
            leftCompute();
          }
          if (!moveOut[2] && offset.top + area.height > innerHeight) {
            area.height = (innerHeight - height - top) * 2 + height;
            offset.top = innerHeight - area.height;
            getRW();
            leftCompute();
          }
          if (!moveOut[3] && offset.left < 0) {
            offset.left = 0;
            area.width = left + width;
            getRH();
            offset.top = top - (area.height - height) / 2;
          }
        } else {
          minConfine();
          leftCompute();
          leftConfine();
        }

        break;
      case Directions.lt:
        if (isRatio) {
          if (-move.X * defaultArea.ratio > -move.Y) {
            area.width = width - move.X;
            widthConfine();
            getRH();
            heightConfine(getRW);
          } else {
            area.height = height - move.Y;
            heightConfine();
            getRW();
            widthConfine(getRH);
          }
          topCompute();
          leftCompute();
          if (!moveOut[0] && offset.top < 0) {
            offset.top = 0;
            area.height = top + height;
            getRW();
            leftCompute();
          }
          if (!moveOut[3] && offset.left < 0) {
            offset.left = 0;
            area.width = left + width;
            getRH();
            topCompute();
          }
        } else {
          area.width = width - move.X;
          area.height = height - move.Y;
          minConfine();
          leftCompute();
          topCompute();
          topConfine();
          leftConfine();
        }

        break;
    }
    areaReactive.width = area.width;
    areaReactive.height = area.height;
    offsetReactive.left = offset.left;
    offsetReactive.top = offset.top;
    emits('resizing', layer.value, props.id, area.width, area.height);
  };
  document.addEventListener('mousemove', Listener);
  return () => {
    // transition.value = getTransition();
    const { width, height } = areaReactive;
    setStorage(props.id, { width, height }, storageKeys.area);
    setStorage(
      props.id,
      { left: offsetReactive.left, top: offsetReactive.top },
      storageKeys.offset
    );
    emits('resizeEnd', layer.value, props.id, width, height);
    document.removeEventListener('mousemove', Listener);
  };
};
const useResize = (
  id: Ref<string>,
  e: MouseEvent,
  layer: Ref<HTMLElement>,
  direction: Directions,
  defaultArea: { width: number; height: number; ratio: number },
  props: LayerProps,
  emits: LayerEmits,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive,
  minAreaComputed: ComputedRef<number[]>,
  transition: Ref<string>
) => {
  transition.value = 'none';
  const { clientWidth, clientHeight } = layer.value;
  const removeEventListener = docMove(
    id,
    e,
    layer,
    clientWidth,
    clientHeight,
    direction,
    props,
    defaultArea,
    emits,
    areaReactive,
    offsetReactive,
    minAreaComputed,
    transition
  );
  document.addEventListener('mouseup', removeEventListener, { once: true });
};
const useResizeComputed = (resize: Resize): { resizeComputed: ComputedRef<ResizeArray> } => {
  return {
    resizeComputed: computed(() => {
      return toArray(resize, 8, false) as ResizeArray;
    }),
  };
};
export { useResize, useResizeComputed };
