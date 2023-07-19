import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import menuConfigs from "../../configs/menu.configs";
import uiConfigs from "../../configs/ui.configs.js";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const sidebarWidth = uiConfigs.size.sideBarWidth;

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <div>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="10px">
          MENU
        </Typography>
        {menuConfigs.main.map((menu, i) => (
          <ListItemButton
            key={i}
            sx={{
              borderRadius: "10px",
              marginY: 1,
              backgroundColor: appState.includes(menu.state)
                ? "primary.main"
                : "unset",
            }}
            LinkComponent={Link}
            to={menu.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {menu.display}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        {user && (
          <div>
            <Typography variant="h6" marginBottom="10px" marginTop="20px">
              PERSONAL
            </Typography>
            {menuConfigs.user.map((menu, i) => (
              <ListItemButton
                key={i}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(menu.state)
                    ? "primary.main"
                    : "unset",
                }}
                LinkComponent={Link}
                to={menu.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {menu.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </div>
        )}

        <Typography variant="h6" marginBottom="10px" marginTop="20px">
          THEME
        </Typography>
        <ListItemButton onClick={onSwitchTheme}>
          <ListItemIcon>
            {themeMode === themeModes.dark ? <DarkModeOutlinedIcon /> : ""}
            {themeMode === themeModes.light ? <WbSunnyOutlinedIcon /> : ""}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {themeMode === themeModes.dark ? "DARK MODE" : "LIGHT MODE"}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          width: sidebarWidth,
          borderRight: "0px",
          boxSizing: "border-box",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
