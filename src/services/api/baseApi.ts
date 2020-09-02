import { API_URL } from '../../constants';

class BaseAPI {
  protected async getResponseText(response: Response): Promise<string> {
    if (response.status === 200) {
      const text = await response.text();
      return text;
    }

    return Promise.reject(response);
  }

  protected getFullUrl(handle: string): string {
    return `${API_URL}${handle}`;
  }

  protected fetch(handle: string, options: { [key: string]: string | FormData }) {
    return fetch(this.getFullUrl(handle), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }).then(this.getResponseText);
  }
}

export { BaseAPI };
