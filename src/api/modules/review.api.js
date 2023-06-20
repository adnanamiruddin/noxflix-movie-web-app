import privateClient from "../client/private.client";

const reviewEndPoints = {
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`,
  getList: "reviews",
};

const reviewApi = {
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
    try {
      const response = await privateClient.post(reviewEndPoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.post(
        reviewEndPoints.remove({ reviewId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndPoints.getList);

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default reviewApi;
