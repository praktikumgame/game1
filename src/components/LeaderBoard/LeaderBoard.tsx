import React from 'react';
import './Leaderboard.css';

export const Leaderboard = (): JSX.Element => {
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
          <tr>
            <th>Cтас</th>
            <th>1488</th>
          </tr>
          <tr>
            <th>Валера</th>
            <th>228</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
