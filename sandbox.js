const clock = document.querySelector('.clock');
let formatToggle; // Declare formatToggle variable

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

const createClockHTML = () => {
  const now = new Date();

  let h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const day = now.getDate();

  // Format the hour based on the selected format
  h = formatTime(h);

  const html = `
    <div class="date">
      ${dayOfWeek}, ${month} ${day}
    </div>  
    <div class="time">
      <span>${padZero(h)}</span> :
      <span>${padZero(m)}</span> :
      <span>${padZero(s)}</span>
    </div>
    <button id="formatToggle">Toggle Format</button>
  `;

  return html;
};

const updateClock = () => {
  const html = createClockHTML();
  clock.innerHTML = html;

  // Re-attach event listener to the new button element
  formatToggle = document.getElementById('formatToggle');
  formatToggle.addEventListener('click', toggleFormat);
};

const toggleFormat = () => {
  is24HourFormat = !is24HourFormat; // Toggle the format
  updateClock(); // Update the clock immediately after toggling the format
};

updateClock(); // Initial clock update

setInterval(updateClock, 1000);
