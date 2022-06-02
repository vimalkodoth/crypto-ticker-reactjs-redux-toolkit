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

  const getLimitOrdersSorted = (orders, limit) => {
    const slicedOrders = orders.slice(0, limit);
    slicedOrders.sort(([p1], [p2]) => {
      return p2 - p1;
    });
    return slicedOrders;
  };

  return { connectOrderBook, getLimitOrdersSorted, orders };
}
