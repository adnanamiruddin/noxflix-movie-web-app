import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
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
import usePageTitle from "../hooks/usePageTitle";
import Container from "../components/common/Utils/Container";
import CircularRate from "../components/common/Utils/CircularRate";
import ExpandableText from "../components/common/Utils/ExpandableText";
import MediaFacts from "../components/common/Media/MediaFacts";
import HeaderImage from "../components/common/Media/HeaderImage";
import CastSlide from "../components/common/Media/CastSlide";
import MediaVideosSlide from "../components/common/Media/MediaVideosSlide";
import BackdropsSlide from "../components/common/Media/BackdropsSlide";
import PostersSlide from "../components/common/Media/PostersSlide";
import RecommendationsSlide from "../components/common/Media/RecommendationsSlide";
import MediaSlide from "../components/common/Media/MediaSlide";
import MediaReviews from "../components/common/Media/MediaReviews";

const MediaDetail = () => {
  const { user, listFavorites } = useSelector((state) => state.user);
  const { mediaType, mediaId } = useParams();

  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const [media, setMedia] = useState();
  const [genres, setGenres] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);

  const releaseYear = (media?.release_date || media?.first_air_date || "").split(
    "-"
  )[0];
  const title = media
    ? `${media.title || media.name}${releaseYear ? ` (${releaseYear})` : ""}`
    : "";
  const videos = media
    ? media.videos.results.filter((video) => video.site === "YouTube").slice(0, 6)
    : [];

  usePageTitle(title);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 3));
      }
      if (error) toast.error(error.message);
      dispatch(setGlobalLoading(false));
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const handleAddFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));
    if (onRequest) return;
    if (isFavorite) {
      handleRemoveFavoriteClick();
      return;
    }

    setOnRequest(true);
    const body = {
      mediaId,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };
    const { response, error } = await favoriteApi.add(body);
    setOnRequest(false);

    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Successfully Added to Favorites");
    }
    if (error) toast.error(error.message);
  };

  const handleRemoveFavoriteClick = async () => {
    if (onRequest) return;

    setOnRequest(true);
    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );
    const { response, error } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });
    setOnRequest(false);

    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Successfully Remove Favorite");
    }
    if (error) toast.error(error.message);
  };

  const handleTrailerClick = () => {
    videoRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return media ? (
    <div>
      {/* Media's Backdrop/Background Image START */}
      <HeaderImage
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path,
          "original"
        )}
      />
      {/* Media's Backdrop/Background Image END */}
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* Media's Content START */}
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
                >
                  {title}
                </Typography>
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
                      clickable
                      component={Link}
                      to={`/${mediaType}?genre=${genre.id}`}
                    />
                  ))}
                  {/* Media's Genres END */}
                </Stack>
                {/* Media's Rating and Genres END */}

                {/* Media's Overview/Description START  */}
                <ExpandableText
                  text={media.overview || "No overview available."}
                  lines={5}
                />
                {/* Media's Overview/Description END  */}

                {/* Media's Facts START */}
                <MediaFacts media={media} mediaType={mediaType} />
                {/* Media's Facts END */}

                {/* Media's Buttons START */}
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
                    onClick={handleAddFavoriteClick}
                  />
                  {/* Media's 'Favorite' Button END */}

                  {/* Media's 'TRAILER' Button START */}
                  {videos.length > 0 ? (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ width: "max-content" }}
                      startIcon={<PlayArrowIcon />}
                      onClick={handleTrailerClick}
                    >
                      Trailer
                    </Button>
                  ) : (
                    ""
                  )}
                  {/* Media's 'TRAILER' Button END */}
                </Stack>
                {/* Media's Button END */}
              </Stack>

              {/* Media's Cast START */}
              {media.credits.cast.length > 0 ? (
                <Container header="Cast">
                  <CastSlide castList={media.credits.cast.slice(0, 20)} />
                </Container>
              ) : (
                ""
              )}
              {/* Media's Cast END */}
            </Box>
            {/* Media's Information END */}
          </Box>
        </Box>
        {/* Media' Content END */}

        {/* Media's Videos START */}
        {videos.length > 0 ? (
          <div ref={videoRef} style={{ paddingTop: "2rem" }}>
            <Container header="Videos">
              <MediaVideosSlide videos={videos} />
            </Container>
          </div>
        ) : (
          ""
        )}
        {/* Media's Videos END */}

        {/* Media's Posters START */}
        {media.images.posters.length > 0 ? (
          <Container header="Posters">
            <PostersSlide posters={media.images.posters} />
          </Container>
        ) : (
          ""
        )}
        {/* Media's Posters END */}

        {/* Media's Backdrops/Images/Photos START */}
        {media.images.backdrops.length > 0 ? (
          <Container
            header={
              mediaType === tmdbConfigs.mediaType.movie
                ? "Movie Photos"
                : "TV Series Photos"
            }
          >
            <BackdropsSlide backdrops={media.images.backdrops} />
          </Container>
        ) : (
          ""
        )}
        {/* Media's Backdrops/Images/Photos END */}

        {/* Media's Reviews START */}
        <MediaReviews
          media={media}
          mediaType={mediaType}
          reviews={media.reviews}
        />
        {/* Media's Reviews END */}

        {/* Media's Recommendation START */}
        <Container header="You might like these">
          {media.recommendations.length > 0 ? (
            <RecommendationsSlide
              medias={media.recommendations}
              mediaType={mediaType}
            />
          ) : media.recommendations.length === 0 ? (
            <MediaSlide
              mediaCategory={tmdbConfigs.mediaCategory.popular}
              mediaType={mediaType}
            />
          ) : (
            ""
          )}
        </Container>
        {/* Media's Recommendation END */}
      </Box>
    </div>
  ) : null;
};

export default MediaDetail;
