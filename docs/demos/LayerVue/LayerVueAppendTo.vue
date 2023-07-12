<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <label for="appendTo">appendTo: </label>
  <select v-model="appendTo" id="appendTo">
    <option value="body">body</option>
    <option :value="container">container</option>
  </select>
  <div ref="container" class="layer-demo-container"></div>
  <LayerVue ref="layer" v-model:visible="visible" :append-to="appendTo">
    <div class="layer-demo-content-center">appendTo:{{ dom }}</div>
  </LayerVue>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
import type { Ref } from 'vue';
import { LayerVue, LayerVueInst } from 'layer-vue';
const visible = ref(false);
const container: Ref<HTMLElement | null> = ref(null);
const appendTo = ref('body');
const layer: Ref<LayerVueInst | null> = ref(null);
const dom: Ref<string | undefined> = ref(undefined);
onMounted(() => {
  dom.value = layer.value?.getDom()?.parentElement?.parentElement?.nodeName;
});
watch(
  () => appendTo.value,
  value => {
    nextTick(() => {
      dom.value = layer.value?.getDom()?.parentElement?.parentElement?.nodeName;
    });
  }
);
</script>
<style lang="scss">
.layer-demo-container {
  .layer-demo-content-center {
    background-color: aqua;
    color: blueviolet;
  }
}
</style>
