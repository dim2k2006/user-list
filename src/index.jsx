import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import 'normalize.css';
import './index.css';
import reducer from './redux/slices';
import App from './components/App';

const store = configureStore({
  reducer,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
