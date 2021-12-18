import { checkValidity } from 'utils/auth';
import { onRefreshToken } from '.';
import { LOADING_END } from '.';
import { GET_LOGGED_IN } from '.';
import { LOADING_START } from '.';
export const GET_CHECK_AUTH_REQUEST = 'GET_CHECK_AUTH_REQUEST';
export const GET_CHECK_AUTH_SUCCESS = 'GET_CHECK_AUTH_SUCCESS';
export const GET_CHECK_AUTH_FAILED = 'GET_CHECK_AUTH_FAILED';

export function onCheckAuth(accessToken, refreshToken) {
  return function (dispatch) {
    dispatch({ type: LOADING_START });
    dispatch({
      type: GET_CHECK_AUTH_REQUEST,
    });
    checkValidity(accessToken)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_LOGGED_IN,
          });
          dispatch({
            type: GET_CHECK_AUTH_SUCCESS,
            data: data,
          });
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('userEmail', data.user.email);
          dispatch({
            type: LOADING_END,
          });
        } else if (data && !data.success) {
          dispatch(onRefreshToken(refreshToken));
        } else {
          dispatch({ type: GET_CHECK_AUTH_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_CHECK_AUTH_FAILED });
      });
  };
}
