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
    return await fetch(this.getFullUrl(this.handles.SIGNUP), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...body, ...this.uselessFields }),
    }).then(this.getResponseText);
  }

  public async signin(body: stateInputValuesSigninType): Promise<string> {
    return await fetch(this.getFullUrl(this.handles.SIGNIN), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then(this.getResponseText);
  }

  public async logout(): Promise<string> {
    return await fetch(this.getFullUrl(this.handles.LOGOUT), {
      method: 'POST',
      credentials: 'include',
    }).then(this.getResponseText);
  }

  public async getUserInfo(): Promise<{ [key: string]: string }> {
    return await fetch(this.getFullUrl(this.handles.GET_USER_INFO), {
      method: 'GET',
      credentials: 'include',
    }).then(this.getResponseJSON);
  }
}

export { AuthApi };
