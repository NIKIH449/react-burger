import { TLogin } from 'utils/types';
import { signIn } from 'utils/auth';
import { AppDispatch, AppThunk } from 'utils';
export const GET_LOGIN_REQUEST: 'GET_LOGIN_REQUEST' = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS: 'GET_LOGIN_SUCCESS' = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED: 'GET_LOGIN_FAILED' = 'GET_LOGIN_FAILED';

export interface ILoginRequestAction {
  readonly type: typeof GET_LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
  readonly data: TLogin;
}
export interface ILoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
}
export type TLoginAction =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction;

export const getLoginRequestAction = (): TLoginAction => ({
  type: GET_LOGIN_REQUEST,
});

export const getLoginSuccessAction = (data: TLogin): TLoginAction => ({
  type: GET_LOGIN_SUCCESS,
  data,
});

export const getLoginFailedAction = (): TLoginAction => ({
  type: GET_LOGIN_FAILED,
});

export const onLogin: AppThunk =
  (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(getLoginRequestAction());
    signIn(email, password)
      .then((data) => {
        if (data && data.success) {
          dispatch(getLoginSuccessAction(data));
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem(
            'accessToken',
            data.accessToken.split('Bearer ')[1]
          );
          localStorage.setItem('refreshToken', data.refreshToken);
        } else {
          dispatch(getLoginFailedAction());
        }
      })
      .catch(() => {
        dispatch(getLoginFailedAction());
      });
  };
