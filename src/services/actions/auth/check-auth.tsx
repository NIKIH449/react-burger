import { TUser } from 'utils/types';
import { checkValidity } from 'utils/auth';
import { getLoadingEndAction, getLoadingStartAction, onRefreshToken } from '.';
import { getLeggedInAction } from '.';
import { AppDispatch, AppThunk } from 'utils';
export const GET_CHECK_AUTH_REQUEST: 'GET_CHECK_AUTH_REQUEST' =
  'GET_CHECK_AUTH_REQUEST';
export const GET_CHECK_AUTH_SUCCESS: 'GET_CHECK_AUTH_SUCCESS' =
  'GET_CHECK_AUTH_SUCCESS';
export const GET_CHECK_AUTH_FAILED: 'GET_CHECK_AUTH_FAILED' =
  'GET_CHECK_AUTH_FAILED';

export interface IGetCheckAuthRequestAction {
  readonly type: typeof GET_CHECK_AUTH_REQUEST;
}

export interface IGetCheckAuthSuccessAction {
  readonly type: typeof GET_CHECK_AUTH_SUCCESS;
  readonly data: TUser;
}
export interface IGetCheckAuthFailedAction {
  readonly type: typeof GET_CHECK_AUTH_FAILED;
}
export type TGetCheckAuthAction =
  | IGetCheckAuthRequestAction
  | IGetCheckAuthSuccessAction
  | IGetCheckAuthFailedAction;

export const getGetCheckAuthRequestAction = (): TGetCheckAuthAction => ({
  type: GET_CHECK_AUTH_REQUEST,
});
export const getGetCheckAuthSuccessAction = (
  data: TUser
): TGetCheckAuthAction => ({
  type: GET_CHECK_AUTH_SUCCESS,
  data,
});
export const getGetCheckAuthFailedAction = (): TGetCheckAuthAction => ({
  type: GET_CHECK_AUTH_FAILED,
});

export const onCheckAuth: AppThunk =
  (accessToken: string, refreshToken: string) => (dispatch: AppDispatch) => {
    dispatch(getLoadingStartAction());
    dispatch(getGetCheckAuthRequestAction());
    checkValidity(accessToken)
      .then((data) => {
        if (data && data.success) {
          dispatch(getLeggedInAction());
          dispatch(getGetCheckAuthSuccessAction(data));
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          dispatch(getLoadingEndAction());
        } else if (data && !data.success) {
          onRefreshToken(refreshToken);
        } else {
          dispatch(getGetCheckAuthFailedAction());
        }
      })
      .catch(() => {
        dispatch(getGetCheckAuthFailedAction());
      });
  };
