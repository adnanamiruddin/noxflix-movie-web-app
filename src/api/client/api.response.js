import toApiError from "./api.error";

export const baseURL =
  import.meta.env.VITE_REACT_APP_BASEURL || "http://localhost:8081/api/v1/";

const looksLikeHtml = (data) =>
  typeof data === "string" && data.trimStart().startsWith("<");

export const unwrapResponse = (response) => {
  if (response && looksLikeHtml(response.data)) throw toApiError({});
  if (response && response.data) return response.data;
  return response;
};
