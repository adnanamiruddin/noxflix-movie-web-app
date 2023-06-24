import { cloneElement, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlined from "@mui/icons-material/WbSunnyOutlined";
import Logo from "./Logo";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";

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

  return (
    <div>Headerbar</div>
  );
};

export default Headerbar;
