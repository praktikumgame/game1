import React, { useCallback, useEffect, useState } from 'react';
import { withErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { init } from './scripts';
import './Game.css';
import { getInitApp } from '../../redux/app/selectors';
import { useSelector } from 'react-redux';
import Engine from './scripts/engine';

const Game = () => {
  const initApp = useSelector(getInitApp);
  const [wh, setWH] = useState({ width: 0, height: 0 });
  const [engine, setEngine] = useState<null | Engine>(null);

  useEffect(() => {
    if (initApp) {
      init().then((res) => setEngine(res));
    }
    return () => {
      engine?.stop();
    };
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setWH({ width: node.clientWidth, height: node.clientHeight });
    }
  }, []);

  return (
    <div className="game">
      <h1>Welcome to GAME</h1>
      <canvas ref={measuredRef} id="canvas" width={wh.width} height={wh.height} className="canvas"></canvas>
    </div>
  );
};

const GameWithErrorHandler = withErrorBoundary(Game);

export { GameWithErrorHandler };
