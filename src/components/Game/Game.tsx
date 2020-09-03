import React from 'react';
import './Game.scss';
import { Error } from '../ErrorBoundary/ErrorBoundary';

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
