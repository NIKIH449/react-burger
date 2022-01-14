import { getIngredientsRequest } from 'utils/Api';
import { LOADING_START, LOADING_END } from './auth';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function (dispatch) {
    dispatch({ type: LOADING_START });
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data.data,
          });
          dispatch({
            type: LOADING_END,
          });
        } else {
          dispatch({ type: GET_INGREDIENTS_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}
