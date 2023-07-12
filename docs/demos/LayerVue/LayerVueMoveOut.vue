<template>
  <div class="grid">
    <button
      v-for="(item, index) in moveOutList"
      class="brand round demo-move-out-button"
      @click="moveOutList[index].value = !moveOutList[index].value"
    >
      {{ item.label }} {{ moveOutList[index].value ? '可' : '不可' }}移动到视口外
    </button>
    <button class="brand round demo-move-out-switch" @click="visible = !visible">
      {{ visible ? '关闭' : '打开' }}
    </button>
  </div>
  <LayerVue v-model:visible="visible" :move-out="moveOut">
    <div class="layer-demo-content-center">内容区</div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const moveOutList = ref([
  {
    label: '上',
    value: false,
  },
  {
    label: '右',
    value: false,
  },
  {
    label: '下',
    value: false,
  },
  {
    label: '左',
    value: false,
  },
]);
const moveOut: any = computed(() => moveOutList.value.map(v => v.value));
</script>
<style lang="scss" scoped>
.grid {

  grid-template-areas:
    '. t .'
    'l o r'
    '. b .';
  .demo-move-out-switch {
    grid-area: o;
  }
  .demo-move-out-button:nth-child(1) {
    grid-area: t;
  }
  .demo-move-out-button:nth-child(2) {
    grid-area: r;
  }
  .demo-move-out-button:nth-child(3) {
    grid-area: b;
  }
  .demo-move-out-button:nth-child(4) {
    grid-area: l;
  }
}
</style>
