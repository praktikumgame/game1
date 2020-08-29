import {
  stateInputValuesSignupType,
  stateInputValuesSigninType,
  stateInputValuesChangePassword,
} from '../../components';

interface IAuthApi {
  signup(body: stateInputValuesSignupType): Promise<string>;
  signin(body: stateInputValuesSigninType): Promise<string>;
  logout(): Promise<string>;
}

interface IUserApi {
  changePassword(body: stateInputValuesChangePassword): Promise<string>;
  changeAvatar(body: FormData): Promise<string>;
}

export { IAuthApi, IUserApi, stateInputValuesSignupType, stateInputValuesSigninType, stateInputValuesChangePassword };
