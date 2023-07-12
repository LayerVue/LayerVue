<script setup lang="ts">
import { ref, h, onMounted, computed, toRef, isRef, reactive, Ref } from 'vue';
import { LayerVue, LayerInst, createLayer, LayerVueStatus } from '../../packages';
import LayerVueArea from './components/LayerVueArea.vue';
const count = ref(0);
const isDark = ref(false);
const contentLayerVue = h(LayerVue, {
  onCancel: () => {
    console.log('111');
  },
  onMoveEnd: v => {
    // content.component?.exposed?.toggleVisible()
  },
  'onUpdate:visible': v => {
    console.log(v);
  },
});
const isOpen = ref(false);
const btn = h(
  'button',
  {
    onClick: () => {
      contentLayerVue.component?.exposed?.toggleVisible();
    },
    style: {
      width: '100px',
      height: '100px',
    },
  },
  {
    default: () => 'btn',
  }
);
const content = h('div', {}, [contentLayerVue, btn]);
const props = ref({
  // title: count,
  destroyOnClose: false,
});
const close = h('div', 'x');

const status = ref() as Ref<LayerVueStatus>;
let layer: LayerInst;
onMounted(async () => {
  layer = await createLayer({
    props,
  });
  status.value = layer.status;
});
</script>

<template>
  <div>
    <button
      @click="
        () => {
          layer?.toggleVisible();
        }
      "
    >
      {{ status?.visible }}
    </button>
    <button
      @click="
        () => {
          // props.destroyOnClose = true;
          layer?.destroy();
        }
      "
    >
      销毁
    </button>
    {{ status }}
  </div>
</template>
