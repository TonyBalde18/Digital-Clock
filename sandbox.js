const clock = document.querySelector(".clock .time");
const weekdayContainer = document.querySelector(".date-container .weekday");
const dayContainer = document.querySelector(".date-container .day");
const monthContainer = document.querySelector(".date-container .month");
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

  // Update time
  const timeOptions = {
    timeZone: selectedTimezone,
    hour12: !is24HourFormat,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const time = currentTime.toLocaleTimeString("en-US", timeOptions);
  clock.innerHTML = `<span>${time}</span>`;

  // Update date
  const dateOptions = {
    timeZone: selectedTimezone,
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const date = currentTime.toLocaleDateString("en-US", dateOptions);
  const [weekday, month, day] = date.split(", ");
  weekdayContainer.textContent = weekday;
  dayContainer.textContent = day;
  monthContainer.textContent = month;
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
