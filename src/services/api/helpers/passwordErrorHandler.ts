import { INITIAL_SERVER_ERROR, INCORRECT_OLD_PASSWORD, UNKNOWN_ERROR } from '../../../constants';

export type SettingsStatusGlossary = {
  400: string;
  500: string;
};

const errorPasswordHandler = (status: keyof SettingsStatusGlossary) => {
  const statusGlossary = {
    400: INCORRECT_OLD_PASSWORD,
    500: INITIAL_SERVER_ERROR,
  };
  const result = statusGlossary[status];
  return result || UNKNOWN_ERROR;
};

export { errorPasswordHandler };
