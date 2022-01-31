import { TDefaultResponse } from 'utils/types';
import { resetPassword } from 'utils/auth';
import { getRecoveryPasswordFailedAction } from './recovery-password';
import { getRegisterRequestAction } from './register';
import { AppDispatch, AppThunk } from 'utils';

export const GET_RESET_PASSWORD_REQUEST: 'GET_RESET_PASSWORD_REQUEST' =
  'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS: 'GET_RESET_PASSWORD_SUCCESS' =
  'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED: 'GET_RESET_PASSWORD_FAILED' =
  'GET_RESET_PASSWORD_FAILED';
export interface IGetResetPasswordRequestAction {
  readonly type: typeof GET_RESET_PASSWORD_REQUEST;
}

export interface IGetResetPasswordSuccessAction {
  readonly type: typeof GET_RESET_PASSWORD_SUCCESS;
  readonly data: TDefaultResponse;
}
export interface IGetResetPasswordFailedAction {
  readonly type: typeof GET_RESET_PASSWORD_FAILED;
}
export type TGetResetPasswordAction =
  | IGetResetPasswordRequestAction
  | IGetResetPasswordSuccessAction
  | IGetResetPasswordFailedAction;

export const getResetPasswordRequestAction = (): TGetResetPasswordAction => ({
  type: GET_RESET_PASSWORD_REQUEST,
});

export const getResetPasswordSuccessAction = (
  data: TDefaultResponse
): TGetResetPasswordAction => ({
  type: GET_RESET_PASSWORD_SUCCESS,
  data,
});

export const getResetPasswordFailedAction = (): TGetResetPasswordAction => ({
  type: GET_RESET_PASSWORD_FAILED,
});
export const onResetPassword: AppThunk =
  (password: string, token: string) => (dispatch: AppDispatch) => {
    dispatch(getRegisterRequestAction());
    resetPassword(password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch(getResetPasswordSuccessAction(data));
        } else {
          dispatch(getRecoveryPasswordFailedAction());
        }
      })
      .catch(() => {
        dispatch(getRecoveryPasswordFailedAction());
      });
  };
