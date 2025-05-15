/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, useNode } from "@craftjs/core";
import { AppRootSettings } from "~/components/appRoot";
import { cn, generateProperty } from "~/libs/utils";
import styles from "./styles.module.scss"
export const DRow = ({ style, children }: { style: Record<string, string>; children: any }) => {
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
        ...style,
      }}
      className={cn("transition-colors grid", styles.row, {
        [" outline-gray-300 outline-dashed outline-2"]: isHovered || isSelected,
      })}
    >
      {children ? (
        children
      ) : (
        <div className="p-2 m-4 border-gray-300 border-dashed border-2 hover:bg-slate-200 h-12">Column goes here</div>
      )}
    </div>
  );
};

DRow.craft = {
  rules: {
    canDrag: (node: Node) => {
      return node.data.props.text != "Drag";
    },
    canDrop: (node: Node) => {
      return node.data.name !== "dRow";
    },
    canMoveIn: (incomming: Node[], self: Node, helper: any) => {
      const canMovingIn = incomming[0].data.name == "DColumn";
      return canMovingIn;
    },
  },
  related: {
    settings: AppRootSettings,
  },
};

DRow.fallbackProps = {
  style: {
    ...generateProperty({
      propsName: "padding",
      value: "12px",
    }),
    ...generateProperty({
      propsName: "display",
      value: "grid",
      suffix: "property",
    }),
    ...generateProperty({
      propsName: "height",
      value: "auto",
    }),
  },
};
