/* eslint-disable import/no-unresolved */
import { LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import lz from "lzutf8";
import fs from "node:fs";
import { useEffect } from "react";
import { DNDEditor } from "~/components/dndToolkit";
import { db } from "~/libs/db";
export const loader = ({ params }: LoaderFunctionArgs) => {
  const blogItem = db().pages.find((item) => item.id == params.id);
  console.log("blogItem", blogItem);
  if (!blogItem) return Response.json({});
  return Response.json({
    ...blogItem,
    content: lz.decompress(lz.decodeBase64(blogItem?.content)),
  });
};

const PagesTemplate = () => {
  const { id, content, title } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<{ message: string }>();
  const isLoading = fetcher.state !== "idle" && fetcher.state !== "submitting";
  const handleSave = (contentParser: string, t: string) => {
    fetcher.submit(
      {
        content: contentParser,
        id: id,
        title: t,
      },
      {
        method: "post",
        action: `/api/save`,
      }
    );
  };
  useEffect(() => {
    if (!isLoading) {
      if (fetcher.data?.message === "ok") {
        alert("Save Success");
      }
    }
  }, [fetcher.data, isLoading]);
  return (
    <div className="w-full h-full min-h-[100svh]">
      <DNDEditor onSave={handleSave} data={content} title={title} />
    </div>
  );
};

export default PagesTemplate;
