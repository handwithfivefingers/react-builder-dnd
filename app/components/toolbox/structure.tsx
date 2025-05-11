import { Element, useEditor } from "@craftjs/core";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { RxButton, RxContainer } from "react-icons/rx";
import { DRow } from "../structure/row";
import { DSection } from "../structure/section";
import { CardButton } from "./_component";
import { DContainer } from "../structure/container";

interface IAvailableComponent {
  label: string;
  icon: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.FC<any> & { fallbackProps?: any };
  children?: React.ReactNode;
  canvas?: boolean;
}
const LIST_AVAILABLE_COMPONENTS: IAvailableComponent[] = [
  {
    label: "Container",
    icon: <RxContainer size={24} />,
    component: DContainer,
    canvas: true,
    children: `Hello button`,
  },
  {
    label: "Row",
    icon: <LuLayoutDashboard size={24} />,
    canvas: true,
    component: DRow,
  },
  {
    label: "Section",
    icon: <RxButton size={24} />,
    canvas: true,
    component: DSection,
  },
];
export const StructureComponent = () => {
  const { connectors } = useEditor();
  return (
    <div className="flex gap-2 flex-col bg-neutral-100 p-1 rounded shadow">
      <div className="rounded flex gap-2 flex-wrap w-full">
        {LIST_AVAILABLE_COMPONENTS?.map((item, i: number) => {
          return (
            <CardButton
              key={`StructureComponent-${item.label}-${i}`}
              icon={item.icon}
              ref={(ref: HTMLDivElement) =>
                connectors.create(
                  ref,
                  <Element is={item.component} canvas={item?.canvas || false} {...item.component.fallbackProps}>
                    {item?.children}
                  </Element>
                )
              }
            >
              {item.label}
            </CardButton>
          );
        })}
      </div>
    </div>
  );
};
