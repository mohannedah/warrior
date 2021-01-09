import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./assets/main.css";
import "./bootstrap.min.css";
import "./App.css";
import "./material-kit.css";
import store from "./store";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
