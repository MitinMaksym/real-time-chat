import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ErrorBoundry } from "./components";

import App from "./App";

import "./styles/index.scss";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ErrorBoundry>
        <App />
      </ErrorBoundry>
    </Router>
  </Provider>,
  document.getElementById("root")
);
