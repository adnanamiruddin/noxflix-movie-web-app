import { cloneElement, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeModes.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Headerbar = () => {
  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      {/* Navbar For Mobile View (Active Hamburger Icon) START */}
      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Navbar For Mobile View (Active Hamburger Icon) END */}

      {/* Navbar For Tab/Desktop/etc */}
      <ScrollAppBar>
        <AppBar elevation={0} sx={{ zIndex: 9999 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between", marginTop: "5px" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {/* Mobile View (Hamburger Icon) START */}
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              {/* Mobile View (Hamburger Icon) END */}

              <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                <Logo />
              </Box>
            </Stack>

            {/* Main Menu Section START */}
            <Box
              flexGrow={1}
              alignItems="center"
              display={{ xs: "none", md: "flex" }}
            >
              <Box sx={{ marginRight: "30px" }}>
                <Logo />
              </Box>
              {menuConfigs.main.map((menu, i) => (
                <Button
                  key={i}
                  sx={{
                    color: appState.includes(menu.state)
                      ? "primary.contrastText"
                      : "inherit",
                    mr: 2,
                  }}
                  LinkComponent={Link}
                  to={menu.path}
                  variant={appState.includes(menu.state) ? "contained" : "text"}
                >
                  {menu.display}
                </Button>
              ))}
              <IconButton sx={{ color: "inherit" }} onClick={onSwitchTheme}>
                {themeMode === themeModes.dark ? <DarkModeOutlinedIcon /> : ""}
                {themeMode === themeModes.light ? <WbSunnyOutlinedIcon /> : ""}
              </IconButton>
            </Box>
            {/* Main Menu Section END */}

            {/* User Menu Section START */}
            {/* If User Already Sign In START */}
            {user && <UserMenu />}
            {/* If User Already Sign In END */}

            {/* If User Haven't Sign In START */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setAuthModalOpen(true))}
                >
                  Sign In
                </Button>
              )}
            </Stack>
            {/* If User Haven't Sign In END */}
            {/* User Menu Section END */}
          </Toolbar>
        </AppBar>
      </ScrollAppBar>
    </div>
  );
};

export default Headerbar;
