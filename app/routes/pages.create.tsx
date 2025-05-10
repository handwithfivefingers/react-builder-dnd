/* eslint-disable import/no-unresolved */
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DNDEditor } from "~/components/dndToolkit";

const PagesTemplate = () => {
  const fetcher = useFetcher<{ message: string }>();
  const handleSave = (contentParser: string, t: string) => {
    const id = uuidv4();
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
  const isLoading = fetcher.state !== "idle" && fetcher.state !== "submitting";
  useEffect(() => {
    if (!isLoading) {
      if (fetcher.data?.message === "ok") {
        alert("Save Success");
      }
    }
  }, [fetcher.data, isLoading]);
  return (
    <div className="w-full h-full min-h-[100svh]">
      <DNDEditor onSave={handleSave} title={""} />
    </div>
  );
};

export default PagesTemplate;
