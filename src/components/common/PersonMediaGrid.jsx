import { useEffect, useState } from "react";
import personApi from "../../api/modules/person.api";
import { toast } from "react-toastify";
import { Grid, Button } from "@mui/material";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import MediaItem from "./MediaItem";

const PersonMediaGrid = ({ personId }) => {
  const initialCountToShow = 8;

  const [page, setPage] = useState(1);
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await personApi.getMedias({ personId });

      if (response) {
        const mediasSorted = response.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].splice(0, initialCountToShow));
      }
      if (error) toast.error(error.message);
    };
  }, [personId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  const handleLoadMoreMedias = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * initialCountToShow, page),
    ]);
    setPage(page + 1);
  };

  return (
    <div>
      <Grid container spacing={1} sx={{ marginRight: "-8px !important" }}>
        {medias.map((media, i) => (
          <Grid key={i} item xs={6} sm={4} md={3}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length ? (
        <Button onClick={handleLoadMoreMedias}>
          Load More
        </Button>
      ) : ""}
    </div>
  );
};

export default PersonMediaGrid;
