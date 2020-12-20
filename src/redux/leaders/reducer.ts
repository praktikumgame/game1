import { AnyAction } from 'redux';
import { LOAD_LEADERBOARD_REQUEST, LOAD_LEADERBOARD_SUCCESS, PUSH_LEADERS_LIST, LOAD_LEADERBOARD_ERROR } from './types';

export interface IUserScore {
  data: {
    name: string;
    score: number;
  };
}

export interface ILeadersState {
  list: IUserScore[];
  pending: boolean;
  error: string;
}

const initialState: ILeadersState = {
  list: [],
  pending: false,
  error: '',
};

export const leadersReducer = (state: ILeadersState = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_LEADERBOARD_REQUEST: {
      return { ...state, pending: true };
    }
    case LOAD_LEADERBOARD_SUCCESS: {
      return { ...state, pending: false };
    }
    case PUSH_LEADERS_LIST: {
      return { ...state, list: action.payload };
    }
    case LOAD_LEADERBOARD_ERROR: {
      return { ...state, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
