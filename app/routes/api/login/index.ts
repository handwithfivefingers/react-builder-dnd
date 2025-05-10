import { ActionFunctionArgs } from "@remix-run/node";
import { db } from "~/libs/db";
export const loader = () => {
  throw new Error("Login Method doesn't support");
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  console.log("email", email);
  console.log("password", password);
  const user = db().users.find((user) => user.email === email);
  const isMatch = user?.password === password;
  if (!isMatch) return Response.json({ message: "Invalid email or password" }, { status: 401 });
  return Response.json(
    {
      message: "ok",
      data: {
        token: db().token,
      },
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
