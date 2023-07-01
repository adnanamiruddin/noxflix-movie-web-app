import { useEffect, useState } from "react";
import reviewApi from "../api/modules/review.api";
import { toast } from "react-toastify";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { routesGen } from "../routes/routes";
import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import Container from "../components/common/Container";
import { useDispatch } from "react-redux";

const ReviewItem = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);

  const handleRemoveReview = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, error } = await reviewApi.remove({
      reviewId: review.id,
    });
    setOnRequest(false);

    if (response) {
      onRemoved(review.id);
      toast.success("Successfully remove review");
    }
    if (error) toast.error(error.message);
  };

  return (
    <Box
      sx={{
        padding: 1,
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        opacity: onRequest ? 0.5 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box
            sx={{
              paddingTop: "160%",
              ...uiConfigs.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster)
              ),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={2}>
          <Link
            to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography
              variant="h5"
              fontWeight="700"
              textTransform="uppercase"
              sx={{ ...uiConfigs.style.typoLines(1, "left") }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">
            {dayjs(review.createdAt).format("DD-MM-YYYY (HH:mm:ss)")}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{
          width: "max-content",
          marginTop: { xs: 2, md: 0 },
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
        }}
        startIcon={<DeleteIcon />}
        loading={onRequest}
        onClick={handleRemoveReview}
      >
        Remove
      </LoadingButton>
    </Box>
  );
};

const ReviewList = () => {
  const dispatch = useDispatch();

  const initialCountToShow = 3;

  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (response) {
        setReviews([...response]);
        setFilteredReviews([...response].splice(0, initialCountToShow));
        setReviewsCount(response.length);
      }
      if (error) toast.error(error.message);
    };

    getReviews();
  }, []);

  const handleLoadMoreFavorites = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page, initialCountToShow, initialCountToShow),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newFilteredReviews = [...reviews].filter((e) => e.id !== id);
    setReviews(newFilteredReviews);
    setFilteredReviews(
      [...newFilteredReviews].splice(0, page * initialCountToShow)
    );
    setReviewsCount(reviewsCount - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your Reviews (${reviewsCount})`}>
        <Stack spacing={2}>
          {filteredReviews.map((review) => (
            <Box key={review.id}>
              <ReviewItem review={review} onRemoved={onRemoved} />
              <Divider sx={{ display: { xs: "block", md: "none" } }} />
            </Box>
          ))}
          {filteredReviews.length < reviews.length ? (
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
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewList;
