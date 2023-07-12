<template>
  <div class="Thanks">
    <slot name="title"></slot>
  </div>
  <div class="Thanks">
    <div class="item" v-for="item in list" :key="item.name">
      <a :href="item.url" target="_blank"><img :src="item.icon" :alt="item.name" /></a
      >{{ item.name }}
    </div>
  </div>
</template>
<script setup lang="ts">
const list = [
  {
    name: 'Layui',
    url: 'https://layui.dev/',
    icon: 'https://layui.dev/favicon.ico',
  },
  {
    name: 'Naive UI',
    url: 'https://www.naiveui.com/zh-CN/dark',
    icon: 'https://www.naiveui.com/assets/naivelogo-93278402.svg',
  },
  {
    name: 'Vue.js',
    url: 'https://cn.vuejs.org/',
    icon: 'https://cn.vuejs.org/logo.svg',
  },
  {
    name: 'Vite',
    url: 'https://cn.vitejs.dev/',
    icon: 'https://cn.vitejs.dev/logo.svg',
  },
  {
    name: 'VitePress',
    url: 'https://vitepress.dev/',
    icon: 'https://vuepress.vuejs.org/hero.png',
  },
];
</script>
<style lang="scss">
.Thanks {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .item {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
