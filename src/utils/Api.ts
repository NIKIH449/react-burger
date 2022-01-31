import { BURGER_URL } from './constants';
import { checkResponse } from 'utils/utils';
const getIngredientsRequest = () => {
  return fetch(BURGER_URL + 'ingredients').then(checkResponse);
};

const sentOrderRequest = (id: string, token: string) => {
  return fetch(`${BURGER_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ingredients: id }),
  }).then(checkResponse);
};

const getAllOrders = () => {
  return fetch(`${BURGER_URL}orders/all`).then(checkResponse);
};

const getUserOrders = () => {
  return fetch(`${BURGER_URL}orders`).then(checkResponse);
};

export { sentOrderRequest, getIngredientsRequest, getAllOrders, getUserOrders };
