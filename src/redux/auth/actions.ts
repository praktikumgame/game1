import { Dispatch } from 'redux';
import { authApi } from '../../services/api';
import { userInfoStateType } from './reducer';
import { AUTHORIZE, AUTHORIZE_CHECK_COMPLETED, CHANGE_AVATAR, LOGOUT, PENDING_AUTHORIZE_CHECK } from './types';
import { initApp } from '../app/actions';
import { parseAvatar } from './helpers';

function authorize(userInfo: Omit<userInfoStateType, 'checkingAuthorize'>) {
  return {
    type: AUTHORIZE,
    payload: userInfo,
  };
}

function authorizeCheckPending() {
  return {
    type: PENDING_AUTHORIZE_CHECK,
  };
}

function authorizeCheckComplete() {
  return {
    type: AUTHORIZE_CHECK_COMPLETED,
  };
}

function logout() {
  return {
    type: LOGOUT,
  };
}

function changeAvatar(avatar: string) {
  return {
    type: CHANGE_AVATAR,
    payload: { avatar: parseAvatar(avatar) },
  };
}

async function getUserInfo(): Promise<Omit<userInfoStateType, 'checkingAuthorize'>> {
  const userData = await authApi.getUserInfo();
  const { login, avatar } = JSON.parse(userData);
  return { login, avatar: parseAvatar(avatar) };
}

function checkAuthorize() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authorizeCheckPending());
      const userInfo = await getUserInfo();
      dispatch(authorize(userInfo));
    } catch {
      clearCookie();
    } finally {
      setTimeout(() => {
        dispatch(authorizeCheckComplete());
        dispatch(initApp());
      }, 1000);
    }
  };
}

function clearCookie() {
  return async (dispatch: Dispatch) => {
    await authApi.logout();
    dispatch(logout());
  };
}

export { getUserInfo, authorize, checkAuthorize, clearCookie, changeAvatar };
