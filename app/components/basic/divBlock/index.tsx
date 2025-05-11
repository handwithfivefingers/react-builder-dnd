import { useNode } from "@craftjs/core";
import { TbNewSection } from "react-icons/tb";
import { AppRootSettings } from "~/components/appRoot";
import { ISection } from "~/constant/section";
import { cn } from "~/libs/utils";
import styles from "./styles.module.css";
export const D_Div = ({ className, children, style, ...props }: ISection) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={cn(className, styles.div, {
        ["bg-slate-100 dark:bg-slate-800 outline-gray-300 outline-dashed outline-1"]: isHovered || isSelected,
      })}
      style={style}
      {...props}
    >
      {children || "Conten goes here"}
    </div>
  );
};

D_Div.IconDisplay = TbNewSection;

D_Div.fallbackProps = {
  style: {
    "--width-size": "100%",
    "--sm-width-size": "40px",
    "--height-size": "100%",
    "--padding-size": "100%",
    "--margin-size": "100%",
  },
};

D_Div.craft = {
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: AppRootSettings,
  },
};
