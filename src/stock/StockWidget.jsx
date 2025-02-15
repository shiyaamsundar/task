import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetStockDataQuery } from "../state/stock/stockApiSlice";

import { API_URL_BULK } from "../state/stock/constants";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import StockSearch from "./StockSearch";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../news/HeaderBar";

const StockWidget = () => {
  const stockk = useSelector((state) => state.stockReducer.stockList);
  const [stockList, setstockList] = useState(stockk);
  const stocks = Object.keys(stockList).join(",");
  const navBarHeading = "Stock Place";
  const navigate = useNavigate();
  const {
    data: allStockData,
    isLoading,
    isError,
  } = useGetStockDataQuery(API_URL_BULK, stocks);

  const [query, setquery] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (stockName) => {
    setstockList((prev) => ({
      ...prev,
      [stockName]: !prev[stockName],
    }));
  };

  const handleInputChange = (event, newInputValue) => {
    setquery(newInputValue);
  };

  const matches = {
    bestMatches: [
      {
        "1. symbol": "APLE",
        "2. name": "Apple Hospitality REIT Inc",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.8889",
      },
      {
        "1. symbol": "AAPL",
        "2. name": "Apple Inc",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.7143",
      },
      {
        "1. symbol": "AAPL34.SAO",
        "2. name": "Apple Inc",
        "3. type": "Equity",
        "4. region": "Brazil/Sao Paolo",
        "5. marketOpen": "10:00",
        "6. marketClose": "17:30",
        "7. timezone": "UTC-03",
        "8. currency": "BRL",
        "9. matchScore": "0.7143",
      },
      {
        "1. symbol": "APC.DEX",
        "2. name": "Apple Inc",
        "3. type": "Equity",
        "4. region": "XETRA",
        "5. marketOpen": "08:00",
        "6. marketClose": "20:00",
        "7. timezone": "UTC+02",
        "8. currency": "EUR",
        "9. matchScore": "0.7143",
      },
      {
        "1. symbol": "APC.FRK",
        "2. name": "Apple Inc",
        "3. type": "Equity",
        "4. region": "Frankfurt",
        "5. marketOpen": "08:00",
        "6. marketClose": "20:00",
        "7. timezone": "UTC+02",
        "8. currency": "EUR",
        "9. matchScore": "0.7143",
      },
      {
        "1. symbol": "AGPL",
        "2. name": "Apple Green Holding Inc",
        "3. type": "Equity",
        "4. region": "United States",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-04",
        "8. currency": "USD",
        "9. matchScore": "0.6667",
      },
      {
        "1. symbol": "AAPL.TRT",
        "2. name": "Apple CDR (CAD Hedged)",
        "3. type": "Equity",
        "4. region": "Toronto",
        "5. marketOpen": "09:30",
        "6. marketClose": "16:00",
        "7. timezone": "UTC-05",
        "8. currency": "CAD",
        "9. matchScore": "0.5000",
      },
      {
        "1. symbol": "500014.BSE",
        "2. name": "Apple Finance Limited",
        "3. type": "Equity",
        "4. region": "India/Bombay",
        "5. marketOpen": "09:15",
        "6. marketClose": "15:30",
        "7. timezone": "UTC+5.5",
        "8. currency": "INR",
        "9. matchScore": "0.3846",
      },
      {
        "1. symbol": "48T.FRK",
        "2. name": "APPLE HOSPITALITY REIT",
        "3. type": "Equity",
        "4. region": "Frankfurt",
        "5. marketOpen": "08:00",
        "6. marketClose": "20:00",
        "7. timezone": "UTC+02",
        "8. currency": "EUR",
        "9. matchScore": "0.3704",
      },
      {
        "1. symbol": "603020.SHH",
        "2. name": "Apple Flavor Fragrance Group Company Ltd",
        "3. type": "Equity",
        "4. region": "Shanghai",
        "5. marketOpen": "09:30",
        "6. marketClose": "15:00",
        "7. timezone": "UTC+08",
        "8. currency": "CNY",
        "9. matchScore": "0.2222",
      },
    ],
  };

  return (
    <div>
      <HeaderBar
        heading={navBarHeading}
        navigateTo={() => navigate("/weather")}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          mt: 2,
        }}
      >
        <StockSearch query={query} setquery={setquery} />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="stock matches table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Symbol</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches?.bestMatches.map((match, index) => (
              <TableRow
                key={index}
                onClick={() => navigate(`/stock/ibm`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{match["1. symbol"]}</TableCell>
                <TableCell>{match["2. name"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StockWidget;
