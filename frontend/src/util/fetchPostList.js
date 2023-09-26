import React from "react";
import axios from "axios";

async function fetchPostList() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/", {
      mode: "cors",
      method: "GET",
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { fetchPostList };
