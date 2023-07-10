const clock = document.querySelector('.clock');

const tick = () => {
  const now = new Date();
  
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
  const month = now.toLocaleDateString('en-US', { month: 'long' });
  const day = now.getDate();

  const html = `
  <div class="date">
      ${dayOfWeek}, ${month} ${day}
    </div>  
  <div class="time">
      <span>${h}</span> :
      <span>${m}</span> :
      <span>${s}</span>
    </div>
    
  `;

  clock.innerHTML = html;
};

setInterval(tick, 1000);