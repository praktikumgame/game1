import { BaseAPI } from './baseApi';
import { PasswordValuesType, IUserApi } from './types';

class UserApi extends BaseAPI implements IUserApi {
  private handles = {
    AVATAR: '/user/profile/avatar',
    PROFILE: '/user/profile',
    PASSWORD: '/user/password',
  };

  public async changePassword(body: PasswordValuesType): Promise<unknown> {
    return fetch(this.getFullUrl(this.handles.PASSWORD), {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      method: 'PUT',
      credentials: 'include',
    }).then((response) => {
      const { status } = response;
      const text = response.text();
      if (status === 200) {
        return text;
      }

      return Promise.reject({ text, status });
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
