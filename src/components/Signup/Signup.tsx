import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { IStateFields } from './types';
import { withAuth } from '../../services/auth';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateEmail, validateLogin } from '../../services/validators';
import { authApi } from '../../services/api';
import { getErrorMessageByStatusAndText as ErrorHandler } from '../../services/api/helpers/signUpStatus';

import './Signup.css';

const Signup = withAuth(({ isAuthorized, authorize }) => {
  const [formIsLoad, setFormIsLoad] = useState(false);
  const [values, setValues] = useState<IStateFields>({ email: '', login: '', password: '' });
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

  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();

    setFormIsLoad(true);

    authApi
      .signup(values)
      .then(() => clearValues())
      .then(() => authorize())
      .catch(({ reason, status }) => {
        setServerError(ErrorHandler(reason, status));
      })
      .finally(() => {
        clearValues();
        setFormIsLoad(false);
      });
  };

  if (isAuthorized && !formIsLoad) {
    return <Redirect to="/game" />;
  }
  return (
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
