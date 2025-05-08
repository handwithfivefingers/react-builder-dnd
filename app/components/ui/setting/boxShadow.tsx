import { Group, Select } from "@mantine/core";

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
    value: "shadow-sm",
  },
  {
    label: "Medium",
    value: "shadow-md",
  },
  {
    label: "Normal",
    value: "shadow",
  },
  {
    label: "Large",
    value: "shadow-lg",
  },
  {
    label: "Super Large",
    value: "shadow-xl",
  },
  {
    label: "Super Super Large",
    value: "shadow-2xl",
  },
];
const BoxShadow = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  return (
    <div className="flex gap-2 items-center">
      <Select
        label={"box-shadow"}
        placeholder="Choose Shadow"
        value={`${value || ""}`}
        data={variants}
        renderOption={({ option }) => (
          <Group flex="1" gap="xs">
            {option.label}
          </Group>
        )}
        onChange={(v) => onChange(v as string)}
        className="w-full"
      />
    </div>
  );
};

export { BoxShadow };
