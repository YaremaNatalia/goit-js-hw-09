const refs = {
  startBtn: document.querySelector(`[data-start]`), //звернення до кнопки через дата атрибут без значення
  stopBtn: document.querySelector(`[data-stop]`),
};

// вішаємо слухачі подій
refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

let intervalId = null;

function onStartBtn() {
  //   clearInterval(intervalId); //можна додати очещення інтервалу перед запуском, щоб не вмикалось кілька одночасно замість встановлення кнопки старт неактивною
  intervalId = setInterval(setRandomColor, 1000); // змінюємо колір раз на секунду, викликаючи колбекфункцію
}

function onStopBtn() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled');
}



function setRandomColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor; // змінюємо колір body через inline style
  refs.startBtn.setAttribute('disabled', 'disabled'); // додаємо атрибут кнопці старт disabled (неактивний)
  // refs.startBtn.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}