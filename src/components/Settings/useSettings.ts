import { useState } from 'react';
import { IStateValues } from './types';

export const useSettings = () => {
  const [values, setValues] = useState<IStateValues>({ oldPassword: '', newPassword: '' });
  const [userAvatar, setUserAvatar] = useState('');
  const [avatarIsLoad, setAvatarIsLoad] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordIsLoad, setPasswordIsLoad] = useState(false);
  return {
    values,
    setValues,
    userAvatar,
    setUserAvatar,
    avatarIsLoad,
    setAvatarIsLoad,
    avatarError,
    setAvatarError,
    passwordError,
    setPasswordError,
    passwordIsLoad,
    setPasswordIsLoad,
  };
};
