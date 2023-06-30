import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import reviewApi from "../../api/modules/review.api";
import TextAvatar from "./TextAvatar";
import Container from "./Container";

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);

  const handleRemoveReview = async () => {
    if (onRequest) return;

    setOnRequest(true);
    const { response, error } = await reviewApi.remove({ reviewId: review.id });
    setOnRequest(false);

    if (response) onRemoved(review.id);
    if (error) toast.error(error.message);
  };

  return (
    <Box
      sx={{
        padding: 2,
        position: "relative",
        borderRadius: "5px",
        opacity: onRequest ? 0.5 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* User's Avatar START */}
        <TextAvatar text={review.user.displayName} />
        {/* User's Avatar END */}

        {/* User's Review START */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="600">
              {review.user.displayName}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY (HH:mm:ss)")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loading={onRequest}
              loadingPosition="start"
              onClick={handleRemoveReview}
              sx={{
                width: "max-content",
                marginTop: { xs: 2, md: 0 },
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
              }}
            >
              Remove
            </LoadingButton>
          )}
        </Stack>
        {/* User's Review END */}
      </Stack>
    </Box>
  );
};

const MediaReviews = ({ media, mediaType, reviews }) => {
  const { user } = useSelector((state) => state.user);

  const initialValueReviews = 4;

  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [page, setPage] = useState(1);
  const [reviewCount, setReviewCount] = useState(0);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, initialValueReviews));
    setReviewCount(reviews.length);
  }, [reviews]);

  const handleAddReview = async () => {
    if (onRequest) return;

    setOnRequest(true);
    const body = {
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
      content,
    };
    const { response, error } = await reviewApi.add(body);
    setOnRequest(false);

    if (response) {
      setContent("");
      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      toast.success("Successfully added a review");
    }
    if (error) toast.error(error.message);
  };

  const handleLoadMoreReviews = () => {
    setPage(page + 1);
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(
        page * initialValueReviews,
        initialValueReviews
      ),
    ]);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews(
        [...newListReviews].splice(0, page * initialValueReviews)
      );
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }
    setReviewCount(reviewCount - 1);
    toast.success("Review successfully deleted");
  };

  return (
    <div>
      <Container header={`Reviews & Comments (${reviewCount})`}>
        <Stack marginBottom={2} spacing={4}>
          {filteredReviews.map((review) => (
            <Box key={review.id}>
              <ReviewItem review={review} onRemoved={onRemoved} />
              <Divider sx={{ display: { xs: "block", md: "none" } }} />
            </Box>
          ))}
          {filteredReviews.length < listReviews.length ? (
            <Button onClick={handleLoadMoreReviews}>Load More</Button>
          ) : (
            ""
          )}
          {/* User's Post Review START */}
          {user ? (
            <div>
              <Divider />
              <Stack direction="row" spacing={2}>
                <TextAvatar text={user.displayName} />
                <Stack spacing={2} flexGrow={1}>
                  <Typography variant="h6" fontWeight="600">
                    {user.displayName}
                  </Typography>
                  <TextField
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant="outlined"
                    rows={4}
                    multiline
                    placeholder="Write your review or opinion"
                  />
                  <LoadingButton
                    variant="contained"
                    size="large"
                    sx={{ width: "max-content" }}
                    startIcon={<SendOutlinedIcon />}
                    loading={onRequest}
                    loadingPosition="start"
                    onClick={handleAddReview}
                  >
                    Post
                  </LoadingButton>
                </Stack>
              </Stack>
            </div>
          ) : (
            ""
          )}
          {/* User's Post Review START */}
        </Stack>
      </Container>
    </div>
  );
};

export default MediaReviews;
