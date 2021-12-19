import { signOut } from 'utils/auth';
export const GET_SIGNOUT_REQUEST = 'GET_SIGNOUT_REQUEST';
export const GET_SIGNOUT_SUCCESS = 'GET_SIGNOUT_SUCCESS';
export const GET_SIGNOUT_FAILED = 'GET_SIGNOUT_FAILED';

export function onSignOut(token) {
  return function (dispatch) {
    dispatch({
      type: GET_SIGNOUT_REQUEST,
    });
    signOut(token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_SIGNOUT_SUCCESS,
            data: data,
          });
        } else {
          dispatch({ type: GET_SIGNOUT_FAILED });
        }
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
      })
      .catch(() => {
        dispatch({ type: GET_SIGNOUT_FAILED });
      });
  };
}
