import React from 'react';
import { ErrorBoundary } from '../';

import './Game.css';

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
