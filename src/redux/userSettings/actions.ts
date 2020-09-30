import { Dispatch } from 'redux';
import { PasswordValuesType, userApi, errorPasswordHandler } from '../../services/api';
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
import { changeAvatar } from '../auth/actions';
import { AVATAR_ERROR_MESSAGE } from '../../constants';

function avatarPending() {
  return {
    type: AVATAR_PENDING,
  };
}

function avatarSuccess() {
  return {
    type: AVATAR_STOP_PENDING,
  };
}

function avatarError(text: string) {
  return {
    type: AVATAR_ERROR,
    payload: { avatarError: text },
  };
}

function avatarClearError() {
  return {
    type: AVATAR_CLEAR_ERROR,
  };
}

function loadAvatar(formData: FormData) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(avatarClearError());
      dispatch(avatarPending());
      const { avatar } = JSON.parse(await userApi.changeAvatar(formData));
      dispatch(changeAvatar(avatar));
      dispatch(avatarSuccess());
    } catch {
      dispatch(avatarError(AVATAR_ERROR_MESSAGE));
    }
  };
}

function changePasswordPending() {
  return {
    type: CHANGE_PASSWORD_PENDING,
  };
}

function changePasswordStopPending() {
  return {
    type: CHANGE_PASSWORD_STOP_PENDING,
  };
}

function changePasswordError(text: string) {
  return {
    type: CHANGE_PASSWORD_ERROR,
    payload: { changePasswordError: text },
  };
}

function changePasswordClearError() {
  return {
    type: CHANGE_PASSWORD_CLEAR_ERROR,
  };
}

function mismatchPasswords() {
  return {
    type: CHANGE_PASSWORD_IS_MISMATCH,
  };
}

function changePassword(values: PasswordValuesType) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changePasswordClearError());
      dispatch(changePasswordPending());
      await userApi.changePassword(values);
    } catch ({ status }) {
      dispatch(changePasswordError(errorPasswordHandler(status)));
    } finally {
      dispatch(changePasswordStopPending());
    }
  };
}

export { loadAvatar, changePassword, mismatchPasswords, changePasswordClearError };
