import { ActionFunctionArgs } from "@remix-run/node";
import fs from "node:fs";
export const loader = () => {
  // return new Response().status(400).json({
  //   message: "Method doesn't support",
  // });
  // ("Method doesn't support", { status: 400 });
  throw new Error("Method doesn't support");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const data = form.get("data") as string;
  fs.createWriteStream("test.json").write(data);
  return {
    message: "ok",
  };
};
