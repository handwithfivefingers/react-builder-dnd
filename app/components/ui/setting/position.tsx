import { Group, InputLabel, NumberInput, Select, TextInput, ThemeIcon } from "@mantine/core";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import { LuAlignHorizontalJustifyCenter } from "react-icons/lu";
import { LuAlignHorizontalJustifyEnd } from "react-icons/lu";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import { TbTextWrap } from "react-icons/tb";
import { LuAlignHorizontalSpaceAround } from "react-icons/lu";

export interface IFlexConfig {
  alignment: string;
  justify: string;
  gap: string;
  direction: string;
  callback: (v: string, key: string) => void;
}
const variants = ["static", "relative", "absolute", "sticky", "fixed"];
const ALIGNMENT_OPTIONS = ["items-start", "items-end", "items-center", "items-baseline", "items-stretch"];
const JUSTFITY_OPTIONS = [
  "justify-normal",
  "justify-start",
  "justify-end",
  "justify-center",
  "justify-between",
  "justify-around",
  "justify-evenly",
  "justify-stretch",
];
const GUTTER_OPTIONS = Array.from({ length: 20 }, (_, i) => `${i + 1}px`);

const FlexConfig = ({ alignment, justify, gap, direction, callback }: IFlexConfig) => {
  return (
    <div className="grid grid-cols-2 gap-1">
      <Select
        label={"align-items"}
        size="xs"
        value={alignment}
        data={ALIGNMENT_OPTIONS}
        renderOption={({ option }) => (
          <Group flex="1" gap="xs">
            {option.label}
          </Group>
        )}
        onChange={(v) => callback(v as string, "alignment")}
        className="w-full"
      />
      <Select
        label={"justify-items"}
        size="xs"
        value={justify}
        data={JUSTFITY_OPTIONS}
        renderOption={({ option }) => (
          <Group flex="1" gap="xs">
            {option.label}
          </Group>
        )}
        onChange={(v) => callback(v as string, "justify")}
        className="w-full"
      />
      <Select
        label={"gutter"}
        size="xs"
        value={gap}
        data={GUTTER_OPTIONS}
        renderOption={({ option }) => (
          <Group flex="1" gap="xs">
            {option.label}
          </Group>
        )}
        onChange={(v) => callback(v as string, "gap")}
        className="w-full"
      />
      <Select
        label={"Direction"}
        size="xs"
        value={direction}
        data={[
          { label: "Row", value: "row" },
          { label: "Column", value: "column" },
        ]}
        renderOption={({ option }) => (
          <Group flex="1" gap="xs">
            {option.label}
          </Group>
        )}
        onChange={(v) => callback(v as string, "direction")}
        className="w-full"
      />
    </div>
  );
};

const FlexDirection = ({ value, callback }: any) => {
  return (
    <div className="flex flex-col py-1 flex-shrink-0 flex-1">
      <InputLabel className="w-full text-xs" size="xs">
        Direction
      </InputLabel>
      <div className="flex justify-center gap-2 p-1 rounded bg-slate-100">
        <ThemeIcon onClick={() => callback("flex-row")} variant={value === "flex-row" ? "" : "light"}>
          <LiaLongArrowAltDownSolid />
        </ThemeIcon>
        <ThemeIcon onClick={() => callback("flex-col")} variant={value === "flex-col" ? "" : "light"}>
          <LiaLongArrowAltRightSolid />
        </ThemeIcon>
        <ThemeIcon
          onClick={() => callback("flex-row flex-wrap")}
          variant={value === "flex-row flex-wrap" ? "" : "light"}
        >
          <TbTextWrap />
        </ThemeIcon>
      </div>
    </div>
  );
};

const FlexJustify = ({ value, callback }: any) => {
  return (
    <div className=" flex flex-col py-1 flex-shrink-0">
      <InputLabel className="w-full text-xs" size="xs">
        Alignment
      </InputLabel>
      <div className="flex gap-2 w-full p-1 rounded bg-slate-100 justify-center">
        <ThemeIcon onClick={() => callback("justify-start")} variant={value === "justify-start" ? "" : "light"}>
          <LuAlignHorizontalJustifyStart />
        </ThemeIcon>
        <ThemeIcon onClick={() => callback("justify-center")} variant={value === "justify-center" ? "" : "light"}>
          <LuAlignHorizontalJustifyEnd />
        </ThemeIcon>{" "}
        <ThemeIcon onClick={() => callback("justify-end")} variant={value === "justify-end" ? "" : "light"}>
          <LuAlignHorizontalJustifyCenter />
        </ThemeIcon>
        <ThemeIcon onClick={() => callback("justify-between")} variant={value === "justify-between" ? "" : "light"}>
          <LuAlignHorizontalSpaceAround />
        </ThemeIcon>
      </div>
    </div>
  );
};
const FlexGap = ({ value, callback }: any) => {
  return (
    <Select
      label={"gutter"}
      size="xs"
      value={value}
      data={GUTTER_OPTIONS}
      renderOption={({ option }) => (
        <Group flex="1" gap="xs">
          {option.label}
        </Group>
      )}
      onChange={(v) => callback(v)}
      className="w-full"
    />
  );
};

export type PositionKey = "position" | "top" | "left" | "right" | "bottom" | "z-index";
export interface IPositionProperty {
  value: string;
  onChange: (v: string, key: PositionKey) => void;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: string;
}
const PositionProperty = ({ value, onChange, top, left, right, bottom, zIndex }: IPositionProperty) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Select
        label={"position"}
        size="xs"
        value={`${value || ""}`}
        data={variants}
        renderOption={({ option }) => (
          <Group flex="1" gap="xs">
            {option.label}
          </Group>
        )}
        onChange={(v) => onChange(v as string, "position")}
        className="w-full"
      />
      <div className="grid grid-cols-2 gap-1">
        <TextInput
          label={"top"}
          size="xs"
          value={top}
          onChange={(e) => onChange(e.target.value, "top")}
          className="w-full"
        />
        <TextInput
          label={"left"}
          size="xs"
          value={left}
          onChange={(e) => onChange(e.target.value, "left")}
          className="w-full"
        />
        <TextInput
          label={"right"}
          size="xs"
          value={right}
          onChange={(e) => onChange(e.target.value, "right")}
          className="w-full"
        />
        <TextInput
          label={"bottom"}
          size="xs"
          value={bottom}
          onChange={(e) => onChange(e.target.value, "bottom")}
          className="w-full"
        />
        <NumberInput
          label={"z-index"}
          size="xs"
          value={zIndex}
          onChange={(v) => onChange(v as string, "z-index")}
          className="w-full"
        />
      </div>
    </div>
  );
};

PositionProperty.FlexDirection = FlexDirection;
PositionProperty.FlexConfig = FlexConfig;
PositionProperty.FlexJustify = FlexJustify;
PositionProperty.FlexGap = FlexGap;
export { PositionProperty };
