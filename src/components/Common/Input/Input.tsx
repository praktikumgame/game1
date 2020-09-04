import React from 'react';
import { IProps } from './types';

import './Input.scss';

const Input = ({
  handleOnChange,
  isError = false,
  type,
  placeholder,
  name,
  value,
  pattern,
  minLength,
  maxLength,
  required,
}: IProps) => {
  return (
    <input
      onChange={handleOnChange}
      className={`input ${!isError && 'input_error'}`}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      pattern={pattern}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
    />
  );
};

export { Input };
