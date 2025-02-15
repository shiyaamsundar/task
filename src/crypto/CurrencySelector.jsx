import React from "react";
import { TextField, MenuItem } from "@mui/material";

const CurrencySelector = ({ currency, currencyList, onCurrencyChange }) => {
  return (
    <TextField
      select
      label="Select Currency"
      value={currency.toUpperCase()}
      helperText="Please select your currency"
      onChange={(e) => onCurrencyChange(e.target.value)}
    >
      {currencyList.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CurrencySelector;
