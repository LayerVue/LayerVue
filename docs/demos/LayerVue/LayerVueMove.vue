<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <p>试着按下 `{{ move === '.layer-vue-title-text' ? '标题' : '内容区' }}` 拖动它~</p>
  <label for="move">移动位置： </label>
  <select v-model="move" id="move">
    <option value=".layer-vue-title-text">标题</option>
    <option value=".layer-demo-content-center">内容区</option>
  </select>
  <LayerVue v-model:visible="visible" :move="move" :title="move === '.layer-vue-title-text'?'按下我拖动弹窗':'标题'">
    <div class="layer-demo-content-center">{{ move === '.layer-vue-title-text'?'内容区':'按下我拖动弹窗' }}</div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const move = ref('.layer-vue-title-text');
</script>
