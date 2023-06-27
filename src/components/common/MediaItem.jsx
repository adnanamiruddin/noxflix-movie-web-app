import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import { routesGen } from "../../routes/routes";
import favoriteUtils from "../../utils/favorite.util";

const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [rate, setRate] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);
    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.background_path ||
          media.mediaPoster ||
          media.profile_path
      )
    );

    setRate(media.vote_average || media.mediaRate);

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(
        media.release_date ? media.release_date.split("-")[0] : ""
      );
    } else {
      setReleaseDate(
        media.first_air_date ? media.first_air_date.split("-")[0] : ""
      );
    }
  }, [media, mediaType]);

  return (
    <Link
      to={
        mediaType !== "people"
          ? routesGen.mediaDetail(mediaType, media.id || media.mediaid)
          : routesGen.person(media.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: "160%",
          color: "primary.contrastText",
          "&:hover .media-info": { bottom: 0, opacity: 1 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
        }}
      >
      </Box>
    </Link>
  );
};

export default MediaItem;
