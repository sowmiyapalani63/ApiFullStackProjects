import React from 'react';
import { createRoot } from 'react-dom/client';
import './Assests/global.css';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import { UserProvider } from './Hooks/hooks';
import { store } from './featrues/store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <UserProvider>
      <App />
    </UserProvider>
  </Provider>
);

