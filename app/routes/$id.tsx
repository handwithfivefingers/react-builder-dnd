/* eslint-disable import/no-unresolved */
import { Editor, Frame } from "@craftjs/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import lz from "lzutf8";
import fs from "node:fs";
import { DND_RESOLVER } from "~/components";
import { db } from "~/libs/db";
export const loader = ({ request, params }: LoaderFunctionArgs) => {
  console.log("params", params);
  const blogItem = db().pages.find((item) => item.id == params.id);
  console.log("blogItem", blogItem);
  if (!blogItem) return Response.json({});
  return Response.json({
    ...blogItem,
    content: lz.decompress(lz.decodeBase64(blogItem?.content)),
  });
};
const PagesTemplate = () => {
  const blog = useLoaderData<typeof loader>();
  return (
    <div className="w-full h-full min-h-[100svh]">
      <Editor resolver={DND_RESOLVER} enabled={false}>
        <Frame data={blog.content} />
      </Editor>
    </div>
  );
};

export default PagesTemplate;
