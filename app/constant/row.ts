export interface IDRow {
  children?: React.ReactNode;
  column: number | string;
  rowSpan: number | string;
  gutter?: number | string;
  p?: number | string;
}

export const COLUMN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => `${item}`);
