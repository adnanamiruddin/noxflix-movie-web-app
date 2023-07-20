import { useCallback, useEffect, useState } from "react";
import mediaApi from "../api/modules/media.api";
import { toast } from "react-toastify";
import { Box, Button, Stack, TextField, Toolbar } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import MediaGrid from "../components/common/MediaGrid";
import { LoadingButton } from "@mui/lab";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);
    const { response, error } = await mediaApi.search({
      mediaType,
      query,
      page,
    });
    setOnSearch(false);

    if (response) {
      if (page > 1) setMedias((medias) => [...medias, ...response.results]);
      else setMedias([...response.results]);
    }
    if (error) toast.error(error.message);
  }, [mediaType, query, page]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const handleCategoryChange = (selectedCategory) =>
    setMediaType(selectedCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
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
            {mediaTypes.map((type, i) => (
              <Button
                key={i}
                variant={mediaType === type ? "contained" : "text"}
                size="large"
                sx={{
                  color:
                    mediaType === type
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => handleCategoryChange(type)}
              >
                {type}
              </Button>
            ))}
          </Stack>
          <TextField
            color="warning"
            placeholder="NoxViews Searching"
            autoFocus
            sx={{ width: "100%" }}
            onChange={onQueryChange}
          />
          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 ? (
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
              loading={onSearch}
              onClick={() => setPage(page + 1)}
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
