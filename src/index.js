import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ContextShare from './context/ContextShare';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <React.StrictMode> */}
      <ContextShare>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ContextShare>
    {/* </React.StrictMode> */}
  </>
);
