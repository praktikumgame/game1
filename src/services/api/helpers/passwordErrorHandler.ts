import { INITIAL_SERVER_ERROR, INCORRECT_OLD_PASSWORD, UNKNOWN_ERROR } from '../../../constants';

const statusToMessageMap = {
  [HTTPCodeStatuses.BadRequest]: INCORRECT_OLD_PASSWORD,
  [HTTPCodeStatuses.InternalError]: INITIAL_SERVER_ERROR,
};

const errorPasswordHandler = (status: keyof typeof statusToMessageMap) => {
  const result = statusToMessageMap[status];
  return result || UNKNOWN_ERROR;
};

export { errorPasswordHandler };
