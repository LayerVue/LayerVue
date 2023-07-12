<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <input type="number" v-model="area[0]" />
  <input type="number" v-model="area[1]" />
  <LayerVue v-model:visible="visible" :area="area">
    <div class="layer-demo-content-center">{{ area }}</div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const area: Ref<[number, number]> = ref([600, 500]);
</script>
