import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { stateInputValuesSignupType } from './types';
import { withAuth } from '../';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateEmail, validateLogin } from '../../helpers';
import { AuthApi } from '../../api/';

import './Signup.scss';

const Signup = withAuth(({ isAuthorized, authorize }) => {
  const [values, setValues] = useState<stateInputValuesSignupType>({ email: '', login: '', password: '' });

  const clearValues = () => {
    setValues({ email: '', login: '', password: '' });
  };

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const sendFormHandler = (): Promise<void> => {
    const authApi = new AuthApi();
    return authApi
      .signup(values)
      .then(() => clearValues())
      .then(() => authorize());
  };

  return isAuthorized ? (
    <Redirect to="/game" />
  ) : (
    <div className="signup">
      <h2 className="signup__title">Signup to play</h2>
      <Form sendFormHandler={sendFormHandler} buttonText="Signup">
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
