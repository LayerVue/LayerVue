import type {
  LayerProps,
  MaxMin,
  Title,
  AreaReactive,
  OffsetReactive,
  LayerMapValue,
} from './props';
import { emitter, getTitleHeight } from '../../utils/tools';
type LayerMap = Map<string, LayerMapValue>;
let minW = 150; // 最小化的宽度

// 格式化maxmin参数
const useMaxmin = (maxmin: MaxMin): [boolean, boolean] => {
  // 最大化最小化
  if (typeof maxmin === 'boolean') {
    // 如果是布尔值，直接返回
    return [maxmin, maxmin];
  }

  if (typeof maxmin === 'number') {
    // 如果是数字
    const isOpen = maxmin !== 0; // 如果不是0，就是true，否则就是false
    return [isOpen, isOpen];
  }

  if (maxmin instanceof Array) {
    // 如果是数组
    return [useMaxmin(maxmin[0])[0], useMaxmin(maxmin[1])[1]]; // 返回最大化和最小化的值
  }

  return [false, false];
};

const minList: LayerMap = new Map(); // 最小化的layer
const maxList: LayerMap = new Map(); // 最大化的layer

// 新增到List
const addList = (
  list: LayerMap,
  id: Ref<string>,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive
) => {
  const { width, height } = areaReactive;
  const { top, left } = offsetReactive;
  list.set(id.value, { width, height, top, left, offsetReactive, areaReactive });
};

// 从List中删除,并重新设置layer的位置
const deleteList = (list: LayerMap, id: Ref<string>, minAreaComputed: ComputedRef<number[]>) => {
  if (!list.has(id.value)) return;
  const layerMapValue = list.get(id.value);
  list.delete(id.value);
  if (layerMapValue) {
    setLayerPosition(minAreaComputed, layerMapValue);
  }
};

// 重新设置layer的位置
const setLayerPosition = (minAreaComputed: ComputedRef<number[]>, layerMapValue: LayerMapValue) => {
  const { width, height, top, left, offsetReactive, areaReactive } = layerMapValue;
  areaReactive.width = width;
  areaReactive.height = height;
  offsetReactive.top = top;
  offsetReactive.left = left;
};

// 最大化layer
const toMax = (
  minAreaComputed: ComputedRef<number[]>,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive
) => {
  const { innerHeight, innerWidth } = window;
  areaReactive.width = innerWidth;
  areaReactive.height = innerHeight;
  offsetReactive.left = 0;
  offsetReactive.top = 0;
};

// 最小化layer
const toMin = (
  id: Ref<string>,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive,
  title: Title
) => {
  const { innerHeight } = window;
  const titleHeight = getTitleHeight(title, id);
  areaReactive.height = titleHeight;
  offsetReactive.top = innerHeight - titleHeight;
};

// 刷新minList中layer的位置
const refreshMinList = () => {
  const { innerWidth } = window;
  const { length } = Array.from(minList);
  const width = innerWidth / length;
  minW = width > 150 ? 150 : width;
  Array.from(minList).forEach(([_, { offsetReactive, areaReactive }], index) => {
    areaReactive.width = minW;
    offsetReactive.left = index * minW;
  });
};

// 最大化
const useMax = (
  minAreaComputed: ComputedRef<number[]>,
  isMin: Ref<boolean>,
  isMax: Ref<boolean>,
  id: Ref<string>,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive,
  title: Title
) => {
  // 如果是最小化状态，点击最大化，先把最小化状态去掉
  if (isMin.value && title) {
    isMin.value = false;
    deleteList(minList, id, minAreaComputed);
    refreshMinList();
  }

  if (isMax.value) {
    deleteList(maxList, id, minAreaComputed);
  } else {
    addList(maxList, id, areaReactive, offsetReactive);
    toMax(minAreaComputed, areaReactive, offsetReactive);
  }
  isMax.value = !isMax.value;
};

// 最小化
const useMin = (
  minAreaComputed: ComputedRef<number[]>,
  isMin: Ref<boolean>,
  isMax: Ref<boolean>,
  id: Ref<string>,
  areaReactive: AreaReactive,
  offsetReactive: { left: number; top: number },
  props: LayerProps
) => {
  // 如果是最大化状态，点击最小化，先把最大化状态去掉
  if (isMax.value) {
    isMax.value = false;
    deleteList(maxList, id, minAreaComputed);
  }
  // 如果没有title，直接return
  if (!props.title) {
    return;
  }
  if (isMin.value) {
    deleteList(minList, id, minAreaComputed);
  } else {
    addList(minList, id, areaReactive, offsetReactive);
    toMin(id, areaReactive, offsetReactive, props.title);
  }
  refreshMinList();
  isMin.value = !isMin.value;
};

let resizeId: number; // 监听窗口大小变化的id
// 监听窗口大小变化
emitter.on('resize', () => {
  clearTimeout(resizeId);
  resizeId = window.setTimeout(() => {
    refreshMinList();
  }, 100);
});

export { useMax, useMin, useMaxmin };
