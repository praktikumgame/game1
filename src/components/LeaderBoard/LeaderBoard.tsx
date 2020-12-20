import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadLeaderListFromServer } from 'redux/leaders/actions';
import { getLeaderList, selectLeadersError, selectLeadersPending } from 'redux/leaders/selectors';
import { SingleRow } from 'components/LeaderBoard/SingleRow/SingleRow';

import './Leaderboard.css';

export const Leaderboard = () => {
  const dispatch = useDispatch();
  const list = useSelector(getLeaderList);
  const pending = useSelector(selectLeadersPending);
  const error = useSelector(selectLeadersError);

  useEffect(() => {
    dispatch(loadLeaderListFromServer());
  }, []);

  if (pending || error) {
    return (
      <div className="Leaderboard">
        <p className="Leaderboard__status">{error ? error : 'Загрузка списка лидеров...'}</p>
      </div>
    );
  }

  return (
    <div className="Leaderboard">
      <table className="table-bordered table-hover">
        <thead>
          <tr>
            <th>Имя игрока</th>
            <th>Количество очков</th>
          </tr>
        </thead>
        <tbody>
          {list.map((res) => (
            <SingleRow key={res.data.name} name={res.data.name} score={res.data.score} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
