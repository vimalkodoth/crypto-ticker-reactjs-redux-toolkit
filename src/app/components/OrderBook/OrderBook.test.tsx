import React from "react";
import { render, screen } from "@testing-library/react";
import { OrderBook } from "./OrderBook";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import OrdersReducer from "core/adaptors/orders";

jest.mock("core/frameworks", () => ({
  store: jest.fn(),
}));

describe("App", () => {
  let currencyPair, ordersLimited, preloadedState, store;
  beforeEach(() => {
    currencyPair = "BTC/USDT";
    ordersLimited = {
      bids: [
        [45231, 0.4],
        [45233, 0.2],
      ],
      asks: [
        [45563, 0.1],
        [455624, 0.6],
      ],
    };
    preloadedState = {
      orders: {
        bids: [],
        asks: [],
      },
    };
    store = configureStore({
      reducer: { orders: OrdersReducer },
      preloadedState,
    });
  });
  test("renders OrderBook component", () => {
    render(
      <Provider store={store}>
        <OrderBook currency={currencyPair}>
          <OrderBook.Sell>
            <OrderBook.Title>Sell</OrderBook.Title>
            <OrderBook.Body>
              <OrderBook.Row>
                <OrderBook.Heading>Price/USDT</OrderBook.Heading>
                <OrderBook.Heading>Amount (BTC)</OrderBook.Heading>
              </OrderBook.Row>
              {(() => {
                const { asks = [] } = ordersLimited;
                return asks?.map((ask) => {
                  const [price, amount] = ask;
                  return (
                    <OrderBook.Row key={`${price}-${amount}`}>
                      <OrderBook.Cell>{price}</OrderBook.Cell>
                      <OrderBook.Cell>{amount}</OrderBook.Cell>
                    </OrderBook.Row>
                  );
                });
              })()}
            </OrderBook.Body>
          </OrderBook.Sell>
          <OrderBook.Buy>
            <OrderBook.Title>Buy</OrderBook.Title>
            <OrderBook.Body>
              {(() => {
                const { bids = [] } = ordersLimited;
                return bids?.map((buy) => {
                  const [price, amount] = buy;
                  return (
                    <OrderBook.Row key={`${price}-${amount}`}>
                      <OrderBook.Cell>{price}</OrderBook.Cell>
                      <OrderBook.Cell>{amount}</OrderBook.Cell>
                    </OrderBook.Row>
                  );
                });
              })()}
            </OrderBook.Body>
          </OrderBook.Buy>
        </OrderBook>
      </Provider>
    );

    const orderBookNode = screen.getByTestId("orderbook");
    expect(orderBookNode).toBeInTheDocument();
  });
});
