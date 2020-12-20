import { Dispatch } from 'redux';
import { START_PENDING_LEADERS, STOP_PENDING_LEADERS, PUSH_LEADERS_LIST, SET_ERROR_MESSAGE } from 'redux/leaders/types';
import { IUserScore } from 'redux/leaders/reducer';
import { LEADERBOARD_ERROR } from '../../constants';
import { leaderBoardApi } from 'services/api/leaderBoardApi';

export function startPendingLeaders() {
  return {
    type: START_PENDING_LEADERS,
  };
}

export function stopPendingLeaders() {
  return {
    type: STOP_PENDING_LEADERS,
  };
}

export function setError(payload: string) {
  return {
    type: SET_ERROR_MESSAGE,
    payload,
  };
}

export function pushLeadersList(payload: IUserScore[]) {
  return {
    type: PUSH_LEADERS_LIST,
    payload,
  };
}

export const loadLeaderListFromServer = () => async (dispatch: Dispatch) => {
  try {
    dispatch(startPendingLeaders());
    const list = await leaderBoardApi.getAllResults();
    dispatch(pushLeadersList(JSON.parse(list)));
  } catch {
    setError(LEADERBOARD_ERROR);
  } finally {
    setTimeout(() => {
      dispatch(stopPendingLeaders());
    }, 2000);
  }
};
