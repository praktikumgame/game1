import { Dispatch } from 'redux';
import { authApi } from '../../services/api';
import { getErrorMessageByStatus as errorHandler } from '../../services/api/helpers/signInStatus';
import { SignInValuesType } from '../../services/api';
import { authorize, getUserInfo } from '../auth/actions';
import { SIGNIN_PENDING, SIGNIN_ERROR, SIGNIN_STOP_PENDING, SIGNIN_CLEAR_ERROR } from './types';

function signinPending() {
  return {
    type: SIGNIN_PENDING,
  };
}

function signinStopPending() {
  return {
    type: SIGNIN_STOP_PENDING,
  };
}

function signinError(text: string) {
  return {
    type: SIGNIN_ERROR,
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

      await authApi.signin(inputValues);

      const userInfo = await getUserInfo();
      dispatch(authorize(userInfo));
    } catch ({ status }) {
      dispatch(signinError(errorHandler(status)));
    } finally {
      dispatch(signinStopPending());
    }
  };
}

export { signinUser };
