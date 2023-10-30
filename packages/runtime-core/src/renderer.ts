import { createAppAPI } from "./apiCreateApp";

export interface RendererNode {
  [key: string]: any;
}

export interface RendererElement extends RendererNode {}

export interface RendererOptions<HostNode = RendererNode> {
  setElementText(node: HostNode, text: string): void;
}

export type RootRenderFunction<HostElement = RendererElement> = (
  content: string,
  container: HostElement
) => void;

export function createRenderer(options: RendererOptions) {
  const { setElementText: hostSetElementText } = options;

  const render: RootRenderFunction = (content, container) => {
    hostSetElementText(container, content);
  };

  const createApp = createAppAPI(render);

  return { createApp };
}
