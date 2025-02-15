import React, { useState, useEffect } from "react";
import HeaderBar from "../news/HeaderBar";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useGetCryptosQuery } from "../state/crypto/cryptoApiSlice";
import { updateCurrency } from "../state/crypto/cryptoSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchBar from "../news/SearchBar";
import { currencyList, navBarHeading } from "./constants";
import { useNavigate } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";

const CryptoWidget = () => {
  const currency = useSelector((state) => state.cryptoReducer.currency);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [query, setquery] = useState("");
  const { data: cryptoData } = useGetCryptosQuery(
    { currency },
    { pollingInterval: 10000 }
  );

  const [filteredData, setFilteredData] = useState();
  const navigate = useNavigate();
  const handleExpandClick = (coinId) => {
    setExpanded(expanded === coinId ? null : coinId);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData =
    query.length > 1
      ? filteredData
      : cryptoData?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  useEffect(() => {
    if (query) {
      const filterData = cryptoData.filter((coin) =>
        coin.id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filterData);
    }
  }, [query]);

  return (
    <>
      <HeaderBar
        heading={navBarHeading}
        navigateTo={() => navigate("/crypto")}
      />
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mt: 2,
          width: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ flex: 3 }}>
          <SearchBar query={query} setQuery={setquery} />
        </Box>

        <Box sx={{ mt: 3 }}>
          <CurrencySelector
            currency={currency}
            currencyList={currencyList}
            onCurrencyChange={(newCurrency) =>
              dispatch(updateCurrency(newCurrency))
            }
          />
        </Box>
      </Box>

      <Typography variant="h6" mt={2}>
        Crypto Data
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expand</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Logo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData?.map((coin) => (
              <React.Fragment key={coin.id}>
                <TableRow
                  onClick={() => navigate(coin.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Accordion
                      expanded={expanded === coin.id}
                      onChange={() => handleExpandClick(coin.id)}
                      sx={{ width: "0px" }}
                    >
                      <AccordionSummary
                        expandIcon={<KeyboardArrowDownIcon />}
                      />
                    </Accordion>
                  </TableCell>
                  <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                  <TableCell>{coin.name}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: coin.price_change_24h > 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {coin.current_price} {currency}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      width={50}
                      height={50}
                      style={{ borderRadius: "8px" }}
                    />
                  </TableCell>
                </TableRow>
                {expanded === coin.id && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <AccordionDetails>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>ATH (All-Time High)</TableCell>
                              <TableCell>
                                {coin.ath} {currency}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>ATH Change Percentage</TableCell>
                              <TableCell
                                sx={{
                                  color:
                                    coin.ath_change_percentage >= 0
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {coin.ath_change_percentage} %
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>ATL (All-Time Low)</TableCell>
                              <TableCell>
                                {coin.atl} {currency}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>ATL Change Percentage</TableCell>
                              <TableCell
                                sx={{
                                  color:
                                    coin.atl_change_percentage >= 0
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {coin.atl_change_percentage} %
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Volume (24h)</TableCell>
                              <TableCell>
                                {coin.total_volume} {currency}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Total Supply</TableCell>
                              <TableCell>{coin.total_supply}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil((cryptoData?.length || 0) / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default CryptoWidget;
