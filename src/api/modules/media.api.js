import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndPoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  discover: ({ mediaType, mediaCategory, genre, page }) =>
    `${mediaType}/discover?category=${mediaCategory}&genre=${genre}&page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndPoints.list({ mediaType, mediaCategory, page })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  discover: async ({ mediaType, mediaCategory, genre, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndPoints.discover({ mediaType, mediaCategory, genre, page })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndPoints.detail({ mediaType, mediaId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndPoints.search({ mediaType, query, page })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default mediaApi;
