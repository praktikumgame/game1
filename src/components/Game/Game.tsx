import React, { useEffect } from 'react';
import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Init } from './scripts';
import './Game.css';
import { getInitApp } from '../../redux/app/selectors';
import { useSelector } from 'react-redux';

const Game = () => {
  const initApp = useSelector(getInitApp);

  useEffect(() => {
    if (initApp) {
      Init();
    }
  });

  return (
    <div className="game">
      <h1>Welcome to GAME</h1>
      <canvas id="canvas" className="canvas"></canvas>
    </div>
  );
};

const GameWithErrorHandler = withErrorBoundary(Game);

export { GameWithErrorHandler };
