const clock = document.querySelector(".clock");
const formatToggle = document.getElementById("formatToggle");
const dateElement = document.querySelector(".date");

let is24HourFormat = true; // Initial format is 24-hour

const formatTime = (hours) => {
  if (is24HourFormat) {
    return {
      hours: hours,
      isAM: null,
    };
  } else {
    const isAM = hours < 12 || hours === 24;
    const formattedHours = hours % 12 || 12;
    return {
      hours: formattedHours,
      isAM: isAM,
    };
  }
};

const padZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const timezoneSelect = document.getElementById("timezoneSelect");
const timezoneContainer = document.querySelector(".timezone-container");

const getTimezoneOffset = (timezone) => {
  const now = new Date();
  const timezoneDate = now.toLocaleString("en-US", { timeZone: timezone });
  const timezoneTime = new Date(timezoneDate);
  return timezoneTime.getTimezoneOffset() / 60; // Return the offset in hours
};

const updateClockWithTimezone = () => {
  const selectedTimezone = timezoneSelect.value;
  const timezoneOffset = getTimezoneOffset(selectedTimezone);

  const now = new Date();
  now.setHours(now.getHours() + timezoneOffset);
  const updateClock = () => {
    const now = new Date();

    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();

    const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" });
    const month = now.toLocaleDateString("en-US", { month: "long" });
    const day = now.getDate();

    const formattedTime = formatTime(h);
    h = formattedTime.hours;
    const isAM = formattedTime.isAM;

    const dateHTML = `
    <div>${dayOfWeek}</div>
    <div>${month} ${day}</div>
  `;

    dateElement.innerHTML = dateHTML;

    const timeHTML = `
    <span>${padZero(h)}</span> :
    <span>${padZero(m)}</span> :
    <span>${padZero(s)}</span>
  `;

    clock.innerHTML = timeHTML;

    // Clear the previous AM/PM text
    clock.querySelectorAll(".am-pm").forEach((el) => el.remove());

    if (!is24HourFormat && isAM !== null) {
      const amPmHTML = `<span class="am-pm">${isAM ? "AM" : "PM"}</span>`;
      clock.insertAdjacentHTML("beforeend", amPmHTML);
    }
  };
  updateClock();
};

timezoneSelect.addEventListener("change", updateClockWithTimezone);

// Handle dropdown behavior
timezoneSelect.addEventListener("click", function () {
  timezoneContainer.classList.toggle("show");
});

window.addEventListener("click", function (event) {
  if (!event.target.matches("#timezoneSelect")) {
    timezoneContainer.classList.remove("show");
  }
});

const formatLabel = document.getElementById("formatLabel");

const toggleFormat = () => {
  is24HourFormat = !is24HourFormat; // Toggle the format
  updateClockWithTimezone(); // Update the clock immediately after toggling the format

  // Update the format label text
  formatLabel.textContent = is24HourFormat ? "24h Format" : "12h Format";
};

formatToggle.addEventListener("change", toggleFormat);

// Initial clock update
window.addEventListener("load", function () {
  updateClockWithTimezone();
});

setInterval(updateClockWithTimezone, 1000);
