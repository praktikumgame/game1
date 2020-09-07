import React from 'react';
import { IProps } from './types';

import './Button.css';

export const Button = ({ onClick, formIsValid, buttonText }: IProps) => {
  return (
    <button className="button form__button" onClick={onClick} disabled={formIsValid}>
      {buttonText}
    </button>
  );
};
