import clsx from "clsx";

type IClassProps = string | Record<string, boolean> | undefined;
export const cn = (...args: IClassProps[]) => clsx(args);
