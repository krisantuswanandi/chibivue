/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { CreateAppFunction, createRenderer } from "@chibivue/runtime-core";
import { nodeOps } from "./nodeOps";

const renderer = createRenderer(nodeOps);

function normalizeContainer(container: Element | string) {
  if (typeof container === "string") {
    const res = document.querySelector(container);
    if (!res) {
      console.warn(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  return container;
}

export const createApp = ((...args) => {
  const app = renderer.createApp(...args);

  const { mount } = app;
  app.mount = (containerOrSelector: Element | string) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;

    mount(container);
  };

  return app;
}) as CreateAppFunction<Element>;
