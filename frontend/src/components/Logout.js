import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosDefaults";

export const logoutUser = () => {
  axiosInstance.post("user/logout/blacklist/", {
    refresh_token: localStorage.getItem("refresh_token"),
  });
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  axiosInstance.defaults.headers["Authorization"] = null;
};

export default function Logout() {
  useEffect(() => {
    logoutUser();
  }, []);

  return <div>Logout</div>;
}
