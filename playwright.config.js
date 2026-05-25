const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  webServer: {
    command: "python3 -m http.server 8080 --bind 0.0.0.0",
    url: "http://127.0.0.1:8080/index.html",
    reuseExistingServer: !process.env.CI,
    timeout: 10000,
  },
  use: {
    baseURL: "http://127.0.0.1:8080",
  },
});
