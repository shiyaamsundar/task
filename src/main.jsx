import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../src/state/store";
import StockWidget from "./stock/StockWidget.jsx";
import NewsWidget from "./news/NewsWidget.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CryptoWidget from "./crypto/CryptoWidget.jsx";
import CryptoChart from "./crypto/CryptoChart.jsx";
import StockChart from "./stock/stockChart.jsx";
import WeatherApp from "./weather/WeatherApp.jsx";
import Dashboard from "../Dashboard.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/news/*" element={<NewsWidget />} />
        <Route path="/crypto" element={<CryptoWidget />} />
        <Route path="/crypto/:id" element={<CryptoChart />} />
        <Route path="/stock/:id" element={<StockChart />} />
        <Route path="/stock" element={<StockWidget />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
