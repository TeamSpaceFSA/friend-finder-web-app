import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.css';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';

import store from './app/store.js'
import { Provider } from 'react-redux';
// import { BrowserRouter as Router } from 'react-router-dom';

//For some reason, if i wrap anything in Router, it breaks the app

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
