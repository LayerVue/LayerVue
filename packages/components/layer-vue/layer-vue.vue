<template>
  <Teleport
    v-if="(showInOriginalOnClose ? true : randered) && contentRef"
    :to="contentRef"
    :disabled="showInOriginalOnClose ? !visibleRef : false"
  >
    <slot>{{ content }}</slot>
  </Teleport>
  <Teleport :to="appendTo">
    <Transition
      :name="'layer-fade-' + anim"
      @after-leave="onAfterLeave"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @leave-cancelled="onLeaveCancelled"
    >
      <div
        class="layer-vue"
        v-bind="$attrs"
        :layer-theme="theme"
        :layer-id="idComputed"
        :style="cssVar"
        v-show="visibleRef"
      >
        <div
          class="layer-vue-shade"
          v-if="shade"
          :style="{ zIndex: zIndexRef }"
          @click="handleShadeClose"
          @contextmenu.prevent
        ></div>
        <Transition name="layer-fade-glass">
          <div class="layer-vue-glass" v-if="maxminComputed[0] && showGlassRef"></div>
        </Transition>
        <div
          class="layer-vue-box"
          :class="{
            'layer-to-max': isMax,
          }"
          ref="layer"
          :style="cssComputed"
          @mousedown.left="handleLayerMouseDown"
          @mousedown.right="handleOpenMenu"
        >
          <Title
            @close="handleClose"
            :maxmin-computed="maxminComputed"
            @max="handleMax"
            @min="handleMin"
            :title="title!"
            :is-max="isMax"
            :close-btn="closeBtn!"
          >
            <template #default>
              <slot name="title"></slot>
            </template>
            <template #close>
              <slot name="close"></slot>
            </template>
            <template #min>
              <slot name="min"></slot>
            </template>
            <template #max>
              <slot name="max"></slot>
            </template>
            <template #restore>
              <slot name="restore"></slot>
            </template>
          </Title>
          <div class="layer-vue-content" ref="contentRef"></div>
          <Resize :is-max="isMax" :is-min="isMin" :resize-computed="resizeComputed" />
        </div>
        <contextmenu
          ref="contextmenuRef"
          :items="contextmenuItems"
          :off-set="contextmenuOffSet"
        ></contextmenu>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import css from './style';
import { importCss, styleKey } from '../../utils/css';
import { useProps } from './props';
import { useThemeConfigDefault } from '../../utils/useThemeProps';
import { useMove, useMoveVerify } from './useMove';
import { useResize } from './useResize';
import { useAreaLength, useOffsetLength } from '../../utils/useLength';
import { useTop } from './useTop';
import { useVisible, useVisibleWatch } from './useVisible';
import { useMax, useMin } from './useMaxmin';
import { Directions } from './enums';
import { getStorage, removeStorage, storageKeys } from '../../utils/useStorage';
import contextmenu from '../contextmenu/contextmenu.vue';
import { once } from 'lodash-es';
import { toArray, getTitleHeight, emitter } from '../../utils/tools';
import {
  // getTransition,
  setLayerInstance,
  hasLayerInstance,
  deleteLayerInstance,
} from '../../utils/useGlobal';
import Resize from './components/resize/index.vue';
import Title from './components/title/index.vue';
import { useComputed } from './useComputed';
import { useRef } from './useRef';
import type { LayerEmits, LayerProps, LayerVueInst, LayerVueStatus } from './props';
const attrs = useAttrs();
const defaultArea = reactive({
  width: 0,
  height: 0,
  ratio: 1,
});
const contentRef = ref();
const contextmenuRef = ref();
const contextmenuOffSet = ref({
  left: 0,
  top: 0,
});

const {
  layer,
  randered,
  zIndexRef,
  isMax,
  isMin,
  offsetReactive,
  visibleRef,
  transitionRef,
  showGlassRef,
  areaReactive,
} = useRef();
const props = withDefaults(defineProps<LayerProps>(), {
  ...useProps(),
  themeConfig: () => {
    return {
      ...useThemeConfigDefault(),
    };
  },
});

const propsRef = toRefs(props);
// #endregion
// #region computed
const { cssVar, maxminComputed, resizeComputed, minAreaComputed, cssComputed, idComputed } =
  useComputed(props, zIndexRef, isMin, transitionRef, areaReactive, offsetReactive);
// #endregion

// #region emits
const emits = defineEmits<LayerEmits>();
// #endregion

