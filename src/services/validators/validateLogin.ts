import { LOGIN_ERROR } from '../../constants';

export const validateLogin = (target: HTMLInputElement, callback: (text: string) => void): boolean | undefined => {
  if (target.validity.tooShort || target.validity.tooLong) {
    callback(LOGIN_ERROR);
    return false;
  }
  return true;
};
