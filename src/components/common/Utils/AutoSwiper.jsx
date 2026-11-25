import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper";

const AutoSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "50%",
            sm: "35%",
            md: "25%",
            lg: "20.5%",
          },
        },
        "& .swiper-button-prev, & .swiper-button-next": {
          display: { xs: "none", md: "flex" },
          top: "40%",
          width: 40,
          height: 40,
          marginTop: 0,
          borderRadius: "50%",
          color: "common.white",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          "&::after": { fontSize: "1rem", fontWeight: 700 },
          "&.swiper-button-lock": { display: "none" },
        },
        "& .swiper-button-prev": { left: 8 },
        "& .swiper-button-next": { right: 8 },
      }}
    >
      <Swiper
        slidesPerView="auto"
        grabCursor={true}
        navigation={true}
        modules={[Navigation]}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;
