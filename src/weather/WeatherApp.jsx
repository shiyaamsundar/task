import { useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetWeatherDataQuery } from "../state/weather/weatherApiSlice";
import {
  API_TYPE_FORECAST,
  API_TYPE_WEATHER,
} from "../state/weather/constants";
import WeatherScrollCards from "./WeatherScrollCards";
import WeatherDetailsCard from "./WeatherDetailsCard";
import CitySearch from "./WeatherSearchBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useNavigate } from "react-router-dom";
import HeaderBar from "../news/HeaderBar";

import { updateweatherWishlist } from "../state/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [latLong, setlatLong] = useState("");
  const navigate = useNavigate();
  const state = useSelector((state) => state.dashboardReducer.weather);
  const wishListButtonText = state.some(
    (item) => item.lat === latLong.lat && item.lon === latLong.lon
  )
    ? "Remove from "
    : "Add to";

  const dispatch = useDispatch();

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useGetWeatherDataQuery(
    { city, lat: latLong.lat, lon: latLong.lon, type: API_TYPE_WEATHER },
    { skip: !city }
  );

  const {
    data: forecastData,
    isLoading: isForecastLoading,
    isError: isForecastError,
  } = useGetWeatherDataQuery(
    { city, lat: latLong.lat, lon: latLong.lon, type: API_TYPE_FORECAST },
    { skip: !city }
  );

  const dailyData = forecastData?.list?.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const navBarHeading = "Weather Place";

  const temperatures = forecastData?.list?.map((item) => item.main.temp);
  const times = forecastData?.list?.map((item) => item.dt_txt);

  const ChartData = {
    labels: times,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <>
      <HeaderBar
        heading={navBarHeading}
        navigateTo={() => navigate("/weather")}
      />
      <Box sx={{ padding: 2 }}>
        <CitySearch city={city} setCity={setCity} setlatLong={setlatLong} />
        {isWeatherError && (
          <Typography color="error">Failed to fetch weather data</Typography>
        )}
        {!isWeatherLoading && weatherData && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                width: "500px",
              }}
            >
              <WeatherDetailsCard weatherData={weatherData} />
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(updateweatherWishlist(latLong))}
              >
                {wishListButtonText} Wishlist
              </Button>
            </Box>
          </>
        )}
        {(isForecastLoading || isWeatherLoading) && <CircularProgress />}
        {isForecastError && (
          <Typography color="error">Failed to fetch forecast data</Typography>
        )}
        {!isForecastLoading && forecastData && (
          <>
            <WeatherScrollCards
              weatherData={forecastData?.list}
              title="Hourly"
            />
            <WeatherScrollCards weatherData={dailyData} title="Daily" />

            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6">{city} Weather Forecast</Typography>
              <Line data={ChartData} options={{ responsive: true }} />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default WeatherApp;
