import type { Offset } from '../components/layer-vue/props';
import { CssLength, Offsets } from '../components/layer-vue/enums';
const useAreaLength = (value: null | number | string | unknown[] | unknown): [number, number] => {
  if (value === null) {
    return [0, 0];
  }
  if (typeof value === 'string') {
    if (value === 'auto') {
      return [0, 0];
    }
    // todo 处理 % vm vh 等单位
    return [parseFloat(value), 0];
  }
  if (typeof value === 'number') {
    return [value, 0];
  }
  if (value instanceof Array) {
    return [useAreaLength(value[0])[0], useAreaLength(value[1])[0]];
  }
  return [0, 0];
};

const useLength = (val: string | number | undefined, innerHeight: number, innerWidth: number) => {
  if (val === undefined) {
    return 0;
  } else if (typeof val === 'number') {
    return parseFloat(val.toFixed(2));
  }
  let length = parseFloat(val) | 0;
  Object.entries(CssLength).forEach(([key, value]) => {
    if (val.includes(value)) {
      switch (value) {
        case CssLength['%']:
          length = innerHeight * 0.01 * length;

          break;
        case CssLength.px:
          break;
        case CssLength.vh:
          length = innerHeight * 0.01 * length;

          break;
        case CssLength.vw:
          length = innerWidth * 0.01 * length;

          break;
        default:
          break;
      }
    }
  });
  return parseFloat(length.toFixed(2));
};
const useOffsetLength = (
  offset: Offset,
  areaObj: { height: number; width: number },
  offsetReverse: [boolean, boolean]
): { top: number; left: number } => {
  const { innerWidth, innerHeight } = window;
  const offsetObj = {
    top: 0,
    left: 0,
  };
  if (typeof offset === 'string') {
    switch (offset) {
      case Offsets.auto:
        offsetObj.top = (innerHeight - areaObj.height) / 2;
        offsetObj.left = (innerWidth - areaObj.width) / 2;

        break;
      case Offsets.t:
        offsetObj.left = (innerWidth - areaObj.width) / 2;
        offsetObj.top = 0;

        break;
      case Offsets.r:
        offsetObj.left = innerWidth - areaObj.width;
        offsetObj.top = (innerHeight - areaObj.height) / 2;

        break;
      case Offsets.b:
        offsetObj.left = (innerWidth - areaObj.width) / 2;
        offsetObj.top = innerHeight - areaObj.height;

        break;
      case Offsets.l:
        offsetObj.left = 0;
        offsetObj.top = (innerHeight - areaObj.height) / 2;

        break;
      case Offsets.lt:
        offsetObj.left = 0;
        offsetObj.top = 0;

        break;
      case Offsets.rt:
        offsetObj.left = innerWidth - areaObj.width;
        offsetObj.top = 0;

        break;
      case Offsets.rb:
        offsetObj.left = innerWidth - areaObj.width;
        offsetObj.top = innerHeight - areaObj.height;

        break;
      case Offsets.lb:
        offsetObj.left = 0;
        offsetObj.top = innerHeight - areaObj.height;

        break;
      default:
        offsetObj.top = useLength(offset, innerHeight, innerWidth);
        offsetObj.left = (innerWidth - areaObj.width) / 2;

        break;
    }
  } else if (typeof offset === 'number') {
    offsetObj.top = offset;
    offsetObj.left = (innerWidth - areaObj.width) / 2;
  } else if (offset instanceof Array) {
    offsetObj.top =
      offset[0] === 'auto'
        ? (innerHeight - areaObj.height) / 2
        : useLength(offset[0], innerHeight, innerWidth);
    offsetObj.left =
      offset[1] === 'auto'
        ? (innerWidth - areaObj.width) / 2
        : useLength(offset[1], innerHeight, innerWidth);
  }
  if (offsetReverse[0]) {
    offsetObj.top = innerHeight - areaObj.height - offsetObj.top;
  }
  if (offsetReverse[1]) {
    offsetObj.left = innerWidth - areaObj.width - offsetObj.left;
  }
  return offsetObj;
};

export { useAreaLength, useLength, useOffsetLength };
