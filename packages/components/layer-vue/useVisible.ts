import type { LayerEmits, LayerProps } from './props';

const useVisible = (visible: boolean, visibleRef: Ref<boolean>, emits: LayerEmits) => {
  visibleRef.value = visible;
  emits('update:visible', visible);
};
const useVisibleRef = () => {
  const visibleRef = ref(false);
  return {
    visibleRef,
  };
};
const useVisibleWatch = (visibleRef: Ref<boolean>, props: LayerProps, openInit: () => void) => {
  watch(
    () => props.visible,
    value => {
      visibleRef.value = !!value;
    },
    {
      immediate: true,
    }
  );
  watch(
    () => visibleRef.value,
    value => {
      value && openInit();
    }
  );
};
export { useVisible, useVisibleRef, useVisibleWatch };
