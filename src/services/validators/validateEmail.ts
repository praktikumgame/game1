import { EMAIL_ERROR } from '../../constants';

export const validateEmail = (target: HTMLInputElement, callback: (text: string) => void): boolean => {
  if (!target.validity.valid) {
    callback(EMAIL_ERROR);
    return false;
  }
  return true;
};
