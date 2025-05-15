export type PositionKey = "position" | "top" | "left" | "right" | "bottom" | "z-index";
export interface IPositionProperty {
  value: string;
  onChange: (v: string, key: PositionKey) => void;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  zIndex?: string;
  position: string;
}

export type OnChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type Style = Record<string, string>;
