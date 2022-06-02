/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { useOrderBook } from "./useOrderBook";

export function OrderBook({ children, currency, ...restProps }) {
  const { connectOrderBook } = useOrderBook();

  useEffect(() => {
    connectOrderBook(currency);
  }, []);

  return <div {...restProps}>{children}</div>;
}

OrderBook.Title = function ({ children }) {
  return <caption className="orderbook-title">{children}</caption>;
};

OrderBook.Row = function ({ children }) {
  return <tr className="orderbook-row">{children}</tr>;
};

OrderBook.Cell = function ({ children, ...restProps }) {
  return <td {...restProps}>{children}</td>;
};

OrderBook.Heading = function ({ children, ...restProps }) {
  return (
    <th scope="col" {...restProps}>
      {children}
    </th>
  );
};

OrderBook.Body = function ({ children }) {
  return <tbody>{children}</tbody>;
};

OrderBook.Buy = function ({ children }) {
  return <table className="orderbook-buy">{children}</table>;
};

OrderBook.Sell = function ({ children }) {
  return <table className="orderbook-sell">{children}</table>;
};
