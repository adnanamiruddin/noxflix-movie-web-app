import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndPoints = {
  signIn: "user/signin",
  signUp: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

const userApi = {
  signIn: async ({ username, password }) => {
    try {
      const response = await publicClient.post(userEndPoints.signIn, {
        username,
        password,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
  signUp: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndPoints.signUp, {
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
      const response = await privateClient.get(userEndPoints.getInfo);

      return { response };
    } catch (error) {
      return { error };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndPoints.passwordUpdate, {
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
