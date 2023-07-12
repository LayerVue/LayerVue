<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <input type="checkbox" v-model="showInOriginalOnClose" id="showInOriginalOnClose" /><label
    for="showInOriginalOnClose"
    >关闭时显示在原位置</label
  >
  <LayerVue v-model:visible="visible" :show-in-original-on-close="showInOriginalOnClose">
    <div
      :class="{
        'layer-demo-content-center': visible,
      }"
    >
      <Count />
    </div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const showInOriginalOnClose = ref(true);
</script>
