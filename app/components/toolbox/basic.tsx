import { Element, useEditor } from "@craftjs/core";
import { LuImage } from "react-icons/lu";
import { PiSelectionBackgroundBold } from "react-icons/pi";
import { RxButton, RxTextAlignLeft } from "react-icons/rx";
import { DBackgroundImage } from "../backgroundImage";
import { DButton } from "../button";
import { DImage } from "../image";
import { DText } from "../text";
import { CardButton } from "./_component";
import { D_Div } from "../basic/divBlock";
import { TbNewSection } from "react-icons/tb";
import { MdSmartButton } from "react-icons/md";

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
    label: "Div",
    icon: <TbNewSection size={24} />,
    component: D_Div,
    children: `DivBlock`,
    canvas: true,
  },
  {
    label: "Button",
    icon: <MdSmartButton size={24} />,
    component: DButton,
    children: `Hello button`,
  },
  {
    label: "Text",
    icon: <RxTextAlignLeft size={24} />,
    component: DText,
    children: `Text`,
  },
  {
    label: "Image",
    icon: <LuImage size={24} />,
    component: DImage,
    children: `Image`,
  },
  {
    label: "Background Image",
    icon: <PiSelectionBackgroundBold size={24} />,
    component: DBackgroundImage,
    canvas: true,
  },
];
export const BasicComponent = () => {
  const { connectors } = useEditor();
  return (
    <div className="flex gap-2 flex-col bg-neutral-100 p-1 rounded shadow">
      <div className="rounded flex gap-2 flex-wrap w-full">
        {LIST_AVAILABLE_COMPONENTS?.map((item, i: number) => {
          return (
            <CardButton
              key={`BasicComponent-${item.label}-${i}`}
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
