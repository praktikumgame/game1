import React from 'react';
import { withErrorBoundary } from '../';

import './Game.css';

export const Game = () => {
  return <h1 className="game">Welcome to GAME</h1>;
};

const GameWithErrorHandler = () => withErrorBoundary(Game);

export { GameWithErrorHandler };
