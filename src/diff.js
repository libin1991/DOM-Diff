// 虚拟DOM的diff算法，深度优先同级比较，二分查找和贪心算法
let Index = 0;
function diff(oldTree, newTree) {
  let patches = {};
  let index = 0;
  walk(oldTree, newTree, index, patches);
  return patches;
}
function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key];
    }
  }
  for (let key in newAttrs) {
    //新的属性值在旧节点不存在
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}
const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
function diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++Index, patches);
  });
}
function isString(node) {
  return Object.prototype.toString.call(node) === "[object String]";
}
function walk(oldNode, newNode, index, patches) {
  let currentPatch = [];
  if (!newNode) {
    currentPatch.push({ type: REMOVE, Index });
    if (currentPatch.length > 0) {
      patches[Index] = currentPatch;
    }
  } else if (isString(oldNode) && isString(newNode)) {
    if (oldNode !== newNode) {
      currentPatch.push({ type: TEXT, text: newNode });
    }
    if (currentPatch.length > 0) {
      patches[Index] = currentPatch;
    }
  } else if (oldNode.type === newNode.type) {
    let attrs = diffAttr(oldNode.props, newNode.props);
    console.log("attrs", attrs);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: ATTRS, attrs });
    }
    if (currentPatch.length > 0) {
      patches[Index] = currentPatch;
    }
    diffChildren(oldNode.children, newNode.children, index, patches);
  } else {
    currentPatch.push({ type: REPLACE, newNode });
    if (currentPatch.length > 0) {
      patches[Index] = currentPatch;
    }
  }
}
export default diff;
