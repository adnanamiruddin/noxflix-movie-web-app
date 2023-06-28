import { Box, useTheme } from "@mui/material";
import uiConfigs from "../../configs/ui.configs";

const HeaderImage = ({ imgPath }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: "-1",
        paddingTop: { xs: "60%", sm: "40%", md: "35%" },
        backgroundImage: `url(${imgPath})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        "$::before": {
          content: '""',
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          bottom: 0,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    ></Box>
  );
};

export default HeaderImage;
