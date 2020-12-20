import { Dispatch } from 'redux';
import {
  LOAD_LEADERBOARD_REQUEST,
  LOAD_LEADERBOARD_SUCCESS,
  PUSH_LEADERS_LIST,
  LOAD_LEADERBOARD_ERROR,
} from 'redux/leaders/types';
import { IUserScore } from 'redux/leaders/reducer';
import { LEADERBOARD_ERROR } from '../../constants';
import { leaderBoardApi } from 'services/api/leaderBoardApi';

export function leaderBoardRequest() {
  return {
    type: LOAD_LEADERBOARD_REQUEST,
  };
}

export function leaderBoardSuccess() {
  return {
    type: LOAD_LEADERBOARD_SUCCESS,
  };
}

export function leaderBoardError(payload: string) {
  return {
    type: LOAD_LEADERBOARD_ERROR,
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
    dispatch(leaderBoardRequest());
    const list = await leaderBoardApi.getAllResults();
    dispatch(pushLeadersList(JSON.parse(list)));
  } catch {
    leaderBoardError(LEADERBOARD_ERROR);
  } finally {
    setTimeout(() => {
      dispatch(leaderBoardSuccess());
    }, 2000);
  }
};
