import { Button, TextInput } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className="min-h-[100svh] w-full h-full bg-neutral-50 flex items-center justify-center">
      <div className="flex flex-col h-full w-full bg-white overflow-hidden shadow-sm max-w-96 p-4">
        <div className="px-4 py-2 ">
          <h1 className="font-semibold text-xl">Floware Demo - DND</h1>
        </div>
        <form
          className="flex flex-col gap-4 p-4"
          method="post"
          action={"/api/login"}
          encType="multipart/form-data"
        >
          <TextInput label="email" name="email" />
          <TextInput label="password" name="password" />
          <Button variant="outline" color="blue.9" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
