import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { NEWS_CATEGOERY } from "./constants";

import { useLocation, useNavigate } from "react-router-dom";

const NewsCategories = ({ selectedCard, setSelectedCard }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", // Reduced the min-width of the cards
        gap: 2,
      }}
    >
      {NEWS_CATEGOERY.map((card, index) => (
        <Card
          key={card}
          sx={{
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
            },
            border:
              card === `${currentPath}`
                ? "2px solid #1976d2"
                : "1px solid #e0e0e0",
            boxShadow:
              card === `${currentPath}`
                ? "0px 6px 12px rgba(0, 0, 0, 0.3)"
                : "0px 2px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            height: "auto",
          }}
        >
          <CardActionArea
            onClick={() => {
              setSelectedCard(NEWS_CATEGOERY[index]);
              navigate(`/news/category/${NEWS_CATEGOERY[index]}`);
            }}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              padding: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "1rem",
                }}
              >
                {card}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default NewsCategories;
