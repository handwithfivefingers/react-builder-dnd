/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
// components/user/Container.js
import { Node, useNode } from "@craftjs/core";
import { BackgroundImage, Box } from "@mantine/core";
import { cn } from "~/libs/utils";
import Setting from "../ui/setting";
import { BoxShadow } from "../ui/setting/boxShadow";

interface IBackgroundImage {
  src?: string;
  boxShadow?: string;
  children?: React.ReactNode;
  w?: number;
  maw?: number;
  radius?: string;
}

interface ISetting {
  src?: string;
  w?: number | string;
  maw?: number | string;
  radius?: string;
  boxShadow: string;
}
export const DBackgroundImage = ({
  src = "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
  boxShadow,
  children,
  w,
  maw,
  radius,
}: IBackgroundImage) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));

  return (
    <Box
      className={cn(boxShadow, {
        ["bg-slate-100 dark:bg-slate-800 outline-gray-300 outline-dashed outline-1"]: isHovered || isSelected,
      })}
      w={w}
      maw={maw}
      ref={(ref: HTMLImageElement) => connect(drag(ref))}
    >
      <BackgroundImage src={src} radius={radius}>
        {children}
      </BackgroundImage>
    </Box>
  );
};

export const ImageSetting = () => {
  const {
    actions: { setProp },
    src,
    boxShadow,
    w,
    maw,
  } = useNode((node) => ({
    src: node.data.props.src,
    w: node.data.props.w,
    maw: node.data.props.maw,
    boxShadow: node.data.props.boxShadow,
  }));

  return (
    <Setting.Root label="Setting">
      <Setting.TextField
        label="source"
        value={src}
        onChange={(e) => setProp((props: ISetting) => (props.src = e.target.value))}
      />
      <Setting.TextField
        label="width"
        value={w}
        onChange={(e) => setProp((props: ISetting) => (props.w = e.target.value))}
      />
      <Setting.TextField
        label="max-width"
        value={maw}
        onChange={(e) => setProp((props: ISetting) => (props.maw = e.target.value))}
      />

      <Setting.SelectInput
        label="Radius"
        value={"md"}
        options={["sm", "md", "lg", "xl"]}
        onChange={(e: any) => setProp((props: ISetting) => ((props as any).radius = e))}
      />
      <BoxShadow value={boxShadow} onChange={(e: string) => setProp((props: any) => (props.boxShadow = e))} />

      {/* <Background value={bg} onChange={(e: string) => setProp((props: any) => (props.bg = e))} /> */}
    </Setting.Root>
  );
};

DBackgroundImage.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  related: {
    settings: ImageSetting,
  },
};
