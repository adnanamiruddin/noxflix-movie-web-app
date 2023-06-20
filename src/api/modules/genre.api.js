import publicClient from "../client/public.client";

const genreEndPoints = {
  getList: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndPoints.getList({ mediaType })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default genreApi;
