import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { stateInputValuesSignupType } from './types';
import { withAuth } from '../';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateEmail, validateLogin } from '../../helpers';
import { authApi } from '../../services/api';

import './Signup.scss';

const Signup = withAuth(({ isAuthorized, authorize }) => {
  const [formIsLoad, setFormIsLoad] = useState(false);
  const [values, setValues] = useState<stateInputValuesSignupType>({ email: '', login: '', password: '' });
  const [serverError, setServerError] = useState('');

  const clearValues = () => {
    setValues({ email: '', login: '', password: '' });
  };

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const clearError = () => {
    setServerError('');
  };

  const errorHandler = (status: number, message: string) => {
    switch (status) {
      case 409: {
        if (message.startsWith('Email')) {
          setServerError('Пользователь с таким email уже существует');
          break;
        }
        if (message.startsWith('Login')) {
          setServerError('Логин уже занят');
          break;
        }
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

    setFormIsLoad(true);

    authApi
      .signup(values)
      .then(() => authorize())
      .then(() => clearValues())
      .catch(({ status, message }) => errorHandler(status, message))
      .finally(() => setFormIsLoad(false));
  };

  return isAuthorized && !formIsLoad ? (
    <Redirect to="/game" />
  ) : (
    <div className="signup">
      <h2 className="signup__title">Signup to play</h2>
      <Form
        sendFormHandler={sendFormHandler}
        buttonText="Signup"
        formIsLoad={formIsLoad}
        serverError={serverError}
        clearError={clearError}
      >
        <InputWithMessage
          saveInputValue={saveInputValue}
          validator={validateEmail}
          type="text"
          placeholder="email"
          name="email"
          value={values.email}
          pattern=".{1,}@.{2,}\..{2,}"
          required={true}
        />
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

export { Signup };
