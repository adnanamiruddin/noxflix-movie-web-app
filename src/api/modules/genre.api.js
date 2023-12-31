import publicClient from "../client/public.client";

const genreEndPoint = {
  list: ({ mediaType }) => `${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndPoint.list({ mediaType })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default genreApi;
