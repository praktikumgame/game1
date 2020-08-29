import React, { useState, createRef, RefObject, useEffect } from 'react';
import { Form, InputWithMessage, withAuth } from '../';
import { stateInputValuesChangePassword } from './types';
import { validatePassword } from '../../helpers/validators/validatePassword';
import { authApi, userApi } from '../../services/api';
import './Settings.scss';
import exampleAvatar from '../../images/example-avatar.jpg';

const Settings = withAuth(
  ({ logout }): JSX.Element => {
    const [values, setValues] = useState<stateInputValuesChangePassword>({ oldPassword: '', newPassword: '' });

    const [userAvatar, setUserAvatar] = useState('');
    const [avatarIsLoad, setAvatarIsLoad] = useState(false);
    const [avatarError, setAvatarError] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [passwordIsLoad, setPasswordIsLoad] = useState(false);

    useEffect(() => {
      authApi
        .getUserInfo()
        .then(({ avatar }) => {
          setUserAvatar(`https://ya-praktikum.tech${avatar}`);
        })
        .catch(() => logout());
    }, []);

    const fileInput: RefObject<HTMLInputElement> = createRef();

    const clearPasswordError = () => {
      setPasswordError('');
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
      console.log(value);
      if (passwordIsMismatch(value)) {
        setPasswordError('Старый и новый пароль должны отличатся');
        return false;
      }
      return true;
    };

    const changePasswordHandler = () => {
      setPasswordIsLoad(true);
      userApi
        .changePassword(values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
        .finally(() => setPasswordIsLoad(false));
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
            .then(({ avatar }) => setUserAvatar(`https://ya-praktikum.tech${avatar}`))
            .catch(() => setAvatarError('Не удалось загрузить автар'))
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
                  <img src={userAvatar || exampleAvatar} alt="avatar" className="settings__avatar" />
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
  },
);

export { Settings };
