import { sentOrderRequest } from 'utils/Api';
import { getOpenOrderModalAction } from './modal';
import { getDeleteAllIngredientsAction } from './constructor';
import { TOrder } from 'utils/types';
import { AppDispatch, AppThunk } from 'utils';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly data: TOrder;
}
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}
export type TGetOrder =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

export const getGetOrderRequestAction = (): TGetOrder => ({
  type: GET_ORDER_REQUEST,
});
export const getGetOrderSuccessAction = (data: TOrder): TGetOrder => ({
  type: GET_ORDER_SUCCESS,
  data,
});
export const getGetOrderFailedAction = (): TGetOrder => ({
  type: GET_ORDER_FAILED,
});
export const createOrder: AppThunk =
  (id: string, token: string) => (dispatch: AppDispatch) => {
    dispatch(getGetOrderRequestAction());
    dispatch(getOpenOrderModalAction());
    sentOrderRequest(id, token)
      .then((data) => {
        if (data && data.success) {
          dispatch(getGetOrderSuccessAction(data));

          dispatch(getDeleteAllIngredientsAction());
        } else {
          dispatch(getGetOrderFailedAction());
        }
      })
      .catch(() => {
        dispatch(getGetOrderFailedAction());
      });
  };
