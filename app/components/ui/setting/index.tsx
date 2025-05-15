import { Accordion, Select, Tabs, TextInput } from "@mantine/core";
import { FaDesktop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { ISetting, ISettingItem, ISettingScreen, ISettingSelect } from "~/types/setting";
import { BoxShadowProperty } from "./boxShadow";
import { DimensionSetting } from "./dimension";
import { DisplayProperty } from "./display";
import { PositionProperty } from "./position";
import { SpacingSetting } from "./spacing";
import { BorderRadiusProperty } from "./borderRadius";

const Root = ({ label, style, setProp }: ISetting) => {
  return (
    <div className="flex gap-2 flex-col w-full">
      <div className="text-sm px-2 border-b pb-4 font-bold"> {label || "Property"}</div>

      <div className="flex gap-2 flex-col">
        <Tabs defaultValue="desktop">
          <Tabs.List justify="center">
            <Tabs.Tab value="desktop" leftSection={<FaDesktop size={12} />}></Tabs.Tab>
            <Tabs.Tab value="tablet" leftSection={<FaTabletAlt size={12} />}></Tabs.Tab>
            <Tabs.Tab value="phone" leftSection={<FaMobileAlt size={12} />}></Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="desktop">
            <SettingScreen screen={"md"} style={style} setProp={setProp} />
          </Tabs.Panel>
          <Tabs.Panel value="tablet">
            <SettingScreen screen={"sm"} style={style} setProp={setProp} />
          </Tabs.Panel>
          <Tabs.Panel value="phone">
            <SettingScreen screen={""} style={style} setProp={setProp} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

const SettingScreen = ({ style, setProp, screen }: ISettingScreen) => {
  return (
    <Accordion defaultValue={"dimension"}>
      <DimensionSetting style={style} setProp={setProp} screen={screen} />
      <SpacingSetting style={style} setProp={setProp} screen={screen} />
      <PositionProperty style={style} setProp={setProp} screen={screen} />
      <DisplayProperty style={style} setProp={setProp} screen={screen} />
      <BoxShadowProperty style={style} setProp={setProp} screen={screen} />
      <BorderRadiusProperty style={style} setProp={setProp} screen={screen} />
    </Accordion>
  );
};

const TextField = ({ value, onChange, label }: ISettingItem) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-full">
        <TextInput label={label} value={value} placeholder="Padding value" onChange={onChange} />
      </div>
    </div>
  );
};
const SelectInput = ({ value, onChange, label, options }: ISettingSelect) => {
  return (
    <div className="flex gap-2 items-center">
      <Select
        label={label}
        placeholder="Pick value"
        value={`${value || ""}`}
        data={options}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
};
const Setting = {
  Root,
  TextField,
  SelectInput,
};
export default Setting;
