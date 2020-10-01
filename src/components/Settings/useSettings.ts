import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAuthState } from '../../redux/auth/reducer';
import { IUserSettingState } from '../../redux/userSettings/reducer';
import { IStateValues } from './types';

export const useSettings = () => {
  const [values, setValues] = useState<IStateValues>({ oldPassword: '', newPassword: '' });
  const dispatch = useDispatch();
  const userAvatar = useSelector((state: { auth: IAuthState }) => state.auth.avatar);
  const { pendingAvatar, avatarError, pendingChangePassword, changePasswordError, passwordIsMatch } = useSelector(
    (state: { userSettings: IUserSettingState }) => state.userSettings,
  );
  return {
    values,
    setValues,
    dispatch,
    userAvatar,
    pendingAvatar,
    avatarError,
    pendingChangePassword,
    changePasswordError,
    passwordIsMatch,
  };
};
