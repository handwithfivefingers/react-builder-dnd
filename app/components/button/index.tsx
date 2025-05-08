/* eslint-disable @typescript-eslint/no-explicit-any */
// components/user/Button.js
import React from "react";
// import { Button as MaterialButton } from "@mui/material";
import { Node, useNode } from "@craftjs/core";
import { Button, InputLabel, MantineSize, Select, TextInput } from "@mantine/core";
import { Background } from "../ui/setting/background";

interface IButton {
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
export const DButton = ({ size, variant = "default", color, children, bg }: IButton) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Button size={size} variant={variant} c={color} bg={bg} ref={(ref: HTMLButtonElement) => connect(drag(ref))}>
      {children}
    </Button>
  );
};

DButton.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
};

const DButtonSetting = () => {
  const {
    actions: { setProp },
    p,
    variant,
    size,
    bg,
    color,
  } = useNode((node) => ({
    p: node.data.props.p,
    variant: node.data.props.variant,
    size: node.data.props.size,
    bg: node.data.props.bg,
    color: node.data.props.color,
  }));

  console.log("variant", variant);
  return (
    <div className="flex gap-2 flex-col w-full">
      <InputLabel size="small">Setting</InputLabel>
      <div className="flex gap-2 items-center w-full">
        <TextInput
          label="Padding"
          value={p}
          placeholder="Padding value"
          onChange={(e) => setProp((props: any) => (props.p = e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex gap-2 items-center">
        <Select
          label="Variant"
          placeholder="Pick value"
          value={variant || "default"}
          data={VARIANT}
          onChange={(v) => setProp((props: any) => (props.variant = v))}
          className="w-full"
        />
      </div>
      <div className="flex gap-2 items-center">
        <Select
          label="Size"
          placeholder="Pick value"
          value={size}
          data={SIZE}
          onChange={(v) => setProp((props: any) => (props.size = v))}
          className="w-full"
        />
      </div>

      <Background label="Backgroun:" value={bg} onChange={(e: string) => setProp((props: any) => (props.bg = e))} />

      <Background label="Color" value={color} onChange={(e: string) => setProp((props: any) => (props.color = e))} />
    </div>
  );
};

DButton.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  related: {
    settings: DButtonSetting,
  },
};
