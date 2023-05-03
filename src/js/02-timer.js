import flatpickr from 'flatpickr'; // щоб дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів
import Notiflix from 'notiflix'; //  відображення повідомлень користувачеві, замість window.alert()

const refs = {
  input: document.getElementById(`datetime-picker`),
  startBtn: document.querySelector(`[data-start]`), //звернення до кнопки через дата атрибут без значення
  timer: document.querySelector(`.timer`),
};

// вішаємо слухачі подій

refs.startBtn.addEventListener('click', onStartBtn);

function onStartBtn() {
    console.log("hello")
}
