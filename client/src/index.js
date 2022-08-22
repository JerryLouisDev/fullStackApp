//importing compoents for index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "./Context";

//Rendering beginning of app
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
