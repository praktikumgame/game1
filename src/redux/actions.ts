import { Dispatch } from 'redux';
import { authApi } from '../services/api';
import { userInfoStateType } from './authReducer';
import { AUTHORIZE, SIGNIN_PENDING, SIGNIN_SUCCESS, SIGNIN_FATAL, SIGNIN_CLEAR_ERROR, LOGOUT, INIT_APP } from './types';

// TypeScript types
import { SignInValuesType } from '../components';

//Helpers
import { getErrorMessageByStatus as errorHandler } from '../services/api/helpers/signInStatus';

async function getUserInfo(): Promise<userInfoStateType> {
  const userData = await authApi.getUserInfo();
  const { login, avatar } = JSON.parse(userData);
  return { login, avatar };
}

function signinPending() {
  return {
    type: SIGNIN_PENDING,
  };
}

function signinSuccess() {
  return {
    type: SIGNIN_SUCCESS,
  };
}

function signinError(text: string) {
  return {
    type: SIGNIN_FATAL,
    payload: { error: text },
  };
}

function logout() {
  return async (dispatch: Dispatch) => {
    await authApi.logout();
    dispatch({ type: LOGOUT });
  };
}

function checkAuthorize() {
  return async (dispatch: Dispatch) => {
    try {
      const userInfo = await getUserInfo();
      dispatch({ type: AUTHORIZE, payload: { ...userInfo } });
    } catch {
      logout();
    }
    dispatch({ type: INIT_APP });
  };
}

function signinUser(inputValues: SignInValuesType) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SIGNIN_CLEAR_ERROR });
      dispatch(signinPending());
      const statusMessage = await authApi.signin(inputValues);
      console.log(statusMessage);
      if (statusMessage === 'OK') {
        const userInfo = await getUserInfo();
        dispatch({ type: AUTHORIZE, payload: { ...userInfo } });
      }
      dispatch(signinSuccess());
    } catch ({ status }) {
      dispatch(signinError(errorHandler(status)));
    }
  };
}

export { signinUser, checkAuthorize, logout };
