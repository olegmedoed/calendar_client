import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import decode from "jwt-decode";

import registerServiceWorker from "./registerServiceWorker";

import reducer from "./reducers";
import App from "./App";
import { userLoggerIn } from "./actions/auth";
import { setAuthHeader } from "./utils/auth_header";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const token = window.localStorage.user_jwt;
if (token) {
  const { email, name } = decode(token);
  setAuthHeader(token);
  store.dispatch(userLoggerIn({ email, name, token }));
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
