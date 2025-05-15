import { Accordion } from "@mantine/core";
import Setting from ".";
import { getProperty, setProperty } from "~/libs/utils";
import { ISettingScreen } from "~/types/setting";

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
type Style = Record<string, string>;

export const DimensionSetting = ({ style, setProp, screen }: ISettingScreen) => {
  return (
    <Accordion.Item value="dimension">
      <Accordion.Control className="text-sm">Size</Accordion.Control>
      <Accordion.Panel>
        <Setting.TextField
          label={"width"}
          value={style[getProperty({ propsName: "width", screen })]}
          onChange={(e: OnChangeEvent) =>
            setProp((props: { style: Style }) =>
              setProperty({ props, propsName: "width", value: e.target.value, screen })
            )
          }
        />
        <Setting.TextField
          label={"height"}
          value={style[getProperty({ propsName: "height", screen })]}
          onChange={(e: OnChangeEvent) => {
            console.log("e", e.target.value);
            setProp((props: { style: Style }) =>
              setProperty({ props, propsName: "height", value: e.target.value, screen })
            );
          }}
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
};
