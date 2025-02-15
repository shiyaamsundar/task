import React, { useState } from "react";
import { TextField, Box, Autocomplete } from "@mui/material";
import { useGetStockSearchDataQuery } from "../state/stock/stockApiSlice";

const stockData = [
  {
    "1. symbol": "RE.LON",
    "2. name": "R.E.A. Holdings plc",
    "4. region": "United Kingdom",
  },
  {
    "1. symbol": "RE.TRV",
    "2. name": "RE Royalties Ltd",
    "4. region": "Toronto Venture",
  },
  {
    "1. symbol": "RE3.FRK",
    "2. name": "Richardson Electronics Ltd",
    "4. region": "Frankfurt",
  },
  {
    "1. symbol": "RE7.FRK",
    "2. name": "Remgro Limited",
    "4. region": "Frankfurt",
  },
  {
    "1. symbol": "RE8.FRK",
    "2. name": "Amerigo Resources Ltd",
    "4. region": "Frankfurt",
  },
];

const StockSearch = ({ query, setquery }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);

  const { data: searchData, isLoading: isSearchLoading } =
    useGetStockSearchDataQuery(
      { query: inputValue },
      {
        skip: !inputValue,
      }
    );

  return (
    <Box sx={{ marginTop: 2, width: 400 }}>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={stockData || []}
        getOptionLabel={(option) =>
          `${option["1. symbol"]} - ${option["2. name"]}`
        }
        renderInput={(params) => (
          <TextField {...params} label="Search for Stock" variant="outlined" />
        )}
        onChange={(event, newValue) => {
          setSelectedStock(newValue);
          setquery(newValue["1. symbol"]);
          setInputValue(newValue ? newValue["1. symbol"] : "");
        }}
        renderOption={(props, option) => (
          <li {...props}>
            {option["1. symbol"]} - {option["2. name"]} ({option["4. region"]})
          </li>
        )}
      />
    </Box>
  );
};

export default StockSearch;
