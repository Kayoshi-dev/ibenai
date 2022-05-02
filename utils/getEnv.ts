export const getApiUrl = () => {
  return process.env.NODE_ENV === "development" ? "http://localhost:8000/" : "";
};
