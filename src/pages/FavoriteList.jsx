import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import favoriteApi from "../api/modules/favorite.api";
import { toast } from "react-toastify";
import { removeFavorite } from "../redux/features/userSlice";
import MediaItem from "../components/common/MediaItem";
import { LoadingButton } from "@mui/lab";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { Box, Button, Grid } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const handleRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, error } = await favoriteApi.remove({
      favoriteId: media.id,
    });
    setOnRequest(false);

    if (response) {
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
      toast.success("Successfully Remove Favorite")
    }
    if (error) toast.error(error.message);
  };

  return (
    <div>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 2 }}
        startIcon={<DeleteIcon />}
        loading={onRequest}
        loadingPosition="start"
        onClick={handleRemoveFavorite}
      >
        Remove
      </LoadingButton>
    </div>
  );
};

const FavoriteList = () => {
  const dispatch = useDispatch();

  const initialCountToShow = 8;

  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, initialCountToShow));
        setFavoritesCount(response.length);
      }
      if (error) toast.error(error.message);
    };

    getFavorites();
  }, [dispatch]);

  const handleLoadMoreFavorites = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page, initialCountToShow, initialCountToShow),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newFilteredMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newFilteredMedias);
    setFilteredMedias(
      [...newFilteredMedias].splice(0, page * initialCountToShow)
    );
    setFavoritesCount(favoritesCount - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your Favorites Media (${favoritesCount})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
          {filteredMedias.map((media, i) => (
            <Grid key={i} item xs={6} sm={4} md={3}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length ? (
          <Button
            color="primary"
            sx={{
              width: { xs: "90%", md: "70%" },
              height: "2.5rem",
              fontWeight: "600",
              alignSelf: "center",
              "&:hover": {
                backgroundColor: "secondary.main",
                color: "primary.contrastText",
              },
            }}
            onClick={handleLoadMoreFavorites}
          >
            Load More
          </Button>
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
