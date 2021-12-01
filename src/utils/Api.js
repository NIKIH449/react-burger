import { BURGER_URL } from './constants';
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
const getIngredientsRequest = () => {
  return fetch(BURGER_URL + 'ingredients').then(checkResponse);
};

const sentOrderRequest = (id) => {
  return fetch(BURGER_URL + 'orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: id }),
  }).then(checkResponse);
};

export { sentOrderRequest, getIngredientsRequest };
