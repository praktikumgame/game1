import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { stateInputValuesSigninType } from './types';
import { withAuth } from '../';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateLogin } from '../../helpers';
import { AuthApi } from '../../api/';

import './Signin.scss';

const Signin = withAuth(({ isAuthorized, authorize }) => {
  const [formIsLoad, setFormIsLoad] = useState(false);
  const [values, setValues] = useState<stateInputValuesSigninType>({ login: '', password: '' });
  const [serverError, setServerError] = useState('');

  const clearValues = () => {
    setValues({ login: '', password: '' });
  };

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const clearError = () => {
    setServerError('');
  };

  const errorHandler = (status: number) => {
    switch (status) {
      case 401: {
        setServerError('Не правильные логин или пароль');
        break;
      }
      case 500: {
        setServerError('Ошибка сервера');
        break;
      }
      default: {
        setServerError('Неизвестная ошибка');
        return;
      }
    }
  };

  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    const authApi = new AuthApi();

    setFormIsLoad(true);

    authApi
      .signin(values)
      .then(() => authorize())
      .then(() => clearValues())
      .catch((err) => errorHandler(err.status))
      .finally(() => setFormIsLoad(false));
  };

  return isAuthorized && !formIsLoad ? (
    <Redirect to="/game" />
  ) : (
    <div className="signin">
      <h2 className="signin__title">Signin to play</h2>
      <Form
        sendFormHandler={sendFormHandler}
        buttonText="Signin"
        formIsLoad={formIsLoad}
        serverError={serverError}
        clearError={clearError}
      >
        <InputWithMessage
          saveInputValue={saveInputValue}
          validator={validateLogin}
          type="text"
          placeholder="login"
          name="login"
          value={values.login}
          minLength={2}
          maxLength={20}
          required={true}
        />
        <InputWithMessage
          saveInputValue={saveInputValue}
          validator={validatePassword}
          type="password"
          placeholder="password"
          name="password"
          value={values.password}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*"
          minLength={8}
          required={true}
        />
      </Form>
    </div>
  );
});

export { Signin };
