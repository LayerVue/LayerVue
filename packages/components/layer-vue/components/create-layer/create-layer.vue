<template>
  <div class="create-layer"></div>
  <LayerVue v-bind="attrs" v-model:visible="visibleRef" ref="layer" @cancel="handleCancel">
    <template v-for="(_, key, index) in $slots" :key="index" v-slot:[key]>
      <slot :name="key"></slot>
    </template>
  </LayerVue>
</template>
<script lang="ts" setup>
import { defaultProps } from '../..';
import type { LayerProps, LayerVueInst } from '../..';
import type { InsideProps, UseLayerProps } from './props';
import LayerVue from '../../layer-vue.vue';
const visibleRef = ref(false);
const layer = ref<LayerVueInst | null>(null);
const props = defineProps<{
  options?: UseLayerProps;
  onVanish?: () => void;
  onMounted?: (layer: LayerVueInst) => void;
}>();
const attrs: ComputedRef<LayerProps> = computed(() => {
  const attrs: any = {
    ...defaultProps,
  };
  let key: keyof InsideProps;
  const p = toValue(props.options);
  if (p) {
    for (key in p) {
      attrs[key] = p[key];
    }
  }
  return attrs;
});

const handleCancel = (el: HTMLElement | null, id: string | undefined) => {
  props.onVanish?.();
  toValue(props.options)?.cancel?.(el, id);
};

onMounted(() => {
  visibleRef.value = true;
  props.onMounted?.(layer.value!);
});
</script>
