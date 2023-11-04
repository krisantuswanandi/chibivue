import { includeBooleanAttr, isSpecialBooleanAttr } from "@chibivue/shared";

export function patchAttr(el: Element, key: string, value: any) {
  // note we are only checking boolean attributes that don't have a
  // corresponding dom prop of the same name here.
  const isBoolean = isSpecialBooleanAttr(key);
  if (value == null || (isBoolean && !includeBooleanAttr(value))) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, isBoolean ? "" : value);
  }
}
