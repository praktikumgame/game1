import { BaseAPI } from './baseApi';
import { IUserScore } from 'redux/leaders/reducer';

interface INewResultBody extends IUserScore {
  ratingFieldName: 'score';
}

class LeaderBoardApi extends BaseAPI {
  private handles = {
    NEW_RESULT: '/leaderboard',
    ALL_RESULT: '/leaderboard/all',
  };

  public newResult(body: INewResultBody) {
    return this.fetch(this.handles.NEW_RESULT, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public getAllResults() {
    return this.fetch(this.handles.ALL_RESULT, {
      method: 'POST',
      body: JSON.stringify({
        ratingFieldName: 'score',
        cursor: 0,
        limit: 20,
      }),
    });
  }
}

export const leaderBoardApi = new LeaderBoardApi();
