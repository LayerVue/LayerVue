import { nextZIndex } from '../../utils/useGlobal';
const useTop = (top: Ref<number>) => {
  top.value = nextZIndex();
};

const useTopRef = () => {
  const zIndex = ref(0);
  return { zIndex };
};

export { useTopRef, useTop };
