import type { Title } from '../components/layer-vue/props';
const verifyObject = (value: any) => {
  if (value && value.constructor === Object) {
    return true;
  }
  return false;
};
const getParentNodes = (e: HTMLElement): HTMLElement[] | [] => {
  if (e.parentElement) {
    return [e.parentElement, ...getParentNodes(e.parentElement)];
  }
  return [];
};
const inDoms = (e: HTMLElement[] | [], value: string = 'layer-vue') => {
  return e.some((v: HTMLElement) => v.classList.contains(value));
};

const toArray = (arg: any, length: number, defValue = false): Array<boolean> => {
  if (typeof arg === 'number' || typeof arg === 'boolean') {
    return Array(length).fill(!!arg);
  }
  if (arg instanceof Array) {
    const array = arg.reduce((pre, value) => {
      pre.push(!!value);
      return pre;
    }, []);
    if (array.length > length) {
      return array.slice(0, length);
    } else {
      return [...array, ...Array(length - array.length).fill(defValue)];
    }
  }
  return Array(length).fill(defValue);
};
const getTitleHeight = (title: Title, id: Ref<string>) => {
  const titleDom = title ? document.querySelector(`[layer-id="${id.value}"] .layer-vue-title`) : null;
  const titleHeight = titleDom ? titleDom.clientHeight : 0;
  return titleHeight;
};
const getRatioWidth = (height: number, titleHeight: number, ratio: number) => {
  return (height - titleHeight) * ratio;
};
const getRatioHeight = (width: number, titleHeight: number, ratio: number) => {
  return titleHeight + width / ratio;
};
//
type EventHandler = (...args: any[]) => void;

// 事件管理器
class EventEmitter {
  private events: Record<string, EventHandler[]> = {};

  on(event: string, handler: EventHandler): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(handler);
  }

  off(event: string, handler: EventHandler): void {
    const handlers = this.events[event];
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(event: string, ...args: any[]): void {
    const handlers = this.events[event];
    if (handlers) {
      handlers.forEach(handler => {
        handler(...args);
      });
    }
  }
}
const emitter = new EventEmitter();

window.addEventListener('resize', () => {
  emitter.emit('resize');
});
export {
  verifyObject,
  getParentNodes,
  inDoms,
  toArray,
  getTitleHeight,
  getRatioWidth,
  getRatioHeight,
  emitter,
};
