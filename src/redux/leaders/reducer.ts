import { AnyAction } from 'redux';
import { START_PENDING_LEADERS, STOP_PENDING_LEADERS, PUSH_LEADERS_LIST, SET_ERROR_MESSAGE } from './types';

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
    case START_PENDING_LEADERS: {
      return { ...state, pending: true };
    }
    case STOP_PENDING_LEADERS: {
      return { ...state, pending: false };
    }
    case PUSH_LEADERS_LIST: {
      return { ...state, list: action.payload };
    }
    case SET_ERROR_MESSAGE: {
      return { ...state, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
