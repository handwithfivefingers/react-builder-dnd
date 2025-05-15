export interface ISetting {
  label?: string;
  setProp: (callback: (props: { style: Style }) => void) => void;
  style: Record<string, string>;
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

export interface ISettingScreen extends Omit<ISetting, "label"> {
  screen: string;
  grid?: boolean;
}
