import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import AutoSwiper from "./AutoSwiper";

const PostersSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {posters.splice(0, 10).map((item, i) => (
        <SwiperSlide key={i}>
          <Box
            sx={{
              paddingTop: "160%",
              // CONTENT IMAGE
              backgroundImage: `url(${tmdbConfigs.posterPath(item.file_path)})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PostersSlide;
