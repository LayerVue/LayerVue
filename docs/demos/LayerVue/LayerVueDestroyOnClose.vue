<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <input type="checkbox" v-model="destroyOnClose" id="destroyOnClose" /><label for="destroyOnClose">
    关闭时销毁内容区
  </label>
  <LayerVue v-model:visible="visible" :destroy-on-close="destroyOnClose">
    <div class="layer-demo-content-center"><Count /></div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const destroyOnClose = ref(true);
</script>
