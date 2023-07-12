---
title: Demos
order: 1
---

# Demos

## 基本使用

:::code-view
LayerVueBasicUse
:::

## 调整大小

:::code-view
LayerVueResize
:::

## 遮罩层

:::code-view
LayerVueShade
:::

## 标题

:::code-view
LayerVueTitle
:::

## 置顶

每次打开时置顶显示，存在多个置顶弹窗时，后打开的弹窗置顶显示。当点击置顶弹窗，可将弹窗置顶显示。

:::code-view
LayerVueSetTop
:::

## 指定父级容器

基于 vue 内置组件 `Teleport` 实现,`<Teleport>` 挂载时，传送的 to 目标必须已经存在于 DOM 中。理想情况下，这应该是整个 Vue 应用 DOM 树外部的一个元素。如果目标元素也是由 Vue 渲染的，你需要确保在挂载 `<Teleport>` 之前先挂载该元素。[官网说明](https://cn.vuejs.org/guide/built-ins/teleport.html#basic-usage)

:::code-view
LayerVueAppendTo
:::

## 关闭时显示在原位置

适用于需要在关闭弹窗后，内容区元素保持在原始位置的场景。

:::code-view
LayerVueShowInOriginalOnClose
:::

## 关闭时销毁内容区

适用于需要在每次关闭时完全清除组件状态和内容的场景。

:::code-view
LayerVueDestroyOnClose
:::

## 移动区域

:::code-view
LayerVueMove
:::

## 移出视口

:::code-view
LayerVueMoveOut
:::

## 默认宽高

:::code-view
LayerVueArea
:::

## 默认偏移

:::code-view
LayerVueOffset
:::

## 反向偏移

:::code-view
LayerVueOffsetReverse
:::

## 最大最小化

:::code-view
LayerVueMaxMin
:::
