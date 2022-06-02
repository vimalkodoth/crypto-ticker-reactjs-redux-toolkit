import { useEffect, useState } from "react";
import { OrderBook } from "./components/OrderBook";
import { useOrderBook } from "./components/OrderBook";
import {
  buyPriceStyles,
  orderBookStyles,
  sellPriceStyles,
} from "./OrderBookView.styles";

function OrderBookView() {
  const { orders, getAsksLimitSorted, getBidsLimitSorted } = useOrderBook();
  const [ordersLimited, setOrdersLimited] = useState(null);

  const currencyPair = "BTC/USDT";

  useEffect(() => {
    const asks = getAsksLimitSorted(orders, 18);
    const bids = getBidsLimitSorted(orders, 18);
    setOrdersLimited({ asks, bids });
  }, [orders]);

  if (!ordersLimited) return <div>Loading ...</div>;

  return (
    <OrderBook currency={currencyPair} css={orderBookStyles}>
      <OrderBook.Sell>
        <OrderBook.Title>Order Book</OrderBook.Title>
        <OrderBook.Body>
          <div>Sell</div>
          <OrderBook.Row>
            <OrderBook.Heading>Price/USDT</OrderBook.Heading>
            <OrderBook.Heading>Amount (BTC)</OrderBook.Heading>
          </OrderBook.Row>
          {(() => {
            const { asks } = ordersLimited;
            return asks.map((ask) => {
              const [price, amount] = ask;
              console.log(price, amount);
              return (
                <OrderBook.Row>
                  <OrderBook.Cell css={sellPriceStyles}>{price}</OrderBook.Cell>
                  <OrderBook.Cell>{amount}</OrderBook.Cell>
                </OrderBook.Row>
              );
            });
          })()}
        </OrderBook.Body>
      </OrderBook.Sell>
      <OrderBook.Buy>
        <OrderBook.Body>
          <div>Buy</div>
          {(() => {
            const { bids } = ordersLimited;
            return bids.map((buy) => {
              const [price, amount] = buy;
              console.log(price, amount);
              return (
                <OrderBook.Row>
                  <OrderBook.Cell css={buyPriceStyles}>{price}</OrderBook.Cell>
                  <OrderBook.Cell>{amount}</OrderBook.Cell>
                </OrderBook.Row>
              );
            });
          })()}
        </OrderBook.Body>
      </OrderBook.Buy>
    </OrderBook>
  );
}

export default OrderBookView;
