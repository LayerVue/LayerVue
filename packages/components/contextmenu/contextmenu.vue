<template>
  <div @contextmenu.prevent style="overflow: hidden">
    <div
      v-show="visible"
      :style="style"
      class="layer-contextmenu"
      ref="contextmenu"
      @click="documentClick"
    >
      <div
        :key="index"
        v-for="(item, index) in items"
        class="layer-contextmenu-item"
        @mousedown="item.onClick"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getZIndex, nextZIndex } from '../../utils/useGlobal';
import { importCss, styleKey } from '../../utils/css';
import type { ContextmenuProps, ContextmenuInst } from './props';
import css from './style';
const props = withDefaults(defineProps<ContextmenuProps>(), {
  items: () => [],
});
const visible = ref(false);
const zIndex = ref(getZIndex());
const style = computed(() => {
  return {
    '--translate-x': `${props.offSet.left}px`,
    '--translate-y': `${props.offSet.top}px`,
    zIndex: zIndex.value,
  };
});
watch(visible, value => {
  if (value) {
    zIndex.value = nextZIndex();
    requestAnimationFrame(() => {
      document.addEventListener('mousedown', documentClick);
    });
  } else {
    document.removeEventListener('mousedown', documentClick);
  }
});

const documentClick = () => {
  if (visible.value) {
    visible.value = false;
  }
};
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', documentClick);
});
const expose: ContextmenuInst = {
  setVisible: value => {
    visible.value = value;
  },
};
defineExpose(expose);
</script>
<script lang="ts">
const name = 'contextmenu';
importCss(name, css, styleKey);
export default defineComponent({
  name,
});
</script>
