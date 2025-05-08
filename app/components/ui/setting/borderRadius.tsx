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
    value: "rounded-sm",
  },
  {
    label: "Medium",
    value: "rounded-md",
  },
  {
    label: "Normal",
    value: "rounded",
  },
  {
    label: "Large",
    value: "rounded-lg",
  },
  {
    label: "Extra ",
    value: "rounded-xl",
  },
  {
    label: "Super Extra",
    value: "rounded-2xl",
  },
  {
    label: "Full",
    value: "rounded-full",
  },
];
const BorderRadius = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  return (
    <div className="flex gap-2 items-center">
      <Select
        label={"border-radius"}
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

export { BorderRadius };
