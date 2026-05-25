const { expect, test } = require("@playwright/test");

test("clock renders and ticks", async ({ page }) => {
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/index.html");

  const clock = page.locator("#clock");
  await expect(clock).toHaveText(/^\d{2}:\d{2}:\d{2}$/);

  const initialTime = await clock.textContent();
  const viewport = page.viewportSize();
  const clockBox = await clock.boundingBox();

  expect(clockBox).not.toBeNull();

  if (viewport && clockBox) {
    expect(clockBox.x).toBeGreaterThanOrEqual(0);
    expect(clockBox.y).toBeGreaterThanOrEqual(0);
    expect(clockBox.x + clockBox.width).toBeLessThanOrEqual(viewport.width);
    expect(clockBox.y + clockBox.height).toBeLessThanOrEqual(viewport.height);
  }

  await page.waitForTimeout(1200);
  await expect(clock).toHaveText(/^\d{2}:\d{2}:\d{2}$/);

  const nextTime = await clock.textContent();
  expect(nextTime).not.toBe(initialTime);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
