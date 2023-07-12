<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <input type="number" v-model="offset[0]" />
  <input type="number" v-model="offset[1]" />
  <LayerVue v-model:visible="visible" :offset="offset">
    <div class="layer-demo-content-center">
默认位置：{{ offset }}

    </div>
  </LayerVue>
  <div class="grid">
    <button
      v-for="(item, index) in offsetList"
      class="brand round"
      @click="visibleList[index] = !visibleList[index]"
    >
      {{ item.label }} {{ visibleList[index] ? '关闭' : '打开' }}
    </button>
  </div>
  <template v-for="(item, index) in offsetList">
    <LayerVue
      :title="item.label"
      v-model:visible="visibleList[index]"
      :offset="item.value"
    ></LayerVue>
  </template>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const offset: Ref<[number, number]> = ref([300, 300]);
const offsetList = [
  {
    label: '左上',
    value: 'lt',
  },
  {
    label: '上',
    value: 't',
  },
  {
    label: '右上',
    value: 'rt',
  },
  {
    label: '右',
    value: 'r',
  },
  {
    label: '默认居中',
    value: 'auto',
  },
  {
    label: '左',
    value: 'l',
  },
  {
    label: '左下',
    value: 'lb',
  },
  {
    label: '下',
    value: 'b',
  },

  {
    label: '右下',
    value: 'rb',
  },
];
const visibleList = ref(offsetList.map(() => false));
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
