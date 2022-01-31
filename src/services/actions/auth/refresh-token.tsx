import { AppDispatch, AppThunk } from 'utils';
import { refreshingToken } from 'utils/auth';
import { TRefreshToken } from 'utils/types';
import { getLoadingEndAction } from '.';
export const GET_REFRESH_TOKEN_REQUEST: 'GET_REFRESH_TOKEN_REQUEST' =
  'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS: 'GET_REFRESH_TOKEN_SUCCESS' =
  'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED: 'GET_REFRESH_TOKEN_FAILED' =
  'GET_REFRESH_TOKEN_FAILED';
export interface IGetRefreshTokenRequestAction {
  readonly type: typeof GET_REFRESH_TOKEN_REQUEST;
}

export interface IGetRefreshTokenSuccessAction {
  readonly type: typeof GET_REFRESH_TOKEN_SUCCESS;
  readonly data: TRefreshToken;
}
export interface IGetRefreshTokenFailedAction {
  readonly type: typeof GET_REFRESH_TOKEN_FAILED;
}
export type TGetRefreshTokenAction =
  | IGetRefreshTokenRequestAction
  | IGetRefreshTokenSuccessAction
  | IGetRefreshTokenFailedAction;

export const getRefreshTokenRequestAction = (): TGetRefreshTokenAction => ({
  type: GET_REFRESH_TOKEN_REQUEST,
});

export const getRefreshTokenSuccessAction = (
  data: TRefreshToken
): TGetRefreshTokenAction => ({
  type: GET_REFRESH_TOKEN_SUCCESS,
  data,
});

export const getRefreshTokenFailedAction = (): TGetRefreshTokenAction => ({
  type: GET_REFRESH_TOKEN_FAILED,
});
export const onRefreshToken: AppThunk =
  (refreshToken: string) => (dispatch: AppDispatch) => {
    dispatch(getRefreshTokenRequestAction());
    refreshingToken(refreshToken)
      .then((data) => {
        if (data && data.success) {
          dispatch(getRefreshTokenSuccessAction(data));
        } else {
          dispatch(getLoadingEndAction());
          dispatch(getRefreshTokenFailedAction());
        }
      })
      .catch(() => {
        dispatch(getLoadingEndAction());
        dispatch(getRefreshTokenFailedAction());
      });
  };
