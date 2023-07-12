import type { moveOutArray, LayerEmits, LayerProps, AreaReactive, OffsetReactive } from './props';
import { toArray } from '../../utils/tools';
// import { getTransition } from '../../utils/useGlobal';
import { setStorage, storageKeys } from '../../utils/useStorage';
import { useMax } from './useMaxmin';

const defaultMove = '.layer-vue-title-text';

const docMoe = (
  minAreaComputed: ComputedRef<number[]>,
  id: Ref<string>,
  layer: Ref<HTMLElement>,
  e: MouseEvent,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive,
  left: number,
  top: number,
  emits: LayerEmits,
  props: LayerProps,
  transition: Ref<string>,
  isMin: Ref<boolean>,
  isMax: Ref<boolean>,
  maxminComputed: ComputedRef<[boolean, boolean]>,
  showGlassRef: Ref<boolean>
) => {
  const moveOut = toArray(props.moveOut, 4, false) as moveOutArray; // [上，右，下，左]
  const Listener = (docE: MouseEvent) => {
    // 鼠标移动事件
    docE.preventDefault(); // 阻止默认事件
    if (isMax.value) {
      // 如果是最大化状态，取消最大化，设置top为0，设置left为鼠标相对于视口的位置减去layer的宽度的一半
      useMax(minAreaComputed, isMin, isMax, id, areaReactive, offsetReactive, props.title);
      offsetReactive.top = 0;
      top = 0;
      offsetReactive.left = e.clientX - areaReactive.width / 2;
      left = offsetReactive.left;
    } else {
      // 如果不是最大化状态，设置遮罩显示状态，如果鼠标超出上边界，显示遮罩，否则隐藏遮罩
      showGlassRef.value = docE.clientY < 0;
    }

    const { clientX, clientY } = docE; // 获取鼠标当前位置,相对于视口
    const { innerWidth, innerHeight } = window; // 获取窗口宽高,相对于视口

    // 获取clientX和0的最大值后和innerWidth取最小值，获取clientY和0的最大值后和innerHeight取最小值
    const clientXMax = Math.min(Math.max(clientX, 0), innerWidth);
    const clientYMax = Math.min(Math.max(clientY, 0), innerHeight);

    const move = {
      // 移动的距离，X轴和Y轴,相对于视口,相对于鼠标按下的位置
      X: clientXMax - e.clientX,
      Y: clientYMax - e.clientY,
    };
    const offset = {
      left: left + move.X,
      top: top + move.Y,
    };

    const { clientWidth, clientHeight } = layer.value;
    if (!moveOut[0]) {
      // 如果不允许超出上边界
      if (offset.top < 0) {
        // 如果超出上边界，设置top为0
        offset.top = 0;
      }
    }
    if (!moveOut[1]) {
      // 如果不允许超出右边界
      if (offset.left + clientWidth > innerWidth) {
        // 如果超出右边界，设置left为innerWidth - clientWidth
        offset.left = innerWidth - clientWidth;
      }
    }
    if (!moveOut[2]) {
      // 如果不允许超出下边界，设置top为innerHeight - clientHeight
      if (offset.top + clientHeight > innerHeight) {
        offset.top = innerHeight - clientHeight;
      }
    }
    if (!moveOut[3]) {
      // 如果不允许超出左边界，设置left为0
      if (offset.left < 0) {
        offset.left = 0;
      }
    }
    // 设置left和top
    offsetReactive.left = offset.left;
    offsetReactive.top = offset.top;
  };
  document.addEventListener('mousemove', Listener); // 添加鼠标移动事件
  return (docE: MouseEvent) => {
    // 鼠标抬起事件
    // transition.value = getTransition(); // 设置过渡
    if (maxminComputed.value[0] && docE.clientY < 0) {
      // 如果允许最大化，且鼠标超出上边界，设置最大化
      showGlassRef.value = false; // 隐藏遮罩
      useMax(minAreaComputed, isMin, isMax, id, areaReactive, offsetReactive, props.title);
    }
    setStorage(
      props.id,
      { left: offsetReactive.left, top: offsetReactive.top },
      storageKeys.offset
    );
    emits('moveEnd', layer.value, props.id, offsetReactive.top, offsetReactive.left);
    document.removeEventListener('mousemove', Listener); // 移除鼠标移动事件
  };
};
const useMove = (
  minAreaComputed: ComputedRef<number[]>,
  id: Ref<string>,
  layer: Ref<HTMLElement>,
  e: MouseEvent,
  areaReactive: AreaReactive,
  offsetReactive: { left: number; top: number },
  emits: LayerEmits,
  props: LayerProps,
  transition: Ref<string>,
  isMin: Ref<boolean>,
  isMax: Ref<boolean>,
  maxminComputed: ComputedRef<[boolean, boolean]>,
  showGlassRef: Ref<boolean>
) => {
  // 移动事件
  transition.value = 'none'; // 设置过渡为none
  const { left, top } = offsetReactive; // 获取当前的left和top
  const removeEventListener = docMoe(
    minAreaComputed,
    id,
    layer,
    e,
    areaReactive,
    offsetReactive,
    left,
    top,
    emits,
    props,
    transition,
    isMin,
    isMax,
    maxminComputed,
    showGlassRef
  ); // 获取移动事件
  document.addEventListener('mouseup', removeEventListener, {
    once: true,
  }); // 添加鼠标抬起事件
};

const useMoveVerify = (move: string | boolean) => {
  // 验证移动的元素
  if (typeof move === 'boolean') {
    // 如果是布尔值
    if (move) {
      // 如果是true
      return defaultMove; // 返回默认的移动元素
    } else {
      return false;
    }
  } else if (typeof move === 'string') {
    // 如果是字符串
    if (/^[0-9]+$/.test(move)) {
      // 如果是数字
      return defaultMove; // 返回默认的移动元素
    } else {
      // 如果是字符串，但不是数字，就是选择器，直接返回
      return move;
    }
  }
  return defaultMove; // 如果不是布尔值，也不是字符串，就返回默认的移动元素
};
export { useMove, useMoveVerify };
