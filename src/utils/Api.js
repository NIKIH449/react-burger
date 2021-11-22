import { ORDER_URL } from './constants';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const sentOrder = (id) => {
  return fetch(ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: id }),
  }).then(checkResponse);
};

export { sentOrder };
