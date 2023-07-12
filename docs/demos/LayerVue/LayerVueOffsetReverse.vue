<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <input type="number" v-model="offset[0]" />
  <input type="number" v-model="offset[1]" />
  <input type="checkbox" v-model="offsetReverse[0]" />
  <input type="checkbox" v-model="offsetReverse[1]" />
  <LayerVue v-model:visible="visible" :offset="offset" :offset-reverse="offsetReverse">
    <div class="layer-demo-content-center"></div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const offset: Ref<[number, number]> = ref([10, 10]);
const offsetReverse: Ref<[boolean, boolean]> = ref([true, true]);
</script>
<style lang="scss">
.grid {
  display: grid;
  // 3 * 3
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  * {
    margin: 0 !important;
  }
}
</style>
