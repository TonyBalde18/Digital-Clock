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
  const time = new Date().toLocaleTimeString("en-US", {
    timeZone: selectedTimezone,
    hour12: !is24HourFormat,
  });
  const [hours, minutes, seconds] = time.split(":").map(Number);

  console.log("Selected Timezone:", selectedTimezone);
  console.log("Current Time:", time);
  console.log("Hours:", hours);
  console.log("Minutes:", minutes);
  console.log("Seconds:", seconds);

  const timeHTML = `
    <span>${formatTime(hours)}</span> :
    <span>${padZero(minutes)}</span> :
    <span>${padZero(seconds || 0)}</span>
  `;

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
