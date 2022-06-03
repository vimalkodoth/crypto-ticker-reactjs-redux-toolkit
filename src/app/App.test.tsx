import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders OrderBook component", () => {
    render(<App />);
    const orderBookNode = screen.getByTestId("orderbook");
    expect(orderBookNode).toBeInTheDocument();
  });
});
