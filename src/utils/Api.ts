import { BURGER_URL } from './constants';
import { checkResponse } from 'utils/utils';

const getIngredientsRequest = async (): Promise<object> => {
  const res = await fetch(BURGER_URL + 'ingredients');
  return checkResponse(res);
};

const sentOrderRequest = async (id: string): Promise<object> => {
  const res = await fetch(BURGER_URL + 'orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: id }),
  });
  return checkResponse(res);
};

export { sentOrderRequest, getIngredientsRequest };
