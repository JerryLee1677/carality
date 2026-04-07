import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  webServer: {
    command: "pnpm exec next dev --hostname 127.0.0.1 --port 1677",
    url: "http://127.0.0.1:1677",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://127.0.0.1:1677",
    headless: true,
  },
});
