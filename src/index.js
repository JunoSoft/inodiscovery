import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "font-awesome/css/font-awesome.min.css";

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};
ReactDOM.render(
  <React.Fragment>
    <BrowserRouter >
      <Route component={ScrollToTop} />
      <App />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
