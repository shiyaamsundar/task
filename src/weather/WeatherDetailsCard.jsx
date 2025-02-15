import { Box, Card, CardContent, Typography } from "@mui/material";

const WeatherDetailsCard = ({ weatherData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {weatherData && (
        <Card
          sx={{
            width: "100%",
            marginTop: 2,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6">
              {weatherData.name},{weatherData?.sys?.country}
            </Typography>
            <Typography variant="body1">
              Temperature: {weatherData.main.temp}°C
            </Typography>
            <Typography variant="body1">
              Humidity: {weatherData.main.humidity}%
            </Typography>
            <Typography variant="body1">
              Weather: {weatherData.weather[0].description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default WeatherDetailsCard;
