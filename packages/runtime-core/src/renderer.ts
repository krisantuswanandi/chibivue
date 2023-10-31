import { createAppAPI } from "./apiCreateApp";
import type { VNode } from "./vnode";

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export interface RendererOptions<HostNode = RendererNode> {
  insert(el: HostNode, parent: HostNode, anchor?: HostNode | null): void;
  createElement(type: string): HostNode;
  createText(text: string): HostNode;
  setElementText(node: HostNode, text: string): void;
}

export type RootRenderFunction<HostElement = RendererElement> = (
  vnode: VNode,
  container: HostElement
) => void;

export function createRenderer(options: RendererOptions) {
  const {
    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
  } = options;

  function renderVNode(vnode: VNode | string) {
    if (typeof vnode === "string") {
      return hostCreateText(vnode);
    } else {
      const el = hostCreateElement(vnode.type);

      for (const key in vnode.props) {
        el.setAttribute(key, vnode.props[key]);
      }

      for (const child of vnode.children) {
        const childEl = renderVNode(child);
        hostInsert(childEl, el);
      }

      return el;
    }
  }

  const render: RootRenderFunction = (vnode, container) => {
    const el = renderVNode(vnode);
    hostInsert(el, container);
  };

  const createApp = createAppAPI(render);

  return { createApp };
}
