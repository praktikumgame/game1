import { combineReducers } from 'redux';
import { appReducer } from './app/reducer';
import { authReducer } from './auth/reducer';
import { signinReducer } from './signin/reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  signin: signinReducer,
});
