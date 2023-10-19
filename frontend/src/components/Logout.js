import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosDefaults";

export const logoutUser = async () => {
  try {
    await axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;

    window.dispatchEvent(new Event("userLoggedOut"));
  } catch (error) {
    console.error("Error during logout: ", error);
  }
};

export default function Logout() {
  useEffect(() => {
    logoutUser();
  }, []);

  return <div>Logout</div>;
}
