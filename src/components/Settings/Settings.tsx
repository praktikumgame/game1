import React, { createRef, RefObject, useEffect } from 'react';
import { Form, InputWithMessage } from '../';
import { withAuth } from '../../services/Auth';
import { useSettings } from './useSettings';
import { SettingsStatusGlossary } from './types';
import { validatePassword } from '../../services/validators';
import { authApi, userApi } from '../../services/api';
import {
  AVATAR_API,
  PASSWORD_ERROR_MISMATCH,
  AVATAR_ERROR,
  INCORRECT_OLD_PASSWORD,
  INITIAL_SERVER_ERROR,
  UNKNOWN_ERROR,
} from '../../constants';
import exampleAvatar from '../../images/example-avatar.jpg';

import './Settings.css';

const Settings = withAuth(({ logout }) => {
  const {
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
  } = useSettings();

  useEffect(() => {
    authApi
      .getUserInfo()
      .then(checkAndSetAvatar)
      .catch(() => logout());
  }, []);

  const fileInput: RefObject<HTMLInputElement> = createRef();

  const checkAndSetAvatar = (response: string) => {
    const avatar = JSON.parse(response).avatar;
    setUserAvatar(avatar ? `${AVATAR_API}${avatar}` : exampleAvatar);
  };

  const clearPasswordError = () => setPasswordError('');

  const clearValues = () => {
    setValues({ oldPassword: '', newPassword: '' });
  };

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const passwordIsMatch = (newValue: string) => Object.keys(values).some((key) => values[key] === newValue);

  const formValidator = (value: string): boolean => {
    if (passwordIsMatch(value)) {
      return true;
    }

    setPasswordError(PASSWORD_ERROR_MISMATCH);
    return false;
  };

  const errorPasswordHandler = (status: keyof SettingsStatusGlossary) => {
    const statusGlossary = {
      400: INCORRECT_OLD_PASSWORD,
      500: INITIAL_SERVER_ERROR,
    };
    const result = statusGlossary[status];
    setPasswordError(result || UNKNOWN_ERROR);
  };

  const changePasswordHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    setPasswordIsLoad(true);
    userApi
      .changePassword(values)
      .catch(({ status }) => errorPasswordHandler(status))
      .finally(() => {
        clearValues();
        setPasswordIsLoad(false);
      });
  };

  const clearAvatarError = () => {
    setAvatarError('');
  };

  const changeAvatarHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    if (fileInput.current && fileInput.current.files) {
      setAvatarIsLoad(true);
      const formData = new FormData();
      formData.append('avatar', fileInput.current.files[0]);

      userApi.changeAvatar(formData).then(() => {
        authApi
          .getUserInfo()
          .then(checkAndSetAvatar)
          .catch(() => setAvatarError(AVATAR_ERROR))
          .finally(() => setAvatarIsLoad(false));
      });
    }
  };

  return (
    <div className="settings">
      <div className="settings__user-info-wrapper">
        <h2 className="settings__subtitles">Аватар профиля:</h2>
        <div className="settings__user-info">
          <Form
            sendFormHandler={changeAvatarHandler}
            buttonText="Сохранить"
            formIsLoad={avatarIsLoad}
            serverError={avatarError}
            clearError={clearAvatarError}
          >
            <label className="settings__input_wrapper">
              <input className="settings__input-file" type="file" ref={fileInput} />
              <div className="setting__wrapper-avatar">
                {!userAvatar ? (
                  <div className="settings__loader"></div>
                ) : (
                  <img src={userAvatar} alt="avatar" className="settings__avatar" />
                )}
                <div className="setting__custom-input"></div>
              </div>
            </label>
          </Form>
        </div>
      </div>
      <div className="settings__password-wrapper">
        <h2 className="settings__subtitles">Изменение пароля:</h2>
        <Form
          formValidator={formValidator}
          sendFormHandler={changePasswordHandler}
          buttonText="Изменить"
          formIsLoad={passwordIsLoad}
          serverError={passwordError}
          clearError={clearPasswordError}
        >
          <InputWithMessage
            saveInputValue={saveInputValue}
            validator={validatePassword}
            type="password"
            placeholder="Введите старый пароль"
            name="oldPassword"
            value={values.oldPassword}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*"
            minLength={8}
            required={true}
          />
          <InputWithMessage
            saveInputValue={saveInputValue}
            validator={validatePassword}
            type="password"
            placeholder="Введите новый пароль"
            name="newPassword"
            value={values.newPassword}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*"
            minLength={8}
            required={true}
          />
        </Form>
      </div>
    </div>
  );
});

export { Settings };
