import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import mediaApi from "../api/modules/media.api";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import usePagedList from "../hooks/usePagedList";
import Container from "../components/common/Utils/Container";
import MediaGrid from "../components/common/Media/MediaGrid";
import MediaSlide from "../components/common/Media/MediaSlide";
import { LoadingButton } from "@mui/lab";

const mediaTypes = ["movie", "tv", "people"];
const placeholders = {
  movie: "Search movies",
  tv: "Search TV series",
  people: "Search people",
};
const suggestionHeaders = {
  movie: "Popular Movies",
  tv: "Popular Series",
};
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get("q") || "";
  const query = queryParam.trim();
  const typeParam = searchParams.get("type");
  const mediaType = mediaTypes.includes(typeParam) ? typeParam : mediaTypes[0];

  const [inputValue, setInputValue] = useState(queryParam);
  const [status, setStatus] = useState("idle");

  const { page, items: medias, totalPages, loadMore, receive } = usePagedList(
    `${mediaType}/${query}`
  );

  useEffect(() => {
    setInputValue(queryParam);
  }, [queryParam]);

  useEffect(() => () => clearTimeout(timer), []);

  useEffect(() => {
    if (query.length === 0) {
      setStatus("idle");
      return;
    }

    let ignore = false;

    const search = async () => {
      setStatus("loading");
      const { response, error } = await mediaApi.search({
        mediaType,
        query,
        page,
      });
      if (ignore) return;

      if (response) {
        receive(response, page);
        setStatus("done");
      }
      if (error) {
        setStatus("error");
        toast.error(error.message);
      }
    };

    search();

    return () => {
      ignore = true;
    };
  }, [mediaType, query, page, receive]);

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

  const onQueryChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    clearTimeout(timer);

    timer = setTimeout(() => updateParams({ q: value }), timeout);
  };

  return (
    <div>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={4}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((type) => (
              <Button
                key={type}
                variant={mediaType === type ? "contained" : "text"}
                size="large"
                sx={{
                  color:
                    mediaType === type
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => updateParams({ type })}
              >
                {type}
              </Button>
            ))}
          </Stack>
          <TextField
            color="secondary"
            placeholder={placeholders[mediaType]}
            inputProps={{ "aria-label": placeholders[mediaType] }}
            autoFocus
            value={inputValue}
            sx={{ width: "100%" }}
            onChange={onQueryChange}
          />
          <MediaGrid medias={medias} mediaType={mediaType} />

          {status === "done" && medias.length === 0 ? (
            <Typography color="text.secondary" textAlign="center">
              {`No results found for "${query}".`}
            </Typography>
          ) : (
            ""
          )}

          {query.length === 0 && suggestionHeaders[mediaType] ? (
            <Container header={suggestionHeaders[mediaType]}>
              <MediaSlide mediaType={mediaType} mediaCategory="popular" />
            </Container>
          ) : (
            ""
          )}

          {medias.length > 0 && page < totalPages ? (
            <LoadingButton
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
              loading={status === "loading"}
              onClick={loadMore}
            >
              Load More
            </LoadingButton>
          ) : (
            ""
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default MediaSearch;
