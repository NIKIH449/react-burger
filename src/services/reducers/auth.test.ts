import { authReducer } from './auth';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as registerTypes from '../actions/auth/register';
import * as loginTypes from '../actions/auth/login';
import * as signOutTypes from '../actions/auth/signout';
import * as helpersTypes from '../actions/auth/helpers';
import * as authTypes from '../actions/auth/check-auth';
import * as editProfileTypes from '../actions/auth/edit-profile';
import * as recoveryPasswordTypes from '../actions/auth/recovery-password';
import * as passwordResetTypes from '../actions/auth/reset-password';
import * as refreshTokenTypes from '../actions/auth/refresh-token';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  email: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  authLoading: false,
  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,

  loginRequest: false,
  loginFailed: false,
  loginSuccess: false,

  signOutRequest: false,
  signOutFailed: false,
  signOutSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,

  recoveryPasswordRequest: false,
  recoveryPasswordFailed: false,
  recoveryPasswordSuccess: false,

  editProfileRequest: false,
  editProfileFailed: false,
  editProfileSuccess: false,

  refreshTokenRequest: false,
  refreshTokenFailed: false,
  refreshTokenSuccess: false,

  chekAuthRequest: false,
  chekAuthFailed: false,
  chekAuthSuccess: false,
  loading: false,
  loggedIn: false,
};

