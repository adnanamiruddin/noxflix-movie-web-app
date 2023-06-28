import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import Container from "../components/common/Container";
import CircularRate from "../components/common/CircularRate";
import HeaderImage from "../components/common/HeaderImage";
import CastSlide from "../components/common/CastSlide";

const MediaDetail = () => {
  const { user, listFavorites } = useSelector((state) => state.user);
  const { mediaType, mediaId } = useParams();

  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const [media, setMedia] = useState();
  const [genres, setGenres] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      if (response) {
        setMedia(response);
        setGenres(response.genres.splice(0, 3));
        setIsFavorite(response.isFavorite);
      }
      if (error) toast.error(error.message);
      dispatch(setGlobalLoading(false));
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  return media ? (
    <div>
      {/* Media's Backdrop/Background Image START */}
      <HeaderImage
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      {/* Media's Backdrop/Background Image END */}
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* Media Content START */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Media's Poster START */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            {/* Media's Poster END */}

            {/* Media's Information START */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                {/* Media's Title START */}
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  textTransform="uppercase"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >{`${media.title || media.name} (${
                  mediaType === tmdbConfigs.mediaType.movie
                    ? media.release_date.split("-")[0]
                    : media.first_air_date.split("-")[0]
                })`}</Typography>
                {/* Media's Title END */}

                {/* Media's Rating and Genres START */}
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* Media's Rating START */}
                  <CircularRate value={media.vote_average} />
                  {/* Media's Rating END */}

                  <Divider orientation="vertical" />

                  {/* Media's Genres START */}
                  {genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre.name}
                      variant="filled"
                      color="primary"
                    />
                  ))}
                  {/* Media's Genres END */}
                </Stack>
                {/* Media's Rating and Genres END */}

                {/* Media's Overview/Description START  */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>
                {/* Media's Overview/Description END  */}

                {/* Media's Button START */}
                <Stack direction="row" spacing={1}>
                  {/* Media's 'Favorite' Button START */}
                  <LoadingButton
                    variant="text"
                    size="large"
                    color="error"
                    sx={{
                      width: "max-content",
                      "& .MuiButton-startIcon": { marginRight: 0 },
                    }}
                    startIcon={
                      isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                  />
                  {/* Media's 'Favorite' Button END */}

                  {/* Media's 'WATCH NOW' Button START */}
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ width: "max-content" }}
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    Watch Now!
                  </Button>
                  {/* Media's 'WATCH NOW' Button END */}
                </Stack>
                {/* Media's Button END */}
              </Stack>

              {/* Media's Cast START */}
              <Container header="Cast">
                <CastSlide castList={media.credits.cast} />
              </Container>
              {/* Media's Cast END */}
            </Box>
            {/* Media's Information END */}
          </Box>
        </Box>
        {/* Media Content END */}
      </Box>
    </div>
  ) : null;
};

export default MediaDetail;