// #region Events
const handleClose = () => {
  const res = attrs.onBeforeClose ? emits('beforeClose', layer.value, props.id) : true;
  res && useVisible(false, visibleRef, emits);
};
const handleShadeClose = () => {
  props.shadeClose && handleClose();
};
const handleMax = () => {
  useMax(minAreaComputed, isMin, isMax, idComputed, areaReactive, offsetReactive, props.title);
};
const handleMin = () => {
  useMin(minAreaComputed, isMin, isMax, idComputed, areaReactive, offsetReactive, props);
};
const handleLayerMouseDown = (e: MouseEvent) => {
  const todoList = {
    useTop: { enable: props.setTop, data: {} },
    useMove: (() => {
      if (isMin.value) {
        return { enable: false, data: {} };
      }
      const selector = useMoveVerify(props.move);
      const isMove =
        selector &&
        layer.value &&
        e.composedPath().some(v => v === layer.value?.querySelector(selector));
      return { enable: isMove, data: {} };
    })(),
    useResize: (() => {
      if (isMax.value || isMin.value) {
        return { enable: false, data: {} };
      }
      const resizeDom = e
        .composedPath()
        .find(v => v instanceof HTMLElement && v.className.includes('layer-vue-resize'));
      return { enable: resizeDom, data: { resizeDom } };
    })(),
  };
  // #region 置顶
  todoList.useTop.enable && useTop(zIndexRef);
  // #endregion

  // #region 移动
  todoList.useMove.enable &&
    useMove(
      minAreaComputed,
      idComputed,
      layer as Ref<HTMLElement>,
      e,
      areaReactive,
      offsetReactive,
      emits,
      props,
      transitionRef,
      isMin,
      isMax,
      maxminComputed,
      showGlassRef
    );
  // #endregion

  // #region 拉伸
  todoList.useResize.enable &&
    Object.entries(Directions).forEach(([key, value]) => {
      if ((todoList.useResize.data.resizeDom as HTMLElement).classList.contains(value)) {
        useResize(
          idComputed,
          e,
          layer as Ref<HTMLElement>,
          value,
          defaultArea,
          props,
          emits,
          areaReactive,
          offsetReactive,
          minAreaComputed,
          transitionRef
        );
      }
    });
  // #endregion
};
const handleOpenMenu = (e: MouseEvent) => {
  e.preventDefault();
  if (isMax.value) {
    return;
  }
  if (isMin.value) {
    return;
  }
  const selector = useMoveVerify(props.move);
  if (selector === false) {
    return;
  }
  const isMove =
    layer.value && e.composedPath().some(v => v === layer.value?.querySelector(selector));
  if (!isMove) {
    return;
  }
  contextmenuOffSet.value = {
    left: e.clientX,
    top: e.clientY,
  };
  contextmenuRef.value?.setVisible(true);
  return false;
};

const onAfterEnter = () => {
  // transitionRef.value = getTransition();
};
const onBeforeEnter = () => {};
const onEnterCancelled = () => {};
const onBeforeLeave = () => {};
const onLeave = () => {};
const onLeaveCancelled = () => {};

const onEnter = () => {
  emits('success', layer.value, props.id);
};

const onAfterLeave = () => {
  if (props.destroyOnClose) randered.value = false;
  if (isMin.value) handleMin();
  emits('cancel', layer.value, props.id);
};

// #endregion

// #region function
const toTop = () => {
  if (props.setTop) {
    useTop(zIndexRef);
  }
};
const openInit = () => {
  if (!randered.value) {
    randered.value = true;
  }
  toTop();
  firstOpen();
};
const firstOpen = once(() => {
  const storageArea = getStorage(props.id, storageKeys.area);
  const [width, height] = useAreaLength(props.area);
  if (layer.value) {
    defaultArea.width = width;
    defaultArea.height = height;
    areaReactive.width = storageArea ? storageArea.width : width;
    areaReactive.height = storageArea ? storageArea.height : height;
  }
  nextTick(() => {
    if (layer.value) {
      const { clientWidth, clientHeight } = layer.value;
      const storageOffset = getStorage(props.id, storageKeys.offset);
      const { top, left } = useOffsetLength(
        props.offset,
        {
          width: clientWidth,
          height: clientHeight,
        },
        toArray(props.offsetReverse, 2, false) as [boolean, boolean]
      );
      offsetReactive.top = storageOffset ? storageOffset.top : top;
      offsetReactive.left = storageOffset ? storageOffset.left : left;
      const titleHeight = getTitleHeight(props.title, idComputed);
      defaultArea.ratio =
        clientHeight > 0 && clientWidth > 0 ? clientWidth / (clientHeight - titleHeight) : 1;
    }
  }).catch(() => {});
});
const resetOffset = () => {
  if (layer.value) {
    const { clientWidth, clientHeight } = layer.value;
    const { top, left } = useOffsetLength(
      props.offset,
      {
        width: clientWidth,
        height: clientHeight,
      },
      toArray(props.offsetReverse, 2, false) as [boolean, boolean]
    );
    offsetReactive.left = left;
    offsetReactive.top = top;
    removeStorage(props.id, storageKeys.offset);
  }
};
const resetArea = () => {
  if (layer.value) {
    areaReactive.width = defaultArea.width;
    areaReactive.height = defaultArea.height;
  }
  removeStorage(props.id, storageKeys.area);
};

