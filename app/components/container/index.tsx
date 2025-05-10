/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import { useNode } from "@craftjs/core";
import { Accordion, Container } from "@mantine/core";
import { IContainer } from "~/constant/container";
import { cn } from "~/libs/utils";
import Setting from "../ui/setting";
import {
  ColorSetting,
  DimensionSetting,
  LayoutSetting,
  PositionSetting,
  SpacingSetting,
} from "../ui/setting/commonSetting";
import { Display } from "../ui/setting/display";
import { IComonProps } from "~/types/common";

export const DContainer = ({
  children,
  style,
  display,
  gap,
  alignment,
  direction = "flex-row",
  justify,
}: IContainer) => {
  const {
    connectors: { connect, drag },
    isHovered,
    isSelected,
  } = useNode((state) => ({ isHovered: state.events.hovered, isSelected: state.events.selected }));

  return (
    <Container
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={cn(`overflow-auto`, display, alignment, justify, direction, {
        ["outline-gray-300 outline-dashed outline-2"]: isHovered || isSelected,
      })}
      style={{ ...style, gap: gap }}
    >
      {children}
    </Container>
  );
};

export const ContainerSetting = ({ layout = true, children }: { layout: boolean; children?: React.ReactNode }) => {
  const nodeProps = useNode((node) => ({
    style: node.data.props.style,
    display: node.data.props.display,
    alignment: node.data.props.alignment,
    justify: node.data.props.justify,
    gap: node.data.props.gap,
    direction: node.data.props.direction,
  }));
  const setAttributes = (value: any, props: any, key: string) => {
    if (props.style?.[key as keyof React.CSSProperties]) props.style[key as keyof React.CSSProperties] = value;
    else props.style = { ...props.style, [key]: value };
  };
  const {
    actions: { setProp },
    style,
    display,
    alignment,
    justify,
    gap,
    direction,
  } = nodeProps;
  return (
    <Setting.Root label="Propperties">
      <Accordion defaultValue={"dimension"}>
        <DimensionSetting
          vars={[
            {
              label: "Width",
              value: style?.width,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => setAttributes(e.target.value, props, "width")),
            },
            {
              label: "Height",
              value: style?.height,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => setAttributes(e.target.value, props, "height")),
            },
          ]}
        />
        {layout && (
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
                  console.log("v", v);
                  props[key as "alignment" | "justify" | "gap"] = v;
                });
              },
            }}
          >
            {["flex"].includes(display) && (
              <Display.FlexDirection
                value={direction}
                callback={(v: string) =>
                  setProp((props: { direction: string }) => {
                    props.direction = v;
                  })
                }
              />
            )}
            {["flex", "grid"].includes(display) && (
              <Display.FlexJustify
                value={justify}
                callback={(v: string) =>
                  setProp((props: { justify: string }) => {
                    props.justify = v;
                  })
                }
              />
            )}
            {["flex", "grid"].includes(display) && (
              <Display.FlexGap
                value={gap}
                callback={(v: string) =>
                  setProp((props: { gap: string }) => {
                    props.gap = v;
                  })
                }
              />
            )}
          </LayoutSetting>
        )}
        <PositionSetting
          value={style.position}
          top={style.top}
          left={style.left}
          right={style.right}
          bottom={style.bottom}
          zIndex={style["z-index"]}
          onChange={(v: string, key: "position" | "top" | "left" | "right" | "bottom" | "z-index") =>
            setProp((props: { style: React.CSSProperties }) => ((props.style as any)[key] = v as string))
          }
        />
        <SpacingSetting
          vars={[
            {
              label: "Padding",
              value: style?.padding,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => setAttributes(e.target.value, props, "padding")),
            },
            {
              label: "Margin",
              value: style?.margin,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: { style: React.CSSProperties }) => setAttributes(e.target.value, props, "margin")),
            },
          ]}
        />
        <ColorSetting
          vars={[
            {
              label: "Color",
              value: style?.color,
              callback: (e: string) =>
                setProp((props: { style: React.CSSProperties }) => setAttributes(e, props, "color")),
            },
            {
              label: "Background Color",
              value: style?.backgroundColor,
              callback: (e: string) =>
                setProp((props: { style: React.CSSProperties }) => setAttributes(e, props, "backgroundColor")),
            },
          ]}
        />
        {children}
      </Accordion>
    </Setting.Root>
  );
};

DContainer.craft = {
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ContainerSetting,
  },
};

DContainer.fallbackProps = {
  style: {
    padding: 8,
    position: "static",
    width: "100%",
    height: "100%",
  },
};
