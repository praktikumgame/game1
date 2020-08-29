import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { stateInputValuesSigninType } from './types';
import { withAuth } from '../';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateLogin } from '../../services/validators';
import { authApi } from '../../services/api';
import { LOGIN_OR_EMAIL_ERROR, INITIAL_SERVER_ERROR, UNKNOWN_ERROR } from '../../constants';

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
        setServerError(LOGIN_OR_EMAIL_ERROR);
        break;
      }
      case 500: {
        setServerError(INITIAL_SERVER_ERROR);
        break;
      }
      default: {
        setServerError(UNKNOWN_ERROR);
        return;
      }
    }
  };

  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    setFormIsLoad(true);

    authApi
      .signin(values)
      .then(() => authorize())
      .then(() => clearValues())
      .catch(async (err) => {
        errorHandler(err.status);
      })
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
