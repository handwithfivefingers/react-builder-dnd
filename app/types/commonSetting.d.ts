import { IFlexConfig } from "../components/ui/setting/display";

export interface TextFieldVar {
  label: string;
  value: string;
  callback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface OptionFieldVar {
  label: string;
  value: string;
  callback: (event: string) => void;
  options: { label: string; value: string }[];
}
export interface IDimensionSetting<T> {
  vars: T[];
}
export interface IBackgroundSetting {
  vars: {
    label: string;
    value: string;
    callback: (event: string) => void;
  }[];
}
export interface LayoutSettingProps {
  flexOption: IFlexConfig;
  value: string;
  onChange: (event: string) => void;
  children?: React.ReactNode;
}
