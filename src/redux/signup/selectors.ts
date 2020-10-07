import { ISignupState } from './reducer';
import { createSelector } from 'reselect';

export const getSignUp = createSelector(
  (state: { signup: ISignupState }) => state.signup.pending,
  (state: { signup: ISignupState }) => state.signup.error,
  (pending, error) => ({
    error,
    pending,
  }),
);
