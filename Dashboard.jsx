import { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { CircularProgress, Typography } from "@mui/material";
import HeaderBar from "./src/news/HeaderBar";
import { useSelector } from "react-redux";
import { useGetCryptoDetailsForDashboardQuery } from "./src/state/crypto/cryptoApiSlice";
import { useGetWeatherDataForDashboardQuery } from "./src/state/weather/weatherApiSlice";
import CryptoDetailsCard from "./src/crypto/CryptoDetailsCard";
import WeatherDetailsCard from "./src/weather/WeatherDetailsCard";

const Dashboard = () => {
  const cryptoWishList = useSelector((state) => state.dashboardReducer.crypto);
  const weatherWishList = useSelector(
    (state) => state.dashboardReducer.weather
  );

  const { data: cryptoDetails = [], isLoading: isCryptoLoading } =
    useGetCryptoDetailsForDashboardQuery(cryptoWishList, {
      skip: cryptoWishList.length === 0,
      pollingInterval: 100000,
    });

  const { data: weatherDetails = [], isLoading: isWeatherLoading } =
    useGetWeatherDataForDashboardQuery(weatherWishList, {
      skip: weatherWishList.length === 0,
      pollingInterval: 100000,
    });

  const [cryptoGrid, setCryptoGrid] = useState([]);
  const [weatherGrid, setWeatherGrid] = useState([]);

  useEffect(() => {
    if (cryptoDetails.length > 0) {
      setCryptoGrid(
        cryptoDetails.map((item, index) => ({
          i: `crypto-${item.id}`,
          x: index % 3,
          y: Math.floor(index / 3),
          w: 3,
          h: 4,
        }))
      );
    }
  }, [cryptoDetails]);

  useEffect(() => {
    if (weatherDetails.length > 0) {
      setWeatherGrid(
        weatherDetails.map((item, index) => ({
          i: `weather-${item.coord.lat}-${item.coord.lon}`,
          x: index % 3,
          y: Math.floor(index / 3),
          w: 2,
          h: 2,
        }))
      );
    }
  }, [weatherDetails]);

  return (
    <>
      <HeaderBar heading="Dashboard" />

      <div style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Crypto Details
        </Typography>

        {isCryptoLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", padding: 20 }}
          >
            <CircularProgress />
          </div>
        ) : cryptoGrid.length > 0 ? (
          <GridLayout
            className="layout"
            layout={cryptoGrid}
            cols={6}
            rowHeight={100}
            width={1000}
            onLayoutChange={(newLayout) => setCryptoGrid(newLayout)}
            isResizable
            isDraggable
          >
            {cryptoGrid.map((gridItem) => {
              const [, cryptoId] = gridItem.i.split("-");
              const item = cryptoDetails.find((d) => d.id === cryptoId);

              return (
                <div key={gridItem.i} data-grid={gridItem}>
                  {item && <CryptoDetailsCard cryptoDetails={item} />}
                </div>
              );
            })}
          </GridLayout>
        ) : (
          <Typography>No Crypto Data Available</Typography>
        )}

        <Typography variant="h5" gutterBottom style={{ marginTop: "40px" }}>
          Weather Details
        </Typography>

        {isWeatherLoading ? (
          <div
            style={{ display: "flex", justifyContent: "center", padding: 20 }}
          >
            <CircularProgress />
          </div>
        ) : weatherGrid.length > 0 ? (
          <GridLayout
            className="layout"
            layout={weatherGrid}
            cols={6}
            rowHeight={100}
            width={1000}
            onLayoutChange={(newLayout) => setWeatherGrid(newLayout)}
            isResizable
            isDraggable
          >
            {weatherGrid.map((gridItem) => {
              const [, lat, lon] = gridItem.i.split("-");

              const item = weatherDetails.find(
                (d) =>
                  Number(d?.coord?.lat) === Number(lat) &&
                  Number(d?.coord?.lon) === Number(lon)
              );
              return (
                <div key={gridItem.i} data-grid={gridItem}>
                  {item && <WeatherDetailsCard weatherData={item} />}
                </div>
              );
            })}
          </GridLayout>
        ) : (
          <Typography>No Weather Data Available</Typography>
        )}
      </div>
    </>
  );
};

export default Dashboard;
