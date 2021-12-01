import { sentOrderRequest } from 'utils/Api';
import { OPEN_MODAL_ORDER } from './modal';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export function createOrder(id) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    sentOrderRequest(id).then((data) => {
      if (data && data.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          data: data,
        });
        dispatch({ type: OPEN_MODAL_ORDER });
      } else {
        dispatch({ type: GET_ORDER_FAILED });
      }
    });
  };
}
