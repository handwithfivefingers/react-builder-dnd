// components/Toolbox.js
import { Accordion, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { VscSymbolStructure } from "react-icons/vsc";
import { BasicComponent } from "./basic";
import { StructureComponent } from "./structure";

interface ITab {
  label: string;
  element?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
}

const TABS: ITab[] = [
  {
    label: "Structure",
    icon: <VscSymbolStructure size={24} />,
    element: <StructureComponent />,
  },
  {
    label: "Basic",
    icon: <VscSymbolStructure size={24} />,
    element: <BasicComponent />,
  },
];

export const ToolboxTabs = () => {
  const [tab, setTab] = useState<ITab | null>(null);
  return (
    <div className="flex w-full h-full ">
      <div className="bg-white w-12 flex flex-col flex-shrink-0">
        {TABS?.map((item, i: number) => {
          const { label, icon } = item;
          return (
            <Tooltip label={label} key={`${label}-${i}`} position="right" withArrow>
              <button
                key={`${label}-${i}`}
                onClick={() => setTab(item)}
                aria-label={label}
                className="p-1 border-b relative flex justify-center items-center hover:bg-slate-100/80 transition-all w-full"
              >
                <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">{icon}</span>
                <span className="w-full pb-[100%]" />
              </button>
            </Tooltip>
          );
        })}
      </div>

      <div className="flex w-full h-full flex-col bg-white border-l">
        <div>{tab?.element}</div>
      </div>
    </div>
  );
};

export const Toolbox = () => {
  return (
    <Accordion defaultValue="Structure">
      {TABS?.map((item, i: number) => {
        return (
          <Accordion.Item key={item.label + i} value={item.label}>
            <Accordion.Control>{item.label}</Accordion.Control>
            <Accordion.Panel>{item.element}</Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
