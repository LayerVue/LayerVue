---
title: Emits
order: 4
---

# Emits

## `update:visible`

- Parameters: `visible: boolean`
- Return: `void`
- Description: `弹窗显示状态发生变化时触发, 建议直接使用 v-model:visible="true"`
- Example: `@update:visible="onUpdateVisible"`

## `success`

- Parameters: `el: HTMLElement | null, id: string | undefined`
- Return: `void`
- Description: `打开弹窗成功时触发`
- Example: `@success="onSuccess"`
- Demo: [演示](/doc/component/layer-vue/demos.html#onSuccess)

## `cancel`

- Parameters: `el: HTMLElement | null, id: string | undefined`
- Return: `void`
- Description: `关闭弹窗时触发`
- Example: `@cancel="onCancel"`
- Demo: [演示](/doc/component/layer-vue/demos.html#onCancel)

## `resizing`

- Parameters: `el: HTMLElement | null, id: string | undefined, width: number, height: number`
- Return: `void`
- Description: `弹窗拉伸发生变化时触发`
- Example: `@resizing="onResizing"`
- Demo: [演示](/doc/component/layer-vue/demos.html#onResizing)

## `resizeEnd`

- Parameters: `el: HTMLElement | null, id: string | undefined, width: number, height: number`
- Return: `void`
- Description: `弹窗拉伸结束时触发`
- Example: `@resizeEnd="onResizeEnd"`
- Demo: [演示](/doc/component/layer-vue/demos.html#onResizeEnd)

## `moveEnd`

- Parameters: `el: HTMLElement | null, id: string | undefined, top: number, left: number`
- Return: `void`
- Description: `弹窗移动结束时触发`
- Example: `@moveEnd="onMoveEnd"`
- Demo: [演示](/doc/component/layer-vue/demos.html#onMoveEnd)

## `beforeClose`

- Parameters: `el: HTMLElement | null, id: string | undefined`
- Return: `boolean`
- Description: `点击弹窗关闭按键时触发, 返回 false 可阻止弹窗关闭`
- Example: `@beforeClose="onBeforeClose"`
- Demo: [演示](/doc/component/layer-vue/demos.html#onBeforeClose)

## Type Declarations

```ts
interface LayerEmits {
  (event: 'update:visible', visible: boolean): void;
  (event: 'success', el: HTMLElement | null, id: string | undefined): void;
  (event: 'cancel', el: HTMLElement | null, id: string | undefined): void;
  (
    event: 'resizing',
    el: HTMLElement | null,
    id: string | undefined,
    width: number,
    height: number
  ): void;
  (
    event: 'resizeEnd',
    el: HTMLElement | null,
    id: string | undefined,
    width: number,
    height: number
  ): void;
  (
    event: 'moveEnd',
    el: HTMLElement | null,
    id: string | undefined,
    top: number,
    left: number
  ): void;
  (event: 'beforeClose', el: HTMLElement | null, id: string | undefined): boolean;
}
```
