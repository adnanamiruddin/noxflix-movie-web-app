import publicClient from "../client/public.client";

const personEndPoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  getDetail: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndPoints.detail({ personId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getMedias: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndPoints.medias({ personId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default personApi;
