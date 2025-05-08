/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Node, useNode } from "@craftjs/core";
import { IDColumn } from "~/constant/column";
import { cn } from "~/libs/utils";
import Setting from "../ui/setting";
import { BorderRadius } from "../ui/setting/borderRadius";

export const DColumn = ({ children, borderRadius, p = 8 }: IDColumn) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      style={{
        padding: p,
      }}
      className={cn(" border-neutral-500 transition-colors ", borderRadius, {
        ["bg-slate-100 dark:bg-slate-800 outline-gray-300 outline-dashed outline-1"]: isHovered || isSelected,
      })}
    >
      {children ? children : <p>Column</p>}
    </div>
  );
};

export const DColumnSetting = () => {
  const {
    actions: { setProp },
    p,
    borderRadius,
  } = useNode((node) => ({
    p: node.data.props.p,
    borderRadius: node.data.props.borderRadius,
    gutter: node.data.props.gutter,
    column: node.data.props.column,
  }));

  return (
    <Setting.Root label="Setting">
      <Setting.TextField
        label="padding"
        value={p}
        onChange={(e) => setProp((props: any) => (props.p = e.target.value))}
      />
      <BorderRadius value={borderRadius} onChange={(e) => setProp((props: any) => (props.borderRadius = e))} />
    </Setting.Root>
  );
};

DColumn.craft = {
  rules: {
    canDrag: (node: Node) => {
      return node.data.name === "DRow";
    },
    canDrop: (node: Node) => {
      console.log("dColumn can drop", node);
      return node.data.name === "DRow";
    },
  },
  related: {
    settings: DColumnSetting,
  },
};
