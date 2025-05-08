/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Element, Node, useNode } from "@craftjs/core";
import { COLUMN, IDRow } from "~/constant/row";
import { DColumn } from "../column";
import Setting from "../ui/setting";
import { cn } from "~/libs/utils";

export const DRow = ({ column = "2", gutter = 4, p = 0 }: IDRow) => {
  const {
    connectors: { connect, drag },
    id,
    isHovered,
    isSelected,
  } = useNode((state) => ({
    ...state,
    isHovered: state.events.hovered,
    isSelected: state.events.selected,
  }));
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
        padding: p,
        gap: `${`${gutter}`?.replace("px", "")}px`,
      }}
      className={cn("gap-1 transition-colors ", {
        ["bg-slate-100 dark:bg-slate-800 outline-gray-300 outline-dashed outline-1"]: isHovered || isSelected,
      })}
    >
      {[...Array(Number(column)).keys()].map((item, i) => (
        <Element is={DColumn} canvas key={`dRow-${id}dColumn-${i}`} id={`dRow-${id}dColumn-${i}`} />
      ))}
    </div>
  );
};

export const DRowSetting = () => {
  const {
    actions: { setProp },
    p,
    gutter,
    column,
  } = useNode((node) => ({
    p: node.data.props.p,
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
      <Setting.TextField
        label="gutter"
        value={gutter}
        onChange={(e) => setProp((props: any) => (props.gutter = e.target.value))}
      />
      <Setting.SelectInput
        label="column"
        value={column}
        options={COLUMN}
        onChange={(v) => setProp((props: any) => (props.column = `${v}`))}
      />
    </Setting.Root>
  );
};

DRow.craft = {
  rules: {
    canDrag: (node: Node) => {
      return node.data.props.text != "Drag";
    },
    canDrop: (node: Node) => {
      console.log("dRow can Drop", node);
      return node.data.name !== "dRow";
    },
    canMoveIn: (incomming: Node[], self: Node, helper: any) => {
      console.log("can Move In", self, incomming[0].data.name, helper);
      const canMovingIn = incomming[0].data.name == "DColumn";
      return canMovingIn;
    },
  },
  related: {
    settings: DRowSetting,
  },
};
