import { Box } from "@mui/material";
import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const NavigationSwiper = ({ children }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: "100%",
          opacity: 0.6,
          paddingBottom: "3rem",
        },
        "& .swiper-slide-active": { opacity: 1 },
        "& .swiper-pagination-bullet": { backgroundColor: "text.primary" },
        "& .swiper-button-next, & .swiper-button-prev": {
          color: "text.primary",
          "&::after": { xs: "1rem", md: "2rem" },
        },
        "& .swiper": {
          paddingLeft: { xs: "1rem", md: "4rem" },
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwiper;
