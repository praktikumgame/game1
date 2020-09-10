import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { IStateValues } from './types';
import { withAuth } from '../../services/auth';
import { InputWithMessage, Form } from '../';
import { getErrorMessageByStatus as errorHandler } from '../../services/api/helpers/signInStatus';
import { validatePassword, validateLogin } from '../../services/validators';
import { authApi } from '../../services/api';

import './Signin.css';

const Signin = withAuth(({ isAuthorized, authorize }) => {
  const [formIsLoad, setFormIsLoad] = useState(false);
  const [values, setValues] = useState<IStateValues>({ login: '', password: '' });
  const [serverError, setServerError] = useState('');

  const clearValues = () => setValues({ login: '', password: '' });
  const clearError = () => setServerError('');

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    setFormIsLoad(true);

    authApi
      .signin(values)
      .then(() => authorize())
      .catch(({ status }) => setServerError(errorHandler(status)))
      .finally(() => {
        clearValues();
        setFormIsLoad(false);
      });
  };

  if (isAuthorized && !formIsLoad) {
    return <Redirect to="/game" />;
  }

  return (
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
