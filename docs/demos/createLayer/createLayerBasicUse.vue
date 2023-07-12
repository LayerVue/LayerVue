<template>
  <button class="brand round" @click="switchLayer">
    {{ layerDemo ? '关闭' : '打开' }}
  </button>
</template>
<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import { createLayer } from 'layer-vue';
const layerDemo: any = ref(null);

const switchLayer = () => {
  if (layerDemo.value) {
    layerDemo.value.close?.();
  } else {
    layerDemo.value = createLayer({
      props: {
        title: 'LayerVue',
        content: 'Hello LayerVue!',
        destroyOnClose: true,
        cancel() {
          layerDemo.value = null;
        },
      },
    });
  }
};

onBeforeUnmount(() => {
  layerDemo.value && layerDemo.value.close?.();
});
</script>
