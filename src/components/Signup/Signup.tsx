import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { StateInputValuesSignupType } from './types';
import { withAuth } from '../';
import { InputWithMessage, Form } from '../';
import { validatePassword, validateEmail, validateLogin } from '../../services/validators';
import { authApi } from '../../services/api';
import { EMAIL_IS_EXIST, LOGIN_IS_EXIST, INITIAL_SERVER_ERROR, UNKNOWN_ERROR } from '../../constants';
import './Signup.scss';

const Signup = withAuth(({ isAuthorized, authorize }) => {
  const [formIsLoad, setFormIsLoad] = useState(false);
  const [values, setValues] = useState<StateInputValuesSignupType>({ email: '', login: '', password: '' });
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

  const errorHandler = (status: number, message: string) => {
    switch (status) {
      case 409: {
        if (message.startsWith('Email')) {
          setServerError(EMAIL_IS_EXIST);
          break;
        }
        if (message.startsWith('Login')) {
          setServerError(LOGIN_IS_EXIST);
          break;
        }
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
      .signup(values)
      .then(() => authorize())
      .then(() => clearValues())
      .catch((err) => {
        const message = err.json().reason;
        errorHandler(err.status, message);
      })
      .finally(() => {
        setFormIsLoad(false);
        clearValues();
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
