/* eslint-disable react/prop-types */
// TradingViewWidget.jsx
import { useEffect, useRef, memo } from "react";

const SingleTicker = ({ symbol }) => {
  const container = useRef();

  useEffect(() => {
    const config = {
      symbol,
      width: 350,
      isTransparent: false,
      colorTheme: "light",
      locale: "en",
    };
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    container.current.appendChild(script);
  }, []);

  return (
    <div ref={container} className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

const SingleItem = memo(SingleTicker);

export default SingleItem;
