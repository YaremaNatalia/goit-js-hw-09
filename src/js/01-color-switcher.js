const refs = {
  startBtn: document.querySelector(`[data-start]`), //звернення до кнопки через дата атрибут без значення
  stopBtn: document.querySelector(`[data-stop]`),
};

// вішаємо слухачі подій
refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

refs.stopBtn.setAttribute('disabled', 'disabled'); // додаємо атрибут кнопці stop disabled (неактивний)
// refs.stopBtn.disabled = true; // інший спосіб
// refs.startBtn.setAttribute('disabled', 'true'); // інший спосіб

let intervalId = null;

function onStartBtn() {
  //   clearInterval(intervalId); //можна додати очещення інтервалу перед запуском, щоб не вмикалось кілька одночасно замість встановлення кнопки старт неактивною
  intervalId = setInterval(setRandomColor, 1000); // змінюємо колір раз на секунду, викликаючи колбекфункцію
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function onStopBtn() {
  clearInterval(intervalId);
  refs.stopBtn.setAttribute('disabled', 'disabled');
  refs.startBtn.removeAttribute('disabled');
}

function setRandomColor() {
  const randomColor = getRandomHexColor();
  document.body.style.backgroundColor = randomColor; // змінюємо колір body через inline style
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
