export default `.layer-contextmenu {
  white-space: nowrap;
  color: var(--layer-contextmenu-color);
  background: var(--layer-contextmenu-background);
  position: fixed;
  padding: 10px 0;
  border-radius: 3px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  top: 0;
  left: 0;
  line-height: 1;
  transform: translate(var(--translate-x), var(--translate-y));
}
.layer-contextmenu .layer-contextmenu-item {
  cursor: pointer;
  padding: 5px 10px;
}
.layer-contextmenu .layer-contextmenu-item:hover {
  background: var(--layer-contextmenu-background-hover);
}`;
