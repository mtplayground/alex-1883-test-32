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

function renderClock(clockElement) {
  const hourHand = clockElement.querySelector("#hand-hour");
  const minuteHand = clockElement.querySelector("#hand-minute");
  const secondHand = clockElement.querySelector("#hand-second");

  if (!hourHand || !minuteHand || !secondHand) {
    throw new Error("Missing clock hand element.");
  }

  const now = new Date();
  const { hour, minute, second } = computeAngles(now);

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
  module.exports = { computeAngles, renderClock, startClock };
}
