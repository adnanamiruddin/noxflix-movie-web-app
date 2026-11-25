import axios from "axios";
import queryString from "query-string";
import toApiError from "./api.error";
import { baseURL, unwrapResponse } from "./api.response";

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  };
});

publicClient.interceptors.response.use(
  unwrapResponse,
  (err) => {
    throw toApiError(err);
  }
);

export default publicClient;
