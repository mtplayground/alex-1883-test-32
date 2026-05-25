const { expect, test } = require("@playwright/test");

test("clock renders and ticks", async ({ page }) => {
  await page.goto("/index.html");

  const clock = page.locator("#clock");
  await expect(clock).toHaveText(/^\d{2}:\d{2}:\d{2}$/);

  const initialTime = await clock.textContent();

  await page.waitForTimeout(1200);
  await expect(clock).toHaveText(/^\d{2}:\d{2}:\d{2}$/);

  const nextTime = await clock.textContent();
  expect(nextTime).not.toBe(initialTime);
});
