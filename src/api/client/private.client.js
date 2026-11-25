import axios from "axios";
import queryString from "query-string";
import toApiError from "./api.error";
import { baseURL, unwrapResponse } from "./api.response";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("actkn")}`,
    },
  };
});

privateClient.interceptors.response.use(
  unwrapResponse,
  (err) => {
    throw toApiError(err);
  }
);

export default privateClient;
