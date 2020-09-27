import { Dispatch } from 'redux';
import { authApi } from '../../services/api';
import { userInfoStateType } from './reducer';
import { AVATAR_API } from '../../constants';
import { AUTHORIZE, LOGOUT } from './types';
import { initApp } from '../app/actions';

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

async function getUserInfo(): Promise<userInfoStateType> {
  const userData = await authApi.getUserInfo();
  const { login, avatar } = JSON.parse(userData);
  return { login, avatar: `${avatar ? AVATAR_API + avatar : null}` };
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

export { getUserInfo, authorize, checkAuthorize, clearCookie };
