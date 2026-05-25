const assert = require("node:assert/strict");
const test = require("node:test");

const { computeAngles } = require("../clock.js");

function assertAngles(actual, expected) {
  assert.deepEqual(Object.keys(actual), ["hour", "minute", "second"]);
  for (const hand of Object.keys(expected)) {
    assert.ok(
      Math.abs(actual[hand] - expected[hand]) < Number.EPSILON * 100,
      `${hand} expected ${expected[hand]}, received ${actual[hand]}`,
    );
  }
}

test("computeAngles returns zero degrees at midnight", () => {
  assertAngles(computeAngles(new Date(2026, 0, 1, 0, 0, 0)), {
    hour: 0,
    minute: 0,
    second: 0,
  });
});

test("computeAngles advances hour and minute hands smoothly", () => {
  assertAngles(computeAngles(new Date(2026, 0, 1, 3, 15, 30)), {
    hour: 97.5,
    minute: 93,
    second: 180,
  });
});

test("computeAngles keeps second hand discrete per second", () => {
  assertAngles(computeAngles(new Date(2026, 0, 1, 0, 0, 7, 999)), {
    hour: 0,
    minute: 0.7,
    second: 42,
  });
});

test("computeAngles rejects invalid dates", () => {
  assert.throws(() => computeAngles(new Date("invalid")), {
    name: "TypeError",
    message: "computeAngles expects a valid Date.",
  });
});
