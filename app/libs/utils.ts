import clsx from "clsx";

type IClassProps = string | Record<string, boolean> | undefined;

interface IProperties {
  propsName: string;
  value: string | number;
  suffix?: string;
}
interface ISetProperty {
  props: { style: Record<string, string | number> };
  value: string | number;
  propsName: string;
  screen?: string;
  suffix?: string;
}

interface IGetProperty extends Omit<ISetProperty, "props" | "value"> {}

export const cn = (...args: IClassProps[]) => clsx(args);

export const generateProperty = ({ propsName, value, suffix = "size" }: IProperties) => {
  return {
    [`--${propsName}-${suffix}`]: value, // Mobile
    [`--sm-${propsName}-${suffix}`]: value, // Tablet
    [`--md-${propsName}-${suffix}`]: value, // Desktop
    // [`--lg-${propsName}-${suffix}`]: value,
  };
};

export const getProperty = ({ propsName, screen, suffix = "size" }: IGetProperty) => {
  if (!screen) {
    return `--${propsName}-${suffix}`;
  } else {
    return `--${screen}-${propsName}-${suffix}`;
  }
};

export const setProperty = ({ props, propsName, value, screen, suffix = "size" }: ISetProperty) => {
  const isContainMediumScreen = props.style[`--md-${propsName}-${suffix}`];
  const isContainSmallScreen = props.style[`--sm-${propsName}-${suffix}`];
  if (!screen) {
    props.style[`--${propsName}-${suffix}`] = value;
    props.style[`--lg-${propsName}-${suffix}`] = value;
    if (!isContainSmallScreen) props.style[`--sm-${propsName}-${suffix}`] = value;
    if (!isContainMediumScreen) props.style[`--md-${propsName}-${suffix}`] = value;
    return;
  } else {
    props.style[`--${screen}-${propsName}-${suffix}`] = value;
    if (screen === "lg") {
      if (!isContainSmallScreen) props.style[`--sm-${propsName}-${suffix}`] = value;
      if (!isContainMediumScreen) props.style[`--md-${propsName}-${suffix}`] = value;
    }
    return;
  }
};
