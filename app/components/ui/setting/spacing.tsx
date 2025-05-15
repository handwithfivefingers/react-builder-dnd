import { Accordion } from "@mantine/core";
import Setting from ".";
import { getProperty, setProperty } from "~/libs/utils";

type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
type Style = Record<string, string>;

export const SpacingSetting = ({ style, setProp, screen }: any) => {
  return (
    <Accordion.Item value="spacing">
      <Accordion.Control className="text-sm">Spacing</Accordion.Control>
      <Accordion.Panel>
        <Setting.TextField
          label={"padding"}
          value={style[getProperty({ propsName: "padding", screen })]}
          onChange={(e: OnChangeEvent) =>
            setProp((props: { style: Style }) =>
              setProperty({ props, propsName: "padding", value: e.target.value, screen })
            )
          }
        />
        <Setting.TextField
          label={"margin"}
          value={style[getProperty({ propsName: "margin", screen })]}
          onChange={(e: OnChangeEvent) =>
            setProp((props: { style: Style }) =>
              setProperty({ props, propsName: "margin", value: e.target.value, screen })
            )
          }
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
};
