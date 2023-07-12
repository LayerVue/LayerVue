import type { Theme } from '../components/config-provider/props';

export const themeKey = Symbol('themeKey') as InjectionKey<Ref<Theme>>;
export const cssVarKey = Symbol('cssVarKey') as InjectionKey<ComputedRef<Record<string, string>>>;
