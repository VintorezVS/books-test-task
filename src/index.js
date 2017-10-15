import './assets/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui';
import { books } from './reducers/index';
import { books$ } from './effects/index';
import { createEpicMiddleware } from 'redux-observable';
import ErrorBoundary from './components/ErrorBoundary';
import { composeWithDevTools } from 'redux-devtools-extension';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const epicMiddleware = createEpicMiddleware(books$);
const store = createStore(books, composeWithDevTools(applyMiddleware(epicMiddleware)));

render(
  <ErrorBoundary>
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
