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
    value: "0px",
  },
  {
    label: "Small",
    value: "0.125rem",
  },
  {
    label: "Normal",
    value: "0.25rem",
  },
  {
    label: "Medium",
    value: "0.375rem",
  },
  {
    label: "Large",
    value: "0.5rem",
  },
  {
    label: "Super large ",
    value: "0.75rem",
  },
  {
    label: "Ultra large",
    value: "1rem",
  },
  {
    label: "Full",
    value: "9999px",
  },
];
const BorderRadiusProperty = ({ style, setProp, screen }: ISettingScreen) => {
  return (
    <Accordion.Item value="radius">
      <Accordion.Control className="text-sm">Border Radius</Accordion.Control>
      <Accordion.Panel>
        <div className="flex gap-2 items-center">
          <Select
            label={"box-shadow"}
            placeholder="Choose Shadow"
            value={style[getProperty({ propsName: "borderRadius", screen, suffix: "property" })]}
            data={variants}
            renderOption={({ option }) => (
              <Group flex="1" gap="xs">
                {option.label}
              </Group>
            )}
            onChange={(e: string | null) =>
              setProp((props: { style: Style }) =>
                setProperty({ props, propsName: "borderRadius", value: e as string, screen, suffix: "property" })
              )
            }
            className="w-full"
          />
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export { BorderRadiusProperty };
