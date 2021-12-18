import {
  GET_CHECK_AUTH_FAILED,
  GET_CHECK_AUTH_REQUEST,
  GET_CHECK_AUTH_SUCCESS,
} from 'services/actions/auth/check_auth';
import {
  GET_EDITPROFILE_FAILED,
  GET_EDITPROFILE_REQUEST,
  GET_EDITPROFILE_SUCCESS,
  GET_EDITPROFILE_RESET,
} from 'services/actions/auth/edit_profile';
import {
  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
} from 'services/actions/auth/login';
import {
  GET_RECOVERY_PASSWORD_FAILED,
  GET_RECOVERY_PASSWORD_REQUEST,
  GET_RECOVERY_PASSWORD_SUCCESS,
} from 'services/actions/auth/recovery_password';
import {
  GET_REFRESH_TOKEN_FAILED,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
} from 'services/actions/auth/refresh_token';
import {
  GET_REGISTER_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
} from 'services/actions/auth/register';
import {
  GET_RESET_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
} from 'services/actions/auth/reset_password';
import {
  GET_SIGNOUT_FAILED,
  GET_SIGNOUT_SUCCESS,
  GET_SIGNOUT_REQUEST,
} from 'services/actions/auth/signout';
import {
  GET_LOGGED_IN,
  LOADING_END,
  LOADING_START,
} from 'services/actions/auth';

const initialState = {
  email: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  registerRequest: false,
  regiterFailed: false,
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

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_START: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_LOGGED_IN: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case GET_CHECK_AUTH_REQUEST: {
      return {
        ...state,
        chekAuthRequest: true,
      };
    }
    case GET_CHECK_AUTH_SUCCESS: {
      return {
        ...state,
        chekAuthRequest: false,
        chekAuthFailed: false,
        chekAuthSuccess: true,
        loggedIn: true,
        email: action.data.user.email,
        name: action.data.user.name,
      };
    }
    case GET_CHECK_AUTH_FAILED: {
      return {
        ...state,
        chekAuthRequest: false,
        chekAuthFailed: true,
      };
    }
    case GET_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshTokenRequest: true,
      };
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: false,
        refreshTokenSuccess: true,
        accessToken: action.data.accessToken.split('Bearer ')[1],
        refreshToken: action.data.refreshToken,
      };
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: true,
      };
    }
    case GET_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false,
        resetPasswordSuccess: true,
      };
    }
    case GET_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }
    case GET_RECOVERY_PASSWORD_REQUEST: {
      return {
        ...state,
        recoveryPasswordRequest: true,
      };
    }
    case GET_RECOVERY_PASSWORD_SUCCESS: {
      return {
        ...state,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: false,
        recoveryPasswordSuccess: true,
      };
    }
    case GET_RECOVERY_PASSWORD_FAILED: {
      return {
        ...state,
        recoveryPasswordRequest: false,
        recoveryPasswordFailed: true,
      };
    }
    case GET_EDITPROFILE_REQUEST: {
      return {
        ...state,
        editProfileRequest: true,
      };
    }
    case GET_EDITPROFILE_SUCCESS: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileFailed: false,
        editProfileSuccess: true,
        email: action.data.user.email,
        name: action.data.user.name,
      };
    }
    case GET_EDITPROFILE_FAILED: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileFailed: true,
      };
    }
    case GET_EDITPROFILE_RESET: {
      return {
        ...state,
        editProfileRequest: false,
        editProfileFailed: false,
        editProfileSuccess: false,
      };
    }
    case GET_SIGNOUT_REQUEST: {
      return {
        ...state,
        signOutRequest: true,
      };
    }
    case GET_SIGNOUT_SUCCESS: {
      return {
        ...state,
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
      };
    }
    case GET_SIGNOUT_FAILED: {
      return {
        ...state,
        signOutRequest: false,
        signOutFailed: true,
      };
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        loginSuccess: true,
        loggedIn: true,
        email: action.data.user.email,
        accessToken: action.data.accessToken.split('Bearer ')[1],
        refreshToken: action.data.refreshToken,
        name: action.data.user.name,
        signOutSuccess: false,
      };
    }
    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case GET_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        registerSuccess: true,
        loggedIn: true,
        signOutSuccess: false,
        email: action.data.user.email,
        name: action.data.user.name,
        accessToken: action.data.accessToken.split('Bearer ')[1],
        refreshToken: action.data.refreshToken,
      };
    }
    case GET_REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
