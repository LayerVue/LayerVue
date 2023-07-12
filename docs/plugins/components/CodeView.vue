<script setup lang="ts">
import { computed, ref } from 'vue';
const showCode = ref(false);
const props = defineProps<{
  component?: string;
  template?: string;
}>();
const code = computed(() => {
  if (props.template) {
    return decodeURIComponent(props.template);
  } else {
    return '';
  }
});
async function copyToClipboard(text: string) {
  try {
    return navigator.clipboard.writeText(text);
  } catch {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;

    element.value = text;

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '');

    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt'; // Prevent zooming on iOS

    const selection = document.getSelection();
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;

    document.body.appendChild(element);
    element.select();

    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = text.length;
    document.execCommand('copy');
    document.body.removeChild(element);

    if (originalRange) {
      selection!.removeAllRanges(); // originalRange can't be truthy when selection is falsy
      selection!.addRange(originalRange);
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      (previouslyFocusedElement as HTMLElement).focus();
    }
  }
}
const handleCopyToClipboard = (e: MouseEvent) => {
  copyToClipboard(code.value).then(() => {
    const target = e.target as HTMLElement;
    target.classList.add('copied');
    setTimeout(() => {
      target.classList.remove('copied');
    }, 2000);
  });
};
const isDev = process.env.NODE_ENV === 'development';
</script>

<template>
  <div class="code-view">
    <template v-if="component">
      <component :is="component" />
      <div class="code-wrapper" :class="{ show: showCode }">
        <div class="language-vue">
          <div title="Copy Code" class="copy" @click="handleCopyToClipboard"></div>
          <span class="lang">vue</span>
          <pre>
      <code v-highlight="code"></code></pre>
        </div>
      </div>
      <div class="code-divider"></div>
      <div class="code-buttons">
        <button
          class="code-button"
          :title="showCode ? '隐藏代码' : '显示代码'"
          @click="showCode = !showCode"
        >
          &lt;/&gt;
        </button>
      </div>
    </template>
    <!-- 开发环境显示 -->
    <div v-else-if="isDev">组件加载失败！ {{ (component, code) }}</div>
  </div>
</template>
<style lang="scss">
.copy {
  direction: ltr;
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 3;
  border: 1px solid var(--vp-code-copy-code-border-color);
  border-radius: 4px;
  width: 40px;
  height: 40px;
  background-color: var(--vp-code-copy-code-bg);
  opacity: 0;
  cursor: pointer;
  background-image: var(--vp-icon-copy);
  background-position: 50%;
  background-size: 20px;
  background-repeat: no-repeat;
  transition: border-color 0.25s, background-color 0.25s, opacity 0.25s;
  &::before {
    color: var(--vp-c-text-2);
    font-weight: 500;
    font-size: 12px;
    border-radius: 4px;
    content: 'Copied';
    position: absolute;
    line-height: 40px;
    height: 40px;
    width: auto;
    right: 38px;
    top: -1px;
    opacity: 0;
    padding: 0 12px;
    border-radius: inherit;
    background-color: var(--vp-code-copy-code-bg);
    transition: opacity 0.25s;
    border: 1px solid var(--vp-code-copy-code-border-color);
    transition: border-color 0.25s, background-color 0.25s, opacity 0.25s;
  }
}
.copy:hover {
  border-color: var(--vp-code-copy-code-hover-border-color);
  background-color: var(--vp-code-copy-code-hover-bg);
}
.copy.copied {
  opacity: 1;
  border-radius: 0 4px 4px 0;
  background-color: var(--vp-code-copy-code-hover-bg);
  background-image: var(--vp-icon-copied);
  border-color: var(--vp-code-copy-code-hover-border-color);
  &::before {
    opacity: 1;
    border-radius: 4px 0 0 4px;
    background-color: var(--vp-code-copy-code-hover-bg);
    border-color: var(--vp-code-copy-code-hover-border-color);
  }
}
.code-wrapper {
  margin-top: 10px;
  transition: all 0.5s;
  transform: rotateX(90deg);
  max-height: 0;
  overflow: hidden;
  border-radius: 8px;
  .language-vue {
    max-height: 480px;
    margin: 0 !important;
  }
  &.show {
    transform: rotateX(0);
    max-height: 500px;
  }
}
.code-wrapper:hover .copy {
  opacity: 1;
}

.code-view {
  border: 1px solid var(--vp-c-divider);
  padding: 20px;
  padding-bottom: 10px;
  border-radius: 4px;
  transition: border-color 0.25s;
  &:hover,
  &:hover .code-divider {
    border-color: var(--vp-c-green);
  }
  .code-divider {
    margin-top: 10px;
    border-top: 1px solid var(--vp-c-divider);
    transition: border-color 0.25s;
  }
  .code-buttons {
    display: flex;
    justify-content: flex-end;
    .code-button {
      position: relative;
      background-color: var(--vp-c-bg-1);
      color: var(--vp-c-text-2);
      height: 30px;
      cursor: pointer;
      &:hover {
        color: var(--vp-c-green);
        &::before {
          display: block;
          opacity: 1;
          z-index: 1;
        }
      }
      &::before {
        opacity: 0;
        transition: all 0.25s;
        background-color: var(--vp-c-bg);
        content: attr(title);
        position: absolute;
        border: 1px solid var(--vp-c-divider);
        padding: 0 5px;
        border-radius: 4px;
        transform: translate(50%, 0);
        right: 50%;
        top: -25px;
        z-index: -1;
        color: var(--vp-c-text-1);
      }
    }
  }
}
</style>
