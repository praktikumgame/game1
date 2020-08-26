import { stateInputValuesSignupType, stateInputValuesSigninType } from '../components';

interface IAuthApi {
  signup(body: stateInputValuesSignupType): Promise<string>;
  signin(body: stateInputValuesSigninType): Promise<string>;
  logout(): Promise<string>;
}

export { IAuthApi, stateInputValuesSignupType, stateInputValuesSigninType };
