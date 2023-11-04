/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { CreateAppFunction, createRenderer } from "@chibivue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";
import { extend } from "@chibivue/shared";

const rendererOptions = extend({ patchProp }, nodeOps);

const renderer = createRenderer(rendererOptions);

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

export * from "@chibivue/runtime-core";
