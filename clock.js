function formatTime(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("formatTime expects a valid Date.");
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

function renderClock(clockElement) {
  clockElement.textContent = formatTime(new Date());
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
  module.exports = { formatTime, renderClock, startClock };
}
