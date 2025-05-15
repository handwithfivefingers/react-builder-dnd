import { useNode } from "@craftjs/core";
import React from "react";

interface IPos {
  top: string;
  left: string;
  right: string;
  bottom: string;
  position: string;
  "z-index": string;
}
interface IDimension {
  width: string;
  height: string;
}
interface ISpacing {
  padding: string;
  margin: string;
}
interface IColor {
  color: string;
  background: string;
}

type IPosKey = "position" | "top" | "left" | "right" | "bottom" | "z-index";

export const StructureSetting = ({ layout = true, children }: { layout?: boolean; children?: React.ReactNode }) => {
  const {
    actions: { setProp },
    style,
    display,
    alignment,
    justify,
    gap,
    direction,
  } = useNode((node) => ({
    style: node.data.props.style,
    display: node.data.props.display,
    alignment: node.data.props.alignment,
    justify: node.data.props.justify,
    gap: node.data.props.gap,
    direction: node.data.props.direction,
  }));
  const setAttributes = (value: any, props: any, key: string) => {
    props.style[key] = value;
  };
  return "undefined";

  //   return (
  //     <Setting.Root label="Propperties">
  //       <Accordion defaultValue={"dimension"}>
  //         <DimensionSetting
  //           vars={[
  //             {
  //               label: "Width",
  //               value: style?.width,
  //               callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //                 setProp((props: IDimension) => setAttributes(e, props, "--width-size")),
  //             },
  //             {
  //               label: "Height",
  //               value: style?.height,
  //               callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //                 setProp((props: IDimension) => setAttributes(e.target.value, props, "--height-size")),
  //             },
  //           ]}
  //         />
  //         {layout && <Layout />}
  //         <Position />
  //         <SpacingSetting
  //           vars={[
  //             {
  //               label: "Padding",
  //               value: style?.padding,
  //               callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //                 setProp((props: IDimension) => setAttributes(e.target.value, props, "--padding-size")),
  //             },
  //             {
  //               label: "Margin",
  //               value: style?.margin,
  //               callback: (e: React.ChangeEvent<HTMLInputElement>) =>
  //                 setProp((props: IDimension) => setAttributes(e.target.value, props, "--margin-size")),
  //             },
  //           ]}
  //         />
  //         <ColorSetting
  //           vars={[
  //             {
  //               label: "Color",
  //               value: style?.color,
  //               callback: (e: string) =>
  //                 setProp((props: { style: React.CSSProperties }) => setAttributes(e, props, "color")),
  //             },
  //             {
  //               label: "Background Color",
  //               value: style?.backgroundColor,
  //               callback: (e: string) =>
  //                 setProp((props: { style: React.CSSProperties }) => setAttributes(e, props, "backgroundColor")),
  //             },
  //           ]}
  //         />
  //         {children}
  //       </Accordion>
  //     </Setting.Root>
  //   );
  // };

  // const Layout = () => {
  //   const {
  //     actions: { setProp },
  //     style,
  //     display,
  //     alignment,
  //     justify,
  //     gap,
  //     direction,
  //   } = useNode((node) => ({
  //     style: node.data.props.style,
  //     display: node.data.props.display,
  //     alignment: node.data.props.alignment,
  //     justify: node.data.props.justify,
  //     gap: node.data.props.gap,
  //     direction: node.data.props.direction,
  //   }));
  //   return (
  //     <LayoutSetting
  //       value={display}
  //       onChange={(e: string) => setProp((props: { display: string }) => (props.display = e))}
  //       flexOption={{
  //         alignment,
  //         justify,
  //         gap,
  //         direction,
  //         callback: (v: string, key: string) => {
  //           setProp((props: { alignment: string; justify: string; gap: string }) => {
  //             console.log("v", v);
  //             props[key as "alignment" | "justify" | "gap"] = v;
  //           });
  //         },
  //       }}
  //     >
  //       {["flex"].includes(display) && (
  //         <Display.FlexDirection
  //           value={direction}
  //           callback={(v: string) =>
  //             setProp((props: { direction: string }) => {
  //               props.direction = v;
  //             })
  //           }
  //         />
  //       )}
  //       {["flex", "grid"].includes(display) && (
  //         <Display.FlexJustify
  //           value={justify}
  //           callback={(v: string) =>
  //             setProp((props: { justify: string }) => {
  //               props.justify = v;
  //             })
  //           }
  //         />
  //       )}
  //       {["flex", "grid"].includes(display) && (
  //         <Display.FlexGap
  //           value={gap}
  //           callback={(v: string) =>
  //             setProp((props: { gap: string }) => {
  //               props.gap = v;
  //             })
  //           }
  //         />
  //       )}
  //     </LayoutSetting>
  //   );
};

// const Position = () => {
//   const {
//     actions: { setProp },
//     top,
//     left,
//     right,
//     bottom,
//     position,
//     zIndex,
//   } = useNode((node) => ({
//     position: node.data.props.position,
//     top: node.data.props.top,
//     left: node.data.props.left,
//     right: node.data.props.right,
//     bottom: node.data.props.bottom,
//     zIndex: node.data.props.zIndex,
//   }));
//   return (
//     <PositionSetting
//       value={position}
//       top={top}
//       left={left}
//       right={right}
//       bottom={bottom}
//       zIndex={zIndex}
//       onChange={(v: string, key: PositionKey) =>
//         setProp((props: { style: IPos }) => (props.style[key as PositionKey] = v as string))
//       }
//     />
//   );
// };
