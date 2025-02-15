import { useState } from "react";
import HeaderBar from "../news/HeaderBar";
import { Box, MenuItem, TextField, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetCryptoChartQuery,
  useGetCryptoDetailsQuery,
} from "../state/crypto/cryptoApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrency } from "../state/crypto/cryptoSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import CryptoDetailsCard from "./CryptoDetailsCard";
import CurrencySelector from "./CurrencySelector";
import { currencyList, navBarHeading } from "./constants";
import { updateCryptoWishlist } from "../state/dashboard/dashboardSlice";

const CryptoChart = () => {
  const location = useLocation().pathname;
  const id = location.split("/")[2];
  const navigate = useNavigate();
  const state = useSelector((state) => state.dashboardReducer.crypto);
  const wishListButtonText = state.includes(id) ? "Remove from " : "Add to";

  const currency = useSelector(
    (state) => state.cryptoReducer.currency
  ).toLowerCase();
  const dispatch = useDispatch();
  const [days, setDays] = useState(7);
  const daysOptions = [7, 10, 15, 30, 50, 100, 150, 365];
  const { data: cryptoDetials } = useGetCryptoDetailsQuery(id, {
    skip: !id,
    pollingInterval: 100000,
  });

  const { data: cryptoChartData } = useGetCryptoChartQuery(
    { id, days, currency },
    { skip: !id || !currency || !days }
  );

  const timeLabels =
    cryptoChartData?.prices?.map((item) =>
      new Date(item[0]).toLocaleDateString()
    ) || [];

  const priceData = cryptoChartData?.prices?.map((item) => item[1]) || [];
  const volumeData =
    cryptoChartData?.total_volumes?.map((item) => item[1]) || [];
  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: `${id} ${currency}`,
        data: priceData,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
      },
      {
        label: `${id} Volume`,
        data: volumeData,
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        type: "bar",
        yAxisID: "y2",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: `Price ${currency}`,
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Volume",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <>
      <HeaderBar
        heading={navBarHeading}
        navigateTo={() => navigate("/crypto")}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          mt: 5,
          mb: 5,
        }}
      >
        <Box component="form" sx={{ m: 1 }} noValidate>
          <CurrencySelector
            currency={currency}
            currencyList={currencyList}
            onCurrencyChange={(newCurrency) =>
              dispatch(updateCurrency(newCurrency))
            }
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "300px",
            mt: 2,
          }}
        >
          <TextField
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

          <Typography variant="body1">Selected: {days} Days</Typography>
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ maxWidth: 600 }}>
            <CryptoDetailsCard cryptoDetails={cryptoDetials} />
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(updateCryptoWishlist(id))}
            >
              {wishListButtonText} Wishlist
            </Button>
          </Box>
        </Box>

        <Line data={chartData} options={options} />
      </Box>
    </>
  );
};

export default CryptoChart;
