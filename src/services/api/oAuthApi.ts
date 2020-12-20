import { BaseAPI } from './baseApi';

type ServiceIdResponse = { service_id: string }

class OAuthApi extends BaseAPI {
  private YANDEX_O_AUTH_URL = 'https://oauth.yandex.ru/authorize';
  private handles = {
    REQUEST_O_AUTH: '/oauth/yandex/service-id',
  };

  private redirect({ service_id }: ServiceIdResponse) {
    document.location.href = `${this.YANDEX_O_AUTH_URL}?response_type=code&client_id=${service_id}&redirect_uri=${window.location.origin}`;
  }

  public async startOauthYandex() {
    const res = await this.fetch(this.handles.REQUEST_O_AUTH);
    const data = JSON.parse(res);
    this.redirect(data);
  }
}

export const leaderBoardApi = new OAuthApi();
