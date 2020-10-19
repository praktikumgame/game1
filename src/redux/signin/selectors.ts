import { createSelector } from 'reselect';
import { IState } from 'redux/rootReducer';
export const getErrorAndPending = createSelector(
  (state: IState) => state.signin.error,
  (state: IState) => state.signin.pending,
  (error, pending) => ({
    error,
    pending,
  }),
);
