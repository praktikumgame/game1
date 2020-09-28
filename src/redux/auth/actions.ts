import { Dispatch } from 'redux';
import { authApi } from '../../services/api';
import { userInfoStateType } from './reducer';
import { AUTHORIZE, CHANGE_AVATAR, LOGOUT } from './types';
import { initApp } from '../app/actions';
import { parseAvatar } from './helpers';

function authorize(userInfo: userInfoStateType) {
  return {
    type: AUTHORIZE,
    payload: userInfo,
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

async function getUserInfo(): Promise<userInfoStateType> {
  const userData = await authApi.getUserInfo();
  const { login, avatar } = JSON.parse(userData);
  return { login, avatar: parseAvatar(avatar) };
}

function checkAuthorize() {
  return async (dispatch: Dispatch) => {
    try {
      const userInfo = await getUserInfo();
      dispatch(authorize(userInfo));
    } catch {
      clearCookie();
    }
    dispatch(initApp());
  };
}

function clearCookie() {
  return async (dispatch: Dispatch) => {
    await authApi.logout();
    dispatch(logout());
  };
}

export { getUserInfo, authorize, checkAuthorize, clearCookie, changeAvatar };
