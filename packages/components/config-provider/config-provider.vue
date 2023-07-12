<template>
  <div class="layer-config-provider" :theme-name="theme">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import type { ThemeProps } from './props';
import { themeKey, cssVarKey } from '../../utils/useInjection';
import { cssPrefix, getCssVar } from '../../utils/css';

const props = withDefaults(defineProps<ThemeProps>(), {
  theme: undefined,
});
const theme = toRef(props, 'theme');
const cssVar = computed(() => {
  const { themeConfig } = props;
  return getCssVar(themeConfig, cssPrefix);
});
provide(themeKey, theme);
provide(cssVarKey, cssVar);
</script>
