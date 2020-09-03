import React from 'react';
import { Error } from '../ErrorBoundary/ErrorBoundary';

import './Game.scss';

export const Game = () => {
  return <h1 className="game">Welcome to GAME</h1>;
};

const WithErrorHandler = () => {
  return (
    <Error>
      <Game />
    </Error>
  );
};
export { WithErrorHandler };
