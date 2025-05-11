/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Element, Node, useNode } from "@craftjs/core";
import { DColumn } from "~/components/structure/column";
import { IDRow } from "~/constant/row";
import { cn } from "~/libs/utils";
import { StructureSetting } from "../setting";

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
      className={cn("transition-colors grid", {
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
    settings: StructureSetting,
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
