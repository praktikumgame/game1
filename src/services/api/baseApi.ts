import { API_URL } from '../../constants';

class BaseAPI {
  protected async getResponseText(response: Response): Promise<string> {
    if (response.status === 200) {
      const text = await response.text();
      return text;
    }

    return Promise.reject(response);
  }

  protected async getResponseJSON(response: Response): Promise<{ [key: string]: string }> {
    if (response.status === 200) {
      const json = await response.json();
      return json;
    }

    return Promise.reject(response);
  }

  protected getFullUrl(handle: string): string {
    return `${API_URL}${handle}`;
  }
}

export { BaseAPI };
