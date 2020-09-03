import React from 'react';
import './Game.scss';
import { ErrorBoundary } from '../';

export const Game = () => {
  return <h1 className="game">Welcome to GAME</h1>;
};

const WithErrorHandler = () => {
  return (
    <ErrorBoundary>
      <Game />
    </ErrorBoundary>
  );
};
export { WithErrorHandler };
