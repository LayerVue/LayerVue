<template>
  <div class="layer-vue-title" v-if="title" @contextmenu.prevent>
    <div
      class="layer-vue-title-text"
      @dblclick="
        () => {
          maxminComputed[0] && $emit('max');
        }
      "
    >
      <slot>{{ title === true ? '标题' : title }}</slot>
    </div>
    <div class="layer-vue-tools">
      <div class="layer-vue-min" v-if="maxminComputed[1]" @click="$emit('min')">
        <slot name="min">
          <Min />
        </slot>
      </div>
      <div class="layer-vue-max" v-if="maxminComputed[0]" @click="$emit('max')">
        <slot name="restore" v-if="isMax">
          <Max />
        </slot>
        <slot name="max" v-else>
          <Max max />
        </slot>
      </div>
      <div class="layer-vue-close" v-if="closeBtn" @click="$emit('close')">
        <slot name="close">
          <Close />
        </slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Min from '../icon/min.vue';
import Max from '../icon/max.vue';
import Close from '../icon/close.vue';
import type { Title } from '../..';
withDefaults(
  defineProps<{
    title: Title;
    closeBtn: boolean;
    maxminComputed: [boolean, boolean];
    isMax: boolean;
  }>(),
  {}
);

defineEmits<{
  (event: 'close'): void;
  (event: 'max'): void;
  (event: 'min'): void;
}>();
</script>
<script lang="ts">
export default defineComponent({
  name: 'LayerVueTitleDesign',
});
</script>
