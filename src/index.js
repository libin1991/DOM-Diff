import { createElement, render, renderDom } from "./element";
import diff from "./diff";
import patch from "./patch";

let virtualDom = createElement("div", { class: "container" }, [
  createElement("li", { class: "item" }, ["a"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["c"])
]);
let virtualDom1 = createElement("div", { class: "container1" }, [
  createElement("li", { class: "item" }, ["1"]),
  createElement("li", { class: "item" }, ["b"]),
  createElement("li", { class: "item" }, ["2"])
]);
let patches = diff(virtualDom, virtualDom1);
let el = render(virtualDom);
console.log(patches);
patch(el, patches);

//创建虚拟DOM并添加到页面
renderDom(el, document.getElementById("root"));

console.log(render(virtualDom));
console.log(virtualDom);
