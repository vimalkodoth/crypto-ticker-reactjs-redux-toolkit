import { useEffect } from "react";
import { OrderBook } from "./components/OrderBook";
import useOrderBook from "./components/OrderBook/orderBook";
import {
  buyPriceStyles,
  orderBookStyles,
  sellPriceStyles,
} from "./OrderBookView.styles";

function OrderBookView() {
  const { orders } = useOrderBook();
  const currencyPair = "BTC/USDT";

  useEffect(() => {
    console.log(orders);
  }, [orders]);

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
            const { asks = [] } = orders;
            const AsksLimit = asks.slice(0, 18);
            AsksLimit.sort(([p1], [p2]) => {
              return p2 - p1;
            });
            return AsksLimit.map((ask) => {
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
            const { bids = [] } = orders;
            const AsksLimit = bids.slice(0, 18);
            AsksLimit.sort(([p1], [p2]) => {
              return p2 - p1;
            });
            return AsksLimit.map((ask) => {
              const [price, amount] = ask;
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
