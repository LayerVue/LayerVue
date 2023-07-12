<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }} 置顶窗口1
  </button>
  <button class="brand round" @click="visible2 = !visible2">
    {{ visible2 ? '关闭' : '打开' }} 置顶窗口2
  </button>
  <LayerVue ref="layer1" :offset="[100, 100]" v-model:visible="visible" :set-top="true">
    <div class="layer-demo-content-center">
      zIndex: {{ layer1?.status?.zIndex! }} {{ isTop ? '我置顶了！' : '我下去了！' }}
    </div>
  </LayerVue>
  <LayerVue ref="layer2" :offset="[200, 200]" v-model:visible="visible2" :set-top="true">
    <div class="layer-demo-content-center">
      zIndex: {{ layer2?.status?.zIndex! }} {{ !isTop ? '我置顶了！' : '我下去了！' }}
    </div>
  </LayerVue>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { LayerVue, LayerVueInst } from 'layer-vue';
const visible = ref(false);
const visible2 = ref(false);
const layer1 = ref<LayerVueInst>();
const layer2 = ref<LayerVueInst>();
const isTop = computed(() => {
  return layer1.value?.status?.zIndex! > layer2.value?.status?.zIndex!;
});
</script>
