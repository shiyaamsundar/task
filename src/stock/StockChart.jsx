import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Container,
  Typography,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import { sampleData, stockData } from "./constans";

import { API_URL_DAILY } from "../state/stock/constants";
import { useGetStockDataQuery } from "../state/stock/stockApiSlice";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@mui/material";
import HeaderBar from "../news/HeaderBar";
import { useNavigate } from "react-router-dom";

const StockChart = () => {
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);
  const location = useLocation();
  const symbol = location.pathname.split("/")[2].toUpperCase();
  const daysOptions = [7, 10, 15, 30, 50, 100, 150, 365];
  const navBarHeading = "Stock Place";
  const navigate = useNavigate();
  // const { data: stockData } = useGetStockDataQuery(
  //   { url: API_URL_DAILY, symbol },
  //   {
  //     skip: !symbol,
  //   }
  // );

  const chartfilteredData = Object.entries(
    sampleData["Time Series (Daily)"]
  ).slice(0, days);
  const labels = chartfilteredData.map((entry) => entry[0]);

  const closePrices = chartfilteredData.map((entry) =>
    parseFloat(entry[1]["4. close"])
  );
  const volumes = chartfilteredData.map((entry) =>
    parseInt(entry[1]["5. volume"])
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Close Price",
        data: closePrices,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        fill: true,
        yAxisID: "y1",
      },
      {
        label: "Volume",
        data: volumes,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        type: "bar",
        yAxisID: "y2",
      },
    ],
    options: {
      scales: {
        y1: {
          type: "linear",
          position: "left",
          ticks: {
            beginAtZero: true,
          },
        },
        y2: {
          type: "linear",
          position: "right",
          ticks: {
            beginAtZero: true,
          },
        },
      },
    },
  };

  return (
    <>
      <HeaderBar
        heading={navBarHeading}
        navigateTo={() => navigate("/stock")}
      />
      <Container
        sx={{
          textAlign: "center",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 2,
            mt: 2,
          }}
        >
          <Card sx={{ boxShadow: 3, p: 2 }}>
            <CardHeader
              title={`${symbol} Stock Data`}
              sx={{ fontWeight: "bold" }}
            />
            <CardContent>
              {["Open", "High", "Low", "Close", "Volume"].map((label) => (
                <Typography key={label} variant="body1">
                  <strong>{label}:</strong> {stockData[label.toLowerCase()]}
                </Typography>
              ))}
            </CardContent>
          </Card>

          <TextField
            sx={{ minWidth: 180 }} // Ensures the dropdown is properly sized
            select
            label="Time Period"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            {daysOptions.map((day) => (
              <MenuItem key={day} value={day}>
                {day} Days
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : chartData ? (
          <Line data={chartData} options={chartData.options} />
        ) : (
          <Typography color="error">No data available</Typography>
        )}
      </Container>
    </>
  );
};

export default StockChart;
