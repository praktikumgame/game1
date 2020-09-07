import React, { useState } from 'react';
import { IProps } from './types';
import { REQUIRED_FIELD } from '../../constants';
import { Input } from '../';

import './InputWithMessage.css';

const InputWithMessage = ({
  saveInputValue,
  validator,
  type,
  placeholder,
  name,
  value,
  pattern,
  minLength,
  maxLength,
  required,
}: IProps) => {
  const [message, setMessage] = useState<string>('');

  const setErrorMessage = (text: string) => {
    setMessage(text);
  };

  const clearErrorMessage = () => {
    setMessage('');
  };

  const customValidator = (target: HTMLInputElement): boolean => {
    if (target.validity.valueMissing) {
      setErrorMessage(REQUIRED_FIELD);
      return false;
    }
    return true;
  };

  const validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    saveInputValue(target);

    if (required && !customValidator(target)) {
      return;
    }

    if (validator(target, setErrorMessage)) {
      clearErrorMessage();
    }
  };

  return (
    <div className="input_with-message">
      <Input
        onChange={validateInput}
        isError={!message}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
      {message && (
        <>
          <p className="input__message">{message}</p>
          <div className="input__error-icon"></div>
        </>
      )}
    </div>
  );
};

export { InputWithMessage };
