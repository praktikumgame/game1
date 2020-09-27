import { Dispatch } from 'redux';
import { authApi, SignupValuesType } from '../../services/api';
import { SIGNUP_PENDING, SIGNUP_SUCCESS, SIGNUP_FATAL, SIGNUP_CLEAR_ERROR } from './types';
import { getErrorMessageByStatusAndText as errorHandler } from '../../services/api/helpers/signUpStatus';
import { authorize, getUserInfo } from '../auth/actions';

function signinPending() {
  return {
    type: SIGNUP_PENDING,
  };
}

function signinSuccess() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

function signinError(text: string) {
  return {
    type: SIGNUP_FATAL,
    payload: { error: text },
  };
}

function clearError() {
  return {
    type: SIGNUP_CLEAR_ERROR,
  };
}

function signupUser(inputValues: SignupValuesType) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(clearError());
      dispatch(signinPending());
      const statusMessage = await authApi.signup(inputValues);

      if (statusMessage === 'OK') {
        const userInfo = await getUserInfo();
        dispatch(authorize(userInfo));
      }

      dispatch(signinSuccess());
    } catch ({ reason, status }) {
      dispatch(signinError(errorHandler(reason, status)));
    }
  };
}

export { signupUser };
