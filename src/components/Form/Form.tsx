import React, { useState } from 'react';
import { IProps } from './types';

import './Form.scss';

const Form = ({
  sendFormHandler,
  children,
  buttonText,
  formValidator,
  formIsLoad,
  serverError,
  clearError,
}: IProps): JSX.Element => {
  const [formIsValid, setFormIsValid] = useState(false);

  const validator = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (serverError) {
      console.log(serverError);
      clearError();
    }

    if (form.checkValidity() && formValidator(event.target.value)) {
      setFormIsValid(true);
      return;
    }

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
      <button className="form__button" onClick={sendFormHandler} disabled={!formIsValid}>
        {buttonText}
      </button>
    </form>
  );
};

export { Form };
