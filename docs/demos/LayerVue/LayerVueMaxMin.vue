<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <LayerVue v-model:visible="visible" :maxmin="[true, true]">
    <div class="layer-demo-content-center">内容区</div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
</script>
