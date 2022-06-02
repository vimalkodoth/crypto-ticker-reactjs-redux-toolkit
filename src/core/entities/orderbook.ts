export type IOrder = number[];

export interface Orderbook {
  asks: IOrder[];
  bids: IOrder[];
}
