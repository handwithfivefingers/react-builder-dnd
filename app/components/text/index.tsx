/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node, useEditor, useNode } from "@craftjs/core";
import { useEffect, useState } from "react";
import { DEditor } from "../editor";
import Setting from "../ui/setting";

interface IText {
  p?: number | string;
  text: string;
}
export const DText = ({ text, p }: IText) => {
  const {
    connectors: { connect, drag },
    hasSelectedNode,
    // hasDraggedNode,
    actions: { setProp },
    // ...rest
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
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
      className="relative"
    >
      {!editable ? (
        <div dangerouslySetInnerHTML={{ __html: text }} style={{ padding: p }} />
      ) : (
        <DEditor content={text} onSave={onSave} onCancel={onCancel} />
      )}
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    p,
  } = useNode((node) => ({
    p: node.data.props.p,
  }));

  return (
    <Setting.Root label="Setting">
      <Setting.TextField
        label="padding"
        value={p}
        onChange={(e) => setProp((props: any) => (props.p = e.target.value))}
      />
    </Setting.Root>
  );
};

DText.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  props: {
    text: "Input here",
    padding: "0px 0px 0px 0px",
  },
  related: {
    settings: TextSettings,
  },
};
