import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { signinReducer } from './signinReducer';
import { appReducer } from './appReducer';

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  signin: signinReducer,
});
