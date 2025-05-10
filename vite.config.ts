import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("api/save", "routes/api/save/index.ts", { id: "save" });
          route("api/login", "routes/api/login/index.ts", { id: "login" });
          route("api/pages", "routes/api/pages/index.ts", { id: "pages" });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
