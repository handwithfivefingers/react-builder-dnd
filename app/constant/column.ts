export interface IDColumnSetting {
  p?: number | string;
  colSpan?: string;
  borderRadius?: string;
  display?: string;
  alignment?: string;
  justify?: string;
  gap?: string;
}

export interface IDColumn extends IDColumnSetting {
  children?: React.ReactNode;
}
