<script setup lang="ts"></script>

<template>
  <div class="demo">
    <slot />
  </div>
</template>
<style lang="scss">
.demo {
  margin-top: 10px;
}
.layer-vue,
.demo {
  @import './style/index.scss';
}
</style>
