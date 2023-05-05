import refs from './02-references';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderTimer(timeConvert) {
  refs.days.textContent = addLeadingZero(timeConvert.days);
  refs.hours.textContent = addLeadingZero(timeConvert.hours);
  refs.minutes.textContent = addLeadingZero(timeConvert.minutes);
  refs.seconds.textContent = addLeadingZero(timeConvert.seconds);
}

export { convertMs, renderTimer };
