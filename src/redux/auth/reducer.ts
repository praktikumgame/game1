import { AUTHORIZE, AUTHORIZE_CHECK_COMPLETED, CHANGE_AVATAR, LOGOUT, PENDING_AUTHORIZE_CHECK } from './types';

interface IUserInfoStateType {
  login: string;
  avatar: string;
  checkingAuthorize: boolean;
}

interface IAuthState extends IUserInfoStateType {
  isAuthorized: boolean;
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
};

const authReducer = (state: IAuthState = initialState, action: ActionType) => {
  switch (action.type) {
    case AUTHORIZE: {
      return { ...state, ...{ isAuthorized: true, initApp: true }, ...action.payload };
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
  }
  return state;
};

export { authReducer, IAuthState, IUserInfoStateType };
