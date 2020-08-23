import React, { useState, useRef, useEffect } from 'react';
import { IProps } from './types';

import './Form.scss';

import { UNKNOWN_ERROR } from '../../constants';

const Form = ({ sendFormHandler, children, buttonText }: IProps): JSX.Element => {
  const _isMounted = useRef(true);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const validForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (serverError) {
      setServerError('');
    }

    if (form.checkValidity()) {
      setFormIsValid(true);
      return;
    }

    setFormIsValid(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setIsLoad(true);
    sendFormHandler()
      .then(() => {
        if (_isMounted.current) {
          setFormIsValid(false);
        }
      })
      .finally(() => {
        if (_isMounted.current) {
          setIsLoad(false);
        }
      })
      .catch(({ message }) => setServerError(message.startsWith('Failed') ? UNKNOWN_ERROR : message));
  };

  return (
    <form className="form" onChange={validForm}>
      {children}
      <div className={`loader ${isLoad && 'loader_active'}`}>
        <div className="loader__react"></div>
      </div>
      {serverError && <p className="form__server-error">{serverError}</p>}
      <button className="form__button" onClick={handleClick} disabled={!formIsValid}>
        {buttonText}
      </button>
    </form>
  );
};

export { Form };
