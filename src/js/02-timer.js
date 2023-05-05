import flatpickr from 'flatpickr'; // щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів
import Notiflix from 'notiflix'; //  відображення повідомлень користувачеві, замість window.alert()
import refs from './02-references';
import { convertMs, renderTimer } from './02-functions'; //іменоване імпортування обєкта з функціями

// вішаємо слухачі подій
refs.startBtn.addEventListener('click', onStartBtn);

let pickDate = null; // створення змінної обраної дати, щоб потім можна було її використати в коді за межами функції, де присвоєно перше значення

// створення обєкту, що дає можливість користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);

    pickDate = selectedDates[0].getTime();
    const nowDate = new Date().getTime();

    if (pickDate < nowDate) {
      Notiflix.Notify.failure('Please choose a date in the future.');
      refs.startBtn.setAttribute('disabled', 'disabled'); // додаємо атрибут кнопці старт disabled (неактивний)
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
});

let intervalId = null; // обявлення id інтервалу,

function onStartBtn() {
  clearInterval(intervalId); // очищення щоб не запускалось одразу кілька інтервалів
  intervalId = setInterval(handleTime, 1000); // запуск інтервалу,встановлення id інтервалу з проміжком 1 с і колбек функцією для запуску таймера
}

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
