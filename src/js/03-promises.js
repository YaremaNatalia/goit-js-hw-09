import Notiflix from 'notiflix'; //  відображення повідомлень користувачеві, замість window.alert()

const form = document.querySelector('.form');

// const delayInput = document.querySelector("[name='delay']");// звернення до елемента через name  за назвою
// const delayInput = document.getElementsByName('delay')[0];// звернення до елемента через name перший в списку

form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();

  const delay = parseInt(form.elements.delay.value); // отримання цілого числа з інпуту форми
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);
  let position = 1; // введення змінної позиції з присвоюванням одиниці

  // реалізація кількості промісів залежно від кількості в інпуті amount через метод setInterval
  const intervalId = setInterval(() => {
    if (position <= amount) {
      const promise = createPromise(position, delay + step * (position - 1)); //зміна промісу через зміну затримки виведення
      promise
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      position += 1; //позиція збільшується на один кожного інтервалу
    } else {
      clearInterval(intervalId); // зупинка інтервалу коли позиція досягла кількості amount
    }
  }, delay + step * (position - 1)); // інтервал затримки

  // Значение delay определяется пользователем в форме, а затем для каждого вызова функции createPromise задержка увеличивается на значение шага (step), умноженного на текущую позицию (position) минус 1. Таким образом, для первого вызова позиция равна 1, а для последующих вызовов она будет увеличиваться на единицу.

  // Например, если пользователь ввел значение delay = 1000, step = 500, amount = 3, то для первого вызова функции задержка будет равна 1000, для второго вызова - 1500 (1000 + 1 * 500), а для третьего - 2000 (1000 + 2 * 500). Это позволяет создавать промисы с увеличивающейся задержкой между ними.

  //=======variant 2=========

  //   for (let position = 1; position <= amount; position += 1) {
  //     const promise = createPromise(position, delay + step * (position - 1));
  //     promise
  //       .then(({ position, delay }) => {
  //         Notiflix.Notify.failure(
  //           `✅ Fulfilled promise ${position} in ${delay}ms`
  //         );
  //       })
  //       .catch(({ position, delay }) => {
  //         Notiflix.Notify.failure(
  //           `❌ Rejected promise ${position} in ${delay}ms`
  //         );
  //       });
  //   }
}
