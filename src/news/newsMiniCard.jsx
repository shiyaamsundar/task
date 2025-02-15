import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

//   eslint-disable-next-line react/prop-types
const NewsMiniCard = ({ article }) => {
  return (
    <>
      {article.urlToImage && (
        <Card
          sx={{ maxWidth: 345 }}
          onClick={() => window.open(article?.url, "_blank")}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                align="left"
              >
                {article.source.name}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="body2"
                  align="left"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  {article.title}
                </Typography>

                <img
                  className="w-[100px] h-[100px] rounded-md"
                  src={article.urlToImage}
                  alt=""
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};

export default NewsMiniCard;
