import { Fragment } from "react";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../../../api/configs/tmdb.configs";
import NotFound from "../../../pages/NotFound";

const MediaTypeGuard = ({ children }) => {
  const { mediaType, mediaId } = useParams();

  if (!Object.values(tmdbConfigs.mediaType).includes(mediaType))
    return <NotFound />;

  return <Fragment key={`${mediaType}/${mediaId ?? ""}`}>{children}</Fragment>;
};

export default MediaTypeGuard;
