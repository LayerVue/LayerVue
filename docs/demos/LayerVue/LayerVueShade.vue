<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <button class="alt round" @click="shadeClose = !shadeClose">
    {{ content }}
  </button>
  <div id="LayerVueShade"></div>
  <LayerVue v-model:visible="visible" :shade="true" :shade-close="shadeClose">
    <div class="layer-demo-content-center">
      <div>{{ content }}</div>
      <button class="alt round" @click="shadeClose = !shadeClose">切换</button>
    </div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const shadeClose = ref(false);
const content = computed(() => {
  return shadeClose.value ? '点击遮罩可以关闭' : '点击遮罩无法关闭';
});
</script>
