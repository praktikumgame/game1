import {
  StateInputValuesSignupType,
  StateInputValuesSigninType,
  StateInputValuesChangePassword,
} from '../../components';

interface IAuthApi {
  signup(body: StateInputValuesSignupType): Promise<string>;
  signin(body: StateInputValuesSigninType): Promise<string>;
  getUserInfo(): Promise<string>;
  logout(): Promise<string>;
}

interface IUserApi {
  changePassword(body: StateInputValuesChangePassword): Promise<string>;
  changeAvatar(body: FormData): Promise<string>;
}

export { IAuthApi, IUserApi, StateInputValuesSignupType, StateInputValuesSigninType, StateInputValuesChangePassword };
