import { AppRoot } from "./appRoot";
import { BASIC_COMPONENTS } from "./basic";
import { STRUCTURE_COMPONENTS } from "./structure";

export const DND_RESOLVER = {
  AppRoot,
  ...STRUCTURE_COMPONENTS,
  ...BASIC_COMPONENTS,
};
