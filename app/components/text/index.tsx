/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, useEditor, useNode } from "@craftjs/core";
import { useEffect, useState } from "react";
import { DEditor } from "../editor";
import Setting from "../ui/setting";
import styles from "./styles.module.css";
import { cn } from "~/libs/utils";
import { Accordion } from "@mantine/core";
import { DimensionSetting, SpacingSetting } from "../ui/setting/commonSetting";
import { IText, ITextSetting } from "~/constant/text";

export const DText = ({ text, p, bg, w, h, m }: IText) => {
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
      className={cn("relative ", {
        ["outline-1 outline-dashed outline-neutral-500 "]: isHover && !hasSelectedNode,
        ["z-10"]: hasSelectedNode,
      })}
      style={{ backgroundColor: bg, padding: p, margin: m, width: w, height: h }}
    >
      {!editable ? (
        <div className={cn(styles.content, {})} dangerouslySetInnerHTML={{ __html: text }} />
      ) : (
        <DEditor content={text} onSave={onSave} onCancel={onCancel} />
      )}
    </div>
  );
};

export const TextSettings = () => {
  const {
    actions: { setProp },
    p,
    m,
    width,
    height,
  } = useNode((node) => ({
    p: node.data.props.p,
    m: node.data.props.m,
    width: node.data.props.w,
    height: node.data.props.h,
  }));

  return (
    <Setting.Root>
      <Accordion defaultValue={"spacing"}>
        <SpacingSetting
          vars={[
            {
              label: "Padding",
              value: p,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: ITextSetting) => (props.p = e.target.value)),
            },
            {
              label: "Margin",
              value: m,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: ITextSetting) => (props.m = e.target.value)),
            },
          ]}
        />
        <DimensionSetting
          vars={[
            {
              label: "Width",
              value: width,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: ITextSetting) => (props.w = e.target.value)),
            },
            {
              label: "Height",
              value: height,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: ITextSetting) => (props.h = e.target.value)),
            },
          ]}
        />
      </Accordion>
    </Setting.Root>
  );
};

DText.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  related: {
    settings: TextSettings,
  },
};

DText.fallbackProps = {
  p: 8,
  width: "100%",
  height: "auto",
  text: `<span style="font-family:'Inter'">Content goes here</span>`,
};
