const clock = document.querySelector('.clock');
const formatToggle = document.getElementById('formatToggle');
const timeElement = clock.querySelector('.time');

let is24HourFormat = true; // Initial format is 24-hour

const formatTime = (hours) => {
  if (is24HourFormat) {
    return hours;
  } else {
    // Convert to 12-hour format
    return hours % 12 || 12;
  }
};

const padZero = (value) => {
  return value < 10 ? `0${value}` : value;
};

const updateTime = () => {
  const now = new Date();

  let h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  // Format the hour based on the selected format
  h = formatTime(h);

  const timeHTML = `
    <span>${padZero(h)}</span> :
    <span>${padZero(m)}</span> :
    <span>${padZero(s)}</span>
  `;

  timeElement.innerHTML = timeHTML;
};

const toggleFormat = () => {
  is24HourFormat = !is24HourFormat; // Toggle the format
  updateTime(); // Update the time immediately after toggling the format
};

formatToggle.addEventListener('change', toggleFormat);

// Initial time update
updateTime();

setInterval(updateTime, 1000);
