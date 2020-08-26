import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { stateInputValuesSigninType } from './types';
import { withAuth } from '../';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateLogin } from '../../helpers';
import { AuthApi } from '../../api/';

import './Signin.scss';

const Signin = withAuth(({ isAuthorized, authorize }) => {
  const [values, setValues] = useState<stateInputValuesSigninType>({ login: '', password: '' });

  const clearValues = () => {
    setValues({ login: '', password: '' });
  };

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const sendFormHandler = (): Promise<void> => {
    const authApi = new AuthApi();
    return authApi
      .signin(values)
      .then(() => clearValues())
      .then(() => authorize());
  };

  return isAuthorized ? (
    <Redirect to="/game" />
  ) : (
    <div className="signin">
      <h2 className="signin__title">Signin to play</h2>
      <Form sendFormHandler={sendFormHandler} buttonText="Signin">
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
