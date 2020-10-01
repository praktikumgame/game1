import {
  AUTHORIZE,
  AUTHORIZE_CHECK_COMPLETED,
  CHANGE_AVATAR,
  LOGOUT,
  PENDING_AUTHORIZE_CHECK,
  BACKDOOR,
} from './types';

interface IUserInfoStateType {
  login: string;
  avatar: string;
  checkingAuthorize: boolean;
}

interface IAuthState extends IUserInfoStateType {
  isAuthorized: boolean;
  backdoor: boolean;
}

type ActionType = {
  type: string;
  payload: IAuthState;
};

const initialState: IAuthState = {
  isAuthorized: false,
  login: 'Гость',
  avatar: '',
  checkingAuthorize: false,
  backdoor: false,
};

const authReducer = (state: IAuthState = initialState, action: ActionType) => {
  switch (action.type) {
    case AUTHORIZE: {
      return { ...state, ...action.payload, isAuthorized: true };
    }
    case PENDING_AUTHORIZE_CHECK: {
      return { ...state, checkingAuthorize: true };
    }
    case AUTHORIZE_CHECK_COMPLETED: {
      return { ...state, checkingAuthorize: false };
    }
    case LOGOUT: {
      return { ...state, ...initialState };
    }
    case CHANGE_AVATAR: {
      return { ...state, ...action.payload };
    }
    case BACKDOOR: {
      return { ...state, backdoor: !state.backdoor };
    }
  }
  return state;
};

export { authReducer, IAuthState, IUserInfoStateType };
