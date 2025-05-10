import { useNode } from "@craftjs/core";
import { IComonProps } from "~/types/common";
import Setting from "../ui/setting";
import { DimensionSetting, SpacingSetting } from "../ui/setting/commonSetting";
import { Accordion } from "@mantine/core";
import { cn } from "~/libs/utils";

interface IAppRootProps extends IComonProps, IAppRootSettingProps {}
export const AppRoot = ({ children, className, style, p, m, width, height }: IAppRootProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={cn(className, "overflow-auto")}
      style={{ ...style, padding: p, margin: m, width, height }}
    >
      {children}
    </div>
  );
};

interface IAppRootSettingProps {
  p?: number | string;
  m?: number | string;
  width?: number | string;
  height?: number | string;
}
export const AppRootSettings = () => {
  const {
    actions: { setProp },
    p,
    m,
    width,
    height,
  } = useNode((node) => ({
    p: node.data.props.p,
    m: node.data.props.m,
    width: node.data.props.width,
    height: node.data.props.height,
  }));

  return (
    <Setting.Root>
      <Accordion defaultValue={"dimension"}>
        <DimensionSetting
          vars={[
            {
              label: "width",
              value: width,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: IAppRootSettingProps) => (props.width = e.target.value)),
            },
            {
              label: "height",
              value: height,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: IAppRootSettingProps) => (props.height = e.target.value)),
            },
          ]}
        />
      </Accordion>
      <Accordion defaultValue={"spacing"}>
        <SpacingSetting
          vars={[
            {
              label: "Padding",
              value: p,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: IAppRootSettingProps) => (props.p = e.target.value)),
            },
            {
              label: "Margin",
              value: m,
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: IAppRootSettingProps) => (props.m = e.target.value)),
            },
          ]}
        />
      </Accordion>
    </Setting.Root>
  );
};

AppRoot.craft = {
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: AppRootSettings,
  },
};

AppRoot.fallbackProps = {
  width: "100%",
  height: "100%",
};
