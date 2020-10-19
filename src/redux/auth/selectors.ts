import { IState } from 'redux/rootReducer';
import { createSelector } from 'reselect';
export const getAuthorize = createSelector(
  (state: IState) => state.auth.isAuthorized,
  (isAuthorized) => isAuthorized,
);
