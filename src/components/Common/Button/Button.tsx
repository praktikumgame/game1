import React from 'react';
import { IProps } from './types';

import './Button.css';

export const Button = ({ onClick, formIsValid, buttonText, className = '' }: IProps) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={formIsValid}>
      {buttonText}
    </button>
  );
};
