import React from "react";
import { Provider } from "react-redux";
import { store } from "core/frameworks";
import "./App.css";
import OrderBookView from "./OrderBookView";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <OrderBookView title="OrderBook" />
      </Provider>
    </div>
  );
}

export default App;
