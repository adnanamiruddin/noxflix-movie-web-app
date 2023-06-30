import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import usePrevious from "../hooks/usePrevious";
import mediaApi from "../api/modules/media.api";
import { toast } from "react-toastify";
import HeroSlide from "../components/common/HeroSlide";
import uiConfigs from "../configs/ui.configs";

const MediaList = () => {
  const { mediaType } = useParams();

  const prevMediaType = usePrevious();
  const dispatch = useDispatch();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const mediaCategories = useMemo(() => [
    "popular",
    "top_rated",
    "now_playing",
    "on_the_air",
  ], []);
  const category = ["popular", "top_rated", "now_playing", "on_the_air"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
  }, [mediaType]);

  useEffect(() => {
    const getMedias = async () => {
      if (currentPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currentCategory],
        page: currentPage,
      });
      dispatch(setGlobalLoading(false));
      setMediaLoading(false);

      if (response) {
        if (currentPage !== 1)
          setMedias((media) => [...media, ...response.results]);
        else setMedias([...response.results]);
      }
      if (error) toast.error(error.message);
    };

    if (mediaType !== prevMediaType) {
      window.scrollTo(0, 0);
      setCurrentCategory(0);
      setCurrentPage(1);
    }

    getMedias();
  }, [
    mediaType,
    currentCategory,
    currentPage,
    prevMediaType,
    mediaCategories,
    dispatch,
  ]);

  const handleCategoryChange = (categoryIndex) => {
    if (currentCategory === categoryIndex) return

    setMedias([])
    setCurrentCategory(categoryIndex)
    setCurrentPage(1)
  }

  const handleLoadMoreMedias = () => setCurrentPage(currentPage + 1)

  return (
    <div>
      <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currentCategory]} />
      <Box sx={{...uiConfigs.style.mainContent}}>
        
      </Box>
    </div>
  )
};

export default MediaList;
