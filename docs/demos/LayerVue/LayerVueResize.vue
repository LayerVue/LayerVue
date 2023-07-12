<template>
  <button class="brand round" @click="visible = !visible">
    {{ visible ? '关闭' : '打开' }}
  </button>
  <p>默认八个方向均可以拉伸~</p>
  <div class="grid demo-resize-grid">
    <button
      v-for="(item, index) in resizeList"
      class="brand round demo-resize-button"
      @click="resizeList[index].value = !resizeList[index].value"
    >
      {{ item.label }} {{ resizeList[index].value ? '关闭' : '打开' }}
    </button>
  </div>
  <LayerVue
    v-model:visible="visible"
    :area="[width, height]"
    @resizing="resizing"
    @resize-end="resizeEnd"
    :resize="resize"
    id="layer-demo-resize"
  >
    <div class="layer-demo-content-center">
      {{ `宽度：${width}px，高度：${height}px` }}
      <div>
        {{ isResize ? '正在拉伸' : '' }}
      </div>
    </div>
  </LayerVue>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { LayerVue } from 'layer-vue';
const visible = ref(false);
const width = ref(400);
const height = ref(300);
const isResize = ref(false);
const resizeList = ref([
  {
    label: '上',
    value: true,
  },
  {
    label: '右上',
    value: true,
  },
  {
    label: '右',
    value: true,
  },
  {
    label: '右下',
    value: true,
  },
  {
    label: '下',
    value: true,
  },
  {
    label: '左下',
    value: true,
  },
  {
    label: '左',
    value: true,
  },
  {
    label: '左上',
    value: true,
  },
]);
const resize: any = computed(() => {
  return resizeList.value.map(item => item.value);
});

const resizing = (el: HTMLElement | null, id: string | undefined, w: number, h: number) => {
  width.value = w;
  height.value = h;
  isResize.value = true;
};
const resizeEnd = (el: HTMLElement | null, id: string | undefined, w: number, h: number) => {
  isResize.value = false;
};
</script>
<style lang="scss">
[layer-id='layer-demo-resize'] {
  .layer-vue-resize {
    background-color: var(--vp-c-green-dimm-3) !important;
    &:hover {
      background-color: var(--vp-c-green) !important;
    }
  }
}

.demo-resize-grid {
  .demo-resize-button:nth-child(1) {
    grid-column-start: 2;
  }
  .demo-resize-button:nth-child(3) {
    grid-column-start: 3;
  }
  .demo-resize-button:nth-child(7) {
    grid-row-start: 2;
    grid-column-start: 1;
  }
  .demo-resize-button:nth-child(4) {
    grid-column-start: 3;
    grid-row-start: 3;
  }
  .demo-resize-button:nth-child(5) {
    grid-column-start: 2;
    grid-row-start: 3;
  }
  .demo-resize-button:nth-child(8) {
    grid-column-start: 1;
    grid-row-start: 1;
  }
}
</style>
