/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
// components/user/Container.js
import { Node, useNode } from "@craftjs/core";
import { Image } from "@mantine/core";
import { IImages, ISettingProps } from "~/constant/image";
import Setting from "~/components/ui/setting";
import { BoxShadow } from "~/components/ui/setting/boxShadow";

export const DImage = ({
  src = "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png",
  boxShadow,
}: IImages) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return <Image radius="md" src={src} ref={(ref: HTMLImageElement) => connect(drag(ref))} className={`${boxShadow}`} />;
};

export const ImageSetting = () => {
  const {
    actions: { setProp },
    src,
    boxShadow,
  } = useNode((node) => ({
    src: node.data.props.src,
    boxShadow: node.data.props.boxShadow,
  }));

  return (
    <Setting.Root label="Setting">
      <Setting.TextField
        label="source"
        value={src}
        onChange={(e) => setProp((props: ISettingProps) => (props.src = e.target.value))}
      />
      <BoxShadow value={boxShadow} onChange={(e: string) => setProp((props: any) => (props.boxShadow = e))} />
      {/* <Background value={bg} onChange={(e: string) => setProp((props: any) => (props.bg = e))} /> */}
    </Setting.Root>
  );
};

DImage.craft = {
  rules: {
    canDrag: (node: Node) => node.data.props.text != "Drag",
  },
  related: {
    settings: ImageSetting,
  },
};
