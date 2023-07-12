import type { ThemeConfig } from '..';

// 查找 style-id 为 styleId 的 style 标签
export const styleKey = 'layer-style-id';

export const importCss = (styleId: string, css: string, key: string): void => {
  console.log(styleId);
  let styleEl = document.querySelector(`style[${key}=${styleId}]`);
  // 如果没有找到，则创建一个 style 标签
  if (styleEl === null) {
    styleEl = document.createElement('style');
    styleEl.setAttribute(key, styleId);
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }
};

export const cssPrefix = '--layer';

export const getCssVar = (themeConfig: ThemeConfig | undefined, cssPrefix: string) => {
  if (themeConfig === undefined) return {};
  const cssVar: Record<string, string> = {};
  const keys = Object.keys(themeConfig);
  Object.values(themeConfig).forEach((item, index) => {
    if (typeof item === 'object') {
      Object.keys(item).forEach(key => {
        // 小驼峰转换短横线连接
        const value = (item as any)[key];
        if (value !== undefined) {
          key = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          cssVar[`${cssPrefix}-${keys[index]}-${key}`] = value;
        }
      });
    }
  });
  return cssVar;
};
