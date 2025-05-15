/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, useEditor, useNode } from "@craftjs/core";
import { useEffect, useState } from "react";
import { AppRootSettings } from "~/components/appRoot";
import { DEditor } from "~/components/editor";
import { IText } from "~/constant/text";
import { cn, generateProperty } from "~/libs/utils";
import styles from "./styles.module.scss";

export const DText = ({ text, style }: IText) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    actions: { setProp },
    isHover,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
    isHover: state.events.hovered,
  }));
  const { store } = useEditor();
  const isEnabled = (store.getState() as any)?.options?.enabled || false;

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    !hasSelectedNode && setEditable(false);
  }, [hasSelectedNode]);

  const onSave = (content: string) => {
    setProp((props: any) => (props.text = content));
    onCancel();
  };
  const onCancel = () => setTimeout(() => setEditable(false), 150);
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      onClick={() => isEnabled && setEditable(true)}
      aria-hidden="true"
      className={cn("relative ", styles.textBlock, {
        ["outline-2 outline-dashed outline-sky-800 -outline-offset-2 "]: isHover && !hasSelectedNode,
        ["z-10"]: hasSelectedNode,
      })}
      style={style}
    >
      {!editable ? (
        <div className={cn(styles.content)} dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <DEditor content={text} onSave={onSave} onCancel={onCancel} />
      )}
    </div>
  );
};

// export const TextSettings = () => {
//   const {
//     actions: { setProp },
//     style,
//   } = useNode((node) => ({
//     style: node.data.props.style,
//   }));

//   return <Setting.Root setProp={setProp} style={style} />;
//   // return (
//   // <Setting.Root>
//   //   <Accordion defaultValue={"spacing"}>
//   //     <SpacingSetting
//   //       vars={[
//   //         {
//   //           label: "Padding",
//   //           value: p,
//   //           callback: (e: React.ChangeEvent<HTMLInputElement>) =>
//   //             setProp((props: ITextSetting) => (props.p = e.target.value)),
//   //         },
//   //         {
//   //           label: "Margin",
//   //           value: m,
//   //           callback: (e: React.ChangeEvent<HTMLInputElement>) =>
//   //             setProp((props: ITextSetting) => (props.m = e.target.value)),
//   //         },
//   //       ]}
//   //     />
//   //     <DimensionSetting
//   //       vars={[
//   //         {
//   //           label: "Width",
//   //           value: width,
//   //           callback: (e: React.ChangeEvent<HTMLInputElement>) =>
//   //             setProp((props: ITextSetting) => (props.w = e.target.value)),
//   //         },
//   //         {
//   //           label: "Height",
//   //           value: height,
//   //           callback: (e: React.ChangeEvent<HTMLInputElement>) =>
//   //             setProp((props: ITextSetting) => (props.h = e.target.value)),
//   //         },
//   //       ]}
//   //     />
//   //   </Accordion>
//   // </Setting.Root>
//   // );
// };

DText.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  related: {
    settings: AppRootSettings,
  },
};

DText.fallbackProps = {
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
      value: "8px 0",
    }),
  },
  text: `<p>Content goes here</p>`,
};
