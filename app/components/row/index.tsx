/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Element, Node, useNode } from "@craftjs/core";
import { COLUMN, IDRow } from "~/constant/row";
import { DColumn } from "../column";
import Setting from "../ui/setting";
import { cn } from "~/libs/utils";
import { ContainerSetting } from "../container";
import { Accordion } from "@mantine/core";

export const DRow = ({ column = "2", rowSpan = "2", gutter = 4, p = 0 }: IDRow) => {
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
        gridTemplateColumns: `repeat(${rowSpan}, minmax(0, 1fr))`,
        padding: p,
        gap: `${`${gutter}`?.replace("px", "")}px`,
      }}
      className={cn("gap-1 transition-colors ", {
        [" outline-gray-300 outline-dashed outline-2"]: isHovered || isSelected,
      })}
    >
      {[...Array(Number(column)).keys()].map((item, i) => (
        <Element
          is={DColumn}
          canvas
          key={`dRow-${id}dColumn-${i}`}
          id={`dRow-${id}dColumn-${i}`}
          {...DColumn.fallbackProps}
        />
      ))}
    </div>
  );
};

export const DRowSetting = () => {
  const {
    actions: { setProp },
    p,
    gutter,
    rowSpan,
    column,
  } = useNode((node) => ({
    p: node.data.props.p,
    gutter: node.data.props.gutter,
    rowSpan: node.data.props.rowSpan,
    column: node.data.props.column,
  }));

  return (
    <ContainerSetting layout={false}>
      <Accordion.Item value="grid">
        <Accordion.Control>Grid Configure</Accordion.Control>
        <Accordion.Panel>
          <Setting.SelectInput
            label="Row Span"
            value={rowSpan}
            options={COLUMN}
            onChange={(v) => setProp((props: any) => (props.rowSpan = `${v}`))}
          />
          <Setting.SelectInput
            label="Column"
            value={column}
            options={COLUMN}
            onChange={(v) => setProp((props: any) => (props.column = `${v}`))}
          />
        </Accordion.Panel>
      </Accordion.Item>
    </ContainerSetting>
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

DRow.fallbackProps = {
  column: 2,
  rowSpan: 2,
  gutter: "4px",
  p: "8px",
  style: {
    padding: 8,
    position: "static",
    width: "100%",
    height: "auto",
  },
};
