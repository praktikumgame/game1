import { combineReducers } from 'redux';
import { appReducer, IAppState } from './app/reducer';
import { authReducer, IAuthState } from './auth/reducer';
import { ISigninState, signinReducer } from './signin/reducer';
import { ISignupState, signupReducer } from './signup/reducer';
import { IUserSettingState, userSettingReducer } from './userSettings/reducer';

export interface IState {
  app: IAppState;
  auth: IAuthState;
  signin: ISigninState;
  signup: ISignupState;
  userSettings: IUserSettingState;
}
export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  signin: signinReducer,
  signup: signupReducer,
  userSettings: userSettingReducer,
});
