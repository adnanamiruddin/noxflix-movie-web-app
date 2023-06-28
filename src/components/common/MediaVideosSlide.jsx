import { useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";

const MediaVideo = ({ video }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        key={video.key}
        width="100%"
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
};

const MediaVideosSlide = ({ videos }) => {
  console.log({ videos });
  return (
    <NavigationSwiper>
      {videos.map((video, i) => (
        <SwiperSlide key={i}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MediaVideosSlide;
