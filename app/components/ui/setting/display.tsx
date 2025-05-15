import { Accordion, Group, InputLabel, NumberInput, Select, TextInput, ThemeIcon } from "@mantine/core";
import { LiaLongArrowAltDownSolid, LiaLongArrowAltRightSolid } from "react-icons/lia";
import {
  LuAlignHorizontalJustifyCenter,
  LuAlignHorizontalJustifyEnd,
  LuAlignHorizontalJustifyStart,
  LuAlignHorizontalSpaceAround,
  LuAlignVerticalJustifyCenter,
  LuAlignVerticalJustifyEnd,
} from "react-icons/lu";
import { getProperty, setProperty } from "~/libs/utils";
import { ISettingScreen } from "~/types/setting";
import { Style } from "./setting";
import { LuAlignVerticalJustifyStart } from "react-icons/lu";

export interface IFlexConfig {
  alignment: string;
  justify: string;
  gap: string;
  direction: string;
  callback: (v: string, key: string) => void;
}
const variants = ["block", "inline-block", "inline", "flex", "grid", "inline-flex", "hidden"];

const FlexConfig = ({ style, setProp, screen }: ISettingScreen) => {
  const alignment = style[`--${screen}-align-items-property`];
  const justify = style[`--${screen}-justify-content-property`];
  const gap = style[`--${screen}-gap-property`];
  const direction = style[`--${screen}-flexDirection-property`];
  const display = style[`--${screen}-display-property`];
  const callback = (v: string, key: string) =>
    setProp((props: { style: Style }) => setProperty({ props, propsName: key, value: v, screen, suffix: "property" }));
  return (
    <div className="grid grid-cols-2 gap-1 items-start justify-start">
      <div className="col-span-2 ">
        <FlexDirection value={direction} callback={callback} />
      </div>
      <div className="col-span-2">
        <FlexJustify value={justify} callback={callback} />
      </div>
      <div className="col-span-2">
        <FlexAligment value={alignment} callback={callback} />
      </div>
      <div className="col-span-1">
        <TextInput
          label={"gutter"}
          size="xs"
          value={gap}
          onChange={(e) =>
            setProp((props: { style: Style }) =>
              setProperty({ props, propsName: "gap", value: e.target.value, screen, suffix: "property" })
            )
          }
          className="w-full"
        />
      </div>
    </div>
  );
};

const GridProperty = ({ style, setProp, screen }: ISettingScreen) => {
  const colSpan = style[`--${screen}-colSpan-property`];
  const grid = style[`--${screen}-grid-property`];
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      {/* <NumberInput
        className="w-full"
        label="column"
        size="xs"
        value={colSpan}
        onChange={(v) => setProp((props: { style: Style }) => setProperty({ props, propsName: "column", value: v }))}
      /> */}
      <NumberInput
        className="w-full"
        label="grid"
        size="xs"
        value={grid}
        onChange={(v) =>
          setProp((props: { style: Style }) =>
            setProperty({ props, propsName: "grid", value: v, screen, suffix: "property" })
          )
        }
      />
    </div>
  );
};
const FlexDirection = ({ value, callback }: { value: string; callback: (v: string, key: string) => void }) => {
  return (
    <div className="flex flex-col py-1 flex-shrink-0 flex-1">
      <InputLabel className="w-full text-xs" size="xs">
        Direction
      </InputLabel>
      <div className="flex justify-start gap-2 p-1 rounded bg-slate-100">
        <ThemeIcon onClick={() => callback("row", "flexDirection")} variant={value === "row" ? "" : "light"}>
          <LiaLongArrowAltRightSolid />
        </ThemeIcon>
        <ThemeIcon onClick={() => callback("column", "flexDirection")} variant={value === "column" ? "" : "light"}>
          <LiaLongArrowAltDownSolid />
        </ThemeIcon>
      </div>
    </div>
  );
};

const FlexJustify = ({ value, callback }: any) => {
  return (
    <div className=" flex flex-col py-1 flex-shrink-0">
      <InputLabel className="w-full text-xs" size="xs">
        Justify Content
      </InputLabel>
      <div className="flex gap-2 w-full p-1 rounded bg-slate-100 justify-start">
        <ThemeIcon
          onClick={() => callback("flex-start", "justify-content")}
          variant={value === "flex-start" ? "" : "light"}
        >
          <LuAlignHorizontalJustifyStart />
        </ThemeIcon>
        <ThemeIcon onClick={() => callback("center", "justify-content")} variant={value === "center" ? "" : "light"}>
          <LuAlignHorizontalJustifyCenter />
        </ThemeIcon>{" "}
        <ThemeIcon
          onClick={() => callback("flex-end", "justify-content")}
          variant={value === "flex-end" ? "" : "light"}
        >
          <LuAlignHorizontalJustifyEnd />
        </ThemeIcon>
        <ThemeIcon
          onClick={() => callback("space-between", "justify-content")}
          variant={value === "space-between" ? "" : "light"}
        >
          <LuAlignHorizontalSpaceAround />
        </ThemeIcon>
      </div>
    </div>
  );
};
const FlexAligment = ({ value, callback }: any) => {
  return (
    <div className=" flex flex-col py-1 flex-shrink-0">
      <InputLabel className="w-full text-xs" size="xs">
        Alignment
      </InputLabel>
      <div className="flex gap-2 w-full p-1 rounded bg-slate-100 justify-start">
        <ThemeIcon onClick={() => callback("start", "align-items")} variant={value === "start" ? "" : "light"}>
          <LuAlignVerticalJustifyStart />
        </ThemeIcon>
        <ThemeIcon onClick={() => callback("center", "align-items")} variant={value === "center" ? "" : "light"}>
          <LuAlignVerticalJustifyCenter />
        </ThemeIcon>{" "}
        <ThemeIcon onClick={() => callback("end", "align-items")} variant={value === "end" ? "" : "light"}>
          <LuAlignVerticalJustifyEnd />
        </ThemeIcon>
      </div>
    </div>
  );
};

const DisplayProperty = ({ style, setProp, screen }: ISettingScreen) => {
  const display = style[getProperty({ propsName: "display", screen, suffix: "property" })];
  return (
    <Accordion.Item value="display">
      <Accordion.Control className="text-sm">Display</Accordion.Control>
      <Accordion.Panel>
        <div className="flex flex-col gap-2 items-center">
          {display !== "grid" && (
            <Select
              label={"Display"}
              size="xs"
              value={display}
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
                    propsName: "display",
                    value: v as string,
                    screen,
                    suffix: "property",
                  })
                )
              }
              className="w-full"
            />
          )}
          {display === "grid" && (
            <div className="col-span-2 ">
              <GridProperty style={style} setProp={setProp} screen={screen} />
            </div>
          )}
          {["flex", "grid"].includes(display) && <FlexConfig style={style} setProp={setProp} screen={screen} />}
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export { DisplayProperty };
