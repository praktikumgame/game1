import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { IStateValues, SignInStatusGlossary } from './types';
import { withAuth } from '../';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateLogin } from '../../services/validators';
import { authApi } from '../../services/api';
import { LOGIN_OR_EMAIL_ERROR, INITIAL_SERVER_ERROR, UNKNOWN_ERROR } from '../../constants';

import './Signin.scss';

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

  const errorHandler = (status: keyof SignInStatusGlossary) => {
    const statusGlossary: SignInStatusGlossary = {
      401: LOGIN_OR_EMAIL_ERROR,
      500: INITIAL_SERVER_ERROR,
    };
    const result = statusGlossary[status];
    setServerError(result || UNKNOWN_ERROR);
  };

  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    setFormIsLoad(true);

    authApi
      .signin(values)
      .then(() => authorize())
      .catch((err) => errorHandler(err.status))
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
