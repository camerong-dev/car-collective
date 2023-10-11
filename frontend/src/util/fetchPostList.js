import axiosInstance from "../api/axiosDefaults";

async function fetchPostList() {
  try {
    const response = await axiosInstance.get("posts/", {
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
