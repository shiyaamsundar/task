import { Typography, CardMedia, Card, CardContent } from "@mui/material";
import { currencyList } from "./constants";
import { useSelector } from "react-redux";

const CryptoDetailsCard = ({ cryptoDetails }) => {
  const currency = useSelector(
    (state) => state.cryptoReducer.currency
  ).toLowerCase();
  const currencyLabel = currencyList.find(
    (cur) => cur.value === currency.toUpperCase()
  )?.label;
  const {
    name,
    symbol,
    image,
    market_cap_rank,
    market_data,
    sentiment_votes_up_percentage,
    sentiment_votes_down_percentage,
  } = cryptoDetails || {};

  return (
    <Card
      sx={{ display: "flex", alignItems: "center", m: 2, p: 2, boxShadow: 3 }}
    >
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80, borderRadius: "8px", m: "auto" }}
        image={image?.small}
        alt={name}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">
          {name} ({symbol?.toUpperCase()})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cryptoDetails?.description?.en?.slice(0, 100)}...
        </Typography>
        <Typography variant="body2">
          <strong>Rank:</strong> #{market_cap_rank}
        </Typography>
        {market_data && (
          <>
            <Typography variant="body2">
              <strong>ATH:</strong> {market_data.ath?.[currency]}{" "}
              {currencyLabel}
            </Typography>
            <Typography variant="body2">
              <strong>ATL:</strong> {market_data.atl?.[currency]}{" "}
              {currencyLabel}
            </Typography>
            <Typography variant="body2">
              <strong>Price:</strong> {market_data.current_price?.[currency]}{" "}
              {currencyLabel}
            </Typography>
            <Typography variant="body2">
              <strong>24h Change:</strong> {market_data.price_change_24h}{" "}
              {currency.toUpperCase()}
            </Typography>
          </>
        )}
        <Typography variant="body2">
          <strong>Upvotes:</strong> {sentiment_votes_up_percentage}% |{" "}
          <strong>Downvotes:</strong> {sentiment_votes_down_percentage}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CryptoDetailsCard;
