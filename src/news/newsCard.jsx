import {
  CardContent,
  Typography,
  Stack,
  CardActionArea,
  Card,
  Box,
} from "@mui/material";
import TruncatedText from "./TruncatedText";

const NewsCard = ({ article }) => {
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    if (isNaN(date)) {
      return "Invalid date";
    }
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <Card
      sx={{ maxWidth: 800, width: "100%", p: 2, m: 1 }}
      onClick={() => window.open(article?.url, "_blank")}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" align="left">
            {article?.source.name}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                align="left"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                {article?.title}
              </Typography>
              <TruncatedText text={article?.description} maxLength={200} />
            </Box>

            {article?.urlToImage && (
              <Box sx={{ width: 100, height: 100 }}>
                <img
                  src={article?.urlToImage}
                  alt="News"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}
          </Stack>

          <Typography align="left" sx={{ mt: 2, fontSize: 12, color: "gray" }}>
            {formatDate(article?.publishedAt)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
