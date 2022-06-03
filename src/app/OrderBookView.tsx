/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { OrderBook } from "app/components/OrderBook";
import { useOrderBook } from "app/components/OrderBook";
import {
  buyPriceStyles,
  orderBookStyles,
  sellPriceStyles,
  titleStyles,
} from "./OrderBookView.styles";

function OrderBookView({ title }) {
  const { orders, getLimitOrdersSorted } = useOrderBook();
  const [ordersLimited, setOrdersLimited] = useState({});

  const currencyPair = "BTC/USDT";

  useEffect(() => {
    const { asks, bids } = orders;
    const limitedAsks = getLimitOrdersSorted(asks, 18);
    const limitedBids = getLimitOrdersSorted(bids, 18);
    setOrdersLimited({ asks: limitedAsks, bids: limitedBids });
  }, [orders]);

  return (
    <>
      <div css={titleStyles}>{title}</div>
      <OrderBook currency={currencyPair} css={orderBookStyles}>
        <OrderBook.Sell>
          <OrderBook.Title>Sell</OrderBook.Title>
          <OrderBook.Body>
            <OrderBook.Row>
              <OrderBook.Heading>Price/USDT</OrderBook.Heading>
              <OrderBook.Heading>Amount (BTC)</OrderBook.Heading>
            </OrderBook.Row>
            {(() => {
              const { asks = [] } = ordersLimited;
              return asks?.map((ask) => {
                const [price, amount] = ask;
                return (
                  <OrderBook.Row key={`${price}-${amount}`}>
                    <OrderBook.Cell css={sellPriceStyles}>
                      {price}
                    </OrderBook.Cell>
                    <OrderBook.Cell>{amount}</OrderBook.Cell>
                  </OrderBook.Row>
                );
              });
            })()}
          </OrderBook.Body>
        </OrderBook.Sell>
        <OrderBook.Buy>
          <OrderBook.Title>Buy</OrderBook.Title>
          <OrderBook.Body>
            {(() => {
              const { bids = [] } = ordersLimited;
              return bids?.map((buy) => {
                const [price, amount] = buy;
                return (
                  <OrderBook.Row key={`${price}-${amount}`}>
                    <OrderBook.Cell css={buyPriceStyles}>
                      {price}
                    </OrderBook.Cell>
                    <OrderBook.Cell>{amount}</OrderBook.Cell>
                  </OrderBook.Row>
                );
              });
            })()}
          </OrderBook.Body>
        </OrderBook.Buy>
      </OrderBook>
    </>
  );
}

export default OrderBookView;
