import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import mediaApi from "../api/modules/media.api";
import genreApi from "../api/modules/genre.api";
import tmdbConfigs from "../api/configs/tmdb.configs";
import usePagedList from "../hooks/usePagedList";
import HeroSlide from "../components/common/Media/HeroSlide";
import MediaGrid from "../components/common/Media/MediaGrid";

const MediaList = () => {
  const { mediaType } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const [genres, setGenres] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);

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

  const categoryParam = searchParams.get("category");
  const category = mediaCategories.includes(categoryParam)
    ? categoryParam
    : mediaCategories[0];
  const genre = searchParams.get("genre") || "";

  const { page, items: medias, totalPages, loadMore, receive } = usePagedList(
    `${mediaType}/${category}/${genre}`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(mediaType));
  }, [mediaType, dispatch]);

  useEffect(() => {
    let ignore = false;

    const getGenres = async () => {
      const { response } = await genreApi.getList({ mediaType });
      if (!ignore && response) setGenres(response.genres);
    };

    getGenres();

    return () => {
      ignore = true;
    };
  }, [mediaType]);

  useEffect(() => {
    let ignore = false;

    const getMedias = async () => {
      if (page === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);
      const params = { mediaType, mediaCategory: category, genre, page };
      const { response, error } = genre
        ? await mediaApi.discover(params)
        : await mediaApi.getList(params);
      setMediaLoading(false);
      dispatch(setGlobalLoading(false));
      if (ignore) return;

      if (response) receive(response, page);
      if (error) toast.error(error.message);
    };

    getMedias();

    return () => {
      ignore = true;
    };
  }, [mediaType, category, genre, page, receive, dispatch]);

  const updateParams = (next) =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        Object.entries(next).forEach(([key, value]) =>
          value ? params.set(key, value) : params.delete(key)
        );
        return params;
      },
      { replace: true }
    );

  return (
    <div>
      <HeroSlide mediaType={mediaType} mediaCategory={category} />
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
            {mediaCategories.map((item) => (
              <Button
                key={item}
                variant={category === item ? "contained" : "text"}
                size="large"
                sx={{
                  color:
                    category === item ? "primary.contrastText" : "text.primary",
                }}
                onClick={() => updateParams({ category: item })}
              >
                {item.replace(/_/g, " ")}
              </Button>
            ))}
          </Stack>
        </Stack>

        {genres.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: { xs: "nowrap", md: "wrap" },
              overflowX: { xs: "auto", md: "visible" },
              paddingBottom: 1,
              marginBottom: 3,
              "& .MuiChip-root": { flexShrink: 0 },
            }}
          >
            <Chip
              label="All"
              clickable
              color={genre === "" ? "primary" : "default"}
              variant={genre === "" ? "filled" : "outlined"}
              onClick={() => updateParams({ genre: "" })}
            />
            {genres.map((item) => (
              <Chip
                key={item.id}
                label={item.name}
                clickable
                color={String(item.id) === genre ? "primary" : "default"}
                variant={String(item.id) === genre ? "filled" : "outlined"}
                onClick={() => updateParams({ genre: String(item.id) })}
              />
            ))}
          </Box>
        ) : (
          ""
        )}

        <MediaGrid medias={medias} mediaType={mediaType} />
        {medias.length > 0 && page < totalPages ? (
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
            onClick={loadMore}
          >
            Load More
          </LoadingButton>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default MediaList;
