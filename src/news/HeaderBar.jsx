import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderBar = ({ heading, navigateTo }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={navigateTo}
          >
            <Typography variant="h6" component="div">
              {heading}
            </Typography>
          </Container>

          <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/");
                handleMenuClose();
              }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/crypto");
                handleMenuClose();
              }}
            >
              Crypto Place
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/weather");
                handleMenuClose();
              }}
            >
              Weather Place
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/news");
                handleMenuClose();
              }}
            >
              News Place
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/stock");
                handleMenuClose();
              }}
            >
              Stock Place
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderBar;
