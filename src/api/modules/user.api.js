import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndPoints = {
  signin: "user/signin",
  signup: "user/signup",
  info: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndPoints.signin, {
        username,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndPoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndPoints.info);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updatePassword: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndPoints.updatePassword, {
        password,
        newPassword,
        confirmNewPassword,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
