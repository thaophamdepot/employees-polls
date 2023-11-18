import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore} from '@reduxjs/toolkit'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import thunk from "redux-thunk";

import "./index.css";
import App from "./components/App";
import reducer from "./reducers";

const store = configureStore({reducer: reducer, middleware: [thunk]});
const root = ReactDOM.createRoot( document.getElementById('root') ); 

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
