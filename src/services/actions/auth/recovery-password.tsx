import { TRecoveryPassword } from 'utils/types';
import { recoveryPassword } from 'utils/auth';
import { AppDispatch, AppThunk } from 'utils';
export const GET_RECOVERY_PASSWORD_REQUEST: 'GET_RECOVERY_PASSWORD_REQUEST' =
  'GET_RECOVERY_PASSWORD_REQUEST';
export const GET_RECOVERY_PASSWORD_SUCCESS: 'GET_RECOVERY_PASSWORD_SUCCESS' =
  'GET_RECOVERY_PASSWORD_SUCCESS';
export const GET_RECOVERY_PASSWORD_FAILED: 'GET_RECOVERY_PASSWORD_FAILED' =
  'GET_RECOVERY_PASSWORD_FAILED';
export interface IGetRecoveryPasswordRequestAction {
  readonly type: typeof GET_RECOVERY_PASSWORD_REQUEST;
}

export interface IGetRecoveryPasswordSuccessAction {
  readonly type: typeof GET_RECOVERY_PASSWORD_SUCCESS;
  readonly data: TRecoveryPassword;
}
export interface IGetRecoveryPasswordFailedAction {
  readonly type: typeof GET_RECOVERY_PASSWORD_FAILED;
}
export type TRecoveryPasswordAction =
  | IGetRecoveryPasswordRequestAction
  | IGetRecoveryPasswordSuccessAction
  | IGetRecoveryPasswordFailedAction;

export const getRecoveryPasswordRequestAction = (): TRecoveryPasswordAction => ({
  type: GET_RECOVERY_PASSWORD_REQUEST,
});

export const getRecoveryPasswordSuccessAction = (
  data: TRecoveryPassword
): TRecoveryPasswordAction => ({
  type: GET_RECOVERY_PASSWORD_SUCCESS,
  data,
});

export const getRecoveryPasswordFailedAction = (): TRecoveryPasswordAction => ({
  type: GET_RECOVERY_PASSWORD_FAILED,
});
export const onRecoveryPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch(getRecoveryPasswordRequestAction());
  recoveryPassword(email)
    .then((data) => {
      if (data && data.success) {
        dispatch(getRecoveryPasswordSuccessAction(data));
      } else {
        dispatch(getRecoveryPasswordFailedAction());
      }
    })
    .catch(() => {
      dispatch(getRecoveryPasswordFailedAction());
    });
};
