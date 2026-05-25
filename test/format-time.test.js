const assert = require("node:assert/strict");
const test = require("node:test");

const { formatTime } = require("../clock.js");

test("formatTime zero-pads midnight", () => {
  assert.equal(formatTime(new Date(2026, 0, 1, 0, 0, 0)), "00:00:00");
});

test("formatTime formats noon", () => {
  assert.equal(formatTime(new Date(2026, 0, 1, 12, 0, 0)), "12:00:00");
});

test("formatTime zero-pads single-digit values", () => {
  assert.equal(formatTime(new Date(2026, 0, 1, 9, 5, 7)), "09:05:07");
});
