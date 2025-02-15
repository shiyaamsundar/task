import Typography from "@mui/material/Typography";

const TruncatedText = ({ text, maxLength }) => {
  const truncatedText =
    text?.length > maxLength ? text?.substring(0, maxLength) + "..." : text;

  return (
    <Typography
      variant="body2"
      align="left"
      sx={{ color: "text.secondary", mt: 1 }}
    >
      {truncatedText}
    </Typography>
  );
};

export default TruncatedText;
