import { Dispatch } from 'redux';
import { authApi } from '../../services/api';
import { SIGNIN_PENDING, SIGNIN_SUCCESS, SIGNIN_FATAL, SIGNIN_CLEAR_ERROR } from './types';
import { getErrorMessageByStatus as errorHandler } from '../../services/api/helpers/signInStatus';
import { SignInValuesType } from '../../services/api';
import { authorize, getUserInfo } from '../auth/actions';

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

function clearError() {
  return {
    type: SIGNIN_CLEAR_ERROR,
  };
}

function signinUser(inputValues: SignInValuesType) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(clearError());
      dispatch(signinPending());
      const statusMessage = await authApi.signin(inputValues);

      if (statusMessage === 'OK') {
        const userInfo = await getUserInfo();
        dispatch(authorize(userInfo));
      }

      dispatch(signinSuccess());
    } catch ({ status }) {
      dispatch(signinError(errorHandler(status)));
    }
  };
}

export { signinUser };
