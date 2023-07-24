import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import mediaApi from "../api/modules/media.api";
import tmdbConfigs from "../api/configs/tmdb.configs";
import HeroSlide from "../components/common/Media/HeroSlide";
import MediaGrid from "../components/common/Media/MediaGrid";

const MediaList = () => {
  const { mediaType } = useParams();

  const dispatch = useDispatch();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const mediaCategories = useMemo(
    () => [
      "popular",
      "top_rated",
      `${
        mediaType === tmdbConfigs.mediaType.movie ? "now_playing" : "on_the_air"
      }`,
    ],
    [mediaType]
  );
  const categories = [
    "popular",
    "top_rated",
    `${
      mediaType === tmdbConfigs.mediaType.movie ? "now_playing" : "on_the_air"
    }`,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(mediaType));
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currentPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currentCategory],
        page: currentPage,
      });
      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (response) {
        if (currentPage !== 1)
          setMedias((medias) => [...medias, ...response.results]);
        else setMedias([...response.results]);
      }
      if (error) toast.error(error.message);
    };

    getMedias();
  }, [mediaType, currentCategory, currentPage, mediaCategories, dispatch]);

  const handleCategoryChange = (categoryIndex) => {
    if (currentCategory === categoryIndex) return;
    setMedias([]);
    setCurrentCategory(categoryIndex);
    setCurrentPage(1);
  };

  const handleLoadMoreMedias = () => setCurrentPage(currentPage + 1);

  return (
    <div>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currentCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginY: 4 }}
        >
          <Typography variant="h5" fontWeight="700">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {categories.map((category, i) => (
              <Button
                key={i}
                variant={currentCategory === i ? "contained" : "text"}
                size="large"
                sx={{
                  color:
                    currentCategory === i
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => handleCategoryChange(i)}
              >
                {category.replace(/_/g, " ")}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />
        <LoadingButton
          color="primary"
          sx={{
            width: "70%",
            height: "2.5rem",
            marginTop: 8,
            marginLeft: "15%",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "secondary.main",
              color: "primary.contrastText",
            },
          }}
          loading={mediaLoading}
          onClick={handleLoadMoreMedias}
        >
          Load More
        </LoadingButton>
      </Box>
    </div>
  );
};

export default MediaList;
