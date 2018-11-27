import React from 'react';
import 'url-search-params-polyfill';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './register_service_worker';
import { checkForToken, checkForValidToken, startImplicitFlow, endImplicitFlow } from './auth';

if (window.location.href.includes('sign-in')) {
  const searchParams = new URLSearchParams(window.location.hash.substring(1));
  const response = {
    returnedState: searchParams.get('state'),
    token: searchParams.get('access_token'),
    ttl: searchParams.get('expires_in'),
  };
  const r = endImplicitFlow(response);
  window.location.replace(r);
} else if (!checkForToken() || (!('serviceWorker' in navigator) && !checkForValidToken())) {
  // redirect as i have never had a token
  window.location.replace(startImplicitFlow(window.location.href));
} else {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

  ReactDOM.render(React.createElement(
    HashRouter,
    null,
    React.createElement(
      Provider,
      { store },
      React.createElement(App, null),
    ),
  ), document.getElementById('root'));
}
registerServiceWorker();
