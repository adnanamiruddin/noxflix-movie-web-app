import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";

const BackdropsSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {backdrops.splice(0, 10).map((item, i) => (
        <SwiperSlide key={i}>
          <Box
            sx={{
              paddingTop: "60%",
              // CONTENT IMAGE
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                item.file_path
              )})`,
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropsSlide;
