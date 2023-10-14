import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // Check if the error is a 401 and that it's not a request trying to refresh a token
    if (
      error.response.status === 401 &&
      originalRequest.url !== "api/token/refresh/"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      return axiosInstance
        .post("/token/refresh/", { refresh: refreshToken })
        .then((response) => {
          localStorage.setItem("access_token", response.data.access);

          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + response.data.access;
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.access;

          return axiosInstance(originalRequest);
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
