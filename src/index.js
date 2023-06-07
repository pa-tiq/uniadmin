import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//Boostrap Libs
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//SBAdmin2 Style
//import './styles/scss/sb-admin-2.scss';
import './assets/css/sb-admin-2.css';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import SubjectContextProvider from './context/subject-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <SubjectContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SubjectContextProvider>
  
);