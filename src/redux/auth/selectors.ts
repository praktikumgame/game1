import { IAuthState } from './reducer';
import { createSelector } from 'reselect';

export const getBackdoor = createSelector(
  (state: { auth: IAuthState }) => state.auth.backdoor,
  (backdoor) => backdoor,
);

export const getAuthorize = createSelector(
  (state: { auth: IAuthState }) => state.auth.isAuthorized,
  (isAuthorized) => isAuthorized,
);
