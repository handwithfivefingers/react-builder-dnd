import { useNode } from "@craftjs/core";
import { TbNewSection } from "react-icons/tb";
import { AppRootSettings } from "~/components/appRoot";
import { ISection } from "~/constant/section";
import { cn, generateProperty } from "~/libs/utils";
import styles from "./styles.module.scss";
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
        ["bg-sky-100 dark:bg-slate-800 outline-sky-800 outline-dashed outline-2 -outline-offset-2"]:
          isHovered || isSelected,
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
      value: "2px",
    }),
    ...generateProperty({
      propsName: "margin",
      value: "auto",
    }),
    // ...generateProperty({
    //   propsName: "background",
    //   value: "#fff",
    //   suffix: "property",
    // }),
    // ...generateProperty({
    //   propsName: "position",
    //   value: "static",
    //   suffix: "property",
    // }),
    // ...generateProperty({
    //   propsName: "display",
    //   value: "block",
    //   suffix: "property",
    // }),
    // ...generateProperty({
    //   propsName: "justify-content",
    //   value: "",
    //   suffix: "property",
    // }),
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
