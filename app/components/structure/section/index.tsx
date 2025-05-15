import { useNode } from "@craftjs/core";
import { TbNewSection } from "react-icons/tb";
import { ISection } from "~/constant/section";
import { cn } from "~/libs/utils";
export const DSection = ({ className, children, style, ...props }: ISection) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));
  return (
    <section
      ref={(ref: HTMLSelectElement) => connect(drag(ref))}
      className={cn(className, {
        ["bg-slate-100 dark:bg-slate-800 outline-gray-300 outline-dashed outline-1"]: isHovered || isSelected,
      })}
      style={style}
      {...props}
    >
      {children || "Conten goes here"}
    </section>
  );
};
export const DSectionSetting = () => {
  const {
    actions: { setProp },
    style,
  } = useNode((node) => ({
    style: node.data.props.style,
  }));
  return "undefined";
  // return (
  //   <Setting.Root>
  //     <Accordion defaultValue={"dimension"}>
  //       <DimensionSetting
  //         vars={[
  //           {
  //             label: "Width",
  //             value: style.width,
  //             callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //               setProp((props: { style: React.CSSProperties }) => (props.style.width = e.target.value)),
  //           },
  //           {
  //             label: "Height",
  //             value: style.height,
  //             callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //               setProp((props: { style: React.CSSProperties }) => (props.style.height = e.target.value)),
  //           },
  //         ]}
  //       />

  //       <SpacingSetting
  //         vars={[
  //           {
  //             label: "Padding",
  //             value: style.padding,
  //             callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //               setProp((props: { style: React.CSSProperties }) => (props.style.padding = e.target.value)),
  //           },
  //           {
  //             label: "Margin",
  //             value: style.margin,
  //             callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //               setProp((props: { style: React.CSSProperties }) => (props.style.margin = e.target.value)),
  //           },
  //         ]}
  //       />

  //       <PositionSetting
  //         value={style.position}
  //         top={style.top}
  //         left={style.left}
  //         right={style.right}
  //         bottom={style.bottom}
  //         zIndex={style["z-index"]}
  //         onChange={(v: string, key: "position" | "top" | "left" | "right" | "bottom" | "z-index") =>
  //           setProp((props: { style: React.CSSProperties }) => ((props.style as any)[key] = v as string))
  //         }
  //       />
  //       <ColorSetting
  //         vars={[
  //           {
  //             label: "Color",
  //             value: style.color,
  //             callback: (e: string) => setProp((props: { style: React.CSSProperties }) => (props.style.color = e)),
  //           },
  //           {
  //             label: "Background Color",
  //             value: style.backgroundColor,
  //             callback: (e: string) =>
  //               setProp((props: { style: React.CSSProperties }) => (props.style.backgroundColor = e)),
  //           },
  //         ]}
  //       />
  //     </Accordion>
  //   </Setting.Root>
  // );
};

DSection.IconDisplay = TbNewSection;

DSection.fallbackProps = {
  style: {
    padding: 8,
    position: "static",
  },
};

DSection.craft = {
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: DSectionSetting,
  },
};
