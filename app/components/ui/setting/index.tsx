import { InputLabel, Select, Tabs, TextInput } from "@mantine/core";
import { FaDesktop, FaMobile, FaTablet } from "react-icons/fa";
import { ISetting, ISettingItem, ISettingSelect } from "~/types/setting";

const Root = ({ children, label }: ISetting) => {
  return (
    <div className="flex gap-2 flex-col w-full">
      <InputLabel size="small">{label || "Property"}</InputLabel>
      <div className="flex gap-2 flex-col">
        <Tabs defaultValue="desktop">
          <Tabs.List justify="center">
            <Tabs.Tab value="desktop" leftSection={<FaDesktop size={12} />}></Tabs.Tab>
            <Tabs.Tab value="tablet" leftSection={<FaTablet size={12} />}></Tabs.Tab>
            <Tabs.Tab value="phone" leftSection={<FaMobile size={12} />}></Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="desktop">{children}</Tabs.Panel>
          <Tabs.Panel value="tablet">Messages tab content</Tabs.Panel>
          <Tabs.Panel value="phone">Settings tab content</Tabs.Panel>
        </Tabs>
      </div>
    </div>
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
