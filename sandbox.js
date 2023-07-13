const clock = document.querySelector(".clock");
const formatToggle = document.getElementById("formatToggle");

let is24HourFormat = true; // Initial format is 24-hour

const padZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const updateClock = () => {
  const selectedOption = timezoneSelect.options[timezoneSelect.selectedIndex];
  const selectedTimezone = selectedOption.value;
  const time = new Date().toLocaleTimeString("en-US", { timeZone: selectedTimezone, hour12: !is24HourFormat });
  const [hours, minutes, seconds] = time.split(":").map(Number);

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

const timezoneSelect = document.getElementById("timezoneSelect");

timezoneSelect.addEventListener("change", updateClock);

const formatLabel = document.getElementById("formatLabel");

const toggleFormat = () => {
  is24HourFormat = !is24HourFormat; // Toggle the format
  updateClock(); // Update the clock immediately after toggling the format

  // Update the format label text
  formatLabel.textContent = is24HourFormat ? "24h Format" : "12h Format";
};

formatToggle.addEventListener("change", toggleFormat);

// Initial clock update
updateClock();

// Set interval to update the clock every second
setInterval(updateClock, 1000);
