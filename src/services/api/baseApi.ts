import { API_URL } from '../../constants';

class BaseAPI {
  protected async getResponseText(response: Response): Promise<string> {
    const { status } = response;
    if (status === 200) {
      return response.text();
    }

    const { reason } = await response.json();
    return Promise.reject({ reason, status });
  }

  protected getFullUrl(handle: string): string {
    return `${API_URL}${handle}`;
  }

  protected fetch(handle: string, options: { [key: string]: string | FormData } = {}) {
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
