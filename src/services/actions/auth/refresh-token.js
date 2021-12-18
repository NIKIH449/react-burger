import { refreshingToken } from 'utils/auth';
import { LOADING_END } from '.';
export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS';
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

export function onRefreshToken(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: GET_REFRESH_TOKEN_REQUEST,
    });
    refreshingToken(refreshToken)
      .then((data) => {
        if (data && data.success) {
          dispatch({
            type: GET_REFRESH_TOKEN_SUCCESS,
            data: data,
          });
        } else {
          dispatch({
            type: LOADING_END,
          });
          dispatch({ type: GET_REFRESH_TOKEN_FAILED });
        }
      })
      .catch(() => {
        dispatch({
          type: LOADING_END,
        });
        dispatch({ type: GET_REFRESH_TOKEN_FAILED });
      });
  };
}
