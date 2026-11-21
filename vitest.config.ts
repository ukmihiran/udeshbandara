import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname) },
  },
  test: {
    environment: "node",
    // SITE.url is read at import time; pin it so a developer's .env or shell value cannot leak in.
    env: { NEXT_PUBLIC_APP_URL: "https://udeshbandara.com" },
    include: ["tests/unit/**/*.test.ts"],
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
  },
});
