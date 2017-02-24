import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './containers/App';
import './index.css';
import './pages/pages.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
