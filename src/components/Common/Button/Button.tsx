import React from 'react';
import { IProps } from './types';

import './Button.css';

export const Button = ({ onClick, disabled, buttonText, className = '' }: IProps) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
      {buttonText}
    </button>
  );
};
