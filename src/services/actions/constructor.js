import { getIngredientsRequest } from 'utils/Api';
export const GET_CONSTRUCTOR_REQUEST = 'GET_CONSTRUCTOR_REQUEST';
export const GET_CONSTRUCTOR_SUCCESS = 'GET_CONSTRUCTOR_SUCCESS';
export const GET_CONSTRUCTOR_FAILED = 'GET_CONSTRUCTOR_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export function getConstructor() {
  return function (dispatch) {
    dispatch({
      type: GET_CONSTRUCTOR_REQUEST,
    });
    getIngredientsRequest()
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_CONSTRUCTOR_SUCCESS,
            data: data.data,
          });
        } else {
          dispatch({ type: GET_CONSTRUCTOR_FAILED });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
