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

test("computeAngles returns zero degrees at 12:00:00", () => {
  assertAngles(computeAngles(new Date(2026, 0, 1, 12, 0, 0)), {
    hour: 0,
    minute: 0,
    second: 0,
  });
});

test("computeAngles places the hour hand at 180 degrees for 6:00:00", () => {
  assertAngles(computeAngles(new Date(2026, 0, 1, 6, 0, 0)), {
    hour: 180,
    minute: 0,
    second: 0,
  });
});

test("computeAngles advances the hour hand smoothly at 3:30:00", () => {
  assertAngles(computeAngles(new Date(2026, 0, 1, 3, 30, 0)), {
    hour: 105,
    minute: 180,
    second: 0,
  });
});

test("computeAngles places the second hand at 180 degrees for 9:15:30", () => {
  assertAngles(computeAngles(new Date(2026, 0, 1, 9, 15, 30)), {
    hour: 277.5,
    minute: 93,
    second: 180,
  });
});

test("computeAngles keeps all angles in the range [0, 360)", () => {
  const dates = [
    new Date(2026, 0, 1, 0, 0, 0),
    new Date(2026, 0, 1, 11, 59, 59),
    new Date(2026, 0, 1, 12, 0, 0),
    new Date(2026, 0, 1, 23, 59, 59),
  ];

  for (const date of dates) {
    const angles = computeAngles(date);
    for (const angle of Object.values(angles)) {
      assert.ok(angle >= 0, `${angle} should be at least 0`);
      assert.ok(angle < 360, `${angle} should be less than 360`);
    }
  }
});
