import { IAuthState } from './reducer';
import { createSelector } from 'reselect';

export const getAuthorize = createSelector(
  (state: { auth: IAuthState }) => state.auth.isAuthorized,
  (isAuthorized) => isAuthorized,
);
