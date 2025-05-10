/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { Node, useNode } from "@craftjs/core";
import { cn } from "~/libs/utils";
import Setting from "../ui/setting";
import { BorderRadius } from "../ui/setting/borderRadius";
import { IDColumn, IDColumnSetting } from "~/constant/column";
import { LayoutSetting } from "../ui/setting/commonSetting";
import { Accordion } from "@mantine/core";

export const DColumn = ({ children, borderRadius, p = 8, colSpan, display, alignment, justify, gap }: IDColumn) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({
    isHovered: state.events.hovered,
    isSelected: state.events.selected,
    colSpan: state.data.props.colSpan,
  }));
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      style={{
        padding: p,
      }}
      className={cn(" border-neutral-500 transition-colors ", colSpan, borderRadius, display, alignment, justify, gap, {
        ["outline-gray-300 outline-dashed outline-2"]: isHovered || isSelected,
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
    colSpan,
    display,
    alignment,
    justify,
    gap,
    direction,
  } = useNode((node) => ({
    p: node.data.props.p,
    borderRadius: node.data.props.borderRadius,
    colSpan: node.data.props.colSpan,
    column: node.data.props.column,
    display: node.data.props.display,
    alignment: node.data.props.alignment,
    justify: node.data.props.justify,
    gap: node.data.props.gap,
    direction: node.data.props.direction,
  }));

  return (
    <Setting.Root label="Propperties">
      <Accordion defaultValue={"spacing"}>
        <LayoutSetting
          value={display}
          onChange={(e: string) => setProp((props: { display: string }) => (props.display = e))}
          flexOption={{
            alignment,
            justify,
            gap,
            direction,
            callback: (v: string, key: string) => {
              setProp((props: { alignment: string; justify: string; gap: string }) => {
                props[key as "alignment" | "justify" | "gap"] = v;
              });
            },
          }}
        />
      </Accordion>
      <Setting.TextField
        label="padding"
        value={p}
        onChange={(e) => setProp((props: any) => (props.p = e.target.value))}
      />
      <BorderRadius
        value={borderRadius}
        onChange={(e) => setProp((props: IDColumnSetting) => (props.borderRadius = e))}
      />

      <Setting.SelectInput
        label="column span"
        value={colSpan}
        options={[
          { label: "1", value: "col-span-1" },
          { label: "2", value: "col-span-2" },
          { label: "3", value: "col-span-3" },
          { label: "4", value: "col-span-4" },
          { label: "5", value: "col-span-5" },
          { label: "6", value: "col-span-6" },
          { label: "7", value: "col-span-7" },
          { label: "8", value: "col-span-8" },
          { label: "9", value: "col-span-9" },
          { label: "10", value: "col-span-10" },
          { label: "11", value: "col-span-11" },
          { label: "12", value: "col-span-12" },
        ]}
        onChange={(e) => setProp((props: IDColumnSetting) => (props.colSpan = e || ""))}
      />
    </Setting.Root>
  );
};

DColumn.craft = {
  rules: {
    canDrag: (node: Node) => {
      return node.data.name === "DRow";
    },
    canDrop: (node: Node) => {
      return node.data.name === "DRow";
    },
  },
  related: {
    settings: DColumnSetting,
  },
};

DColumn.fallbackProps = {
  p: "8px",
  colSpan: "col-span-1",
};
