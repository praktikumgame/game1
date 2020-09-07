import React from 'react';
import './Button.css';
interface Button {
  onClick: (event: React.MouseEvent) => void;
  formIsValid?: boolean;
  buttonText: string;
}
export const Button = ({ onClick, formIsValid, buttonText }: Button) => {
  return (
    <button className="button form__button" onClick={onClick} disabled={formIsValid}>
      {buttonText}
    </button>
  );
};
