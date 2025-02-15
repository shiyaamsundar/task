import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ query, setQuery }) => {
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        placeholder="Search"
        variant="outlined"
        fullWidth
        value={query}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
