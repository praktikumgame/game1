import React from 'react';
import './Button.scss';
interface Button {
  onCLickHandler: (event: React.MouseEvent) => void;
  formIsValid: boolean;
  buttonText: string;
}
export const Button = ({ onCLickHandler, formIsValid, buttonText }: Button) => {
  return (
    <button className="button form__button" onClick={onCLickHandler} disabled={formIsValid}>
      {buttonText}
    </button>
  );
};
