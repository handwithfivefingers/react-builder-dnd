/* eslint-disable import/no-unresolved */
import { Editor, Frame } from "@craftjs/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import lz from "lzutf8";
import fs from "node:fs";
import { DND_RESOLVER } from "~/components";
export const loader = ({ request }: LoaderFunctionArgs) => {
  console.log("request.url", request.url);
  const templateString = fs.readFileSync("test.json", "utf-8");
  console.log("templateString", templateString);
  return lz.decompress(lz.decodeBase64(templateString));
};
const PagesTemplate = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="w-full h-full min-h-[100svh]">
      <Editor resolver={DND_RESOLVER} enabled={false}>
        <Frame data={data}></Frame>
      </Editor>
    </div>
  );
};

export default PagesTemplate;
