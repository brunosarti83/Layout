/* eslint-disable react/prop-types */
// TradingViewWidget.jsx
import { useEffect, useRef, memo } from "react";

const ScreenerWidget = ({ type }) => {
  const container = useRef();

  useEffect(() => {
    const config = {
      defaultColumn: "performance",
      screener_type: type,
      displayCurrency: "USD",
      colorTheme: "light",
      locale: "en",
    };
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify(config);
    container.current.appendChild(script);
  }, []);

  return (
    <div
      ref={container}
      className="tradingview-widget-container"
      style={{ width: "100%", height: "100%" }}
    >
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

const Screener = memo(ScreenerWidget);

export default Screener;
