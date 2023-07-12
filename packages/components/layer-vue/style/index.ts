export default `:root,
.light,
[layer-theme=light] {
  --layer-background: #fff;
  --layer-color: #000;
  --layer-border-radius: 5px;
  --layer-contextmenu-background: var(--layer-background);
  --layer-contextmenu-color: var(--layer-color);
  --layer-contextmenu-background-hover: rgb(243, 243, 255);
  --layer-shade-color: rgba(0, 0, 0, 0.3);
  --layer-title-height: 42px;
  --layer-title-background: var(--layer-background);
  --layer-title-color: var(--layer-color);
  --layer-title-border-bottom: 1px solid #f0f0f0;
  --layer-close-color: var(--layer-color);
  --layer-close-color-hover: var(--layer-background);
  --layer-close-background: #fff0;
  --layer-close-background-hover: #f00;
  --layer-max-color: var(--layer-color);
  --layer-max-color-hover: #00a2ff;
  --layer-max-background: #fff0;
  --layer-max-background-hover: #00000020;
  --layer-min-color: var(--layer-color);
  --layer-min-color-hover: #00a2ff;
  --layer-min-background: #fff0;
  --layer-min-background-hover: #00000020;
  --layer-content-background: var(--layer-background);
  --layer-content-color: var(--layer-color);
}

.dark,
[layer-theme=dark] {
  --layer-background: #18181c;
  --layer-color: #ffffffd1;
  --layer-border-radius: 5px;
  --layer-contextmenu-background: rgb(72, 72, 78);
  --layer-contextmenu-color: var(--layer-color);
  --layer-contextmenu-background-hover: rgba(255, 255, 255, 0.09);
  --layer-shade-color: rgba(0, 0, 0, 0.3);
  --layer-title-height: 42px;
  --layer-title-background: var(--layer-background);
  --layer-title-color: var(--layer-color);
  --layer-title-border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  --layer-close-color: var(--layer-color);
  --layer-close-color-hover: var(--layer-background);
  --layer-close-background: #fff0;
  --layer-close-background-hover: #f00;
  --layer-max-color: var(--layer-color);
  --layer-max-color-hover: var(--layer-background);
  --layer-max-background: #fff0;
  --layer-max-background-hover: #00a2ff;
  --layer-min-color: var(--layer-color);
  --layer-min-color-hover: var(--layer-background);
  --layer-min-background: #fff0;
  --layer-min-background-hover: #00a2ff;
  --layer-content-background: var(--layer-background);
  --layer-content-color: var(--layer-color);
}

.layer-vue {
  color: var(--layer-color);
  background: var(--layer-background);
}
.layer-vue * {
  transition: color 0.3s, background 0.3s;
}
.layer-vue .layer-vue-shade {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: var(--layer-shade-color);
}
.layer-vue .layer-vue-glass {
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  position: fixed;
  left: 5px;
  top: 5px;
  box-sizing: border-box;
  background: rgba(240, 240, 240, 0.3882352941);
  border: 1px solid #f0f0f0;
  margin-left: 50%;
  margin-top: 50vh;
  transform: translate(-50vw, -50vh);
}
.layer-vue .layer-vue-glass.layer-fade-glass-enter-active {
  transition: all 0.3s;
}
.layer-vue .layer-vue-glass.layer-fade-glass-leave-active {
  transition: all 0.3s;
}
.layer-vue .layer-vue-glass.layer-fade-glass-enter, .layer-vue .layer-vue-glass.layer-fade-glass-leave-to {
  width: 0;
  height: 0;
  left: 50%;
  top: 0;
  opacity: 0;
}
.layer-vue .layer-vue-box {
  position: fixed;
  top: 0;
  left: 0;
  transition: var(--transition);
  transform: translate(var(--translate-x), var(--translate-y));
  border-top-left-radius: var(--layer-border-radius);
  border-top-right-radius: var(--layer-border-radius);
  border-bottom-right-radius: var(--layer-border-radius);
  border-bottom-left-radius: var(--layer-border-radius);
  overflow: hidden;
  background: var(--layer-background);
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}
.layer-vue .layer-vue-box .layer-vue-title {
  display: flex;
  align-items: center;
  height: var(--layer-title-height);
  border-bottom: var(--layer-title-border-bottom);
  background: var(--layer-title-background);
  color: var(--layer-title-color);
  box-sizing: border-box;
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-title-text {
  padding-left: 20px;
  height: 100%;
  line-height: var(--layer-title-height);
  flex-grow: 1;
  flex-shrink: 1;
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-title-text,
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-title-text * {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools {
  display: flex;
  height: 100%;
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools > div {
  cursor: pointer;
  width: 30px;
  text-align: center;
  height: 100%;
  line-height: var(--layer-title-height);
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-close,
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-max,
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-min {
  position: relative;
  flex-shrink: 0;
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-close {
  color: var(--layer-close-color);
  background: var(--layer-close-background);
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-close:hover {
  color: var(--layer-close-color-hover);
  background: var(--layer-close-background-hover);
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-max {
  color: var(--layer-max-color);
  background: var(--layer-max-background);
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-max:hover {
  color: var(--layer-max-color-hover);
  background: var(--layer-max-background-hover);
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-min {
  color: var(--layer-min-color);
  background: var(--layer-min-background);
}
.layer-vue .layer-vue-box .layer-vue-title .layer-vue-tools .layer-vue-min:hover {
  color: var(--layer-min-color-hover);
  background: var(--layer-min-background-hover);
}
.layer-vue .layer-vue-box .layer-vue-content {
  background: var(--layer-content-background);
  color: var(--layer-content-color);
  overflow: auto;
  flex: 1;
}
.layer-vue .layer-vue-box .layer-vue-resize {
  user-select: none;
  position: absolute;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-t {
  cursor: n-resize;
  width: calc(100% - 15px);
  height: 10px;
  top: -2.5px;
  left: 7.5px;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-rt {
  cursor: sw-resize;
  width: 10px;
  height: 10px;
  top: -2.5px;
  right: -2.5px;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-r {
  cursor: w-resize;
  width: 10px;
  height: calc(100% - 15px);
  top: 7.5px;
  right: -2.5px;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-lb {
  cursor: sw-resize;
  width: 10px;
  height: 10px;
  bottom: -2.5px;
  left: -2.5px;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-b {
  cursor: s-resize;
  width: calc(100% - 15px);
  height: 10px;
  bottom: -2.5px;
  left: 7.5px;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-rb {
  cursor: se-resize;
  width: 10px;
  height: 10px;
  bottom: -2.5px;
  right: -2.5px;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-l {
  cursor: e-resize;
  width: 10px;
  height: calc(100% - 15px);
  top: 7.5px;
  left: -2.5px;
}
.layer-vue .layer-vue-box .layer-vue-resize.layer-vue-resize-lt {
  cursor: se-resize;
  width: 10px;
  height: 10px;
  top: -2.5px;
  left: -2.5px;
}

.layer-fade-1-enter-active {
  animation: all 0.35s;
}
.layer-fade-1-enter-active .layer-vue-box {
  animation: layer-animation-1 0.35s;
}

.layer-fade-1-leave-active {
  animation: all 0.3s;
}
.layer-fade-1-leave-active .layer-vue-box {
  animation: layer-animation-1 0.35s reverse;
}

@keyframes layer-animation-1 {
  0% {
    opacity: 0;
    transform: translate(var(--translate-x), var(--translate-y)) scale(0.1);
  }
  80% {
    transform: translate(var(--translate-x), var(--translate-y)) scale(1.1);
  }
}
.layer-fade-2-enter-active {
  animation: all 0.35s;
}
.layer-fade-2-enter-active .layer-vue-box {
  animation: layer-animation-2 0.35s;
}

.layer-fade-2-leave-active {
  animation: all 0.3s;
}
.layer-fade-2-leave-active .layer-vue-box {
  animation: layer-animation-2 0.35s reverse;
}

@keyframes layer-animation-2 {
  0% {
    opacity: 0;
  }
}
.layer-to-max {
  animation: layer-expand 10s;
  animation-fill-mode: forwards;
}

@keyframes layer-expand {
  from {
    transform: translate(var(--translate-x), var(--translate-y));
    width: 100%;
    height: 100%;
  }
  to {
    transform: translate(0, 0);
    width: 100vw;
    height: 100vh;
  }
}
.layer-vue-close svg {
  width: 100%;
  height: 100%;
  fill: var(--layer-close-color);
}
.layer-vue-close:hover svg {
  fill: var(--layer-close-color-hover);
}

.layer-vue-max svg {
  width: 100%;
  height: 100%;
  fill: var(--layer-max-color);
}

body:has(.layer-vue-is-max) {
  overflow: hidden;
}

.layer-vue-min svg {
  width: 100%;
  height: 100%;
  fill: var(--layer-min-color);
}
.layer-vue-min:hover svg {
  fill: var(--layer-min-color-hover);
}`;
