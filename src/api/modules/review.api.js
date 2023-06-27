import privateClient from "../client/private.client";

const reviewEndPoints = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`,
};

const reviewApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndPoints.list);
      return { response };
    } catch (error) {
      return { error };
    }
  },

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
      const response = await privateClient.delete(
        reviewEndPoints.remove({ reviewId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default reviewApi;
