import { Dispatch } from 'redux';
import { PasswordValuesType, userApi, errorPasswordHandler } from '../../services/api';
import {
  AVATAR_CLEAR_ERROR,
  AVATAR_FATAL,
  AVATAR_PENDING,
  AVATAR_SUCCESS,
  CHANGE_PASSWORD_CLEAR_ERROR,
  CHANGE_PASSWORD_FATAL,
  CHANGE_PASSWORD_IS_MISMATCH,
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_SUCCESS,
} from './types';
import { changeAvatar } from '../auth/actions';
import { AVATAR_ERROR } from '../../constants';

function avatarPending() {
  return {
    type: AVATAR_PENDING,
  };
}

function avatarSuccess() {
  return {
    type: AVATAR_SUCCESS,
  };
}

function avatarError(text: string) {
  return {
    type: AVATAR_FATAL,
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
      dispatch(avatarError(AVATAR_ERROR));
    }
  };
}

function changePasswordPending() {
  return {
    type: CHANGE_PASSWORD_PENDING,
  };
}

function changePasswordSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
}

function changePasswordError(text: string) {
  return {
    type: CHANGE_PASSWORD_FATAL,
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
      dispatch(changePasswordSuccess());
    } catch ({ status }) {
      dispatch(changePasswordError(errorPasswordHandler(status)));
    }
  };
}

export { loadAvatar, changePassword, mismatchPasswords, changePasswordClearError };
