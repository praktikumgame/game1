import { AUTHORIZE, CHANGE_AVATAR, LOGOUT } from './types';

interface userInfoStateType {
  login: string;
  avatar: string;
}

interface IAuthState extends userInfoStateType {
  isAuthorized: boolean;
}

type actionType = {
  type: string;
  payload: IAuthState;
};

const initialState: IAuthState = {
  isAuthorized: false,
  login: 'Гость',
  avatar: '',
};

const authReducer = (state: IAuthState = initialState, action: actionType) => {
  switch (action.type) {
    case AUTHORIZE: {
      return { ...state, ...{ isAuthorized: true, initApp: true }, ...action.payload };
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

export { authReducer, IAuthState, userInfoStateType };
