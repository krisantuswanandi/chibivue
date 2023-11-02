import { createApp, h } from "chibivue";

const app = createApp({
  render() {
    return h("div", {}, [
      h("h1", { style: "color: red" }, ["Hello world!"]),
      h(
        "button",
        {
          onClick() {
            alert("Me Clicked!");
          },
        },
        ["Click me"]
      ),
    ]);
  },
});

app.mount("#app");
