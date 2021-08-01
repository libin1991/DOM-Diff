class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
function setAttr(node, key, value) {
  switch (key) {
    case "value": //表示node节点是input或textarea
      if (
        node.tagName.toUpperCase() === "INPUT" ||
        node.tagName.toUpperCase() === "TEXTAREA"
      ) {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
function createElement(type, props, children) {
  return new Element(type, props, children);
}
function render(obj) {
  let el = document.createElement(obj.type);
  for (let key in obj.props) {
    // console.log(obj.props[key]); 属性的值
    setAttr(el, key, obj.props[key]);
  }
  obj.children.forEach((child) => {
    child =
      child instanceof Element ? render(child) : document.createTextNode(child);
    el.appendChild(child);
  });
  return el;
}
function renderDom(el, target) {
  target.appendChild(el);
}
export { createElement, render, Element, renderDom, setAttr };
