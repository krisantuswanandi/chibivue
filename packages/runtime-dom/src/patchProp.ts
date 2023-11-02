import { patchEvent } from "./modules/events";
import { isOn } from "@chibivue/shared";
import { RendererOptions } from "@chibivue/runtime-core";

type DOMRendererOptions = RendererOptions<Node, Element>;

export const patchProp: DOMRendererOptions["patchProp"] = (el, key, value) => {
  if (isOn(key)) {
    patchEvent(el, key, value);
  }
};
