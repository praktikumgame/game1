import React from 'react';
import './Game.scss';
import { Error } from '../ErrorBoundary/ErrorBoundary';

export const Game = (): JSX.Element => {
  return <h1 className="game">Welcome to GAME</h1>;
};

const WithErrorHandler = (): JSX.Element => {
  return (
    <Error>
      <Game></Game>
    </Error>
  );
};
export { WithErrorHandler };
