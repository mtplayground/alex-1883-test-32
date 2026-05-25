function computeAngles(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("computeAngles expects a valid Date.");
  }

  const hour = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return {
    hour: ((hour + minutes / 60) / 12) * 360,
    minute: ((minutes + seconds / 60) / 60) * 360,
    second: (seconds / 60) * 360,
  };
}

function millisecondsUntilNextSecond(date = new Date()) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("millisecondsUntilNextSecond expects a valid Date.");
  }

  return 1000 - date.getMilliseconds();
}

function renderClock(clockElement, date = new Date()) {
  const hourHand = clockElement.querySelector("#hand-hour");
  const minuteHand = clockElement.querySelector("#hand-minute");
  const secondHand = clockElement.querySelector("#hand-second");

  if (!hourHand || !minuteHand || !secondHand) {
    throw new Error("Missing clock hand element.");
  }

  const { hour, minute, second } = computeAngles(date);

  hourHand.setAttribute("transform", `rotate(${hour})`);
  minuteHand.setAttribute("transform", `rotate(${minute})`);
  secondHand.setAttribute("transform", `rotate(${second})`);
  clockElement.setAttribute("aria-label", "Local analog clock");
}

function startClock() {
  const clockElement = document.getElementById("clock");

  if (!clockElement) {
    throw new Error("Missing #clock element.");
  }

  renderClock(clockElement);

  const tick = () => renderClock(clockElement);
  const delayToNextSecond = millisecondsUntilNextSecond();

  window.setTimeout(() => {
    tick();
    window.setInterval(tick, 1000);
  }, delayToNextSecond);
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", startClock);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    computeAngles,
    millisecondsUntilNextSecond,
    renderClock,
    startClock,
  };
}
