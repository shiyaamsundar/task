import { Box, Card, CardContent, Typography } from "@mui/material";

const WeatherScrollCards = ({ weatherData, title }) => {
  const convertDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = dateObj.toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <Box
      sx={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        mt: 3,
        pb: 2,
        "&::-webkit-scrollbar": {
          width: "2px",
          height: "5px",
          opacity: 0,
          transition: "opacity 0.3s ease",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
        "&:hover::-webkit-scrollbar": {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        {weatherData?.map((data, index) => (
          <Card sx={{ width: 250, flex: "0 0 auto" }} key={index}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {title} Weather
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Temperature: </strong>
                {data.main.temp}°C
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Feels Like: </strong>
                {data.main.feels_like}°C
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>Humidity: </strong>
                {data.main.humidity}%
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{data.weather[0].description} </strong>
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{convertDate(data.dt_txt)} </strong>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default WeatherScrollCards;
