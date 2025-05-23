import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { store } from './store/redux/store';
import { Provider as ProviderRedux } from 'react-redux';

import { MobxProvider } from './store/mobx';
import { attachLogger } from 'effector-logger';

attachLogger();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProviderRedux store={store}>
      <MobxProvider>
        <App />
      </MobxProvider>
    </ProviderRedux>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
