import { defineConfig } from "vite";

export default defineConfig({
  // Relative asset URLs: the same build is served at / on the LAN and under /groove/ on the tailnet.
  base: "./",
  server: {
    proxy: {
      "/api": process.env.VITE_API_PROXY_TARGET || "http://localhost:3001"
    }
  }
});
