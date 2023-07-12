// #region import
import { useVisibleRef } from './useVisible';
// #endregion

export const useRef = () => {
  // #region refs
  const layer: Ref<HTMLElement | null> = ref(null);
  const randered = ref(false);
  const zIndexRef = ref(200);
  const isMax = ref(false);
  const isMin = ref(false);
  const offsetReactive = reactive({
    top: 0,
    left: 0,
  });
  const areaReactive = reactive({
    width: 0,
    height: 0,
  });
  const { visibleRef } = useVisibleRef();
  const transitionRef = ref('');
  const showGlassRef = ref(false);
  // #endregion

  return {
    layer,
    randered,
    zIndexRef,
    isMax,
    isMin,
    offsetReactive,
    visibleRef,
    transitionRef,
    showGlassRef,
    areaReactive,
  };
};
