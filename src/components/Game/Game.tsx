import React from 'react';
import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import './Game.css';

const Game = () => <h1 className="game">Welcome to GAME</h1>;

const GameWithErrorHandler = withErrorBoundary(Game);

export { GameWithErrorHandler };
