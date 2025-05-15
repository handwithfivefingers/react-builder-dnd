/* eslint-disable import/no-unresolved */
import { useNode } from "@craftjs/core";
import { AppRootSettings } from "~/components/appRoot";
import { IContainer } from "~/constant/container";
import { cn, generateProperty } from "~/libs/utils";
import styles from "./styles.module.scss";
export const DContainer = ({ children, style }: IContainer) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));

  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={cn("container max-w-full", styles.container, {
        ["outline-sky-800 outline-dashed outline-2 -outline-offset-2"]: isHovered || isSelected,
      })}
      style={style}
    >
      {children}
    </div>
  );
};

DContainer.craft = {
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: AppRootSettings,
  },
  custom: {
    smEditable: false,
    mdEditable: false,
    lgEditable: false,
  },
};

DContainer.fallbackProps = {
  style: {
    ...generateProperty({
      propsName: "width",
      value: "100%",
    }),
    ...generateProperty({
      propsName: "height",
      value: "auto",
    }),
    ...generateProperty({
      propsName: "padding",
      value: "4px",
    }),
    ...generateProperty({
      propsName: "margin",
      value: "0px auto",
    }),
  },
};
