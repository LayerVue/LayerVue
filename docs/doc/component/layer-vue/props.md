---
title: Props
order: 2
---

# LayerProps

## `visible`

- Type: `Boolean`
- Default: `false`
- v-model: `支持`
- Required: `false`
- Description: `是否显示`
- Example: `v-model:visible="true"` `:visible="true"`
- Demo: [演示](/doc/component/layer-vue/demos.html#基本使用)

## `title`

- Type: `string | boolean`
- Default: `标题`
- Required: `false`
- Description: `标题`
- Example: `:title="false"` `:title="标题"`
- Demo: [演示](/doc/component/layer-vue/demos.html#标题)

## `appendTo`

- Type: `string | HTMLElement`
- Default: `"body"`
- Required: `false`
- Description: 指定弹窗的父级容器，可以是选择器字符串或 HTMLElement 对象
- Example: `:appendTo="'#layer'"` `:appendTo="document.getElementById('layer')"`
- Demo: [演示](/doc/component/layer-vue/demos.html#指定父级容器)

## showInOriginalOnClose

- Type: `boolean`
- Default: `false`
- Required: `false`
- Description: `在弹窗关闭后，内容区的元素是否显示在原始位置`
- Example: `:showInOriginalOnClose="true"`、:`showInOriginalOnClose="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#showInOriginalOnClose)

## destroyOnClose

- Type: `DestroyOnClose`
- Default: `false`
- Required: `false`
- Description: `关闭弹窗时是否销毁content内容`
- Example: `:destroyOnClose="true"、:destroyOnClose="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#destroyOnClose)

## setTop

- Type: `boolean`
- Default: `false`
- Required: `false`
- Description: `是否将弹窗置顶显示`
- Example: `:setTop="true"` `:setTop="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#置顶)

## move

- Type: `Move`
- Default: `".layer-vue-title-text"`
- Required: `false`
- Description: `指定弹窗的可拖动区域选择器`
- Example: `:move="'.layer-vue-header'"` `:move="'.layer-vue-content'"`
- Demo: [演示](/doc/component/layer-vue/demos.html#拖动)

## area

- Type: `string | number | [string | number, string | number]`
- Default: `"auto"`
- Required: `false`
- Description: `指定弹窗的初始化宽度和高度，可以是字符串或数组`
- Example: :area="'500px'"、:area="[600, 400]"
- Demo: [演示](/doc/component/layer-vue/demos.html#默认宽高)

## offset

- Type: `'auto' | 't' | 'b' | 'l' | 'auto' | 'lt' | 'lb' | 'rt' | 'rb' | string | number | [string | number, string | number]`
- Default: `"auto"`
- Required: `false`
- Description: `指定弹窗的偏移位置，可以是字符串或数组`
- Example: `:offset="'100px'"`、:`offset="[50, 100]"`
- Demo: [演示](/doc/component/layer-vue/demos.html#默认偏移)

## maxmin

- Type: `MaxMin`
- Default: `false`
- Required: `false`
- Description: `是否显示最大化和最小化按钮`
- Example: `:maxmin="true"` `:maxmin="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#最大最小化)

## anim

- Type: `Anim`
- Default: 1
- Required: `false`
- Description: `弹窗的动画类型`
- Example: `:anim="1"、:anim="2"`
- Demo: 敬请期待

## content

- Type: `Content`
- Default: `undefined`
- Required: `false`
- Description: `弹窗的内容，可以是字符串或 Vue 组件`
- Example: `:content="'内容文本'"` `:content="CustomComponent"`
- Demo: 敬请期待

## id

- Type: `Id`
- Default: `undefined`
- Required: `false`
- Description: `弹窗的唯一标识符`
- Example: `:id="'layer1'"` `:id="componentId"`
- Demo: 敬请期待

## shade

- Type: `boolean`
- Default: `false`
- Required: `false`
- Description: `是否显示遮罩层`
- Example: `:shade="true"` `:shade="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#遮罩层)

## shadeClose

- Type: `boolean`
- Default: `false`
- Required: `false`
- Description: `点击遮罩层是否关闭弹窗`
- Example: `:shadeClose="true"` `:shadeClose="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#遮罩层)

## resize

- Type: `Resize`
- Default: `false`
- Required: `false`
- Description: `是否允许弹窗大小调整`
- Example: `:resize="true"` `:resize="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#调整大小)

## moveOut

- Type: `MoveOut`
- Default: `true`
- Required: `false`
- Description: `是否允许弹窗移出视口范围`
- Example: `:moveOut="true"` `:moveOut="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#移出视口)

## ratio

- Type: `boolean`
- Default: `false`
- Required: `false`
- Description: `是否按比例显示弹窗的宽高`
- Example: `:ratio="true"` `:ratio="false"`
- Demo: 敬请期待

## lazy

- Type: `boolean`
- Default: `true`
- Required: `false`
- Description: `是否延迟加载弹窗内容`
- Example: `:lazy="true"` `:lazy="false"`
- Demo: 敬请期待

## closeBtn

- Type: `boolean`
- Default: `true`
- Required: `false`
- Description: `是否显示关闭按钮`
- Example: `:closeBtn="true"` `:closeBtn="false"`
- Demo: 敬请期待

## theme

- Type: `Theme`
- Default: `undefined`
- Required: `false`
- Description: `自定义主题名称`
- Example: `:theme="'dark'"`
- Demo: 敬请期待

## zIndex

- Type: `number`
- Default: `200`
- Required: `false`
- Description: `弹窗的层级`
- Example: `:zIndex="300"` `:zIndex="400"`
- Demo: 敬请期待

## offsetReverse

- Type: `OffsetReverse`
- Default: `false`
- Required: `false`
- Description: `是否反向偏移弹窗位置`
- Example: `:offsetReverse="true"` `:offsetReverse="false"`
- Demo: [演示](/doc/component/layer-vue/demos.html#反向偏移)

## minArea

- Type: `MinArea`
- Default: `[300, 150]`
- Required: `false`
- Description: `弹窗的最小宽度和最小高度，可以是数字数组`
- Example: `:minArea="[400, 200]"` `:minArea="[500, 300]"`
- Demo: 敬请期待

## Type Declarations

```ts
type Visible = boolean | undefined;
type Title = string | boolean | undefined;
type SetTop = boolean;
type Move = string | boolean | undefined;
type Area = string | number | [string | number, string | number] | undefined;
type Offset =
  | string
  | number
  | undefined
  | [string | number | undefined, string | number | undefined]
  | undefined;
type MaxMin = boolean | number | [boolean | number, boolean | number] | undefined;
type Anim = number | undefined;
type Content = number | string | VNode | HTMLElement | undefined;
type Id = string | undefined;
type DestroyOnClose = boolean | undefined;
type Resize = number | boolean | ResizeArray | undefined;
type MoveOut = number | boolean | moveOutArray | undefined;
type OffsetReverse = boolean | number | [boolean | number, boolean | number] | undefined;
type MinArea = [string | number, string | number] | undefined;
interface ThemeConfig {
  common?: {
    background?: string;
    color?: string;
    borderRadius?: string;
  };
  contextmenu?: {
    background?: string;
    color?: string;
    backgroundHover?: string;
  };
  shade?: {
    color?: string;
  };
  title?: {
    height?: string;
    background?: string;
    color?: string;
    borderBottom?: string;
  };
  close?: {
    color?: string;
    colorHover?: string;
    background?: string;
    backgroundHover?: string;
  };
  content?: {
    background?: string;
    color?: string;
  };
}
type Theme = 'dark' | 'light' | undefined;
interface LayerProps {
  visible?: Visible;
  title?: Title;
  appendTo?: string | HTMLElement;
  showInOriginalOnClose?: boolean;
  destroyOnClose?: DestroyOnClose;
  setTop?: SetTop;
  move?: Move;
  area?: Area;
  offset?: Offset;
  maxmin?: MaxMin;
  anim?: Anim;
  content?: Content;
  id?: Id;
  shade?: boolean;
  shadeClose?: boolean;
  themeConfig?: ThemeConfig;
  resize?: Resize;
  moveOut?: MoveOut;
  ratio?: boolean;
  lazy?: boolean;
  closeBtn?: boolean;
  theme?: Theme;
  zIndex?: number;
  offsetReverse?: OffsetReverse;
  minArea?: MinArea;
}
```
