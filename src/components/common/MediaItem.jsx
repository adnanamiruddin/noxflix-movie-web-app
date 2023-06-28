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
import { Button, Stack, Typography } from "@mui/material";
import CircularRate from "./CircularRate";

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
        {/* Hover Styling only for Movie or TV item START */}
        {mediaType !== "people" ? (
          <div>
            {favoriteUtils.check({ listFavorites, mediaId: media.id }) ? (
              <FavoriteIcon
                color="primary"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  fontSize: "2rem",
                }}
              />
            ) : (
              ""
            )}
            <Box
              className="media-back-drop"
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                opacity: { xs: 1, md: 0 },
                transition: "all 0.3s ease",
              }}
            />
            <Button
              className="media-play-btn"
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                display: { xs: "none", md: "flex" },
                opacity: 0,
                transition: "all 0.4s ease",
                transform: "translate(-50%, -50%)",
                "& .MuiButton-startIcon": { marginRight: "-4px" },
              }}
              color="error"
            />
            <Box
              className="media-info"
              sx={{
                width: "100%",
                height: "max-content",
                position: "absolute",
                bottom: { xs: 0, md: "-20px" },
                padding: { xs: "10px", md: "1.5rem 1rem" },
                boxSizing: "border-box",
                opacity: { xs: 1, md: 0 },
                transition: "all 0.6s ease",
              }}
            >
              <Stack spacing={{ xs: 1, md: 2 }}>
                {rate ? <CircularRate value={rate} /> : ""}
                <Typography>{releaseDate}</Typography>
                <Typography
                  variant="body1"
                  fontWeight="700"
                  sx={{
                    fontSize: "1rem",
                    ...uiConfigs.style.typoLines(1, "left"),
                  }}
                >
                  {title}
                </Typography>
              </Stack>
            </Box>
          </div>
        ) : (
          ""
        )}
        {/* Hover Styling only for Movie or TV item END */}
      </Box>
    </Link>
  );
};

export default MediaItem;
