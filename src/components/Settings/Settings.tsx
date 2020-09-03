import React, { useState, createRef, RefObject, useEffect } from 'react';
import { Form, InputWithMessage, withAuth } from '../';
import { StateInputValuesChangePassword } from './types';
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
import './Settings.css';
import exampleAvatar from '../../images/example-avatar.jpg';

const Settings = withAuth(({ logout }) => {
  const [values, setValues] = useState<StateInputValuesChangePassword>({ oldPassword: '', newPassword: '' });

  const [userAvatar, setUserAvatar] = useState('');
  const [avatarIsLoad, setAvatarIsLoad] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [passwordIsLoad, setPasswordIsLoad] = useState(false);

  useEffect(() => {
    authApi
      .getUserInfo()
      .then(checkAndSetAvatar)
      .catch(() => logout());
  }, []);

  const fileInput: RefObject<HTMLInputElement> = createRef();

  const checkAndSetAvatar = (response: string) => {
    const avatar = JSON.parse(response).avatar;
    if (avatar) {
      setUserAvatar(`${AVATAR_API}${avatar}`);
    } else {
      setUserAvatar(exampleAvatar);
    }
  };

  const clearPasswordError = () => {
    setPasswordError('');
  };

  const clearValues = () => {
    setValues({ oldPassword: '', newPassword: '' });
  };

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const passwordIsMismatch = (newValue: string) => {
    for (const key in values) {
      if (values[key] === newValue) {
        return true;
      }
    }
  };

  const formValidator = (value: string): boolean => {
    if (passwordIsMismatch(value)) {
      setPasswordError(PASSWORD_ERROR_MISMATCH);
      return false;
    }
    return true;
  };

  const errorPasswordHandler = (status: number) => {
    switch (status) {
      case 400: {
        setPasswordError(INCORRECT_OLD_PASSWORD);
        break;
      }
      case 500: {
        setPasswordError(INITIAL_SERVER_ERROR);
        break;
      }
      default: {
        setPasswordError(UNKNOWN_ERROR);
        return;
      }
    }
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
