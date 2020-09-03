import React, { useState } from 'react';
import { IProps } from './types';
import { REQUIRED_FIELD } from '../../constants';

import './InputWithMessage.scss';

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

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="input-with-message">
      <input
        onChange={handleOnChange}
        className={`input-with-message_item ${message && 'input-with-message_item_error'}`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      />
      <p className="input-with-message__message">{message}</p>
      {message && <div className="input-with-message__error-icon"></div>}
    </div>
  );
};

export { InputWithMessage };
