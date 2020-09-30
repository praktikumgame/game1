import { PASSWORD_ERROR_MISMATCH } from '../../constants';
import {
  AVATAR_CLEAR_ERROR,
  AVATAR_ERROR,
  AVATAR_PENDING,
  AVATAR_STOP_PENDING,
  CHANGE_PASSWORD_CLEAR_ERROR,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_IS_MISMATCH,
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_STOP_PENDING,
} from './types';

interface IUserSettingState {
  pendingAvatar: boolean;
  avatarError: string;
  pendingChangePassword: boolean;
  changePasswordError: string;
  passwordIsMismatch: boolean;
}

const initialState: IUserSettingState = {
  pendingAvatar: false,
  avatarError: '',
  pendingChangePassword: false,
  changePasswordError: '',
  passwordIsMismatch: false,
};

interface IAction {
  type: string;
  payload: IUserSettingState;
}

const userSettingReducer = (state: IUserSettingState = initialState, action: IAction) => {
  switch (action.type) {
    // LOAD AVATAR
    case AVATAR_PENDING: {
      return { ...state, pendingAvatar: true };
    }
    case AVATAR_STOP_PENDING: {
      return { ...state, pendingAvatar: false };
    }
    case AVATAR_ERROR: {
      return { ...state, ...action.payload, pendingAvatar: false };
    }
    case AVATAR_CLEAR_ERROR: {
      return { ...state, avatarError: '' };
    }
    // CHANGE PASSWORD
    case CHANGE_PASSWORD_PENDING: {
      return { ...state, pendingChangePassword: true };
    }
    case CHANGE_PASSWORD_STOP_PENDING: {
      return { ...state, pendingChangePassword: false };
    }
    case CHANGE_PASSWORD_ERROR: {
      return { ...state, ...action.payload, pendingChangePassword: false };
    }
    case CHANGE_PASSWORD_CLEAR_ERROR: {
      return { ...state, changePasswordError: '', passwordIsMismatch: false };
    }
    case CHANGE_PASSWORD_IS_MISMATCH: {
      return { ...state, passwordIsMismatch: true, changePasswordError: PASSWORD_ERROR_MISMATCH };
    }
  }
  return state;
};

export { userSettingReducer, IUserSettingState };
