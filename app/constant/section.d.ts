import { IComonProps } from "~/types/common";
import { ITextSetting } from "./text";

export interface ISectionSetting extends ITextSetting {
  style?: React.CSSProperties;
  position?: string;
}

export interface ISection extends ISectionSetting, IComonProps, ITextSetting {}
