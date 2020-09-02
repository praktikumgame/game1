import { BaseAPI } from './baseApi';
import { IAuthApi, stateInputValuesSignupType, stateInputValuesSigninType } from './types';

class AuthApi extends BaseAPI implements IAuthApi {
  private handles = {
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    GET_USER_INFO: '/auth/user',
  };
  private uselessFields = { first_name: 'null', second_name: 'null', phone: '89999999999' };

  public async signup(body: stateInputValuesSignupType): Promise<string> {
    return this.fetch(this.handles.SIGNUP, {
      method: 'POST',
      body: JSON.stringify({ ...body, ...this.uselessFields }),
    });
  }

  public async signin(body: stateInputValuesSigninType): Promise<string> {
    return this.fetch(this.handles.SIGNIN, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async logout(): Promise<string> {
    return this.fetch(this.handles.LOGOUT, {
      method: 'POST',
    });
  }

  public async getUserInfo(): Promise<string> {
    return this.fetch(this.handles.GET_USER_INFO, {
      method: 'GET',
    });
  }
}

export const authApi = new AuthApi();
