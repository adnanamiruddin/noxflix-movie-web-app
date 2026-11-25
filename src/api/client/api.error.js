const fallbackMessage = "Cannot reach the server. Please try again.";

const toApiError = (err) => {
  const data = err.response?.data;
  return data && data.message ? data : { message: fallbackMessage };
};

export default toApiError;
