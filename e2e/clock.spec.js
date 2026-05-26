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
  await expect(clock).toHaveAttribute("viewBox", "-50 -50 100 100");
  await expect(clock.locator(".clock-face")).toHaveCount(1);
  await expect(clock.locator(".clock-tick")).toHaveCount(12);
  await expect(clock.locator(".numeral.roman")).toHaveText([
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ]);
  await expect(clock.locator(".numeral.arabic")).toHaveText([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]);
  await expect(clock.locator("text.roman").filter({ hasText: /^XII$/ })).toBeVisible();
  await expect(clock.locator("text.arabic").filter({ hasText: /^12$/ })).toBeVisible();
  await expect(clock.locator("#hand-hour")).toHaveCount(1);
  await expect(clock.locator("#hand-minute")).toHaveCount(1);

  const secondHand = clock.locator("#hand-second");
  const rotateTransform = /^rotate\(\d+(?:\.\d+)?\)$/;
  await expect(secondHand).toHaveCount(1);
  await expect(secondHand).toHaveAttribute("transform", rotateTransform);

  const initialSecondTransform = await secondHand.getAttribute("transform");
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

  await expect(secondHand).toHaveAttribute("transform", rotateTransform);
  const nextSecondTransform = await secondHand.getAttribute("transform");
  expect(nextSecondTransform).not.toBe(initialSecondTransform);
  expect(consoleErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});
