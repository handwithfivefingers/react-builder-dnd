export interface ITextSetting {
  p?: number | string;
  text: string;
  bg?: string;
  m?: string | number;
  w?: string | number;
  h?: string | number;
}

export interface IText extends ITextSetting {
  children?: React.ReactNode;
}