const toResize = () => {
  if (isMax.value) {
    if (layer.value) {
      const { innerHeight, innerWidth } = window;
      areaReactive.width = innerWidth;
      areaReactive.height = innerHeight;
    }
  }
  if (isMin.value) {
    if (layer.value) {
      const titleHeight = getTitleHeight(props.title, idComputed);
      const { innerHeight } = window;
      offsetReactive.top = innerHeight - titleHeight;
    }
  }
};

const resizeListener = (() => {
  let resizeTimer: number;
  return () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      requestAnimationFrame(toResize);
    }, 50);
  };
})();
// #endregion

// #region watch
useVisibleWatch(visibleRef, props, openInit);
watch(
  () => idComputed.value,
  (value, oldValue) => {
    deleteLayerInstance(oldValue);
    setLayerInstance(value, getCurrentInstance()!);
  }
);
watch(
  () => props.area,
  value => {
    const [width, height] = useAreaLength(value);
    if (layer.value) {
      defaultArea.width = width;
      defaultArea.height = height;
      const { clientWidth, clientHeight } = layer.value;
      const titleHeight = getTitleHeight(props.title, idComputed);
      defaultArea.ratio =
        clientHeight > 0 && clientWidth > 0 ? clientWidth / (clientHeight - titleHeight) : 1;
    }
  },
  {
    deep: true,
  }
);
// #endregion

// #region init
randered.value = !props.lazy;
!props.setTop && (zIndexRef.value = propsRef.zIndex.value);
const contextmenuItems = [
  {
    label: '恢复默认位置',
    onClick: resetOffset,
  },
  {
    label: '恢复默认大小',
    onClick: resetArea,
  },
];
const status: LayerVueStatus = reactive({
  width: minAreaComputed.value[0],
  height: minAreaComputed.value[1],
  top: offsetReactive.top,
  left: offsetReactive.left,
  isMax: isMax.value,
  isMin: isMin.value,
  visible: visibleRef.value,
  zIndex: zIndexRef.value,
});
const moveKey = '[layer-move="move"]';
const moveOb = new MutationObserver(() => {
  const selector = useMoveVerify(props.move);
  if (layer.value && selector) {
    const oldDom = layer.value.querySelector(moveKey);
    if (oldDom) {
      oldDom.removeAttribute('layer-move');
    }
    const dom = layer.value.querySelector(selector);
    if (dom && dom instanceof HTMLElement) {
      if (!isMax.value && !isMin.value) {
        dom.setAttribute('layer-move', 'move');
        dom.style.cursor = 'move';
      } else {
        dom.style.cursor = 'default';
        dom.removeAttribute('layer-move');
      }
    }
  }
});
watchEffect(() => {
  const { width, height } = areaReactive;
  status.width = width === 0 && layer.value ? layer.value.clientWidth : width;
  status.height = height === 0 && layer.value ? layer.value.clientHeight : height;
  status.top = offsetReactive.top;
  status.left = offsetReactive.left;
  status.isMax = isMax.value;
  status.isMin = isMin.value;
  status.visible = visibleRef.value;
  status.zIndex = zIndexRef.value;
});

// #endregion

// #region Lifecycle Hooks
onMounted(() => {
  moveOb.observe(layer.value!, {
    childList: true,
    subtree: true,
    attributeFilter: ['class'],
  });

  emitter.on('resize', resizeListener);
  if (props.visible && layer.value) {
    visibleRef.value = true;
    openInit();
  }
  if (!hasLayerInstance(props.id)) {
    setLayerInstance(idComputed.value, getCurrentInstance()!);
  }
});
onBeforeUnmount(() => {
  moveOb.disconnect();
  emitter.off('resize', resizeListener);
  deleteLayerInstance(idComputed.value);
});
// #endregion

const expose: LayerVueInst = {
  resetOffset,
  resetArea,
  toTop,
  toggleVisible: () => {
    visibleRef.value = !visibleRef.value;
    emits('update:visible', visibleRef.value);
  },
  status,
  getDom: () => layer.value,
};

defineExpose(expose);
</script>
<script lang="ts">
const name = 'LayerVue';
importCss(name, css, styleKey);
export default defineComponent({
  name,
});
</script>
