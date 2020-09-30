import { SIGNUP_PENDING, SIGNUP_PENDING_STOP, SIGNUP_ERROR, SIGNUP_CLEAR_ERROR } from './types';

interface ISignupState {
  pending: boolean;
  error: string;
}

interface IAction {
  type: string;
  payload: ISignupState;
}

const initialState: ISignupState = {
  pending: false,
  error: '',
};

const signupReducer = (state: ISignupState = initialState, action: IAction) => {
  switch (action.type) {
    case SIGNUP_PENDING: {
      return { ...state, pending: true };
    }
    case SIGNUP_PENDING_STOP: {
      return { ...state, pending: false };
    }
    case SIGNUP_ERROR: {
      return { ...state, ...action.payload };
    }
    case SIGNUP_CLEAR_ERROR: {
      return { ...state, error: '' };
    }
  }
  return state;
};

export { signupReducer, ISignupState };
