import { ActionFunctionArgs } from "@remix-run/node";
import fs from "node:fs";
import { IDB } from "~/libs/db";
export const loader = () => {
  throw new Error("Method doesn't support");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const id = form.get("id") as string;
  if (!id) throw Response.json("id is missing", { status: 400 });
  const db: IDB = JSON.parse(fs.readFileSync("uploads/mockup.json", "utf-8"));
  const index = db.pages.findIndex((item) => item.id == id);
  if (index !== -1) {
    db.pages.splice(index, 1);
  }
  fs.writeFileSync("uploads/mockup.json", JSON.stringify(db), "utf-8");
  return Response.json(
    {
      message: "ok",
    },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
