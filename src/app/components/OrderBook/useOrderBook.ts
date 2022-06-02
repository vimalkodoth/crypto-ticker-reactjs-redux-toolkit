import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../core/adaptors";
import { connect } from "../../../core/adaptors/orders";
export const OrderBookContext = React.createContext({});

export function useOrderBook() {
  const orders = useSelector((state: StateType) => state.orders);
  const dispatch = useDispatch();

  const connectOrderBook = (currencyPair: string) => {
    dispatch(connect(currencyPair));
  };

  const getAsksLimitSorted = (orders, limit) => {
    const { asks = [] } = orders;
    const AsksLimit = asks.slice(0, limit);
    AsksLimit.sort(([p1], [p2]) => {
      return p2 - p1;
    });
    return AsksLimit;
  };

  const getBidsLimitSorted = (orders, limit) => {
    const { bids = [] } = orders;
    const BidsLimit = bids.slice(0, limit);
    BidsLimit.sort(([p1], [p2]) => {
      return p2 - p1;
    });
    return BidsLimit;
  };

  return { connectOrderBook, getBidsLimitSorted, getAsksLimitSorted, orders };
}
