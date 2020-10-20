import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { rootReducer } from 'redux/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import './static/stylesheet.css';
import { ensureServiceWorkerInstalled } from './service-worker-check';

interface DevTools {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<{ dispatch: unknown }, Record<string, unknown>>;
}
type DevWindow = DevTools & Window & typeof globalThis;

const middleware = () => {
  const members = [applyMiddleware(thunk)];
  if (process.env.NODE_ENV === 'development' && (window as DevWindow).__REDUX_DEVTOOLS_EXTENSION__) {
    members.push((window as DevWindow).__REDUX_DEVTOOLS_EXTENSION__());
  }
  return members;
};

const store = createStore(rootReducer, compose(...middleware()));

ensureServiceWorkerInstalled();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
