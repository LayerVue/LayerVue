<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <p>试着按下标题栏拖动它~</p>
  <LayerVue v-model:visible="visible" id="layer-demo-basic">
    <div class="layer-demo-content-center">left:{{ offset.left }} top:{{ offset.top }}</div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const offset = ref({
  left: 0,
  top: 0,
});
const ob = new MutationObserver((mutations, observer) => {
  mutations.forEach(mutation => {
    const layerEl = mutation.target as HTMLElement;
    const { left, top } = layerEl.getBoundingClientRect();
    offset.value = {
      left,
      top,
    };
  });
});

onMounted(() => {
  const layer = document.querySelector('[layer-id="layer-demo-basic"] .layer-vue-box')!;
  ob.observe(layer, {
    attributeFilter: ['style'],
  });
});
</script>
