function formatTime(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("formatTime expects a valid Date.");
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function getClockAngles(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("getClockAngles expects a valid Date.");
  }

  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const secondAngle = ((seconds + milliseconds / 1000) / 60) * 360;
  const minuteAngle = ((minutes + seconds / 60) / 60) * 360;
  const hourAngle = ((hours + minutes / 60) / 12) * 360;

  return { hourAngle, minuteAngle, secondAngle };
}

function renderClock(clockElement) {
  const hourHand = clockElement.querySelector("#hand-hour");
  const minuteHand = clockElement.querySelector("#hand-minute");
  const secondHand = clockElement.querySelector("#hand-second");

  if (!hourHand || !minuteHand || !secondHand) {
    throw new Error("Missing clock hand element.");
  }

  const now = new Date();
  const { hourAngle, minuteAngle, secondAngle } = getClockAngles(now);

  hourHand.setAttribute("transform", `rotate(${hourAngle})`);
  minuteHand.setAttribute("transform", `rotate(${minuteAngle})`);
  secondHand.setAttribute("transform", `rotate(${secondAngle})`);
  clockElement.setAttribute("aria-label", `Local time ${formatTime(now)}`);
}

function startClock() {
  const clockElement = document.getElementById("clock");

  if (!clockElement) {
    throw new Error("Missing #clock element.");
  }

  renderClock(clockElement);

  const delayToNextSecond = 1000 - new Date().getMilliseconds();

  window.setTimeout(() => {
    renderClock(clockElement);
    window.setInterval(() => renderClock(clockElement), 1000);
  }, delayToNextSecond);
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", startClock);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { formatTime, getClockAngles, renderClock, startClock };
}
