export interface ISetting {
  children: React.ReactNode;
  label?: string;
}
export interface ISettingItem {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  label?: string;
}
export interface ISettingSelect extends Omit<ISettingItem, "onChange"> {
  options: string[] | { label: string; value: string }[];
  onChange: (v: string | null) => void;
}
