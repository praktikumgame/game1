import { ISigninState } from './reducer';
import { createSelector } from 'reselect';

export const getErrorAndPending = createSelector(
  (state: { signin: ISigninState }) => state.signin.error,
  (state: { signin: ISigninState }) => state.signin.pending,
  (error, pending) => ({
    error,
    pending,
  }),
);
