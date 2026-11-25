import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import mediaApi from "../../../api/modules/media.api";
import AutoSwiper from "../Utils/AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const placeholders = Array.from({ length: 6 }, (_, i) => i);

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMedias = async () => {
      setLoading(true);
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      setLoading(false);
      if (response) setMedias(response.results);
      if (error) toast.error(error.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {loading
        ? placeholders.map((i) => (
            <SwiperSlide key={i}>
              <Box sx={{ marginRight: 0.5 }}>
                <Box
                  sx={{ paddingTop: "160%", backgroundColor: "action.hover" }}
                />
                <Box
                  sx={{
                    width: "70%",
                    height: "1rem",
                    marginTop: 1.5,
                    backgroundColor: "action.hover",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))
        : medias.map((media, i) => (
            <SwiperSlide key={i}>
              <MediaItem media={media} mediaType={mediaType} />
            </SwiperSlide>
          ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
