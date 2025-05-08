import { MantineSize } from "@mantine/core";

export interface IButton {
  variant?: ButtonVariant;
  size?: MantineSize;
  color?: string;
  children: React.ReactNode;
  bg?: string;
}
export type ButtonVariant =
  | "filled"
  | "light"
  | "outline"
  | "transparent"
  | "white"
  | "subtle"
  | "default"
  | "gradient";

export const VARIANT = ["default", "filled", "light", "outline", "transparent", "white", "subtle", "gradient"];
export const SIZE = ["xs", "sm", "md", "lg", "xl"];
