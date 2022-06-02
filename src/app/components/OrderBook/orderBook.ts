import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../core/adaptors";
import { connect } from "../../../core/adaptors/orders";
export const OrderBookContext = React.createContext({});

export default function useOrderBook() {
  const orders = useSelector((state: StateType) => state.orders);
  const dispatch = useDispatch();

  const connectOrderBook = (currencyPair: string) => {
    dispatch(connect(currencyPair));
  };

  return { connectOrderBook, orders };
}
