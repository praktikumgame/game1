import { API_URL } from '../constants';

class ErrorFromServer extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}
class BaseAPI {
  protected async getResponseText(response: Response): Promise<string> {
    console.log(response);
    if (response.status === 200) {
      const json = await response.text();
      return json;
    }

    const err = await response.json();
    throw new ErrorFromServer(response.status, err.reason);
  }

  protected async getResponseJSON(response: Response): Promise<{ [key: string]: string }> {
    if (response.status === 200) {
      const json = await response.json();
      return json;
    }
    const err = await response.json();
    throw new Error(err.reason);
  }

  protected getFullUrl(handle: string): string {
    return `${API_URL}${handle}`;
  }
}

export { BaseAPI };
