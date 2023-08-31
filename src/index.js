import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import 'semantic-ui-css/semantic.min.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import mainPageReducer from './redux/reducers';

const store = createStore(mainPageReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
