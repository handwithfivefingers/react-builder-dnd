import { useNode } from "@craftjs/core";
import { Accordion } from "@mantine/core";
import { TbNewSection } from "react-icons/tb";
import Setting from "~/components/ui/setting";
import { ColorSetting, DimensionSetting, SpacingSetting } from "~/components/ui/setting/commonSetting";
import { ISection } from "~/constant/section";
import { cn } from "~/libs/utils";
export const D_Div = ({ className, children, style, ...props }: ISection) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={cn(className, {
        ["bg-slate-100 dark:bg-slate-800 outline-gray-300 outline-dashed outline-1"]: isHovered || isSelected,
      })}
      style={style}
      {...props}
    >
      {children || "Conten goes here"}
    </div>
  );
};
export const D_DivSetting = () => {
  const {
    actions: { setProp },
    style,
  } = useNode((node) => ({
    style: node.data.props.style,
  }));

  console.log("style", style);
  return (
    <Setting.Root>
      <Accordion defaultValue={"spacing"}>
        <SpacingSetting
          vars={[
            {
              label: "Padding",
              value: style.padding,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => (props.style.padding = e.target.value)),
            },
            {
              label: "Margin",
              value: style.margin,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => (props.style.margin = e.target.value)),
            },
          ]}
        />
        <DimensionSetting
          vars={[
            {
              label: "Width",
              value: style.width,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => (props.style.width = e.target.value)),
            },
            {
              label: "Height",
              value: style.height,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => (props.style.height = e.target.value)),
            },
          ]}
        />
        <ColorSetting
          vars={[
            {
              label: "Color",
              value: style.color,
              callback: (e: string) => setProp((props: { style: React.CSSProperties }) => (props.style.color = e)),
            },
            {
              label: "Background Color",
              value: style.backgroundColor,
              callback: (e: string) =>
                setProp((props: { style: React.CSSProperties }) => (props.style.backgroundColor = e)),
            },
          ]}
        />
      </Accordion>
    </Setting.Root>
  );
};

D_Div.IconDisplay = TbNewSection;

D_Div.fallbackProps = {
  style: {
    padding: 8,
  },
};

D_Div.craft = {
  rules: {
    rules: {
      canDrag: () => true,
    },
  },
  related: {
    settings: D_DivSetting,
  },
};
