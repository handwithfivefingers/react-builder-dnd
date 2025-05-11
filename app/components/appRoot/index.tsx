import { useNode } from "@craftjs/core";
import { IComonProps } from "~/types/common";
import Setting from "../ui/setting";
import { DimensionSetting, SpacingSetting } from "../ui/setting/commonSetting";
import { Accordion } from "@mantine/core";
import { cn, generateProperty } from "~/libs/utils";
import styles from "./styles.module.css";
interface IAppRootProps extends IAppRootSettingProps, Omit<IComonProps, "style"> {}

export const AppRoot = ({ children, className, style }: IAppRootProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      ref={(ref: HTMLDivElement) => connect(drag(ref))}
      className={cn(className, styles.appRoot, "overflow-auto")}
      style={style}
    >
      {children}
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
  }));

  return (
    <Setting.Root>
      <Accordion defaultValue={"dimension"}>
        <DimensionSetting
          // vars={[
          //   {
          //     label: "width",
          //     value: style["--width-size"],
          //     callback: (e: React.ChangeEvent<HTMLInputElement>) =>
          //       setProp((props: IAppRootSettingProps) => (props.style["--width-size"] = e.target.value)),
          //   },
          //   {
          //     label: "height",
          //     value: style["--height-size"],
          //     callback: (e: React.ChangeEvent<HTMLInputElement>) =>
          //       setProp((props: IAppRootSettingProps) => (props.style["--height-size"] = e.target.value)),
          //   },
          // ]}
          width={style["--width-size"]}
          height={style["--height-size"]}
          setProp={setProp}
        />
      </Accordion>
      <Accordion defaultValue={"spacing"}>
        <SpacingSetting
          vars={[
            {
              label: "Padding",
              value: style["--padding-size"],
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: IAppRootSettingProps) => (props.style["--padding-size"] = e.target.value)),
            },
            {
              label: "Margin",
              value: style["--margin-size"],
              callback: (e: React.ChangeEvent<HTMLInputElement>) =>
                setProp((props: IAppRootSettingProps) => (props.style["--margin-size"] = e.target.value)),
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
  style: {
    ...generateProperty("width", "100%"),
    ...generateProperty("height", "100%"),
    ...generateProperty("padding", "0"),
    ...generateProperty("margin", "0"),
  },
};
