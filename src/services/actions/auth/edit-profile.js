import { updateUserInfo } from 'utils/auth';
import { onRefreshToken } from '.';
export const GET_EDITPROFILE_REQUEST = 'GET_EDITPROFILE_REQUEST';
export const GET_EDITPROFILE_SUCCESS = 'GET_EDITPROFILE_SUCCESS';
export const GET_EDITPROFILE_FAILED = 'GET_EDITPROFILE_FAILED';
export const GET_EDITPROFILE_RESET = 'GET_EDITPROFILE_RESET';
export function onEditUserInfo(email, name, password, token, refreshToken) {
  return function (dispatch) {
    dispatch({
      type: GET_EDITPROFILE_REQUEST,
    });
    updateUserInfo(email, name, password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_EDITPROFILE_SUCCESS,
            data: data,
          });
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
        } else if (data && !data.success) {
          dispatch(onRefreshToken(refreshToken));
        } else {
          dispatch({ type: GET_EDITPROFILE_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_EDITPROFILE_FAILED });
      });
  };
}
