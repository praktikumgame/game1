import { INIT_APP } from './types';

interface IAppState {
  initApp: boolean;
}

type actionType = {
  type: string;
  payload: IAppState;
};

const initialState: IAppState = {
  initApp: false,
};

const appReducer = (state: IAppState = initialState, action: actionType) => {
  switch (action.type) {
    case INIT_APP: {
      return { ...state, ...{ initApp: true } };
    }
  }
  return state;
};

export { appReducer, IAppState };
