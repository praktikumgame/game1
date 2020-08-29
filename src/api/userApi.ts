import { BaseAPI } from './baseApi';

interface IUserApi {
  changePassword(body: any): Promise<string>;
}

class UserApi extends BaseAPI implements IUserApi {
  private handles = {
    AVATAR: '/user/profile/avatar',
    PROFILE: '/user/profile',
    PASSWORD: '/user/password',
  };

  // getAvatar(body: FormData) {
  //   const options = {
  //     body,
  //   };
  //   const handle = this.getFullUrl(this.handles.AVATAR);

  //   return this._http.put(handle, options).then(this.getResponseWithParse);
  // }

  // profile(body: objectKeyString) {
  //   const options = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   };
  //   const handle = this.getFullUrl(this.handles.PROFILE);

  //   return this._http.put(handle, options).then(this.getResponseWithParse);
  // }

  public async changePassword(body: any): Promise<string> {
    return await fetch(this.getFullUrl(this.handles.PASSWORD), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    }).then(this.getResponseText);
  }

  public async changeAvatar(body: FormData): Promise<string> {
    return await fetch(this.getFullUrl(this.handles.AVATAR), {
      method: 'PUT',
      credentials: 'include',
      body,
    }).then(this.getResponseText);
  }
}

export { UserApi };
