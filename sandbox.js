const clock = document.querySelector(".clock .time");
const formatToggle = document.getElementById("formatToggle");
const timezoneSelect = document.getElementById("timezoneSelect");

let is24HourFormat = true; // Initial format is 24-hour

const padZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const updateClock = () => {
  const selectedOption = timezoneSelect.options[timezoneSelect.selectedIndex];
  const selectedTimezone = selectedOption.value;
  const currentTime = new Date();
  const timeOptions = {
    timeZone: selectedTimezone,
    hour12: !is24HourFormat,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const time = currentTime.toLocaleTimeString("en-US", timeOptions);

  console.log("Selected Timezone:", selectedTimezone);
  console.log("Current Time:", time);

  const timeHTML = `<span>${time}</span>`;

  clock.innerHTML = timeHTML;
};

const formatTime = (hours) => {
  if (is24HourFormat) {
    return hours;
  } else {
    const formattedHours = hours % 12 || 12;
    return formattedHours;
  }
};

const toggleFormat = () => {
  is24HourFormat = !is24HourFormat;
  updateClock();
  formatLabel.textContent = is24HourFormat ? "24h Format" : "12h Format";
};

formatToggle.addEventListener("change", toggleFormat);

updateClock();
setInterval(updateClock, 1000);
