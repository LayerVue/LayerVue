import { isObject, isString } from 'lodash-es';
import { verifyObject } from './tools';

const storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  has(key: string): boolean {
    const value = localStorage.getItem(key);
    return Boolean(value);
  },
  get(key: string) {
    const value = localStorage.getItem(key);
    return isString(value) ? JSON.parse(value) : value;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
enum storageKeys {
  offset = 'layer-offset',
  area = 'layer-area',
}
const getStorage = (id: string | undefined, key: string) => {
  if (id === undefined) {
    return;
  }
  const value = storage.get(key);
  if (isObject(value)) {
    return storage.get(key)[id];
  }
  return null;
};
const setStorage = (id: string | undefined, obj: object, key: string) => {
  if (id === undefined) {
    return;
  }
  const value = storage.get(key);
  if (isObject(value)) {
    storage.set(key, { ...value, [id]: obj });
  } else {
    const value: Record<string, any> = {};
    value[id] = obj;
    storage.set(key, value);
  }
};
const removeStorage = (id: string | undefined, key: string) => {
  if (id === undefined) {
    return;
  }
  const value = storage.get(key);
  if (verifyObject(value)) {
    (value as Record<string, any>)[id] = undefined;
    storage.set(key, value);
  }
};
const clearStorage = (key: string) => {
  storage.remove(key);
};
export { getStorage, setStorage, removeStorage, clearStorage, storageKeys };
