import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./Dashboard/Store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

/*

  - Migrate over dashboard stuff

*/
