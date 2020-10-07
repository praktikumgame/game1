import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../redux/signup/actions';
import { withAuth } from '../../services/auth';
import { validatePassword, validateEmail, validateLogin } from '../../services/validators';
import { InputWithMessage, Form } from '../';
import { IStateFields } from './types';

import './Signup.css';
import { getSignUp } from '../../redux/signup/selectors';

const Signup = withAuth(({ isAuthorized }) => {
  const dispatch = useDispatch();

  const { pending, error } = useSelector(getSignUp);

  const [values, setValues] = useState<IStateFields>({ email: '', login: '', password: '' });

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };

  const sendFormHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(signupUser(values));
  };

  if (isAuthorized) {
    return <Redirect to="/game" />;
  }
  return (
    <div className="signup">
      <h2 className="signup__title">Signup to play</h2>
      <Form sendFormHandler={sendFormHandler} buttonText="Signup" formIsLoad={pending} serverError={error}>
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
