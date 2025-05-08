import { useNode } from "@craftjs/core";
import { IComonProps } from "~/types/common";
import Setting from "../ui/setting";

interface IAppRootProps extends IComonProps, IAppRootSettingProps {}
export const AppRoot = ({ children, className, style, p, m }: IAppRootProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={className}
      style={{ ...style, padding: p, margin: m }}
    >
      {children}
    </div>
  );
};

interface IAppRootSettingProps {
  p?: number | string;
  m?: number | string;
}
export const AppRootSettings = () => {
  const {
    actions: { setProp },
    p,
    m,
  } = useNode((node) => ({
    p: node.data.props.p,
    m: node.data.props.m,
  }));

  return (
    <Setting.Root label="Setting">
      <Setting.TextField
        label="padding"
        value={p}
        onChange={(e) => setProp((props: IAppRootSettingProps) => (props.p = e.target.value))}
      />
      <Setting.TextField
        label="margin"
        value={m}
        onChange={(e) => setProp((props: IAppRootSettingProps) => (props.m = e.target.value))}
      />
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
