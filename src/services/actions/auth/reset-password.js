import { resetPassword } from 'utils/auth';

export const GET_RESET_PASSWORD_REQUEST = 'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED = 'GET_RESET_PASSWORD_FAILED';

export function onResetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: GET_RESET_PASSWORD_REQUEST,
    });
    resetPassword(password, token)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_RESET_PASSWORD_SUCCESS,
            data: data,
          });
        } else {
          dispatch({ type: GET_RESET_PASSWORD_FAILED });
        }
      })
      .catch(() => {
        dispatch({ type: GET_RESET_PASSWORD_FAILED });
      });
  };
}
