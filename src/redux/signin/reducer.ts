import { SIGNIN_PENDING, SIGNIN_ERROR, SIGNIN_STOP_PENDING, SIGNIN_CLEAR_ERROR } from './types';

interface ISigninState {
  pending: boolean;
  error: string;
}

const initialState: ISigninState = {
  pending: false,
  error: '',
};

type ActionType = {
  type: string;
  payload: ISigninState;
};

const signinReducer = (state: ISigninState = initialState, action: ActionType) => {
  switch (action.type) {
    case SIGNIN_PENDING: {
      return { ...state, pending: true };
    }
    case SIGNIN_STOP_PENDING: {
      return { ...state, pending: false };
    }
    case SIGNIN_ERROR: {
      return { ...state, ...action.payload, pending: false };
    }
    case SIGNIN_CLEAR_ERROR: {
      return { ...state, error: '' };
    }
  }
  return state;
};

export { signinReducer, ISigninState };
