import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import favoriteApi from "../api/modules/favorite.api";
import { toast } from "react-toastify";
import { removeFavorite } from "../redux/features/userSlice";
import MediaItem from "../components/common/MediaItem";
import { LoadingButton } from "@mui/lab";

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

  return <div>FavoriteList</div>
};

export default FavoriteList;
