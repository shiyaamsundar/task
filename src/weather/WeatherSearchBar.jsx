import { useState } from "react";
import { TextField, Autocomplete, Box } from "@mui/material";
import { useGetCitySuggestionQuery } from "../state/weather/weatherApiSlice";

const CitySearch = ({ city, setCity, setlatLong }) => {
  const [inputValue, setInputValue] = useState("");
  const { data: optionsdata } = useGetCitySuggestionQuery(
    { city: inputValue },
    { skip: inputValue.length <= 2 }
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={optionsdata?.list || []}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Search for city" />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            setCity(newValue.name);
            setlatLong(newValue?.coord);
            setInputValue(newValue.name);
          }
        }}
        renderOption={(props, option) => (
          <li {...props}>
            {option.name}, {option.sys?.country}{" "}
          </li>
        )}
      />
    </Box>
  );
};

export default CitySearch;
