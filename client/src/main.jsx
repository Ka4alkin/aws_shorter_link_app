import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import 'toastr/build/toastr.min.css';
import store from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>,
);