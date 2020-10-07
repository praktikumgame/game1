import { IAppState } from './reducer';
import { createSelector } from 'reselect';

export const getInitApp = createSelector(
  (state: { app: IAppState }) => state.app.initApp,
  (initApp) => initApp,
);
