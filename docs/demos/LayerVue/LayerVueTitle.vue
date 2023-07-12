<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <button class="brand round" @click="showTitle = !showTitle">
    {{ !showTitle ? '不显示标题' : '显示标题' }}
  </button>
  <input v-model="titleText" type="text" :disabled="!showTitle" />
  <LayerVue v-model:visible="visible" :title="title" :shade="true" :shade-close="true">
    <div class="layer-demo-content-center">
      {{ showTitle ? '' : '没有标题了，可以点击遮罩关闭哦~' }}
    </div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const showTitle = ref(true);
const titleText = ref('输入一个个性的标题吧！');
const title = computed(() => {
  return showTitle.value ? titleText.value : false;
});
</script>
