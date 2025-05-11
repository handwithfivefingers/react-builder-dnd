import clsx from "clsx";

type IClassProps = string | Record<string, boolean> | undefined;
export const cn = (...args: IClassProps[]) => clsx(args);

export const generateProperty = (propsName: string, value: string | number) => {
  return {
    [`--${propsName}-size`]: value,
    [`--sm-${propsName}-size`]: value,
    [`--md-${propsName}-size`]: value,
    [`--lg-${propsName}-size`]: value,
  };
};
