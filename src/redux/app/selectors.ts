import { createSelector } from 'reselect';
import { IState } from 'redux/rootReducer';
export const getInitApp = createSelector(
  (state: IState) => state.app.initApp,
  (initApp) => initApp,
);
