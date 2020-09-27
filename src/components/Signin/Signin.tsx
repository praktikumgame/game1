import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { IStateValues } from './types';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateLogin } from '../../services/validators';
import { withAuth } from '../../services/auth';

import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../../redux/signin/actions';
import { ISigninState } from '../../redux/signin/reducer';

import './Signin.css';

const Signin = withAuth(({ isAuthorized }) => {
  const dispatch = useDispatch();
  const { pending, error } = useSelector((state: { signin: ISigninState }) => state.signin);
  const [values, setValues] = useState<IStateValues>({ login: '', password: '' });

  const clearValues = () => setValues({ login: '', password: '' });

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    dispatch(signinUser(values));
    clearValues();
  };

  if (isAuthorized) {
    return <Redirect to="/game" />;
  }

  return (
    <div className="signin">
      <h2 className="signin__title">Signin to play</h2>
      <Form sendFormHandler={sendFormHandler} buttonText="Signin" formIsLoad={pending} serverError={error}>
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
