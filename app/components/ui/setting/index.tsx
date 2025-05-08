import { InputLabel, Select, TextInput } from "@mantine/core";

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
const Root = ({ children, label }: ISetting) => {
  return (
    <div className="flex gap-2 flex-col w-full">
      <InputLabel size="small">{label}</InputLabel>
      <div className="flex gap-2 flex-col">{children}</div>
    </div>
  );
};

const TextField = ({ value, onChange, label }: ISettingItem) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-full">
        <TextInput label={label} value={value} placeholder="Padding value" onChange={onChange} />
      </div>
    </div>
  );
};
const SelectInput = ({ value, onChange, label, options }: ISettingSelect) => {
  return (
    <div className="flex gap-2 items-center">
      <Select
        label={label}
        placeholder="Pick value"
        value={`${value || ""}`}
        data={options}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
};
const Setting = {
  Root,
  TextField,
  SelectInput,
};
export default Setting;
