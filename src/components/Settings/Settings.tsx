import React, { createRef, RefObject, useEffect } from 'react';
import { Form, InputWithMessage } from '../';
import exampleAvatar from '../../images/example-avatar.png';
import { useSettings } from './useSettings';
import { validatePassword } from '../../services/validators';
import {
  loadAvatar,
  changePassword,
  mismatchPasswords,
  changePasswordClearError,
} from '../../redux/userSettings/actions';

import './Settings.css';

const Settings = () => {
  const {
    values,
    setValues,
    dispatch,
    userAvatar,
    pendingAvatar,
    avatarError,
    pendingChangePassword,
    changePasswordError,
    passwordIsMismatch,
  } = useSettings();
  const fileInput: RefObject<HTMLInputElement> = createRef();

  useEffect(() => {
    const isMatch: boolean = values.oldPassword === values.newPassword && !!values.oldPassword;
    if (isMatch) {
      dispatch(mismatchPasswords());
    }

    if (changePasswordError) {
      dispatch(changePasswordClearError());
    }
  }, [values]);

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const formValidator = (): boolean => {
    if (passwordIsMismatch) {
      return false;
    }
    return true;
  };

  const changePasswordHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    dispatch(changePassword(values));
  };

  const changeAvatarHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    if (fileInput.current && fileInput.current.files) {
      const formData = new FormData();
      formData.append('avatar', fileInput.current.files[0]);

      dispatch(loadAvatar(formData));
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
            formIsLoad={pendingAvatar}
            serverError={avatarError}
          >
            <label className="settings__input_wrapper">
              <input className="settings__input-file" type="file" ref={fileInput} />
              <div className="setting__wrapper-avatar">
                {pendingAvatar ? (
                  <div className="settings__loader"></div>
                ) : (
                  <img src={userAvatar || exampleAvatar} alt="avatar" className="settings__avatar" />
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
          formIsLoad={pendingChangePassword}
          serverError={changePasswordError}
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
};

export { Settings };
