import { Accordion, Group, NumberInput, Select, TextInput } from "@mantine/core";
import { getProperty, setProperty } from "~/libs/utils";
import { ISettingScreen } from "~/types/setting";
import { OnChangeEvent } from "./setting";

export interface IFlexConfig {
  alignment: string;
  justify: string;
  gap: string;
  direction: string;
  callback: (v: string, key: string) => void;
}
const variants = ["static", "relative", "absolute", "sticky", "fixed"];

const PositionProperty = ({ setProp, style, screen }: ISettingScreen) => {
  const top = style[getProperty({ propsName: "top", screen, suffix: "property" })];
  const left = style[getProperty({ propsName: "left", screen, suffix: "property" })];
  const right = style[getProperty({ propsName: "right", screen, suffix: "property" })];
  const bottom = style[getProperty({ propsName: "bottom", screen, suffix: "property" })];
  const zIndex = style[getProperty({ propsName: "zIndex", screen, suffix: "property" })];
  const position = style[getProperty({ propsName: "position", screen, suffix: "property" })];
  const callback = ({ value, propsName }: { value: string | number; propsName: string }) => {
    setProp((prop) =>
      setProperty({
        props: prop,
        propsName,
        value,
        screen,
        suffix: "property",
      })
    );
  };

  return (
    <Accordion.Item value="position">
      <Accordion.Control className="text-sm">Position</Accordion.Control>
      <Accordion.Panel>
        <div className="flex flex-col gap-2 items-center">
          <Select
            label={"position"}
            size="xs"
            value={position}
            data={variants}
            renderOption={({ option }) => (
              <Group flex="1" gap="xs">
                {option.label}
              </Group>
            )}
            onChange={(v: string | null) =>
              setProp((prop) =>
                setProperty({
                  props: prop,
                  propsName: "position",
                  value: v as string,
                  screen,
                  suffix: "property",
                })
              )
            }
            className="w-full"
          />

          {position && position !== "static" && (
            <div className="grid grid-cols-2 gap-1">
              <TextInput
                label={"top"}
                size="xs"
                value={top}
                onChange={(v: OnChangeEvent) =>
                  callback({
                    propsName: "top",
                    value: v.target.value,
                  })
                }
                className="w-full"
              />
              <TextInput
                label={"left"}
                size="xs"
                value={left}
                onChange={(v: OnChangeEvent) =>
                  callback({
                    propsName: "left",
                    value: v.target.value,
                  })
                }
                className="w-full"
              />
              <TextInput
                label={"right"}
                size="xs"
                value={right}
                onChange={(v: OnChangeEvent) =>
                  callback({
                    propsName: "right",
                    value: v.target.value,
                  })
                }
                className="w-full"
              />
              <TextInput
                label={"bottom"}
                size="xs"
                value={bottom}
                onChange={(v: OnChangeEvent) =>
                  callback({
                    propsName: "bottom",
                    value: v.target.value,
                  })
                }
                className="w-full"
              />
              <NumberInput
                label={"zIndex"}
                size="xs"
                value={zIndex}
                onChange={(v) =>
                  callback({
                    propsName: "zIndex",
                    value: v as number,
                  })
                }
                className="w-full"
              />
            </div>
          )}
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export { PositionProperty };
