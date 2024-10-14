import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const settings = ["Profile", "Logout"];

const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleUserMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Container container>
            <Grid align="right">
              <Tooltip title="Open settings">
                <IconButton onClick={handleUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Maryam Aalizadeh" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMenu}
                onClose={handleUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Dashboard;
