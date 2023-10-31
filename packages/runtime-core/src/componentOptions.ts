import { VNode } from "./vnode";

export type ComponentOptions = {
  render: () => VNode;
};
