export interface VNodeProps {
  [key: string]: any;
}

export interface VNode {
  type: string;
  props: VNodeProps;
  children: (VNode | string)[];
}
