import { useNode } from "@craftjs/core";
import { cn, generateProperty } from "~/libs/utils";
import { IComonProps } from "~/types/common";
import Setting from "../ui/setting";
import styles from "./styles.module.scss";

interface IAppRootProps extends IAppRootSettingProps, Omit<IComonProps, "style"> {}
export const AppRoot = ({ children, className, style }: IAppRootProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div className={styles.appContainer}>
      <div
        ref={(ref: HTMLDivElement) => connect(drag(ref))}
        className={cn(className, styles.appRoot, "overflow-auto")}
        style={style}
      >
        {children}
      </div>
    </div>
  );
};

interface IAppRootSettingProps {
  style: Record<string, string | number>;
}
export const AppRootSettings = () => {
  const {
    actions: { setProp },
    style,
  } = useNode((node) => ({
    style: node.data.props.style,
    custom: node.data.custom,
  }));

  return <Setting.Root setProp={setProp} style={style} />;
};

AppRoot.craft = {
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: AppRootSettings,
  },
  custom: {
    smEditable: false,
    mdEditable: false,
    lgEditable: false,
  },
};

AppRoot.fallbackProps = {
  style: {
    ...generateProperty({
      propsName: "width",
      value: "100%",
    }),
    ...generateProperty({
      propsName: "height",
      value: "100%",
    }),
    ...generateProperty({
      propsName: "background",
      value: "#fff",
      suffix: "property",
    }),
    ...generateProperty({
      propsName: "display",
      value: "block",
      suffix: "property",
    }),
  },
  custom: {
    smEditable: false,
    mdEditable: false,
    lgEditable: false,
  },
};
