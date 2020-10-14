import { IState } from 'redux/rootReducer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IStateValues } from './types';

export const useSettings = () => {
  const [values, setValues] = useState<IStateValues>({ oldPassword: '', newPassword: '' });
  const dispatch = useDispatch();
  const userAvatar = useSelector((state: IState) => state.auth.avatar);
  const { pendingAvatar, avatarError, pendingChangePassword, changePasswordError, passwordIsMatch } = useSelector(
    (state: IState) => state.userSettings,
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
