import { BaseAPI } from './baseApi';
import { stateInputValuesChangePassword, IUserApi } from './types';

class UserApi extends BaseAPI implements IUserApi {
  private handles = {
    AVATAR: '/user/profile/avatar',
    PROFILE: '/user/profile',
    PASSWORD: '/user/password',
  };

  public async changePassword(body: stateInputValuesChangePassword): Promise<string> {
    return fetch(this.getFullUrl(this.handles.PASSWORD), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then(this.getResponseText);
  }

  public async changeAvatar(body: FormData): Promise<string> {
    return fetch(this.getFullUrl(this.handles.AVATAR), {
      method: 'PUT',
      credentials: 'include',
      body,
    }).then(this.getResponseText);
  }
}

const userApi = new UserApi();

export { userApi };
