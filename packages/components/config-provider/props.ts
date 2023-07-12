export interface ThemeConfig {
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
export type Theme = 'dark' | 'light' | undefined;
export interface ThemeProps {
  themeConfig?: ThemeConfig;
  theme?: Theme;
}
