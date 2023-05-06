import flatpickr from 'flatpickr'; // щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів
import Notiflix from 'notiflix'; //  відображення повідомлень користувачеві, замість window.alert()
import refs from './02-references';
import { convertMs, renderTimer } from './02-functions'; //іменоване імпортування обєкта з функціями

// вішаємо слухачі подій
refs.startBtn.addEventListener('click', onStartBtn);

// refs.startBtn.setAttribute('disabled', 'disabled'); // додаємо атрибут кнопці старт disabled (неактивний) при завантаженні сторінки
refs.startBtn.disabled = true;

let pickDate = null; // !створення змінної обраної дати, щоб потім можна було її використати в коді за межами функції, де присвоєно перше значення
let intervalId = null; // обявлення id інтервалу

// створення обєкту, що дає можливість користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDatePick,
}); // для того, щоб прописувати тіло функції за межами flatpickr передаємо handleDatePick в якості обробника події onClose

// функція відслідковування обраної дати і часу і виведення помилки, якщо дата не актуальна
function handleDatePick(selectedDates) {
  pickDate = selectedDates[0].getTime();
  const nowDate = new Date().getTime();

  if (pickDate < nowDate) {
    refs.startBtn.setAttribute('disabled', 'disabled');
    clearInterval(intervalId);
    Notiflix.Notify.failure('Please choose a date in the future.');
  } else {
    refs.startBtn.removeAttribute('disabled');
  }
}

// запуск таймера при натисканні на старт
function onStartBtn() {
  clearInterval(intervalId); // !очищення щоб не запускалось одразу кілька інтервалів
  intervalId = setInterval(handleTime, 1000); // запуск інтервалу,встановлення id інтервалу з проміжком 1 с і колбек функцією для запуску таймера
  refs.startBtn.setAttribute('disabled', 'disabled');
}
// функція відображення на екрані часу, що залишилось до події
function handleTime() {
  const nowDate = new Date().getTime();
  const timeDifer = pickDate - nowDate;
  const timeConvert = convertMs(timeDifer);

  renderTimer(timeConvert);

  if (timeDifer <= 0) {
    clearInterval(intervalId);
    renderTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }
}

// ======реаізація через клас=======
// class Timer {
//   constructor() {
//     this.startBtn = document.querySelector('[data-start]');
//     this.days = document.querySelector('[data-days]');
//     this.hours = document.querySelector('[data-hours]');
//     this.minutes = document.querySelector('[data-minutes]');
//     this.seconds = document.querySelector('[data-seconds]');
//     this.intervalId = null;
//     this.pickDate = null;

//     this.startBtn.addEventListener('click', this.onStartBtn.bind(this));
//     this.startBtn.setAttribute('disabled', 'disabled');

//     flatpickr('#datetime-picker', {
//       enableTime: true,
//       time_24hr: true,
//       defaultDate: new Date(),
//       minuteIncrement: 1,
//       onClose: this.onClose.bind(this),
//     });
//   }

//   onClose(selectedDates) {
//     this.pickDate = selectedDates[0].getTime();
//     const nowDate = new Date().getTime();
//     if (this.pickDate < nowDate) {
//       this.startBtn.setAttribute('disabled', 'disabled');
//       Notiflix.Notify.failure('Please choose a date in the future.');
//     } else {
//       this.startBtn.removeAttribute('disabled');
//     }
//   }

//   onStartBtn() {
//     clearInterval(this.intervalId);
//     this.intervalId = setInterval(this.handleTime.bind(this), 1000);
//     this.startBtn.setAttribute('disabled', 'disabled');
//   }

//   handleTime() {
//     const nowDate = new Date().getTime();
//     const timeDifer = this.pickDate - nowDate;
//     const timeConvert = this.convertMs(timeDifer);
//     this.renderTimer(timeConvert);
//     if (timeDifer <= 0) {
//       clearInterval(this.intervalId);
//       this.renderTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       return;
//     }
//   }

//   convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;
//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//   }

//   addLeadingZero(value) {
//     return String(value).padStart(2, '0');
//   }

//   renderTimer(timeConvert) {
//     this.days.textContent = this.addLeadingZero(timeConvert.days);
//     this.hours.textContent = this.addLeadingZero(timeConvert.hours);
//     this.minutes.textContent = this.addLeadingZero(timeConvert.minutes);
//     this.seconds.textContent = this.addLeadingZero(timeConvert.seconds);
//   }
// }
// const timer = new Timer();
