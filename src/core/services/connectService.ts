import { IConnectService } from "../useCases";
import { connect, Socket } from "socket.io-client";
import { WS_BASE } from "../constants";
import { Orderbook } from "../entities/orderbook";

export const initialize = (pair: string, url: string) => {
  const socket: Socket = connect(url, {
    path: "/socket.io",
    rejectUnauthorized: false,
    transports: ["websocket"],
  });
  socket.on("connect", () => {
    socket.emit("token", "guest");
    socket.emit("leave", null);
    socket.emit("join", pair);
  });
  return socket;
};

export const ConnectService: IConnectService = () => {
  let socket: Socket;
  return {
    initialize: (pair = "BTCUSDT", url = WS_BASE) => {
      socket = initialize(pair, url);
    },
    on: (event = "orderbook_limited", callback: Function) => {
      if (!socket) throw new Error("socket is not initalized!");
      socket.on(event, (msg: string) => {
        callback(msg);
      });
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    },
  };
};
