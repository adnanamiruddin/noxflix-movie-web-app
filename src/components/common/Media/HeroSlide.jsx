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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { setGlobalLoading } from "../../../redux/features/globalLoadingSlice";
import { routesGen } from "../../../routes/routes";
import uiConfigs from "../../../configs/ui.configs";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import mediaApi from "../../../api/modules/media.api";
import genreApi from "../../../api/modules/genre.api";
import CircularRate from "../Utils/CircularRate";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let ignore = false;

    const loadHero = async () => {
      dispatch(setGlobalLoading(true));
      const [genreResult, mediaResult] = await Promise.all([
        genreApi.getList({ mediaType }),
        mediaApi.getList({ mediaType, mediaCategory, page: 1 }),
      ]);
      dispatch(setGlobalLoading(false));
      if (ignore) return;

      if (genreResult.response) setGenres(genreResult.response.genres);
      if (mediaResult.response) setMovies(mediaResult.response.results);
      if (mediaResult.error) toast.error(mediaResult.error.message);
    };

    loadHero();

    return () => {
      ignore = true;
    };
  }, [mediaType, mediaCategory, dispatch]);

  const getGenreNames = (movie) =>
    (movie.genre_ids || [])
      .map((genreId) => genres.find((genre) => genre.id === genreId)?.name)
      .filter(Boolean)
      .slice(0, 2);

  const getYear = (movie) =>
    (movie.release_date || movie.first_air_date || "").slice(0, 4);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "& .swiper-pagination": { bottom: "5rem" },
        "& .swiper-pagination-bullet": { backgroundColor: "text.primary" },
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
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {movies.slice(0, 10).map((movie, i) => (
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
                {/* Movie Content START */}
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
                    {getYear(movie) ? (
                      <Typography fontWeight="600">{getYear(movie)}</Typography>
                    ) : (
                      ""
                    )}
                    {/* Movie's Genre START */}
                    {getGenreNames(movie).map((name) => (
                      <Chip
                        key={name}
                        variant="filled"
                        color="primary"
                        label={name}
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
                    startIcon={<InfoOutlinedIcon />}
                    LinkComponent={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: "max-content" }}
                    color="error"
                  >
                    Details
                  </Button>
                  {/* Movie's Watch Button END */}
                </Stack>
                {/* Movie Content END */}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
