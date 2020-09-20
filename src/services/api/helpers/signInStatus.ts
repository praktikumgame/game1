import { LOGIN_OR_EMAIL_ERROR, INITIAL_SERVER_ERROR, UNKNOWN_ERROR } from '../../../constants';

export type SignInStatusGlossary = { 401: string; 500: string };

export const getErrorMessageByStatus = (status: keyof SignInStatusGlossary) => {
  const statusGlossary: SignInStatusGlossary = {
    401: LOGIN_OR_EMAIL_ERROR,
    500: INITIAL_SERVER_ERROR,
  };
  const result = statusGlossary[status];
  return result || UNKNOWN_ERROR;
};
