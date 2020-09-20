import {
  PASSWORD_ERROR_LENGTH,
  PASSWORD_ERROR_NUMBERS,
  PASSWORD_ERROR_LATIN,
  PASSWORD_ERROR_CHARACTERS_DIFFERENT_REGISTERS,
} from '../../constants';

export const validatePassword = (target: HTMLInputElement, callback: (text: string) => void): boolean => {
  if (target.validity.tooShort) {
    callback(PASSWORD_ERROR_LENGTH);
    return false;
  }

  if (!target.validity.valid) {
    if (!/[A-Z]/g.test(target.value)) {
      callback(PASSWORD_ERROR_CHARACTERS_DIFFERENT_REGISTERS);
      return false;
    }

    if (!/[a-z]/g.test(target.value)) {
      callback(PASSWORD_ERROR_CHARACTERS_DIFFERENT_REGISTERS);
      return false;
    }

    if (/[\W_]/g.test(target.value)) {
      callback(PASSWORD_ERROR_LATIN);
      return false;
    }

    if (!/[\d]/g.test(target.value)) {
      callback(PASSWORD_ERROR_NUMBERS);
      return false;
    }
  }
  return true;
};
