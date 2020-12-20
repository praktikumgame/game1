import { IState } from 'redux/rootReducer';
import { createSelector } from 'reselect';

export const getLeaderList = createSelector(
  (state: IState) => state.leaders.list,
  (leadersList) => leadersList,
);

export const selectLeadersPending = (state: IState) => state.leaders.pending;
export const selectLeadersError = (state: IState) => state.leaders.error;
