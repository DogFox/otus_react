import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './app/index.css';
import App from './app/App';
import { store } from './app/store';
import { initializeApplication, TOKEN_STORAGE_KEY } from './app/store/authSlice';

store.dispatch(initializeApplication(localStorage.getItem(TOKEN_STORAGE_KEY)));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
