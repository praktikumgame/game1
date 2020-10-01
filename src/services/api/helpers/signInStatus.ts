import { LOGIN_OR_EMAIL_ERROR, INITIAL_SERVER_ERROR, UNKNOWN_ERROR } from '../../../constants';

const statusToMessageMap = {
  [HTTPCodeStatuses.Unauthorized]: LOGIN_OR_EMAIL_ERROR,
  [HTTPCodeStatuses.InternalError]: INITIAL_SERVER_ERROR,
};

export const getErrorMessageByStatus = (status: keyof typeof statusToMessageMap) => {
  const result = statusToMessageMap[status];
  return result || UNKNOWN_ERROR;
};
