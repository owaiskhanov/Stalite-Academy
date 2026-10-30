import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

/**
 * Vercel serves `cid.html` at `/cid` because vercel.json sets
 * `cleanUrls: true`. The dev and preview servers have no such option, so this
 * mirrors the same rewrite locally — /cid resolves instead of falling back to
 * the landing page.
 */
function cleanUrls() {
  const rewrite = (req, _res, next) => {
    if (req.url) {
      const [path, query] = req.url.split("?");
      if (path === "/cid" || path === "/cid/") {
        req.url = `/cid.html${query ? `?${query}` : ""}`;
      }
    }
    next();
  };
  return {
    name: "clean-urls",
    /* Block bodies on purpose: Vite treats a function returned from these
       hooks as a post-middleware, and `middlewares.use()` returns the app. */
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [cleanUrls()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app"],
  },
  build: {
    rollupOptions: {
      input: {
        main: `${root}index.html`,
        cid: `${root}cid.html`,
      },
    },
  },
});
