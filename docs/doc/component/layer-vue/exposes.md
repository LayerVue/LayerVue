---
title: Exposes
order: 5
---

# Exposes

## resetOffset

- Description: `重置偏移量`
- Example:

```js
this.$refs.layer.resetOffset();
```

- Demo: [演示](/doc/component/layer-vue/demos.html#暴露内容)

## resetArea

- Description: `重置弹窗大小`
- Example:

```js
this.$refs.layer.resetArea();
```

- Demo: [演示](/doc/component/layer-vue/demos.html#暴露内容)

## toTop

- Description: `置顶`
- Example:

```js
this.$refs.layer.toTop();
```

- Demo: [演示](/doc/component/layer-vue/demos.html#暴露内容)

## toggleVisible

- Description: `切换显示状态`
- Example:

```js
this.$refs.layer.toggleVisible();
```

- Demo: [演示](/doc/component/layer-vue/demos.html#暴露内容)

## getDom

- Description: `获取弹窗 DOM`
- Example:

```js
this.$refs.layer.getDom();
```

- Demo: [演示](/doc/component/layer-vue/demos.html#暴露内容)

## status

- Type: `LayerVueStatus`
- Description: `弹窗状态 isMax:最大化状态 isMin:最小化状态 visible:显示状态 zIndex:层级 width:宽度 height:高度 top:顶部偏移 left:左侧偏移`
- Example:

```js
this.$refs.layer.status;
```

## Type Declarations

```ts
type LayerVueStatus = {
  isMax: boolean;
  isMin: boolean;
  visible: boolean;
  zIndex: number;
  width: number;
  height: number;
  top: number;
  left: number;
};

interface LayerVueInst {
  resetOffset: () => void;
  resetArea: () => void;
  toTop: () => void;
  toggleVisible: () => void;
  status: LayerVueStatus;
  getDom: () => HTMLElement | null;
}
```
