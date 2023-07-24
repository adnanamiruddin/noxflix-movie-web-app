import { SwiperSlide } from "swiper/react";
import AutoSwiper from "../Utils/AutoSwiper";
import MediaItem from "./MediaItem";

const RecommendationsSlide = ({ medias, mediaType }) => {
  return (
    <AutoSwiper>
      {medias.map((media, i) => (
        <SwiperSlide key={i}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendationsSlide;
