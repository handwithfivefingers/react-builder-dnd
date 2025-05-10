import { AppRoot } from "./appRoot";
import { DBackgroundImage } from "./backgroundImage";
import { BASIC_COMPONENTS } from "./basic";
import { DButton } from "./button";
import { DColumn } from "./column";
import { DContainer } from "./container";
import { DImage } from "./image";
import { DRow } from "./row";
import { STRUCTURE_COMPONENTS } from "./structure";
import { DText } from "./text";

export const DND_RESOLVER = {
  AppRoot,
  DButton,
  DText,
  DContainer,
  DRow,
  DColumn,
  DImage,
  DBackgroundImage,
  ...STRUCTURE_COMPONENTS,
  ...BASIC_COMPONENTS,
};
