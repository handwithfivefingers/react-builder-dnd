import { Editor, Element, Frame } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { Accordion, TextInput, ThemeIcon } from "@mantine/core";
import { useRef, useState } from "react";
import { FaDesktop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { AppRoot } from "~/components/appRoot";
import { SettingsPanel } from "~/components/settingPanel";
import { Toolbox } from "~/components/toolbox";
import { Topbar } from "~/components/topBar";
import { cn } from "~/libs/utils";
import { DND_RESOLVER } from "..";

export interface DNDEditorProps {
  onSave?: (contentPaser: string, title: string) => void;
  data?: string;
  title?: string;
}
export const DNDEditor = ({ onSave, data, title }: DNDEditorProps) => {
  const [t, setT] = useState(title || "New Page");
  const [w, setW] = useState("100%");
  const save = (contentParser: string) => {
    return onSave?.(contentParser, t);
  };

  const mainRef = useRef<HTMLDivElement>(null);
  return (
    <Editor
      resolver={DND_RESOLVER}
      indicator={{
        success: "#2d9d78", // green
        error: "#e34850", // red
        style: {
          // custom CSS properties1
        },
        className: "assemble", // custom CSS class
      }}
    >
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-12">
          <Topbar onSubmit={save} />
        </div>
        <div className="grid grid-cols-12 col-span-12 h-[calc(100svh-68px)]">
          <div className="col-span-3 lg:col-span-2 h-full">
            <div className="flex flex-col h-full w-full bg-white overflow-hidden">
              <div className="px-2 py-2 bg-sltae-50">
                <TextInput label="Page Title" value={t} onChange={(e) => setT(e.target.value)} />
              </div>
              <Accordion defaultValue="Component">
                <Accordion.Item key={"Component"} value={"Component"}>
                  <Accordion.Control className="bg-slate-200">Component</Accordion.Control>
                  <Accordion.Panel classNames={{ content: "px-0 pb-0" }}>
                    <Toolbox />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>

              <Accordion defaultValue="Layer">
                <Accordion.Item key={"Layer"} value={"Layer"}>
                  <Accordion.Control className="bg-slate-200">Layer</Accordion.Control>
                  <Accordion.Panel classNames={{ content: "px-0 pb-0" }}>
                    <Layers />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>

          <div className="col-span-6 lg:col-span-8 h-full overflow-hidden  border-l border-r bg-black/20 px-3">
            <div className="flex justify-center py-2 gap-2">
              <ThemeIcon
                className={cn("cursor-pointer text-black bg-transparent hover:bg-neutral-500 hover:text-white", {
                  ["!bg-black text-white"]: w === "100%",
                })}
                onClick={() => setW("100%")}
              >
                <FaDesktop size={12} />
              </ThemeIcon>
              <ThemeIcon
                className={cn("cursor-pointer text-black bg-transparent hover:bg-neutral-500 hover:text-white", {
                  ["!bg-black text-white"]: w === "640px",
                })}
                onClick={() => setW("640px")}
              >
                <FaTabletAlt size={12} />
              </ThemeIcon>
              <ThemeIcon
                className={cn("cursor-pointer text-black bg-transparent hover:bg-neutral-500 hover:text-white", {
                  ["!bg-black text-white"]: w === "525px",
                })}
                onClick={() => setW("525px")}
              >
                <FaMobileAlt size={12} />
              </ThemeIcon>
            </div>
            <div className="h-full flex items-start mx-auto" style={{ width: w }} ref={mainRef}>
              <Frame data={data}>
                <Element is={AppRoot} className="bg-white" canvas {...AppRoot.fallbackProps} />
              </Frame>
            </div>
          </div>

          <div className="col-span-3 lg:col-span-2 overflow-auto">
            <SettingsPanel />
          </div>
        </div>
      </div>
    </Editor>
  );
};
