import { BURGER_URL } from './constants';
import { checkResponse } from 'utils/utils';

const getIngredientsRequest = () => {
  return fetch(BURGER_URL + 'ingredients').then(checkResponse);
};

const sentOrderRequest = (id: string) => {
  return fetch(BURGER_URL + 'orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: id }),
  }).then(checkResponse);
};

export { sentOrderRequest, getIngredientsRequest };
