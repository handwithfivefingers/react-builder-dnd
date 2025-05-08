/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
// components/user/Container.js
import { Node, useNode } from "@craftjs/core";
import { Container } from "@mantine/core";
import { IContainer, ISettingProps } from "~/constant/container";
import Setting from "../ui/setting";
import { BoxShadow } from "../ui/setting/boxShadow";
import { Background } from "../ui/setting/background";
import { cn } from "~/libs/utils";
import { BorderRadius } from "../ui/setting/borderRadius";

export const DContainer = ({ bg, p = 0, size, children, boxShadow, h, mih, borderRadius }: IContainer) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));
  return (
    <Container
      bg={bg}
      p={p}
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      size={size}
      className={cn(boxShadow, borderRadius, `overflow-auto`, {
        ["bg-slate-100 dark:bg-slate-800 outline-gray-300 outline-dashed outline-1"]: isHovered || isSelected,
      })}
      h={h}
      mih={mih}
    >
      {children}
    </Container>
  );
};

export const ContainerSetting = () => {
  const {
    actions: { setProp },
    p,
    size,
    boxShadow,
    bg,
    h,
    mih,
    borderRadius,
  } = useNode((node) => ({
    p: node.data.props.p,
    size: node.data.props.size,
    mih: node.data.props.mih,
    boxShadow: node.data.props.boxShadow,
    bg: node.data.props.bg,
    color: node.data.props.color,
    h: node.data.props.h,
    borderRadius: node.data.props.borderRadius,
  }));

  return (
    <Setting.Root label="Setting">
      <Setting.TextField
        label="Padding"
        value={p}
        onChange={(e) => setProp((props: ISettingProps) => (props.p = e.target.value))}
      />
      <Setting.TextField
        label="height"
        value={h}
        onChange={(e) => setProp((props: ISettingProps) => (props.h = e.target.value))}
      />
      <Setting.TextField
        label="min-height"
        value={mih}
        onChange={(e) => setProp((props: ISettingProps) => (props.mih = e.target.value))}
      />
      <Setting.SelectInput
        label="Size"
        value={size}
        options={["xxs", "xs", "sm", "md", "lg", "xl", "xxl"]}
        onChange={(e) => setProp((props: ISettingProps) => ((props as any).size = e))}
      />
      <BoxShadow value={boxShadow} onChange={(e: string) => setProp((props: any) => (props.boxShadow = e))} />
      <BorderRadius value={borderRadius} onChange={(e: string) => setProp((props: any) => (props.borderRadius = e))} />
      <Background value={bg} onChange={(e: string) => setProp((props: any) => (props.bg = e))} />
    </Setting.Root>
  );
};

DContainer.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  related: {
    settings: ContainerSetting,
  },
};
