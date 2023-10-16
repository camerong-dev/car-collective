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

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If status is 401 and the request hasn't been retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await axiosInstance.post("token/refresh/", {
            refresh: localStorage.getItem("refresh_token"),
          });

          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.access}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${response.data.access}`;

            return axiosInstance(originalRequest); // Retry the request with axiosInstance
          }
        } catch (err) {
          console.error("Error refreshing token", err);
          // Handle the error, e.g., redirect to login if refresh also fails
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
