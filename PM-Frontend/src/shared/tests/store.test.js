import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

function renderWithRedux(ui: JSX.Element, initialState: any) {
  const store = configureStore({
    reducer: {
      // ...
    },
    preloadedState: initialState,
  });
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}
