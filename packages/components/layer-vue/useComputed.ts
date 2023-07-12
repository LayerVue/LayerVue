import { useMaxmin } from './useMaxmin';
import type { LayerProps, OffsetReactive, AreaReactive, ResizeArray } from './props';
import { toArray } from '../../utils/tools';
import { useLength } from '../../utils/useLength';
import { defaultProps } from './props';
import { cssPrefix, getCssVar } from '../../utils/css';
export const useComputed = (
  props: LayerProps,
  zIndexRef: Ref<number>,
  isMin: Ref<boolean>,
  transitionRef: Ref<string>,
  areaReactive: AreaReactive,
  offsetReactive: OffsetReactive
) => {
  const id = 'layer-id' + Math.random().toString(36);
  // #region computed
  const cssVar = computed(() => {
    const { themeConfig } = props;
    return getCssVar(themeConfig, cssPrefix);
  });
  const maxminComputed = computed(() => useMaxmin(props.maxmin));
  const resizeComputed = computed(() => {
    const { resize } = props;
    return toArray(resize, 8, false) as ResizeArray;
  });
  const minAreaComputed = computed(() => {
    const { minArea } = props;
    if (minArea) {
      const { innerWidth, innerHeight } = window;
      return [
        useLength(minArea[0], innerWidth, innerHeight),
        useLength(minArea[1], innerWidth, innerHeight),
      ];
    } else {
      return defaultProps.minArea as [number, number];
    }
  });
  const cssComputed = computed(() => {
    return {
      'z-index': zIndexRef.value,
      minWidth: isMin.value ? '' : minAreaComputed.value![0] + 'px',
      minHeight: isMin.value ? '' : minAreaComputed.value![1] + 'px',
      width: areaReactive.width ? areaReactive.width + 'px' : '',
      height: areaReactive.height ? areaReactive.height + 'px' : '',
      '--transition': transitionRef.value,
      '--translate-x': `${offsetReactive.left}px`,
      '--translate-y': `${offsetReactive.top}px`,
    };
  });
  const idComputed = computed(() => {
    if (props.id) return props.id;
    return id;
  });

  // #endregion
  return {
    cssVar,
    maxminComputed,
    resizeComputed,
    minAreaComputed,
    cssComputed,
    idComputed,
  };
};
