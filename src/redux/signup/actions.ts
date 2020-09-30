import { Dispatch } from 'redux';
import { authApi, SignupValuesType } from '../../services/api';
import { getErrorMessageByStatusAndText as errorHandler } from '../../services/api/helpers/signUpStatus';
import { authorize, getUserInfo } from '../auth/actions';
import { SIGNUP_PENDING, SIGNUP_PENDING_STOP, SIGNUP_ERROR, SIGNUP_CLEAR_ERROR } from './types';

function signinPending() {
  return {
    type: SIGNUP_PENDING,
  };
}

function signupStopPending() {
  return {
    type: SIGNUP_PENDING_STOP,
  };
}

function signinError(text: string) {
  return {
    type: SIGNUP_ERROR,
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
    } catch ({ reason, status }) {
      dispatch(signinError(errorHandler(reason, status)));
    } finally {
      dispatch(signupStopPending());
    }
  };
}

export { signupUser };
