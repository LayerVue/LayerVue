<template>
  <div v-if="!isMax && !isMin">
    <div class="layer-vue-resize layer-vue-resize-t" v-if="resizeComputed[0]"></div>
    <div class="layer-vue-resize layer-vue-resize-rt" v-if="resizeComputed[1]"></div>
    <div class="layer-vue-resize layer-vue-resize-r" v-if="resizeComputed[2]"></div>
    <div class="layer-vue-resize layer-vue-resize-rb" v-if="resizeComputed[3]"></div>
    <div class="layer-vue-resize layer-vue-resize-b" v-if="resizeComputed[4]"></div>
    <div class="layer-vue-resize layer-vue-resize-lb" v-if="resizeComputed[5]"></div>
    <div class="layer-vue-resize layer-vue-resize-l" v-if="resizeComputed[6]"></div>
    <div class="layer-vue-resize layer-vue-resize-lt" v-if="resizeComputed[7]"></div>
  </div>
</template>
<script setup lang="ts">
import type { ResizeArray } from '../..';

interface ResizeProps {
  resizeComputed: ResizeArray;
  isMax: boolean;
  isMin: boolean;
}
defineProps<ResizeProps>();
</script>
<script lang="ts">
export default defineComponent({
  name: 'LayerVueResizeDesign',
});
</script>
