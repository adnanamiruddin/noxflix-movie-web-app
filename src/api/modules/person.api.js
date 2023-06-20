import publicClient from "../client/public.client";

const personEndPoints = {
  getDetail: ({ personId }) => `person/${personId}`,
  getMedias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  getDetail: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndPoints.getDetail({ personId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getMedias: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndPoints.getMedias({ personId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default personApi;
