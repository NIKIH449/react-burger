import { TDefaultResponse } from 'utils/types';
import { signOut } from 'utils/auth';
import { AppDispatch, AppThunk } from 'utils';
export const GET_SIGNOUT_SUCCESS: 'GET_SIGNOUT_SUCCESS' = 'GET_SIGNOUT_SUCCESS';
export const GET_SIGNOUT_REQUEST: 'GET_SIGNOUT_REQUEST' = 'GET_SIGNOUT_REQUEST';
export const GET_SIGNOUT_FAILED: 'GET_SIGNOUT_FAILED' = 'GET_SIGNOUT_FAILED';
export interface IGetSignoutRequestAction {
  readonly type: typeof GET_SIGNOUT_REQUEST;
}

export interface IGetSignoutSuccessAction {
  readonly type: typeof GET_SIGNOUT_SUCCESS;
  readonly data: TDefaultResponse;
}
export interface IGetSignoutFailedAction {
  readonly type: typeof GET_SIGNOUT_FAILED;
}
export type TGetSignoutAction =
  | IGetSignoutRequestAction
  | IGetSignoutSuccessAction
  | IGetSignoutFailedAction;

export const getSignoutRequestAction = (): TGetSignoutAction => ({
  type: GET_SIGNOUT_REQUEST,
});

export const getSignoutSuccessAction = (data: TDefaultResponse): TGetSignoutAction => ({
  type: GET_SIGNOUT_SUCCESS,
  data,
});

export const getSignoutFailedAction = (): TGetSignoutAction => ({
  type: GET_SIGNOUT_FAILED,
});
export const onSignOut: AppThunk = (token: string) => (dispatch: AppDispatch) => {
  dispatch(getSignoutRequestAction());
  signOut(token)
    .then((data) => {
      if (data && data.success) {
        dispatch(getSignoutSuccessAction(data));
      } else {
        dispatch(getSignoutFailedAction());
      }
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
    })
    .catch(() => {
      dispatch(getSignoutFailedAction());
    });
};
