export type SIZE = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface IContainer {
  bg?: string;
  p?: number;
  children?: React.ReactNode;
  size: SIZE;
  boxShadow?: string;
  h?: number | string;
  mih?: number | string;
  borderRadius?: string;
}

export interface ISettingProps {
  bg?: string;
  p?: number | string;
  size: SIZE;
  boxShadow?: string;
  h?: number | string;
  mih?: number | string;
}
