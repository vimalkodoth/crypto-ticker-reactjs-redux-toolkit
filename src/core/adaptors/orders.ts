import { ORDERBOOK_LIMITED, WS_BASE } from "../constants";
import { Orderbook } from "core/entities/orderbook";
import { ConnectInteractor } from "../useCases";
import { StateType } from "./state";

import { createSlice } from "@reduxjs/toolkit";
import { store } from "../frameworks";

type StateSlice = StateType["orders"];

export interface UpdateOrdersActionType {
  type: string;
  payload: string | Orderbook;
}

function formatCurrencyPairForSocket(pair = "") {
  return pair.replace("/", "");
}

function connectOrdersHandler(pair: string) {
  pair = formatCurrencyPairForSocket(pair);
  const connectInteractor = ConnectInteractor();
  connectInteractor.initialize(pair, WS_BASE);
  connectInteractor.on(ORDERBOOK_LIMITED, (orderbook: Orderbook) => {
    const { dispatch } = store;
    dispatch(update(orderbook));
  });
}

const initialState: StateSlice = {
  asks: [],
  bids: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    connect: (state, action) => {
      connectOrdersHandler(action.payload as string);
    },
    update: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { connect, update } = ordersSlice.actions;

export default ordersSlice.reducer;
