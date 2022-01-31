import { getIngredientsRequest } from 'utils/Api';
import { getLoadingEndAction, getLoadingStartAction } from './auth';
import { TItem } from 'utils/types';
import { AppDispatch, AppThunk } from 'utils';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
  'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
  'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
  'GET_INGREDIENTS_FAILED';
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data:  ReadonlyArray<TItem>
}
export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetIngredients =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export const getIngredientsRequestAction = (): TGetIngredients => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccessAction = (data:  ReadonlyArray<TItem>): TGetIngredients => ({
  type: GET_INGREDIENTS_SUCCESS,
  data,
});
export const getIngredientsFailedAction = (): TGetIngredients => ({
  type: GET_INGREDIENTS_FAILED,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getLoadingStartAction());
  dispatch(getIngredientsRequestAction());
  getIngredientsRequest()
  .then((data) => {
      if (data && data.success) {
        dispatch(getIngredientsSuccessAction(data.data));
        dispatch(getLoadingEndAction());
      } else {
        dispatch(getIngredientsFailedAction());
      }
    })
    .catch(() => {
      dispatch(getIngredientsFailedAction());
    });
};
