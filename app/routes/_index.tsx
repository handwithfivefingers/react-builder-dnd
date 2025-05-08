import { Editor, Element, Frame } from "@craftjs/core";
import { Layers } from "@craftjs/layers";
import { Divider, Text } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { DND_RESOLVER } from "~/components";
import { AppRoot } from "~/components/appRoot";
import { SettingsPanel } from "~/components/settingPanel";
import { Toolbox } from "~/components/toolbox";
import { Topbar } from "~/components/topBar";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  const fetcher = useFetcher();
  const onSubmit = (strSer: string) => {
    fetcher.submit({ data: strSer }, { method: "POST", action: "/api/saving" });
  };
  return (
    <div className="min-h-[100svh] w-full h-full bg-indigo-50">
      <Editor
        resolver={DND_RESOLVER}
        indicator={{
          success: "#2d9d78", // green
          error: "#e34850", // red
          style: {
            // custom CSS properties
          },
          className: "your-css-class", // custom CSS class
        }}
      >
        <div className="grid grid-cols-12 h-full gap-2">
          <div className="col-span-12">
            <Topbar onSubmit={onSubmit} />
          </div>
          <div className="grid grid-cols-12 col-span-12 h-[calc(100svh-100px)] gap-2">
            <div className="md:col-span-3 lg:col-span-2 h-full pl-2">
              <div className="flex flex-col h-full w-full bg-white rounded shadow overflow-hidden">
                <div className="px-4 py-2 bg-indigo-200">
                  <Text className="font-semibold text-xl">Layer</Text>
                </div>
                <Layers />
              </div>
            </div>

            <div className="md:col-span-6 lg:col-span-8 overflow-y-auto">
              <Frame>
                <Element is={AppRoot} className="h-full bg-white w-full" canvas />
              </Frame>
            </div>

            <div className="p-2 md:col-span-3 lg:col-span-2 flex flex-col gap-4 bg-indigo-200 rounded shadow pr-2  overflow-auto">
              <Toolbox />
              <Divider />
              <SettingsPanel />
            </div>
          </div>
        </div>
      </Editor>
    </div>
  );
}
