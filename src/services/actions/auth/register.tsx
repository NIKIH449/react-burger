import { TRegister } from 'utils/types';
import { signUp } from 'utils/auth';
import { AppDispatch, AppThunk } from 'utils';

export const GET_REGISTER_REQUEST: 'GET_REGISTER_REQUEST' =
  'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS: 'GET_REGISTER_SUCCESS' =
  'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED: 'GET_REGISTER_FAILED' = 'GET_REGISTER_FAILED';
export interface IGetRegisterRequestAction {
  readonly type: typeof GET_REGISTER_REQUEST;
}

export interface IGetRegisterSuccessAction {
  readonly type: typeof GET_REGISTER_SUCCESS;
  readonly data: TRegister;
}
export interface IGetRegisterFailedAction {
  readonly type: typeof GET_REGISTER_FAILED;
}
export type TGetRegisterAction =
  | IGetRegisterRequestAction
  | IGetRegisterSuccessAction
  | IGetRegisterFailedAction;

export const getRegisterRequestAction = (): TGetRegisterAction => ({
  type: GET_REGISTER_REQUEST,
});

export const getRegisterSuccessAction = (
  data: TRegister
): TGetRegisterAction => ({
  type: GET_REGISTER_SUCCESS,
  data,
});

export const getRegisterFailedAction = (): TGetRegisterAction => ({
  type: GET_REGISTER_FAILED,
});
export const onRegister: AppThunk =
  (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
    dispatch(getRegisterRequestAction());
    signUp(email, password, name)
      .then((data) => {
        if (data && data.success) {
          console.log(data)
          dispatch(getRegisterSuccessAction(data));
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          localStorage.setItem(
            'accessToken',
            data.accessToken.split('Bearer ')[1]
          );
          localStorage.setItem('refreshToken', data.refreshToken);
        } else {
          dispatch(getRegisterFailedAction());
        }
      })
      .catch(() => {
        dispatch(getRegisterFailedAction());
      });
  };
