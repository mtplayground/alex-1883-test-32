const assert = require("node:assert/strict");
const test = require("node:test");

const { millisecondsUntilNextSecond, renderClock } = require("../clock.js");

function createClockElement() {
  const attributes = new Map();
  const hands = new Map(
    ["#hand-hour", "#hand-minute", "#hand-second"].map((selector) => [
      selector,
      {
        attributes: new Map(),
        setAttribute(name, value) {
          this.attributes.set(name, value);
        },
      },
    ]),
  );

  return {
    attributes,
    hands,
    querySelector(selector) {
      return hands.get(selector) ?? null;
    },
    setAttribute(name, value) {
      attributes.set(name, value);
    },
  };
}

test("renderClock rotates each hand from computed angles", () => {
  const clockElement = createClockElement();

  renderClock(clockElement, new Date(2026, 0, 1, 3, 15, 30));

  assert.equal(clockElement.hands.get("#hand-hour").attributes.get("transform"), "rotate(97.5)");
  assert.equal(
    clockElement.hands.get("#hand-minute").attributes.get("transform"),
    "rotate(93.00000000000001)",
  );
  assert.equal(clockElement.hands.get("#hand-second").attributes.get("transform"), "rotate(180)");
  assert.equal(clockElement.attributes.get("aria-label"), "Local analog clock");
});

test("renderClock requires all three hand elements", () => {
  const clockElement = createClockElement();
  clockElement.hands.delete("#hand-second");

  assert.throws(() => renderClock(clockElement, new Date(2026, 0, 1, 0, 0, 0)), {
    message: "Missing clock hand element.",
  });
});

test("millisecondsUntilNextSecond returns delay to next wall-clock second", () => {
  assert.equal(millisecondsUntilNextSecond(new Date(2026, 0, 1, 0, 0, 0, 250)), 750);
  assert.equal(millisecondsUntilNextSecond(new Date(2026, 0, 1, 0, 0, 0, 0)), 1000);
});
