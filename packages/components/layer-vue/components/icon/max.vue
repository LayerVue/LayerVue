<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
    <path
      v-if="max"
      d="M200.667-200.667v-198.166h23.166v175h175v23.166H200.667Zm0-360.5v-198.166h198.166v23.166h-175v175h-23.166Zm360.5 360.5v-23.166h175v-175h23.166v198.166H561.167Zm175-360.5v-175h-175v-23.166h198.166v198.166h-23.166Z"
    />
    <path
      v-else
      class="layer-vue-is-max"
      d="M375.667-200.667v-175h-175v-23.166h198.166v198.166h-23.166Zm185.5 0v-198.166h198.166v23.166h-175v175h-23.166Zm-360.5-360.5v-23.166h175v-175h23.166v198.166H200.667Zm360.5 0v-198.166h23.166v175h175v23.166H561.167Z"
    />
  </svg>
</template>
<script lang="ts">
export default defineComponent({
  name: 'LayerVueMaxDesign',
  props: {
    max: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
