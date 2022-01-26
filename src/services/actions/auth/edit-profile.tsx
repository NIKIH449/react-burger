import { TUser } from 'utils/types';
import { updateUserInfo } from 'utils/auth';
import { onRefreshToken } from '.';
import { AppDispatch, AppThunk } from 'utils';
export const GET_EDITPROFILE_REQUEST: 'GET_EDITPROFILE_REQUEST' =
  'GET_EDITPROFILE_REQUEST';
export const GET_EDITPROFILE_SUCCESS: 'GET_EDITPROFILE_SUCCESS' =
  'GET_EDITPROFILE_SUCCESS';
export const GET_EDITPROFILE_FAILED: 'GET_EDITPROFILE_FAILED' =
  'GET_EDITPROFILE_FAILED';
export const GET_EDITPROFILE_RESET: 'GET_EDITPROFILE_RESET' =
  'GET_EDITPROFILE_RESET';
export interface IGetEditProfileRequestAction {
  readonly type: typeof GET_EDITPROFILE_REQUEST;
}

export interface IGetEditProfileSuccessAction {
  readonly type: typeof GET_EDITPROFILE_SUCCESS;
  readonly data: Omit<TUser, 'accessToken' & 'refreshToken'>;
}
export interface IGetEditProfileFailedAction {
  readonly type: typeof GET_EDITPROFILE_FAILED;
}
export interface IGetEditProfileResetAction {
  readonly type: typeof GET_EDITPROFILE_RESET;
}
export type TGetEditProfile =
  | IGetEditProfileRequestAction
  | IGetEditProfileSuccessAction
  | IGetEditProfileFailedAction
  | IGetEditProfileResetAction;

export const getGetEditProfileRequestAction = (): TGetEditProfile => ({
  type: GET_EDITPROFILE_REQUEST,
});
export const getGetEditProfileSuccessAction = (
  data: Omit<TUser, 'accessToken' & 'refreshToken'>
): TGetEditProfile => ({
  type: GET_EDITPROFILE_SUCCESS,
  data,
});
export const getGetEditProfileFailedAction = (): TGetEditProfile => ({
  type: GET_EDITPROFILE_FAILED,
});
export const getGetEditProfileResetAction = (): TGetEditProfile => ({
  type: GET_EDITPROFILE_RESET,
});

export const onEditUserInfo: AppThunk =
  (
    email: string,
    name: string,
    password: string,
    token: string,
    refreshToken: string
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(getGetEditProfileRequestAction());
    updateUserInfo(email, name, password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch(getGetEditProfileSuccessAction(data));
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
        } else if (data && !data.success) {
          onRefreshToken(refreshToken);
        } else {
          dispatch(getGetEditProfileFailedAction());
        }
      })
      .catch(() => {
        dispatch(getGetEditProfileFailedAction());
      });
  };
