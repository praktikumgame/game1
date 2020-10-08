import React from 'react';
import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import './Game.css';

const Game = () => (
  <div className="game">
    <h1>Welcome to GAME</h1>
    <canvas className="canvas"></canvas>
  </div>
);

const GameWithErrorHandler = withErrorBoundary(Game);

export { GameWithErrorHandler };
