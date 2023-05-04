import flatpickr from 'flatpickr'; // щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів
// const flatpickr = require('flatpickr');
import Notiflix from 'notiflix'; //  відображення повідомлень користувачеві, замість window.alert()

const refs = {
  startBtn: document.querySelector('[data-start]'), //звернення до кнопки через дата атрибут без значення
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// вішаємо слухачі подій
refs.startBtn.addEventListener('click', onStartBtn);

const NOW_DATE = new Date();

// створення обєкту, що дає можливість користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    const selectedDate = selectedDates[0];

    if (selectedDate < NOW_DATE) {
      Notiflix.Notify.failure('Please choose a date in the future.');
      refs.startBtn.setAttribute('disabled', 'disabled'); // додаємо атрибут кнопці старт disabled (неактивний)
    } else {
      refs.startBtn.removeAttribute('disabled');
      onStartBtn(selectedDates);
    }
  },
});

let intervalId = null; // обявлення id інтервалу,

function onStartBtn(selectedDates) {
  clearInterval(intervalId); // очищення щоб не запускалось одразу кілька інтервалів
  intervalId = setInterval(handleTime(selectedDates), 1000); // запуск інтервалу,встановлення id інтервалу з проміжком 1 с і колбек функцією для запуску таймера
}

function handleTime(selectedDates) {
  const selectedDate = selectedDates[0];
  const timeDifer = selectedDate - NOW_DATE;
  const timeConvert = convertMs(timeDifer);
  renderTimer(timeConvert);

  if (timeDifer <= 0) {
    clearInterval(intervalId);
  }
}

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
  return value.toString().padStart(2, '0');
}

function renderTimer(timeConvert) {
  refs.days.textContent = addLeadingZero(timeConvert.days);
  refs.hours.textContent = addLeadingZero(timeConvert.hours);
  refs.minutes.textContent = addLeadingZero(timeConvert.minutes);
  refs.seconds.textContent = addLeadingZero(timeConvert.seconds);
}
