import { RendererOptions } from "@chibivue/runtime-core";

export const nodeOps: Omit<RendererOptions, "patchProp"> = {
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null);
  },

  createElement(tagName) {
    return document.createElement(tagName);
  },

  createText(text) {
    return document.createTextNode(text);
  },

  setElementText(node, text) {
    node.textContent = text;
  },
};
