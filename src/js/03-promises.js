import Notiflix from 'notiflix'; //  відображення повідомлень користувачеві, замість window.alert()

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

function onSubmitForm(event) {
  event.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);
}

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// form.addEventListener('submit', event => {
//   event.preventDefault();

//   const delay = parseInt(form.elements.delay.value);
//   const step = parseInt(form.elements.step.value);
//   const amount = parseInt(form.elements.amount.value);

//   for (let i = 1; i <= amount; i++) {
//     const position = i;
//     createPromise(position, delay + (i - 1) * step)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// });
