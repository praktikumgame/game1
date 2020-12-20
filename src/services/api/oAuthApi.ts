import { BaseAPI } from './baseApi';
import { parseQueriesToObject } from 'services/api/helpers/parseQueriesToObject';

type ServiceIdResponse = { service_id: string };

class OAuthApi extends BaseAPI {
  private YANDEX_O_AUTH_URL = 'https://oauth.yandex.ru/authorize';
  private handles = {
    REQUEST_O_AUTH: '/oauth/yandex/service-id',
    AUTH_WITH_YANDEX: '/oauth/yandex',
  };

  private redirect({ service_id }: ServiceIdResponse) {
    const redirectUri = window.location.origin;
    document.location.href = `${this.YANDEX_O_AUTH_URL}?response_type=code&client_id=${service_id}&redirect_uri=${redirectUri}/`;
  }

  public async startOAuthYandex() {
    const res = await this.fetch(this.handles.REQUEST_O_AUTH);
    const data = JSON.parse(res);
    this.redirect(data);
  }

  public authorizeIfCodePassed() {
    const { code } = parseQueriesToObject(window.location.href);

    if (code) {
      return this.fetch(this.handles.AUTH_WITH_YANDEX, {
        method: 'POST',
        body: JSON.stringify({ code }),
      });
    }
  }
}

export const oAuthApi = new OAuthApi();
