import { EMAIL_IS_EXIST, LOGIN_IS_EXIST, INITIAL_SERVER_ERROR, UNKNOWN_ERROR } from '../../../constants';

export const getErrorMessageByStatusAndText = (message: string, status: number): string => {
  switch (status) {
    case HTTPCodeStatuses.RequestConflict: {
      if (message.startsWith('Email')) {
        return EMAIL_IS_EXIST;
      }
      if (message.startsWith('Login')) {
        return LOGIN_IS_EXIST;
      }
    }
    case HTTPCodeStatuses.InternalError: {
      return INITIAL_SERVER_ERROR;
    }
    default: {
      return UNKNOWN_ERROR;
    }
  }
};
