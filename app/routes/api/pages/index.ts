export const loader = async ({ request }: { request: Request }) => {
  console.log("loader", request.url);
  return new Response("ok");
};
