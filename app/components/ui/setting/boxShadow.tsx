import { Accordion, Group, Select } from "@mantine/core";
import { getProperty, setProperty } from "~/libs/utils";
import { ISettingScreen } from "~/types/setting";
import { Style } from "./setting";

export interface ISetting {
  children: React.ReactNode;
  label: string;
}
export interface ISettingItem {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  label: string;
}
export interface ISettingSelect extends Omit<ISettingItem, "onChange"> {
  options: string[];
  onChange: (v: string | null) => void;
}
const variants = [
  {
    label: "none",
    value: "none",
  },
  {
    label: "Small",
    value: "0 1px 2px 0 rgb(0 0 0 / 0.05);",
  },
  {
    label: "Normal",
    value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
  },
  {
    label: "Medium",
    value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  {
    label: "Large",
    value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  {
    label: "Super Large",
    value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  {
    label: "Ultra Large",
    value: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
  {
    label: "Inner",
    value: " inset 0 2px 4px 0 rgb(0 0 0 / 0.05);",
  },
];
const BoxShadowProperty = ({ style, setProp, screen }: ISettingScreen) => {
  return (
    <Accordion.Item value="Shadow">
      <Accordion.Control className="text-sm">Shadow</Accordion.Control>
      <Accordion.Panel>
        <div className="flex gap-2 items-center">
          <Select
            label={"box-shadow"}
            placeholder="Choose Shadow"
            value={style[getProperty({ propsName: "boxShadow", screen, suffix: "property" })]}
            data={variants}
            renderOption={({ option }) => (
              <Group flex="1" gap="xs">
                {option.label}
              </Group>
            )}
            onChange={(e: string | null) =>
              setProp((props: { style: Style }) =>
                setProperty({ props, propsName: "boxShadow", value: e as string, screen, suffix: "property" })
              )
            }
            className="w-full"
          />
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export { BoxShadowProperty };
