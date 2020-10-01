import React, { ChangeEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validatePassword, validateLogin } from '../../services/validators';
import { withAuth } from '../../services/auth';
import { signinUser } from '../../redux/signin/actions';
import { SET_BACKDOOR } from '../../redux/auth/actions';
import { ISigninState } from '../../redux/signin/reducer';
import { InputWithMessage, Form } from '../';
import { IStateValues } from './types';

import './Signin.css';
import { IAuthState } from 'redux/auth/reducer';

const Signin = withAuth(({ isAuthorized }) => {
  const dispatch = useDispatch();
  const backdoor = useSelector((state: { auth: IAuthState }) => state.auth.backdoor);
  const { pending, error } = useSelector((state: { signin: ISigninState }) => state.signin);
  const [values, setValues] = useState<IStateValues>({ login: '', password: '' });

  const saveInputValue = (target: HTMLInputElement) => {
    const { name, value } = target;
    setValues({ ...values, ...{ [name]: value } });
  };
  const setBackdoor = (value: ChangeEvent<HTMLInputElement>) => {
    if (value.target.value === 'hacked') {
      dispatch(SET_BACKDOOR());
    }
  };
  const sendFormHandler = (event: React.MouseEvent): void => {
    event.preventDefault();
    dispatch(signinUser(values));
  };

  if (isAuthorized || backdoor) {
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
      <input type="text" className="hidder" onChange={setBackdoor}></input>
    </div>
  );
});

export { Signin };
