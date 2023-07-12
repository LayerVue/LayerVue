import type { ComponentInternalInstance } from 'vue';

const layerGlobal: {
  zIndex: number;
  instances: Map<string, ComponentInternalInstance>;
} = {
  zIndex: 2000,
  instances: new Map(),
};
const getZIndex = () => {
  return layerGlobal.zIndex;
};
const setZIndex = (zIndex: number) => {
  layerGlobal.zIndex = zIndex;
};
const nextZIndex = () => {
  return layerGlobal.zIndex++;
};
const getLayerInstances = () => {
  return layerGlobal.instances;
};
const setLayerInstance = (id: string, instance: ComponentInternalInstance) => {
  layerGlobal.instances.set(id, instance);
};
const getLayerInstance = (id: string) => {
  return layerGlobal.instances.get(id);
};
const deleteLayerInstance = (id: string) => {
  layerGlobal.instances.delete(id);
};
const hasLayerInstance = (id: string) => {
  return layerGlobal.instances.has(id);
};

export {
  getZIndex,
  setZIndex,
  nextZIndex,
  getLayerInstances,
  setLayerInstance,
  getLayerInstance,
  deleteLayerInstance,
  hasLayerInstance,
};
