import { IState } from 'redux/rootReducer';
import { createSelector } from 'reselect';
export const getSignUp = createSelector(
  (state: IState) => state.signup.pending,
  (state: IState) => state.signup.error,
  (pending, error) => ({
    error,
    pending,
  }),
);
