import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import reviewApi from "../../api/modules/review.api";

const MediaReview = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);

  const handleRemoveReview = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, error } = await reviewApi.remove({ reviewId: review.id });

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
        {/* User's Review START */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="600">
              {review.user.displayName}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
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
        {/* User's Review START */}
      </Stack>
    </Box>
  );
};

export default MediaReview;