describe('Auth reducer', () => {
  it('should return the initinal state', () => {
    expect(authReducer(initialState, {} as any)).toEqual(initialState);
  });
  it('handler loading should run', () => {
    expect(
      authReducer(initialState, { type: helpersTypes.LOADING_START })
    ).toEqual(
      expect.objectContaining({
        loading: true,
      })
    );
  });
  it('handler loading should stop', () => {
    expect(
      authReducer(initialState, { type: helpersTypes.LOADING_END })
    ).toEqual(
      expect.objectContaining({
        loading: false,
      })
    );
  });
  it('handler loggedIn should run', () => {
    expect(
      authReducer(initialState, { type: helpersTypes.GET_LOGGED_IN })
    ).toEqual(
      expect.objectContaining({
        loggedIn: true,
      })
    );
  });
  it('handler authRequest should run', () => {
    expect(
      authReducer(initialState, { type: authTypes.GET_CHECK_AUTH_REQUEST })
    ).toEqual(
      expect.objectContaining({
        authLoading: true,
        chekAuthRequest: true,
      })
    );
  });
  it('handler authSuccess should run', () => {
    expect(
      authReducer(initialState, {
        type: authTypes.GET_CHECK_AUTH_SUCCESS,
        // @ts-ignore
        data: {
          success: true,
          user: { email: 'test@gmail.com', name: 'testName' },
        },
      })
    ).toEqual(
      expect.objectContaining({
        authLoading: false,
        chekAuthRequest: false,
        chekAuthFailed: false,
        chekAuthSuccess: true,
        loggedIn: true,
        email: 'test@gmail.com',
        name: 'testName',
      })
    );
  });
  it('handler authFailer should run', () => {
    expect(
      authReducer(initialState, { type: authTypes.GET_CHECK_AUTH_FAILED })
    ).toEqual(
      expect.objectContaining({
        authLoading: false,
        chekAuthRequest: false,
        chekAuthFailed: true,
      })
    );
  });
  it('handler refreshTokenRequest should run', () => {
    expect(
      authReducer(initialState, {
        type: refreshTokenTypes.GET_REFRESH_TOKEN_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        refreshTokenRequest: true,
      })
    );
  });
  it('handler refreshTokenSuccess should run', () => {
    expect(
      authReducer(initialState, {
        type: refreshTokenTypes.GET_REFRESH_TOKEN_SUCCESS,
        data: { accessToken: 'test', refreshToken: 'test', success: true },
      })
    ).toEqual(
      expect.objectContaining({
        refreshTokenRequest: false,
        refreshTokenFailed: false,
        refreshTokenSuccess: true,
      })
    );
  });
  it('handler refreshTokenFailed should run', () => {
    expect(
      authReducer(initialState, {
        type: refreshTokenTypes.GET_REFRESH_TOKEN_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        refreshTokenRequest: false,
        refreshTokenFailed: true,
      })
    );
  });
  it('handler passwordResetRequest should run', () => {
    expect(
      authReducer(initialState, {
        type: passwordResetTypes.GET_RESET_PASSWORD_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        resetPasswordRequest: true,
      })
    );
  });
  it('handler passwordResetSuccess should run', () => {
    expect(
      authReducer(initialState, {
        type: passwordResetTypes.GET_RESET_PASSWORD_SUCCESS,
        data: { message: 'test', success: true },
      })
    ).toEqual(
      expect.objectContaining({
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: true,
      })
    );
  });
  it('handler passwordResetFailed should run', () => {
    expect(
      authReducer(initialState, {
        type: passwordResetTypes.GET_RESET_PASSWORD_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      })
    );
  });
  it('handler recoveryPasswordRequest should run', () => {
    expect(
      authReducer(initialState, {
        type: recoveryPasswordTypes.GET_RECOVERY_PASSWORD_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        recoveryPasswordRequest: true,
      })
    );
  });
  it('handler recoveryPasswordSuccess should run', () => {
    expect(
      authReducer(initialState, {
        type: recoveryPasswordTypes.GET_RECOVERY_PASSWORD_SUCCESS,
        // @ts-ignore
        data: { message: 'Reset email sent', success: true },
      })
    ).toEqual(
      expect.objectContaining({
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: false,
        recoveryPasswordSuccess: true,
      })
    );
  });
  it('handler recoveryPasswordFailed should run', () => {
    expect(
      authReducer(initialState, {
        type: recoveryPasswordTypes.GET_RECOVERY_PASSWORD_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: true,
      })
    );
  });
  it('handler editProfileRequest should run', () => {
    expect(
      authReducer(initialState, {
        type: editProfileTypes.GET_EDITPROFILE_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        editProfileRequest: true,
      })
    );
  });
  it('handler editProfileFailed should run', () => {
    expect(
      authReducer(initialState, {
        type: editProfileTypes.GET_EDITPROFILE_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        editProfileRequest: false,
        editProfileFailed: true,
      })
    );
  });
  it('handler editProfileReset should run', () => {
    expect(
      authReducer(initialState, {
        type: editProfileTypes.GET_EDITPROFILE_RESET,
      })
    ).toEqual(
      expect.objectContaining({
        editProfileRequest: false,
        editProfileFailed: false,
        editProfileSuccess: false,
      })
    );
  });
  it('handler signOutRequest should run', () => {
    expect(
      authReducer(initialState, {
        type: signOutTypes.GET_SIGNOUT_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        signOutRequest: true,
      })
    );
  });
  it('handler signOutSuccess should run', () => {
    expect(
      authReducer(initialState, {
        type: signOutTypes.GET_SIGNOUT_SUCCESS,
        data: {
          success: true,
          // @ts-ignore
          data: { success: true, message: 'Successful logout' },
        },
      })
    ).toEqual(
      expect.objectContaining({
        signOutRequest: false,
        signOutFailed: false,
        signOutSuccess: true,
        loginSuccess: false,
        registerSuccess: false,
        chekAuthSuccess: false,
        editProfileSuccess: false,
        loggedIn: false,
        email: '',
        accessToken: '',
        refreshToken: '',
        name: '',
      })
    );
  });
  it('handler signOutFailed should run', () => {
    expect(
      authReducer(initialState, {
        type: editProfileTypes.GET_EDITPROFILE_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        editProfileRequest: false,
        editProfileFailed: true,
      })
    );
  });
  it('handler loginRequest should run', () => {
    expect(
      authReducer(initialState, {
        type: loginTypes.GET_LOGIN_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        loginRequest: true,
      })
    );
  });
  it('handler loginFailed should run', () => {
    expect(
      authReducer(initialState, {
        type: loginTypes.GET_LOGIN_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        loginRequest: false,
        loginFailed: true,
      })
    );
  });
  it('handler registerRequest should run', () => {
    expect(
      authReducer(initialState, {
        type: registerTypes.GET_REGISTER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        registerRequest: true,
      })
    );
  });
  it('handler registerFailed should run', () => {
    expect(
      authReducer(initialState, {
        type: registerTypes.GET_REGISTER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        registerRequest: false,
        registerFailed: true,
      })
    );
  });
});

describe('async actions', () => {
  beforeEach(() => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        {
          success: true,
          user: {
            email: 'test@gmail.com',
            name: 'test',
          },
        } || { refreshToken: 'test', accessToken: 'test' }
      ),
    });
  });

  it('checking fetching checkAuth has been done', async () => {
    const expectedActions = [
      {
        type: authTypes.GET_CHECK_AUTH_REQUEST,
      },
      {
        type: helpersTypes.GET_LOGGED_IN,
      },
      {
        data: {
          success: true,
          user: {
            email: 'test@gmail.com',
            name: 'test',
          },
        },
        type: authTypes.GET_CHECK_AUTH_SUCCESS,
      },
    ];
    const store = mockStore(initialState);
    // @ts-ignore
    return store.dispatch(authTypes.onCheckAuth('token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
