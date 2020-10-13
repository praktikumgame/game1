import React, { useCallback, useEffect, useState } from 'react';
import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Init } from './scripts';
import './Game.css';
import { getInitApp } from '../../redux/app/selectors';
import { useSelector } from 'react-redux';

const Game = () => {
  const initApp = useSelector(getInitApp);
  const [wh, setWH] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (initApp) {
      Init();
    }
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setWH({ width: node.clientWidth, height: node.clientHeight });
    }
  }, []);

  return (
    <div className="game">
      <h1>Welcome to GAME</h1>
      <canvas
        ref={measuredRef}
        id="canvas"
        width={wh.width || 300}
        height={wh.height || 150}
        className="canvas"
      ></canvas>
    </div>
  );
};

const GameWithErrorHandler = withErrorBoundary(Game);

export { GameWithErrorHandler };
