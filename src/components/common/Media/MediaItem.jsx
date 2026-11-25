import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import uiConfigs from "../../../configs/ui.configs";
import { routesGen } from "../../../routes/routes";
import favoriteUtils from "../../../utils/favorite.util";
import { Button, Stack, Typography } from "@mui/material";

const MediaItem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector((state) => state.user);

  const isPerson = mediaType === "people";
  const title = media.title || media.name || media.mediaTitle;
  const posterPath = tmdbConfigs.posterPath(
    media.poster_path ||
      media.background_path ||
      media.mediaPoster ||
      media.profile_path
  );
  const rate = media.vote_average || media.mediaRate;
  const date =
    mediaType === tmdbConfigs.mediaType.movie
      ? media.release_date
      : media.first_air_date;
  const releaseDate = date ? date.split("-")[0] : "";

  return (
    <Link
      to={
        !isPerson
          ? routesGen.mediaDetail(mediaType, media.mediaId || media.id)
          : routesGen.person(media.id)
      }
      style={{ display: "block", color: "inherit", textDecoration: "none" }}
    >
      <Box sx={{ marginRight: 0.5, color: "text.primary" }}>
        <Box
          sx={{
            paddingTop: "160%",
            ...uiConfigs.style.backgroundImage(posterPath),
            color: "primary.contrastText",
            "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          }}
        >
          {!posterPath ? (
            <Typography
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.black",
                opacity: 0.6,
              }}
            >
              No image
            </Typography>
          ) : (
            ""
          )}

          {!isPerson ? (
            <div>
              {favoriteUtils.check({ listFavorites, mediaId: media.id }) ? (
                <FavoriteIcon
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 3,
                    right: 3,
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
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  opacity: 0,
                  transition: "opacity 0.2s ease",
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
                  transition: "opacity 0.2s ease",
                  transform: "translate(-50%, -50%)",
                  "& .MuiButton-startIcon": { marginRight: "-4px" },
                }}
                color="error"
              />
            </div>
          ) : (
            ""
          )}
        </Box>

        <Stack spacing={0.5} sx={{ paddingY: 1.5 }}>
          <Typography
            fontWeight="700"
            sx={{ fontSize: "1rem", ...uiConfigs.style.typoLines(1, "left") }}
          >
            {title}
          </Typography>
          {!isPerson ? (
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ minHeight: "1.5rem", color: "text.secondary" }}
            >
              {rate ? (
                <Stack direction="row" spacing={0.25} alignItems="center">
                  <StarRoundedIcon
                    sx={{ fontSize: "1.1rem", color: "warning.main" }}
                  />
                  <Typography variant="body2">
                    {Number(rate).toFixed(1)}
                  </Typography>
                </Stack>
              ) : (
                ""
              )}
              {releaseDate ? (
                <Typography variant="body2">{releaseDate}</Typography>
              ) : (
                ""
              )}
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </Box>
    </Link>
  );
};

export default MediaItem;
