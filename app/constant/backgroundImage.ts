export interface IBgImgSetting {
  src?: string;
  w?: number | string;
  maw?: number | string;
  radius?: string;
  boxShadow?: string;
}
export interface IBackgroundImage extends IBgImgSetting {
  children?: React.ReactNode;
}
