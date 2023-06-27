import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/ui.configs";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import mediaApi from "../../api/modules/media.api";
import genreApi from "../../api/modules/genre.api";
import CircularRate from "./CircularRate";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      console.log({ response });
      if (response) setMovies(response.results);
      if (error) toast.error(error.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await genreApi.getList({
        mediaType,
      });
      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (error) {
        toast.error(error.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          left: 0,
          bottom: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        style={{ width: "100%", height: "max-content" }}
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie, i) => (
          <SwiperSlide key={i}>
            <Box
              sx={{
                paddingTop: { xs: "130%", sm: "80%", md: "60%", lg: "45%" },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )})`,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
              }}
            >
              <Box
                sx={{
                  width: { sm: "unset", md: "30%", lg: "40%" },
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                }}
              >
                <Stack spacing={4} direction="column">
                  {/* Movie's Title START */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* Movie's Title END */}

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    {/* Movie's Rating START */}
                    <CircularRate value={movie.vote_average} />
                    {/* Movie's Rating END */}

                    <Divider orientation="vertical" />
                    {/* Movie's Genre START */}
                    {[...movie.genre_ids].splice(0, 3).map((genreId, i) => (
                      <Chip
                        key={i}
                        variant="filled"
                        color="primary"
                        label={
                          genres.find((e) => e.id === genreId)
                            ? genres.find((e) => e.id === genreId).name
                            : ""
                        }
                      />
                    ))}
                  </Stack>
                  {/* Movie's Genre END */}

                  {/* Movie's Overview/Description START  */}
                  <Typography
                    variant="body1"
                    sx={{ ...uiConfigs.style.typoLines(3) }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* Movie's Overview/Description END */}

                  {/* Movie's Watch Button START */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    LinkComponent={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: "max-content" }}
                  >
                    Watch Now!
                  </Button>
                  {/* Movie's Watch Button END */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
