interface Invoker extends EventListener {
  value: EventValue;
}

type EventValue = Function;

export function addEventListener(
  el: Element,
  event: string,
  handler: EventListener
) {
  el.addEventListener(event, handler);
}

export function removeEventListener(
  el: Element,
  event: string,
  handler: EventListener
) {
  el.removeEventListener(event, handler);
}

const veiKey = Symbol("_vei");

export function patchEvent(
  el: Element & { [veiKey]?: Record<string, Invoker | undefined> },
  rawName: string,
  nextValue: EventValue | null
) {
  // vei = vue event invokers
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    // patch
    existingInvoker.value = nextValue;
  } else {
    const name = parseName(rawName);
    if (nextValue) {
      // add
      const invoker = (invokers[rawName] = createInvoker(nextValue));
      addEventListener(el, name, invoker);
    } else if (existingInvoker) {
      // remove
      removeEventListener(el, name, existingInvoker);
      invokers[rawName] = undefined;
    }
  }
}

function parseName(name: string): string {
  return name.slice(2).toLowerCase();
}

function createInvoker(initialValue: EventValue) {
  const invoker: Invoker = (e: Event) => {
    invoker.value(e);
  };
  invoker.value = initialValue;
  return invoker;
}
