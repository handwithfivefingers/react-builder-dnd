import { Accordion } from "@mantine/core";
import Setting from ".";
import { Background } from "./background";
import { Display, IFlexConfig } from "./display";
import { IPositionProperty, PositionProperty } from "./position";

interface TextFieldVar {
  label: string;
  value: string;
  callback: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface OptionFieldVar {
  label: string;
  value: string;
  callback: (event: string) => void;
  options: { label: string; value: string }[];
}
export interface IDimensionSetting {
  vars: TextFieldVar[] | OptionFieldVar[];
}
export interface IBackgroundSetting {
  vars: {
    label: string;
    value: string;
    callback: (event: string) => void;
  }[];
}
export interface LayoutSettingProps {
  flexOption: IFlexConfig;
  value: string;
  onChange: (event: string) => void;
  children?: React.ReactNode;
}

export const SpacingSetting = ({ vars }: IDimensionSetting) => {
  return (
    <Accordion.Item value="spacing">
      <Accordion.Control>Spacing</Accordion.Control>
      <Accordion.Panel>
        {vars?.map((item, i) => {
          const key = `${item.label}-${i}`;
          if (!("options" in item)) {
            // item is TextFieldVar
            return <Setting.TextField key={key} label={item.label} value={item.value} onChange={item.callback} />;
          } else {
            // item is OptionFieldVar, adapt callback for TextField
            const adaptedCallback = (event: React.ChangeEvent<HTMLInputElement>) => {
              item.callback(event.target.value);
            };
            return <Setting.TextField key={key} label={item.label} value={item.value} onChange={adaptedCallback} />;
          }
        })}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
export const DimensionSetting = ({ height, width, setProp }: any) => {
  return (
    <Accordion.Item value="dimension">
      <Accordion.Control>Size</Accordion.Control>
      <Accordion.Panel>
        <Setting.TextField
          label={"width"}
          value={width}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProp((props: { style: Record<string, string> }) => (props.style["--width-size"] = e.target.value))
          }
        />
        <Setting.TextField
          label={"height"}
          value={height}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProp((props: { style: Record<string, string> }) => (props.style["--height-size"] = e.target.value))
          }
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
};
export const PositionSetting = (props: IPositionProperty) => {
  return (
    <Accordion.Item value="position">
      <Accordion.Control>Position</Accordion.Control>
      <Accordion.Panel>
        <PositionProperty {...props} />
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export const ColorSetting = ({ vars }: IBackgroundSetting) => {
  return (
    <Accordion.Item value="color">
      <Accordion.Control>Color</Accordion.Control>
      <Accordion.Panel>
        {vars?.map((item, i) => {
          const key = `${item.label}-${i}`; // Common properties are safe to access
          return <Background key={key} {...item} onChange={(v: string) => item.callback(v)} />;
        })}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export const LayoutSetting = (props: LayoutSettingProps) => {
  return (
    <Accordion.Item value="layout">
      <Accordion.Control>Layout</Accordion.Control>
      <Accordion.Panel>
        <Display value={props.value} onChange={props?.onChange} flexOption={props.flexOption} />
        {props?.children}
      </Accordion.Panel>
    </Accordion.Item>
  );
};
