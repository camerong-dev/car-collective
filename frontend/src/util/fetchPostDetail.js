import axiosInstance from "../api/axiosDefaults";

async function fetchPostDetail(id) {
  try {
    const response = await axiosInstance.get(`posts/${id}/`, {
      mode: "cors",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
}

export { fetchPostDetail };
