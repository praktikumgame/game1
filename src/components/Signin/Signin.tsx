import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validatePassword, validateLogin } from '../../services/validators';
import { withAuth } from '../../services/auth';
import { signinUser } from '../../redux/signin/actions';
import { InputWithMessage, Form } from '../';
import { IStateValues } from './types';
import './Signin.css';
import { getErrorAndPending } from '../../redux/signin/selectors';

const Signin = withAuth(({ isAuthorized }) => {
  const dispatch = useDispatch();

  const { pending, error } = useSelector(getErrorAndPending);

  const [values, setValues] = useState<IStateValues>({ login: '', password: '' });

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };

  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    dispatch(signinUser(values));
  };

  if (isAuthorized) {
    return <Redirect to="/game" />;
  }

  return (
    <div className="signin">
      <h1 className="signin__title">Sign In</h1>
      <Form sendFormHandler={sendFormHandler} buttonText="Sign In" formIsLoad={pending} serverError={error}>
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
