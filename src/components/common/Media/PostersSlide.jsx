import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import AutoSwiper from "../Utils/AutoSwiper";

const PostersSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {[...posters].splice(0, 10).map((poster, i) => (
        <SwiperSlide key={i}>
          <Box
            sx={{
              paddingTop: "160%",
              // CONTENT IMAGE
              backgroundImage: `url(${tmdbConfigs.posterPath(
                poster.file_path
              )})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              marginRight: 0.5,
            }}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PostersSlide;
