/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

export type App = {
  mount: (selector: string) => void;
};

export type Options = {
  render: () => string;
};

export function createApp(options: Options): App {
  return {
    mount(selector) {
      const root = document.querySelector(selector);

      if (root) {
        root.innerHTML = options.render();
      }
    },
  };
}
