import { SignupValuesType, SignInValuesType, PasswordValuesType } from '../../components';

interface IAuthApi {
  signup(body: SignupValuesType): Promise<string>;
  signin(body: SignInValuesType): Promise<string>;
  getUserInfo(): Promise<string>;
  logout(): Promise<string>;
}

interface IUserApi {
  changePassword(body: PasswordValuesType): Promise<unknown>;
  changeAvatar(body: FormData): Promise<string>;
}

export { IAuthApi, IUserApi, SignupValuesType, SignInValuesType, PasswordValuesType };
