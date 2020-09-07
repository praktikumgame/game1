import React, { useState } from 'react';
import { IProps } from './types';
import { Button } from '../index';
import './Form.css';

const Form = ({
  sendFormHandler,
  children,
  buttonText,
  formValidator = () => true,
  formIsLoad,
  serverError,
  clearError,
}: IProps) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const validator = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (serverError) {
      clearError();
    }

    setFormIsValid(form.checkValidity() && formValidator(event.target.value));
  };

  const onClick = (event: React.MouseEvent): void => {
    sendFormHandler(event);
    setFormIsValid(false);
  };

  return (
    <form className="form" onChange={validator}>
      {children}
      {formIsLoad && (
        <div className="loader">
          <div className="loader__react"></div>
        </div>
      )}
      {serverError && <p className="form__server-error">{serverError}</p>}
      <Button onClick={onClick} formIsValid={!formIsValid} buttonText={buttonText} />
    </form>
  );
};

export { Form };
