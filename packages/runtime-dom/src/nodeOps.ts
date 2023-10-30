import { RendererOptions } from "@chibivue/runtime-core";

export const nodeOps: RendererOptions<Node> = {
  setElementText(node, text) {
    node.textContent = text;
  },
};
