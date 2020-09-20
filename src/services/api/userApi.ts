import { BaseAPI } from './baseApi';
import { PasswordValuesType, IUserApi } from './types';

class UserApi extends BaseAPI implements IUserApi {
  private handles = {
    AVATAR: '/user/profile/avatar',
    PROFILE: '/user/profile',
    PASSWORD: '/user/password',
  };

  public async changePassword(body: PasswordValuesType): Promise<string> {
    return this.fetch(this.handles.PASSWORD, {
      body: JSON.stringify(body),
      method: 'PUT',
    });
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
