import { ColorPicker, Text } from "@mantine/core";

export interface ISetting {
  children: React.ReactNode;
  label: string;
}
export interface ISettingItem {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  label: string;
}
export interface ISettingSelect extends Omit<ISettingItem, "onChange"> {
  options: string[];
  onChange: (v: string | null) => void;
}
const Background = ({ value, onChange, label }: { label?: string; value: string; onChange: (v: string) => void }) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <Text>{label || "Color"}</Text>
      <div className="flex w-full border border-neutral-400 rounded-md px-2 py-2 ">
        <ColorPicker
          className="w-full px-2"
          format="rgba"
          value={value}
          onChange={onChange}
          swatches={[
            "#2e2e2e",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
        />
      </div>
    </div>
  );
};

export { Background };
