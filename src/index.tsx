import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { ensureServiceWorkerInstalled } from './service-worker-check';

ensureServiceWorkerInstalled();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
